var fs=require("fs");
var dingfubao=JSON.parse(fs.readFileSync("./dingfubao.json"));//

console.time("time");

var findTerm = function(text) {
	for(var i=0; i<text.length; i++){
		for(var j=2;j<text.length+1-i; j++){
			var res=search(text.substr(i,j));
			if(res.length != 0) {
				console.log(text.substr(i,j));
				//console.log(res);
			} //else break;
		}
	}
}

var search = function(tofind) {
	var out=[];
	dingfubao.map(function(item){
		if(tofind.length == item.form.length && item.form.match(tofind)){
			out.push(item);
		}
	});
	//console.log(tofind+":"+out.join("、")+"\n\n");
	return out;
}


findTerm("諸菩薩摩訶薩應如是生清淨心");
console.timeEnd("time");







var dosearch = function(text) {
	for(var i=0; i<text.length; i++){
		search(text.substr(i,1))
	}
}