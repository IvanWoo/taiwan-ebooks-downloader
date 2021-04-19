chrome.browserAction.onClicked.addListener((activeTab) => {
  const newURL = "http://taiwanebook.ncl.edu.tw";
  chrome.tabs.create({ url: newURL });
});

// https://developer.chrome.com/extensions/webRequest
// https://stackoverflow.com/a/59296870
chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const newHeaders = [
      {
        name: "Referer",
        value: "https://taiwanebook.ncl.edu.tw",
      },
      {
        name: "credentials",
        value: "include",
      },
    ];
    const requestHeaders = details.requestHeaders.concat(newHeaders);
    return { requestHeaders };
  },
  // filters
  {
    urls: ["https://taiwanebook.ncl.edu.tw/ebkFiles/*"],
  },
  // extraInfoSpec
  ["blocking", "requestHeaders", "extraHeaders"]
);
