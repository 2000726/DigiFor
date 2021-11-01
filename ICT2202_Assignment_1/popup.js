
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
	var timestamp = startTime.getTime();
}
