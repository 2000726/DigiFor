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
