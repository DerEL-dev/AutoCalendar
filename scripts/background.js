chrome.runtime.onMessage.addListener((message, sender) => {
  if (!sender.tab) return;

  switch (message.type) {
    case "PAGE_OPENED":
      console.log("OPEN:", {
        tabId: sender.tab.id,
        url: message.url,
        openedAt: message.openedAt
      });
      break;

    case "PAGE_CLOSED":
      console.log("CLOSE:", {
        tabId: sender.tab.id,
        url: message.url,
        openedAt: message.openedAt,
        closedAt: message.closedAt,
        durationMs: message.closedAt - message.openedAt
      });
      break;
  }
});
