
// Listens to when User clicks on the link
document.addEventListener('DOMContentLoaded', function () {
  var history = new History();
  var cookies = new Cookies();
  var bookmarks = new Bookmarks();
  var topsites = new TopSites();
  let blob;

  document.getElementById('btn-week').onclick = function(){ history.getHistory(7); cookies.getCookies(); bookmarks.getBookmarks(); topsites.getTopSites(); };
  document.getElementById('btn-month').onclick = function(){ history.getHistory(31); cookies.getCookies(); bookmarks.getBookmarks(); topsites.getTopSites(); };
  document.getElementById('btn-year').onclick = function(){ history.getHistory(365); cookies.getCookies(); bookmarks.getBookmarks(); topsites.getTopSites(); };
  document.getElementById('btn-alltime').onclick = function(){ history.getHistory(44444); cookies.getCookies(); bookmarks.getBookmarks(); topsites.getTopSites(); };

});



// Pre-defining History function
var History = function(){}

// Getting History
History.prototype.getHistory = function(range){		// Create the function "getHistory" inheriting from "History"
	var currentTime = new Date(); // Specify current time
	var startTime = 0;
	if (range != 44444){		// Used to check if user wants to export "all-time"
		startTime = currentTime.setDate(currentTime.getDate() - range);
	}
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
	var i;
	
	// Use a for loop to store the entries to the array specified above.
	for (i = 0; i < history.length; ++i){
		to_file.push({
			'id': history[i].id,
			'lastVisitTime': new Date(history[i].lastVisitTime).toLocaleString("en-SG"),
			'title': history[i].title,
			'url': history[i].url,
			'visitCount': history[i].visitCount,
			'typedCount': history[i].typedCount
		});
	}
	
	// Converts the array above, to strings, undefine the conversion, and set 2 spaces/tabs
	blob = new Blob([JSON.stringify(to_file,undefined,2)],{type:'application/octet-binary'});
	
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
	var i;
	
	for (i = 0; i < cookies.length; ++i){
		var t = new Date(1970, 0, 1);
		var exp = cookies[i].expirationDate;
		t.setSeconds(exp);
		to_file.push({
			'id': i,
			'name': cookies[i].name,
			'domain': cookies[i].domain,
			'path': cookies[i].path,
			'secure': cookies[i].secure,
			'expiration': t.toLocaleString("en-SG"),
			'value': cookies[i].value
		});
	}
	
	blob = new Blob([JSON.stringify(to_file,undefined,2)],{type:'application/octet-binary'});
	
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
	
	chrome.bookmarks.search({
		'query': null,
		'url': null,
		'title': null,
	},
	this.download);
	
}

// Bookmarks Download
Bookmarks.prototype.download = function(bookmarks){
	
	var filename = "bookmarks.json";
	var to_file = [];
	var i;
	
	for (i = 0; i < bookmarks.length; ++i){
		to_file.push({
			'index': bookmarks[i].index,				// If child node, will display 0-index
			'id': bookmarks[i].id,
			'title': bookmarks[i].title,
			'url': bookmarks[i].url,
			'parentid': bookmarks[i].parentid,		// If root node, this will be omitted.
			'dateAdded': new Date(bookmarks[i].dateAdded).toLocaleString("en-SG")
		});
	}
	
	blob = new Blob([JSON.stringify(to_file,undefined,2)],{type:'application/octet-binary'});
	
	var url = URL.createObjectURL(blob); // Creates an URL which will be used for download 
	
	chrome.downloads.download({
		url: url,
		filename: filename,
		saveAs: true	// Allows user to rename / overwrite the filename and extension
	});
}



// Pre-defining Topsite function
var TopSites = function() {}

// Get the top sites the user has visited
TopSites.prototype.getTopSites = function(){
	chrome.topSites.get(this.download);
}

// Topsite dl
TopSites.prototype.download = function(topSites){
	
	var filename = "topSites.json";
	var to_file = [];
	var i;
	
	for (i = 0; i < topSites.length; ++i){
		to_file.push({
			'index': i,
			'title': topSites[i].title,			
			'url': topSites[i].url
		});
	}
	
	blob = new Blob([JSON.stringify(to_file,undefined,2)],{type:'application/octet-binary'});
	
	var url = URL.createObjectURL(blob); // Creates an URL which will be used for download 

	chrome.downloads.download({
		url: url,
		filename: filename,
		saveAs: true	// Allows user to rename / overwrite the filename and extension
	});
}
