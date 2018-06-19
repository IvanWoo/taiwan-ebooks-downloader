chrome.browserAction.onClicked.addListener(activeTab => {
    let newURL = 'http://taiwanebook.ncl.edu.tw';
    chrome.tabs.create({ url: newURL });
});