
// Listens to when User clicks on the link
document.addEventListener('DOMContentLoaded', function () {
  var history = new History();
  var cookies = new Cookies();
  var bookmarks = new Bookmarks();

  document.getElementById('btn-week').onclick = function(){ history.getHistory(7); cookies.getCookies(); bookmarks.getBookmarks(); };
  document.getElementById('btn-month').onclick = function(){ history.getHistory(31); cookies.getCookies(); bookmarks.getBookmarks(); };
  document.getElementById('btn-year').onclick = function(){ history.getHistory(365); cookies.getCookies(); bookmarks.getBookmarks(); };

});


// Pre-defining History function
var History = function(){}


// Getting History
History.prototype.getHistory = function(range){		// Create the function "getHistory" inheriting from "History"
	var currentTime = new Date(); // Specify current time
	var startTime = currentTime.setDate(currentTime.getDate() - range);
	var timestamp = currentTime.getTime();
	
	// Text : Left empty to retrieve all pages
	chrome.history.search({
		'text': '', 
		'maxResults': 100000000, 
		'startTime': startTime,
	}, 
	this.download);		// Calls the "download" function.
}

// History Download
History.prototype.download = function(history){		// Create the function "download" inheriting from "History"
	
	var filename = "history.json";
	var to_file = []; // Array to store the entries
	var index;
	
	// Use a for loop to store the entries to the array specified above.
	for (index = 0; index < history.length; ++index){
		to_file.push({
			'id': history[index].id,
			'lastVisitTime': new Date(history[index].lastVisitTime).toLocaleString(),
			'title': history[index].title,
			'url': history[index].url,
			'visitCount': history[index].visitCount,
			'typedCount': history[index].typedCount
		});
	}
	
	// Converts the array above, to strings, undefine the conversion, and set 2 spaces/tabs
	var blob = new Blob([JSON.stringify(to_file,undefined,2)],{type:'application/octet-binary'});
	
	var url = URL.createObjectURL(blob); // Creates an URL which will be used for download 
	
	chrome.downloads.download({
		url: url,
		filename: filename,
		saveAs: true	// Allows user to rename / overwrite the filename and extension
	});
	
}



// Pre-defining Cookies function
var Cookies = function() {}


// Getting Cookies
Cookies.prototype.getCookies = function(){		// Create the function "getCookies" inheriting from "Cookies"
	
	chrome.cookies.getAll({},
	this.download);
}

// Cookies Download
Cookies.prototype.download = function(cookies){		// Create the function "download" inheriting from "Cookies"
	
	var filename = "cookies.json";
	var to_file = [];
	var index;
	
	for (index = 0; index < cookies.length; ++index){
		to_file.push({
			'id': index,
			'name': cookies[index].name,
			'domain': cookies[index].domain,
			'path': cookies[index].path,
			'secure': cookies[index].secure,
			'expiration': cookies[index].expirationDate,
			'value': cookies[index].value
		});
	}
	
	var blob = new Blob([JSON.stringify(to_file,undefined,2)],{type:'application/octet-binary'});
	
	var url = URL.createObjectURL(blob); // Creates an URL which will be used for download 
	
	chrome.downloads.download({
		url: url,
		filename: filename,
		saveAs: true	// Allows user to rename / overwrite the filename and extension
	});
}




// Pre-defining Bookmarks function
var Bookmarks = function() {}


// Getting Bookmarks
Bookmarks.prototype.getBookmarks = function(){
	
	chrome.bookmarks.getTree({},
	this.download);
	
}

// Bookmarks Download
Bookmarks.prototype.download = function(bookmarks){
	
	var filename = "bookmarks.json";
	var to_file = [];
	var ind;
	
	for (ind = 0; ind < bookmarks.length; ++ind){
		to_file.push({
			'id': bookmarks[ind].id,
			'parentid': bookmarks[ind].parentid,		// If root node, this will be omitted.
			'children': bookmarks[ind].children,
			'index': bookmarks[ind].index,				// If child node, will display 0-index
			'title': bookmarks[ind].title,
			'url': bookmarks[ind].url,
			'dateAdded': bookmarks[ind].dateAdded			
		});
	}
	
	var blob = new Blob([JSON.stringify(to_file,undefined,2)],{type:'application/octet-binary'});
	
	var url = URL.createObjectURL(blob); // Creates an URL which will be used for download 
	
	chrome.downloads.download({
		url: url,
		filename: filename,
		saveAs: true	// Allows user to rename / overwrite the filename and extension
	});
}

