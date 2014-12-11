var sax = require("sax")
  , printer = sax.createStream(false, {lowercasetags:true, trim:true})
  , fs = require("fs")

//--------------------------------------------------
var tagstack=[];
var out=[];
var start=false;
var parser = sax.parser(true)
parser.onopentag = function (node,line) {// opened a tag.  node has "name" and "attributes"
	// if(node.name != "body") return;
	tagstack.push(node.name);
  	if(node.name === "entry"){
  		//print("{");
  	} 	
  	//if(node.name === "body") start=true;
  	print(line);

};
printer.ontext = function (t) {// got some text.  t is the string of text.
	var tagname=tagstack[tagstack.length-1];
	var text=t.replace(/\n/g,"");
	//print('"'+tagstack[tagstack.length-1]+'":"'+text+'",\n');	

};

printer.on("closetag", function (tag) {
	tagstack.pop();
	//if(tag === "entry") print("},\n");
	
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
var fstr = fs.createReadStream("d.xml", { encoding: "utf8" })

function print (c) {
  if (!process.stdout.write(c)) {
    fstr.pause()
  }
}

process.stdout.on("drain", function () {
  fstr.resume()
})

fstr.pipe(printer)

