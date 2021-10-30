const history = {
  getVisits(details) {
    return new Promise(resolve => {
      chrome.history.getVisits(details, function(visitItems) {
        resolve(visitItems)
      })
    })
  },

  search(query) {
    return new Promise(resolve => {
      chrome.history.search(query, function(historyItems) {
        resolve(historyItems)
      })
    })
  },
}