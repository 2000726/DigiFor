const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

function pathJoin(parts, sep){
   var separator = sep || '/';
   var replace   = new RegExp(separator+'{1,}', 'g');
   return parts.join(separator).replace(replace, separator);
}

function browserHistory(){
    
    var browserDirectory = pathJoin('AppData/', 'Local/', 'Google/', 'Chrome/', 'User Data/', 'Default/');
    var files = fs.readdirSync(browserDirectory);
    var chromehistory = pathJoin(browserDirectory, 'history');
    var db = sqlite3.connect(chromehistory);
	
	return;
}