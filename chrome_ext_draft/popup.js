// Functions

function downloadHistory(){
  timeRange = document.getElementById('timeRange')
  msday = 86400000
  
  query = { text: '', }
  
  // If statements to check specified option values
  if (timeRange.value == 'day'){
    query.startTime = (new Date).getTime() - msday
    break
  } elif (timeRange.value == 'week'){
    query.startTime = (new Date).getTime() - 7 * msday
    break
  } elif (timeRange.value == 'month'){
    query.startTime = (new Date).getTime() - 30 * msday
    break
  } elif (timeRange.value == 'year'){
    query.startTime = (new Date).getTime() - 365 * msday
    break
  } elif (timeRange.value == 'forever'){
    query.startTime = 0
    break
  }
  
  return history.unlimitedSearch(query)
}

function downloadCookies(){
  
}

function downloadPasswords(){
  
}
