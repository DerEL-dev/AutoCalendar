document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("openPage").addEventListener("click", () => {
    const url = chrome.runtime.getURL("calendar.html");
    chrome.tabs.create({ url });
  });
});
