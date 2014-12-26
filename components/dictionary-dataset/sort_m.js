var fs=require("fs");
var m=JSON.parse(fs.readFileSync("mahavyutpatti.json","utf8"));

var addIndex=function(){
	var out=[];
	m.map(function(item,index){
		out.push([item[2][1],index]);
	});
	return out
} 

var entriesIndexes=addIndex();
entriesIndexes.sort(function(a,b){
	if(a[0]>b[0]) return 1;
	else if (a[0]<b[0]) return -1;
	else return 0;
});

var entries_m=[];
var indexes_m=[];

entriesIndexes.map(function(item){
	entries_m.push(item[0]);
	indexes_m.push(item[1]);
});

fs.writeFileSync("entries_m.json",JSON.stringify(entries_m,""," "),"utf8");
fs.writeFileSync("indexes_m.json",JSON.stringify(indexes_m,""," "),"utf8");
