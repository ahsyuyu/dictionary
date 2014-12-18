var sax = require("sax")
  , printer = sax.createStream(false, {lowercasetags:true, trim:true})
  , fs = require("fs")

//--------------------------------------------------
var tagstack=[];


printer.onopentag = function (node) {// opened a tag.  node has "name" and "attributes"
	if(node.name != "g") tagstack.push(node.name); //
  	if(node.name === "body"){
  		print("[");
  	} 	
  	//console.log(tagstack);
  	//if(node.name==="g") print("<G>");
};
var key="", usg="", def="";
printer.ontext = function (t) {// got some text.  t is the string of text.
	var out=[];
	var obj={};
	var tagname=tagstack[tagstack.length-1];
	var text=t.replace(/\n/g,"");
	if(tagname === "form") {
		key=text;
	}
	if(tagname === "usg") {
		usg=text;
	}
	if(tagname === "def") {
		def=text;
		// obj[key]=[usg,def];
		// console.log(obj);
		console.log('["'+key+'"'+',"'+usg+'"'+',"'+def+'"]');
		console.log(",");
	}
	
};


var toPrint=false;
printer.on("closetag", function (tag) {
	if(tag != "g") tagstack.pop();
	if(tag === "body") print("]");
	if(tag === "entry") {
		toPrint=true;
	} else {toPrint=false;}

})

// printer.on("text", ontext)
// function ontext (text) {

//   print(text)
// }

//--------------------------------------------------

printer.on("error", function (error) {
  console.error(error)
  throw error
})

if (!process.argv[0]) {
  throw new Error("Please provide an xml file to prettify\n"+
    "TODO: read from stdin or take a file")
}
//var xmlfile = require("path").join(process.cwd(), process.argv[2])
var fstr = fs.createReadStream("dingfubao_no_g.xml", { encoding: "utf8" })

function print (c) {
  if (!process.stdout.write(c)) {
    fstr.pause()
  }
}

process.stdout.on("drain", function () {
  fstr.resume()
})

fstr.pipe(printer)

