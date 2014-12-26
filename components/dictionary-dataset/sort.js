var fs=require("fs");
var d=JSON.parse(fs.readFileSync("./sort_key.json","utf8"));

d.sort(function(a,b){
	if(a[0]>b[0]) return 1;
	else if(a[0]<b[0]) return -1;
	return 0;
});

var entries=[];
var indexes=[];

d.map(function(item){
	entries.push(item[0]);
	indexes.push(item[1]);
});

//fs.writeFileSync("sorted.json",JSON.stringify(d,""," "),"utf8");
fs.writeFileSync("entries.json",JSON.stringify(entries,""," "),"utf8");
fs.writeFileSync("indexes.json",JSON.stringify(indexes,""," "),"utf8");
