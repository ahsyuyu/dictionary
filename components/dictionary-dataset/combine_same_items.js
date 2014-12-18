var fs = require("fs");
var dingfubao=JSON.parse(fs.readFileSync("dingfubao_unfinish.json","utf8"));
var out=[];
var obj={};

for(var i=0; i< dingfubao.length; i++) {
	out.push(dingfubao[i]);
	// obj[dingfubao[i][0]]=[dingfubao[i][1],dingfubao[i][2]];
	if(dingfubao[i+1] && dingfubao[i][0] == dingfubao[i+1][0]){
		while(dingfubao[i] && dingfubao[i+1] && dingfubao[i][0] == dingfubao[i+1][0]){
			out[out.length-1].push(dingfubao[i+1][1]);
			out[out.length-1].push(dingfubao[i+1][2]);
			// obj[dingfubao[i][0]].push(dingfubao[i+1][1]);
			// obj[dingfubao[i][0]].push(dingfubao[i+1][2]);
			i++;
		}
	}
}
// var obj_json=JSON.stringify(obj);
// for(var i in obj_json){
// 	console.log(obj_json[i]);
// }

//console.log(JSON.stringify(obj));
console.log(JSON.stringify(out));