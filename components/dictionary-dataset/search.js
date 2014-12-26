var fs=require("fs");
var dingfubao=JSON.parse(fs.readFileSync("./dingfubao2.json","utf8"));
var mahavyutpatti=JSON.parse(fs.readFileSync("./mahavyutpatti.json","utf8"));
// var entries=JSON.parse(fs.readFileSync("./entries.json","utf8"));
// var indexes=JSON.parse(fs.readFileSync("./indexes.json","utf8"));
var entries=JSON.parse(fs.readFileSync("./entries_m.json","utf8"));
var indexes=JSON.parse(fs.readFileSync("./indexes_m.json","utf8"));
console.time("time");

var findTerm = function(text) {
	var res=[];
	for(var i=0; i<text.length; i++){
		for(var j=2;j<text.length+1-i; j++){
			var index=indexOfSorted(entries,text.substr(i,j));
			//if(index) console.log(dingfubao[indexes[index]]);
			if(index) console.log(mahavyutpatti[indexes[index]]);
		}
	}
	//console.log(res);
}
var indexOfSorted = function (array, obj) { 
  var low = 0,
  high = array.length-1;
  while (low < high) {
    var mid = (low + high) >> 1;
    array[mid] < obj ? low = mid + 1 : high = mid;
  }
  if(entries[low] != obj) return null;
  return low;
};

//findTerm("諸菩薩摩訶薩應如是生清淨心");
findTerm("རབ་ཏུ་བྱུང་བའི་སྤྱི་སྡོམ་ལ། ཤཱ་རིའི་བུ་དང་མུ་སྟེགས་ཅན། །དགེ་ཚུལ་");
console.timeEnd("time");