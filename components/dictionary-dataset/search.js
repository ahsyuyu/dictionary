var fs=require("fs");
var dingfubao=JSON.parse(fs.readFileSync("./dingfubao2.json","utf8"));
var dingfubao_sort=JSON.parse(fs.readFileSync("./sort_key.json","utf8"));
console.time("time");

var findTerm = function(text) {
	for(var i=0; i<text.length; i++){
		for(var j=2;j<text.length+1-i; j++){
			var res=search(text.substr(i,j));
			if(res.length != 0) {
				//console.log(text.substr(i,j));
				//console.log(res);
				res.map(function(item){
					console.log(dingfubao[item[1]]);
				});
			}
		}
	}
}

var search = function(tofind) {
	var out=[];
	// dingfubao.map(function(item){
	// 	if(tofind.length == item.form.length && item.form.match(tofind)){
	// 		out.push(item);
	// 	}
	// });
	dingfubao_sort.map(function(item){
		if(tofind.length == item[0].length && item[0].match(tofind)){
			out.push(item);
		}
	});
	// for(var i in dingfubao) {
	// 	if(tofind.length == i.length && i.match(tofind)) console.log(i);
	// }
	//console.log(tofind+":"+out.join("、")+"\n\n");
	return out;
}


findTerm("諸菩薩摩訶薩應如是生清淨心");

console.timeEnd("time");



// var sortJSON = function() {
// 	var ding=[];
// 	var c=0;
// 	for(var i in dingfubao){
// 		ding.push([i,c])
// 		c++;
// 	}
	
// 	var dingfubao_sort=ding.sort(function(a,b){
// 	  if (a>b) return -1; else if (b>a) return 1 ; 
// 	  return 0;
// 	});
// 	console.log(dingfubao_sort);
// }
// sortJSON();



var dosearch = function(text) {
	for(var i=0; i<text.length; i++){
		search(text.substr(i,1))
	}
}