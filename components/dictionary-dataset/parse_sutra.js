var fs=require("fs");
var sutra=fs.readFileSync("sutra.xml","utf8");
var getToken = function() {
	var sutra_token=sutra.replace(/(.*?)[་།]/g,function(r){
		return "<span>"+r+"</span>";
	});
	console.log(sutra_token);
}
getToken()