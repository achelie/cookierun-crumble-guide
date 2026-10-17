"""Offline translation authoring with resumable, structurally validated output."""
import concurrent.futures, collections, hashlib, html, json, os, pathlib, re, sys, threading, time, urllib.request

ROOT=pathlib.Path(__file__).resolve().parents[2]
LOCALE=sys.argv[1]
LANG={'zh-Hant':'Traditional Chinese used in Taiwan (also readable in Hong Kong)','ja':'Japanese','ko':'Korean','th':'Thai'}[LOCALE]
SOURCE=ROOT/'src/i18n/source'
SNAP=json.loads((SOURCE/(LOCALE+'.json')).read_text(encoding='utf-8'))
GLOSSARY=SNAP['glossary']
CACHE=ROOT/'output/i18n'/('cache-'+LOCALE)
CACHE.mkdir(parents=True,exist_ok=True)
MESSAGE_FILE=ROOT/'src/i18n/messages'/(LOCALE+'.json')
MESSAGE_FILE.parent.mkdir(parents=True,exist_ok=True)
GUIDE_DIR=ROOT/'src/content/guides'/LOCALE
GUIDE_DIR.mkdir(parents=True,exist_ok=True)
PROVIDER_STOPPED=threading.Event()

def normalize(s):return re.sub(r'\s+',' ',s).strip()
def write(file,data):file.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

TERMS={k:v for k,v in GLOSSARY.items() if SNAP['origins'].get(k,'').startswith(('game-entity:','game-entity-short:','game-role','game-element')) and len(k)>2}
# Explanations and semantic types stay separate. Canonical official labels are
# also supplied to the model, instead of replacing words inside prose blindly.
for k in ['Skill Amp','Accuracy','Focus','Evasion','Resistance','Multi-strike','Multi-shot','ATK','DEF','HP','CRIT Chance','CRIT DMG','Sugar Rune','Sugar Runes','Stellar Link','Plating']:
 if k in GLOSSARY:TERMS[k]=GLOSSARY[k]
EXTRA_TERMS={
 'zh-Hant':{'Power':'戰鬥力','Skill Amp':'技能增幅','ATK Amp':'攻擊力增幅','Multi-strike':'連擊','Multi-shot':'多重射擊','Damage Reduction':'傷害減免'},
 'ja':{'Power':'戦闘力','Skill Amp':'スキル増幅','ATK Amp':'攻撃力増幅','Multi-strike':'連撃','Multi-shot':'多弾','Damage Reduction':'ダメージ軽減'},
 'ko':{'Power':'전투력','Skill Amp':'스킬 증폭','ATK Amp':'공격력 증폭','Multi-strike':'연타','Multi-shot':'다발','Damage Reduction':'피해 감소'},
 'th':{'Power':'พลังต่อสู้','Skill Amp':'เพิ่มพลังสกิล','ATK Amp':'เพิ่มพลังโจมตี','Multi-strike':'โจมตีต่อเนื่อง','Multi-shot':'ยิงหลายนัด','Damage Reduction':'ลดความเสียหาย'},
}[LOCALE]
for source,canonical in [('Skill Amp','Skill AMP'),('ATK Amp','ATK AMP')]:
 if canonical in GLOSSARY:EXTRA_TERMS[source]=GLOSSARY[canonical]
TERMS.update(EXTRA_TERMS)

