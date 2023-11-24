window.addEventListener("DOMContentLoaded", async () => {
  let selectionBox = document.getElementById("toneSelector");
  let response = await chrome.runtime.sendMessage({ message: "getTone" });

  selectionBox.value = response.tone;

  selectionBox.addEventListener("change", (event) => {
    setSound(event.target.value);
  });
});

function setSound(option) {
  chrome.runtime.sendMessage({
    message: "setTone",
    value: option,
  });
}