var exhaustiveFind = function(n) {
	//console.log(dingfubao);
	return "["+n+"]";
}
var indexOfSorted = function (array, obj) { 
    var low = 0,
    high = array.length-1;
    while (low < high) {
      var mid = (low + high) >> 1;
      array[mid] < obj ? low = mid + 1 : high = mid;
    }
    if(array[low] != obj) return null;
    return low;
 }





var api={exhaustiveFind:exhaustiveFind,indexOfSorted:indexOfSorted}

module.exports=api;