def request(texts,context):
 digest=hashlib.sha256(json.dumps([texts,context],ensure_ascii=False).encode()).hexdigest()
 file=CACHE/(digest+'.json')
 if file.exists():return json.loads(file.read_text(encoding='utf-8'))
 if '--recover-ui' in sys.argv:raise LookupError('Not cached')
 if PROVIDER_STOPPED.is_set():raise RuntimeError('Provider stopped after an account error; resume only after it is resolved')
 combined=' '.join(texts)
 relevant={k:v for k,v in TERMS.items() if re.search(r'(?<![A-Za-z])'+re.escape(k)+r'(?![A-Za-z])',combined)}
 prompt=(f'You are a native {LANG} editor for a CookieRun: Crumble fan guide. Translate every supplied text completely into {LANG}. '
 'Use natural, friendly, concise game-guide language. Do not summarize, omit, invent, change advice, add translator notes or English parenthetical explanations. '
 'Preserve all digits, percentages, mathematical symbols, dates, ranks S/A/B/C/D, SSR/TSSR/SR/R/U/C, acronyms PvP/PvE, and placeholder tokens {0}, {1}, etc. exactly. '
 'Use supplied official game terminology consistently, including short English character names. If an English string is an identifier/code/schema field or CSS-like technical fragment, preserve it. '
 'Translate sentences about game equipment, ranks, stats and teams; do not leave whole English sentences. Preserve leading/trailing spaces when text is a sentence fragment adjoining an inline link. '
 'Return JSON only as {"translations":["translated text", ...]}, exactly one string for each input in the same order. '
 'Do not change the JSON structure or output markdown fences. Review your translations for native fluency, facts and the glossary before answering.\n'
 'Official terminology: '+json.dumps(relevant,ensure_ascii=False)+'\nContext: '+context)
 protected=[];number_maps=[]
 for text in texts:
  numbers={}
  def protect(match):
   token='[NUM_'+str(len(numbers))+']';numbers[token]=match.group();return token
  protected.append(re.sub(r'(?<![\w{])\d+(?:[.,]\d+)*(?![\w}])',protect,text));number_maps.append(numbers)
 prompt+=' Preserve each [NUM_0], [NUM_1], etc. marker exactly; these are protected numeric values restored after translation.'
 payload={'model':os.environ.get('I18N_TRANSLATION_MODEL','qwen-plus'),'enable_thinking':False,'temperature':0.15,'max_tokens':24000,'response_format':{'type':'json_object'},'messages':[{'role':'system','content':prompt},{'role':'user','content':json.dumps({'texts':protected},ensure_ascii=False)}]}
 for attempt in range(5):
  try:
   req=urllib.request.Request(os.environ.get('I18N_TRANSLATION_URL','https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'),data=json.dumps(payload,ensure_ascii=False).encode(),headers={'Authorization':'Bearer '+os.environ['DASHSCOPE_API_KEY'],'Content-Type':'application/json'})
   with urllib.request.urlopen(req,timeout=240) as response:body=json.load(response)
   content=body['choices'][0]['message']['content']
   translations=json.loads(content)['translations']
   if len(translations)!=len(texts) or not all(isinstance(t,str) and (t.strip() or not s.strip()) for s,t in zip(texts,translations)):raise ValueError('Incomplete translation batch')
   for index,(target,numbers) in enumerate(zip(translations,number_maps)):
    for token,number in numbers.items():
     if token not in target:raise ValueError('Lost protected number marker '+token)
     target=target.replace(token,number)
    if re.search(r'\[NUM_\d+\]',target):raise ValueError('Unexpected protected number marker')
    translations[index]=target
   for source,target in zip(texts,translations):
    if sorted(re.findall(r'\{\d+\}',source))!=sorted(re.findall(r'\{\d+\}',target)):raise ValueError('Changed placeholder tokens')
    # Source terms may contain digits (T4). Every number must survive.
    if collections.Counter(re.findall(r'\d+(?:[.,]\d+)*',source))-collections.Counter(re.findall(r'\d+(?:[.,]\d+)*',target)):raise ValueError('Lost numeric value: '+source[:90]+' -> '+target[:90])
   write(file,translations)
   return translations
  except urllib.error.HTTPError as error:
   detail=json.loads(error.read().decode('utf-8')).get('error',{})
   print(LOCALE,context,error.code,detail.get('code'),flush=True)
   if error.code in (400,401,402,403):
    PROVIDER_STOPPED.set()
    raise RuntimeError('Translation provider unavailable: '+str(detail.get('code')))
   if attempt==4:raise
   time.sleep(min(20,2**attempt))
  except Exception as error:
   if attempt==4:raise
   print(LOCALE,context,'retry',attempt+1,type(error).__name__,str(error)[:100],flush=True)
   time.sleep(min(20,2**attempt))

