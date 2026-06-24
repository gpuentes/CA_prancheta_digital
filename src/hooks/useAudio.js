// Audio and haptic alert hooks extracted from legacy main.js
export function playBeep() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(660, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);

    setTimeout(() => {
      const audioCtx2 = new AudioContextClass();
      const osc2 = audioCtx2.createOscillator();
      const gain2 = audioCtx2.createGain();
      osc2.connect(gain2);
      gain2.connect(audioCtx2.destination);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, audioCtx2.currentTime);
      gain2.gain.setValueAtTime(0.05, audioCtx2.currentTime);
      osc2.start();
      osc2.stop(audioCtx2.currentTime + 0.2);
    }, 180);
  } catch (e) {
    console.warn('Audio blocked by browser permissions', e);
  }
}

export function triggerVibrate() {
  if (navigator.vibrate) {
    navigator.vibrate([150, 80, 150]);
  }
}

export function triggerVisualFlash(selector = '.content-area') {
  const container = document.querySelector(selector);
  if (container) {
    container.classList.add('alert-flashing');
    setTimeout(() => {
      container.classList.remove('alert-flashing');
    }, 2500);
  }
}

export function triggerAllAlerts() {
  playBeep();
  triggerVibrate();
  triggerVisualFlash();
}
