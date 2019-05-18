export function parseCSV(val) {
    let valores = val.split(',');
    let res = valores.reduce( (x,y) => x.concat([y.replace(/ /g, "")]), [] );
    return res;   
 }