def translate_messages():
 texts=json.loads((SOURCE/'messages.json').read_text(encoding='utf-8'))
 existing=json.loads(MESSAGE_FILE.read_text(encoding='utf-8')) if MESSAGE_FILE.exists() else {}
 result=dict(existing.get('messages',{}));origins=dict(existing.get('origins',{}));pending=[]
 for text in texts:
  if text in result:continue
  if text in GLOSSARY:
   result[text]=GLOSSARY[text];origins[text]=SNAP['origins'][text]
  else:pending.append(text)
 batches=[];batch=[];size=0
 for text in pending:
  if batch and (len(batch)>=55 or size+len(text)>6500):batches.append(batch);batch=[];size=0
  batch.append(text);size+=len(text)
 if batch:batches.append(batch)
 def process(pair):
  index,items=pair
  try:values=request(items,'Website UI, SEO, team and guide summaries, batch '+str(index+1))
  except LookupError:return []
  print(LOCALE,'UI',index+1,'/',len(batches),flush=True);return list(zip(items,values))
 with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
  for pairs in pool.map(process,enumerate(batches)):
   for key,value in pairs:result[key]=value;origins[key]='translated-and-reviewed'
 # Entity names and short aliases are also needed in dynamically assembled UI.
 for key,value in TERMS.items():result[key]=value;origins[key]=SNAP['origins'].get(key,'game-glossary')
 for overrides in [ROOT/'src/i18n/overrides'/(LOCALE+'.json')]:
  if overrides.exists():
   for key,value in json.loads(overrides.read_text(encoding='utf-8')).items():
    if result.get(key)!=value:origins[key]='native-reviewed'
    result[key]=value
 write(MESSAGE_FILE,{'locale':LOCALE,'version':SNAP['version'],'messages':dict(sorted(result.items())),'origins':dict(sorted(origins.items()))})
 print(LOCALE,'UI complete',len(result),flush=True)

def translate_guide(pair):
 slug,guide=pair;file=GUIDE_DIR/(slug+'.mdx')
 if file.exists():return
 # A guide is below the skill's 4k-word threshold; preserve paragraph context.
 texts=[s['text'] for s in guide['segments']]
 translated=[]
 # Keep provider output under its completion limit for long Thai text.
 batch=[];size=0
 for text in texts:
  if batch and size+len(text)>13500:
   translated.extend(request(batch,'Guide '+slug+'; consecutive paragraphs '+str(len(translated)+1)));batch=[];size=0
  batch.append(text);size+=len(text)
 if batch:translated.extend(request(batch,'Guide '+slug+'; consecutive paragraphs '+str(len(translated)+1)))
 output=guide['text']
 for segment,value in sorted(zip(guide['segments'],translated),key=lambda pair:pair[0]['start'],reverse=True):
  # Preserve markdown escapes, JSX syntax, IDs and numeric arrays as source.
  if segment['kind']=='attribute':value=segment['name']+'='+json.dumps(value,ensure_ascii=False)
  else:
   value=value.replace('<','&lt;').replace('{','&#123;').replace('}','&#125;')
   # Markdown text next to links needs its original boundary spacing.
   if segment['text'].startswith(' '):value=' '+value.lstrip()
   if segment['text'].endswith(' '):value=value.rstrip()+' '
  output=output[:segment['start']]+value+output[segment['end']:]
 file.write_text(output,encoding='utf-8')
 print(LOCALE,'guide',slug,flush=True)

if '--recover-ui' in sys.argv:
 translate_messages();sys.exit(0)
guides=json.loads((SOURCE/'guides.json').read_text(encoding='utf-8'))
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as jobs:
 ui=jobs.submit(translate_messages) if '--guides-only' not in sys.argv else None
 if '--ui-only' not in sys.argv:
  with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:list(pool.map(translate_guide,guides.items()))
 if ui:ui.result()
write(ROOT/'output/i18n'/(LOCALE+'-generation.json'),{'locale':LOCALE,'guides':len(guides),'provider':'qwen-plus','sourceVersion':SNAP['version'],'review':'numeric and placeholder validation; native editorial review follows'})
print(LOCALE,'complete',len(guides),'guides',flush=True)
