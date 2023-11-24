let fax: HTMLElement | null = null;
let tone: HTMLAudioElement;

window.addEventListener("load", () => {
  chrome.runtime.sendMessage({ message: "getTone" }, (response) => {
    let url = chrome.runtime.getURL(`./audio/not${response.value}.mp3`);
    tone = new Audio(url);
    console.log(`Loaded selected tone: ${url}`);
  });

  let intervalId = setInterval(() => {
    fax = document.getElementById("emailWorkspace");
    if (fax) {
      clearInterval(intervalId);
      beginObserving();
      console.log("Waiting for fax to open...");
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

        console.log("Fax received!");
      }
    });
  });

  observer.observe(fax!, { attributes: true });
}
