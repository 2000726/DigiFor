
window.addEventListener('load', function() { 
  var range = document.getElementById('timeRange')
  var cache = false
  
  var downloadCSV = document.getElementById('downloadCSV')
  downloadCSV.onclick = function(element) {
    if (cache) {
      downloadCSV(cache)
      return
    }
  }
}
    
    
  
