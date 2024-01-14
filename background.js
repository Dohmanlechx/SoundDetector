chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.includes("") && changeInfo.audible) {
      chrome.notifications.create(
        {
            title: "Sound detected!",
            message: "",
            type: "basic"
        }
      );
    }
});