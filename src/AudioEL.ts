let sound = true;
const audio = new Audio("baraban.mp3");

export function AudioEL(element: HTMLButtonElement) {
  element.addEventListener("click", () => {
    sound = !sound;
    element.textContent = sound ? "Sound" : "No Sound";

    if (!sound) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}

export function AudioPlay() {
  if (!sound || !audio.paused) return;
  audio.currentTime = 0;
  audio.play();
}

export function AudioPause() {
  audio.pause();
  audio.currentTime = 0;
}
