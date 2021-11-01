
// Listens to when User clicks on the link
document.addEventListener('DOMContentLoaded', function () {
  var history = new History();

  document.getElementById('btn-week').onclick = function(){
    history.getHistory(7);
  };
  document.getElementById('btn-month').onclick = function(){
    history.getHistory(31);
  };
  document.getElementById('btn-year').onclick = function(){
    history.getHistory(365);
  };
});


// Pre-defining History function
var History = function(){}


// Getting History
History.prototype.getHistory = function(range){
	var currentTime = new Date(); // Specify current time
	var startTime = currentTime.setDate(currentTime.getDate() - range);
	var timestamp = currentTime.getTime();
	
	// Text : Left empty to retrieve all pages
	chrome.history.search({'text': '', 'maxResults': 100000000, 'startTime': startTime,}, this.download);
}

// Downloading
History.prototype.download = function(history){
	
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
