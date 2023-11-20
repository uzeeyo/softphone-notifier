chrome.runtime.onMessage.addListener((message, sender, sendRes) => {
  if (message.message === "setTone") {
    setTone(message.value);
    sendRes({});
  } else if (message.message === "getTone") {
    getSelectedTone().then((res) => {
      console.log(res);
      sendRes({ tone: res });
    });
    return true;
  }
});

async function getSelectedTone(): Promise<number> {
  let res = await chrome.storage.local.get("savedSound");

  return parseInt(res.savedSound);
}

function setTone(option: number) {
  chrome.storage.local.set({ savedSound: option });
}
