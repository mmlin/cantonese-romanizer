chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, { file: "jquery.min.js" });
    chrome.tabs.executeScript(null, { file: "charmap.js" });
    chrome.tabs.executeScript(null, { file: "all.js" });
});