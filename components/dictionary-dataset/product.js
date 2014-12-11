var sax = require("sax")
  , printer = sax.createStream(false, {lowercasetags:true, trim:true})
  , fs = require("fs")

//--------------------------------------------------
var parser = sax.parser(true)
var products = []
var product = null
var currentTag = null

parser.onclosetag = function (tagName) {
  if (tagName === "product") {
    products.push(product)
    currentTag = product = null
    return
  }
  if (currentTag && currentTag.parent) {
    var p = currentTag.parent
    delete currentTag.parent
    currentTag = p
  }
}

parser.onopentag = function (tag) {
  print(tag);
  if (tag.name !== "product" && !product) return
  if (tag.name === "product") {
    product = tag
  }
  tag.parent = currentTag
  tag.children = []
  tag.parent && tag.parent.children.push(tag)
  currentTag = tag
}

parser.ontext = function (text) {
  if (currentTag) currentTag.children.push(text)
}

parser.onend = function () {
  var out = util.inspect(products, false, 3, true)
  res.writeHead(200, {"content-type":"application/json"})
  res.end("{\"ok\":true}")
  print(currentTag);
   //res.end(JSON.stringify(products));
}
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
var fstr = fs.createReadStream("shopping.xml", { encoding: "utf8" })

function print (c) {
  if (!process.stdout.write(c)) {
    fstr.pause()
  }
}

process.stdout.on("drain", function () {
  fstr.resume()
})

fstr.pipe(printer)

