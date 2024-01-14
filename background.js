function restoreOptions() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get({ urlText: "" }, (items) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError));
      } else {
        resolve(items.urlText);
      }
    });
  });
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  restoreOptions().then((url) => {
    console.log('url', url);

    if (tab.url.includes(url) && changeInfo.audible) {
      chrome.notifications.create({
        title: "Sound detected!",
        message: "Message",
        type: "basic",
        iconUrl: "icon.png",
      });
    }
  }).catch((error) => {
    console.error('Error retrieving the URL:', error);
  });
});
