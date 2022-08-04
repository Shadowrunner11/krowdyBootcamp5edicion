chrome.action.onClicked.addListener((tab)=>{
  console.log('click')
  const options = {
    target: { tabId: tab.id },
    files: ["scripts/scrapper.js"]
  }

  chrome.scripting.executeScript(options)
})