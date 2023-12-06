let fax: HTMLElement | null = null;
let tone: HTMLAudioElement;

window.addEventListener("load", () => {
  chrome.runtime.sendMessage({ message: "getTone" }, (response) => {
    let toneNumber: Number = response.value;
    if (!toneNumber) {
      toneNumber = 0;
    }
    let url = chrome.runtime.getURL(`./audio/not${toneNumber}.mp3`);
    tone = new Audio(url);
  });

  let intervalId = setInterval(() => {
    fax = document.getElementById("emailWorkspace");
    if (fax) {
      clearInterval(intervalId);
      beginObserving();
    }
  }, 1000);
});

function beginObserving() {
  let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName == "class" && fax!.className == "workspace") {
        tone.play().catch((err) => {
          console.error(err);
        });
      }
    });
  });

  observer.observe(fax!, { attributes: true });
}
