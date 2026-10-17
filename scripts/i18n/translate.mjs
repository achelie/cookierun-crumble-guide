// Authoring only. Uses the user's configured translation provider; never in builds.
import { spawn } from 'node:child_process';
const child=spawn('python',['scripts/i18n/translate.py',...process.argv.slice(2)],{stdio:'inherit',env:{...process.env,PYTHONIOENCODING:'utf-8'}});
child.on('exit',code=>process.exit(code||0));
