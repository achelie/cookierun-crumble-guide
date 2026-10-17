import postcss from 'postcss';
export function capToolType(css){
 const sheet=postcss.parse(css);
 sheet.walkDecls(/^font(?:-size)?$/,declaration=>{
  declaration.value=declaration.value.replace(/(\d+(?:\.\d+)?)(px|rem)/g,(_,number,unit)=>Math.min(Number(number),unit==='px'?26:1.625)+unit);
 });
 return sheet.toString().replace('Original type sizes and game colors intentionally retained.','Type sizes follow the site 26px limit; game colors are retained.');
}
