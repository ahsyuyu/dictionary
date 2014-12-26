var sax = require("sax")
  , printer = sax.createStream(false, {lowercasetags:true, trim:true})
  , fs = require("fs")
  , strict = true // set to false for html-mode
  , parser = sax.parser(strict);

var util = require('util');
console.log(util.inspect(process.memoryUsage()));
//--------------------------------------------------
var tagstack=[];
var attrstack=[];
var out=[];
var san=[], zho=[], bod=[];
parser.onopentag = function (node) {// opened a tag.  node has "name" and "attributes"
	tagstack.push(node.name); //
	if(node.attributes["xml:lang"]) attrstack.push(node.attributes["xml:lang"]);
};

parser.ontext = function (t) {// got some text.  t is the string of text.
	
	var top=tagstack.length-1;
	var tagname=tagstack[top];
	var attrname=attrstack[attrstack.length-1];

	if(attrname && attrname.match("san")){
		san.push(t);
	}

	if(attrname && attrname.match("zho")){
		zho.push(t);
	}

	if(attrname && attrname.match("bod")){
		if(attrstack[attrstack.length-2] && attrstack[attrstack.length-2].match("bod")){
			bod.push(t);
			out.push([san,zho,bod]);
			san=[];
			zho=[];
			bod=[];
		} else bod.push(t);
	} 
	//console.log(out);
	
	
};

printer.on("end",function(){
	console.log("end")
	console.log(util.inspect(process.memoryUsage()));
	fs.writeFileSync("m.json",JSON.stringify(out,""," "),"utf8");
})

var fstr = fs.readFileSync("mahavyutpatti.xml", { encoding: "utf8" })
parser.write(fstr).close();
/*
function print (c) {
	console.log("print",c);
  if (!process.stdout.write(c)) {
    fstr.pause()
  }
  
}

process.stdout.on("drain", function () {
  fstr.resume()
})
*/

//fstr.pipe(printer)

