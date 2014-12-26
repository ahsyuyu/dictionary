//var othercomponent=Require("other"); 
//new module filename must be added to scripts section of ./component.js and export here
var dataset = {
 module1: require("./module1"),
 api:require("./api"),
 //dingfubao:require("./dingfubao3"),
 indexes:require("./indexes"),
 entries:require("./entries"),
 indexes_m:require("./indexes_m"),
 entries_m:require("./entries_m"),
 mahavyutpatti:require("./mahavyutpatti")
}

module.exports=dataset;