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
  restoreOptions()
    .then((url) => {
      console.log("url", url);
      const urlsFromOption = url.split(",");

      let foundUrl = null;
      for (let url of urlsFromOption) {
        if (tab.url.includes(url)) {
          foundUrl = url;
          break;
        }
      }

      if (foundUrl != null && changeInfo.audible) {
        chrome.notifications.create({
          title: "Sound detected!",
          message: `A sound was detected on ${foundUrl}.`,
          type: "basic",
          iconUrl: "icon.png",
        });
      }
    })
    .catch((error) => {
      console.error("Error retrieving the URL:", error);
    });
});
