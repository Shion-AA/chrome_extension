async function runScriptIfMatch(scriptFile, urlPattern) {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  if (!tab?.id || !tab.url.match(urlPattern)) return;

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: [scriptFile]
  });
}

document.getElementById('k').addEventListener('click', () => {
  runScriptIfMatch('content/k.js', /^https:\/\/en\.wikipedia\.org/);
});

document.getElementById('k_ent').addEventListener('click', () => {
  runScriptIfMatch('content/k_ent.js', /^https:\/\/example\.com\/pageB/);
});

document.getElementById('test').addEventListener('click', () => {
  runScriptIfMatch('content/test.js', /^https:\/\/robloxislands\.fandom\.com/);
});