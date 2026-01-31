const openedAt = Date.now();

function safeSend(message) {
  chrome.runtime.sendMessage(message).catch(() => {
    // Extension was reloaded or unavailable — ignore
  });
}

safeSend({
  type: "PAGE_OPENED",
  url: location.href,
  openedAt
});

window.addEventListener("beforeunload", () => {
  safeSend({
    type: "PAGE_CLOSED",
    url: location.href,
    openedAt,
    closedAt: Date.now()
  });
});
