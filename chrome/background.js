chrome.action.onClicked.addListener((tab) => {
  const newURL = "https://taiwanebook.ncl.edu.tw";
  chrome.tabs.create({ url: newURL });
});
