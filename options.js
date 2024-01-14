const saveOptions = () => {
  const urlText = document.getElementById('url_text').value;

  chrome.storage.sync.set(
    { urlText: urlText },
    () => {
      const status = document.getElementById('status');
      status.textContent = 'Saved!';
      setTimeout(() => { status.textContent = ''}, 2000);
    }
  );
};

const restoreOptions = () => {
  chrome.storage.sync.get(
    { urlText: '' },
    (items) => {
      document.getElementById('url_text').value = items.urlText;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);