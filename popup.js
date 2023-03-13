
// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//   var currentTabId = tabs[0].id;
//   chrome.scripting
//     .executeScript({
//       target : {tabId : currentTabId},
//       files : [ "markdown.js" ],
//     })
//     .then(() => console.log("injected script file"));
// });

async function injectScriptIntoActiveTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["markdown.js"],
    });
    console.log("Script injected successfully!");
  } catch (error) {
    console.error(error);
  }
}

injectScriptIntoActiveTab();
