chrome.browserAction.onClicked.addListener(function (activeTab) {
    var newURL = "http://taiwanebook.ncl.edu.tw";
    chrome.tabs.create({ url: newURL });
});