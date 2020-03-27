chrome.browserAction.onClicked.addListener((activeTab) => {
    let newURL = "http://taiwanebook.ncl.edu.tw";
    chrome.tabs.create({ url: newURL });
});

// https://developer.chrome.com/extensions/webRequest
// https://stackoverflow.com/a/59296870
chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
        const newHeader = {
            name: "Referer",
            value: "https://taiwanebook.ncl.edu.tw"
        };
        const requestHeaders = details.requestHeaders.concat(newHeader);
        return { requestHeaders };
    },
    // filters
    {
        urls: ["https://taiwanebook.ncl.edu.tw/ebkFiles/*"]
    },
    // extraInfoSpec
    ["blocking", "requestHeaders", "extraHeaders"]
);
