
// Listens to when User clicks on the link
document.addEventListener('DOMContentLoaded', function () {
  var history = new History();

  document.getElementById('btn-day').onclick = function(){
    history.getHistory(7);
  };
  document.getElementById('btn-week').onclick = function(){
    history.getHistory(30);
  };
  document.getElementById('btn-all').onclick = function(){
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
	
}
