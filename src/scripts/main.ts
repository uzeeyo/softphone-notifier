let fax: HTMLElement | null = null;
let tone: HTMLAudioElement;

window.addEventListener("load", () => {
  chrome.runtime.sendMessage({ message: "getTone" }, (response) => {
    tone = response.value;
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
      if (
        mutation.attributeName === "class" &&
        fax!.className !== "workspace hidden"
      ) {
        tone.play();
      }
    });
  });

  observer.observe(fax!);
}
