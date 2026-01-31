let current = null;

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, (tab) => {
    endSession();
    startSession(tab);
  });
});

function startSession(tab) {
  if (!tab.url) return;

  current = {
    url: tab.url,
    title: tab.title,
    start: Date.now()
  };

  console.log("Start:", current);
}

function endSession() {
  if (!current) return;

  const duration = Date.now() - current.start;
  console.log("End:", current.url, duration);

  current = null;
}
