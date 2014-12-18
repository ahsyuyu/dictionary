var fs = require("fs");
var dingfubao=fs.readFileSync("dingfubao.xml","utf8").split("\n");
for(var i=0; i<dingfubao.length; i++){
	dingfubao[i]=dingfubao[i].replace(/<g ref=".*?"\/>/g,"");
}
console.log(dingfubao.join("\n"));

//<g ref=".*?"/>