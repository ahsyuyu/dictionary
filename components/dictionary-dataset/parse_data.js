var fs=require("fs");
var d=fs.readFileSync("dingfubao2.js","utf8");
var m=d.match(/(\[".*?",".*?",".*?"\])/g);

console.log(m.join(",\n"));