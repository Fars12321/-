class SoundManager {
  private audioCtx: AudioContext | null = null;
  private ambientSource: AudioBufferSourceNode | null = null;
  private ambientGain: GainNode | null = null;

  public init() {
    if (!this.audioCtx) {
      try {
        this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.warn("AudioContext init failed", e);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playBeep(frequency = 440, duration = 0.1, type: OscillatorType = 'sine', volume = 0.5) {
    try {
      this.init();
      if (!this.audioCtx || this.audioCtx.state === 'suspended') return;

      const oscillator = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

      gainNode.gain.setValueAtTime(volume, this.audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      oscillator.start();
      oscillator.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  }

  playTapSound(style: string = 'default') {
    switch (style) {
      case 'wood':
        this.playBeep(300, 0.05, 'square', 0.1);
        break;
      case 'click':
        this.playBeep(800, 0.02, 'triangle', 0.1);
        break;
      case 'soft':
        this.playBeep(300, 0.1, 'sine', 0.3);
        break;
      default:
        this.playBeep(450, 0.08, 'sine', 0.2);
    }
  }

  playMilestoneSound() {
    try {
      this.init();
      if (!this.audioCtx || this.audioCtx.state === 'suspended') return;
      const now = this.audioCtx.currentTime;
      
      const playFreq = (f: number, startTime: number) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, startTime);
        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.5);
      };

      playFreq(523.25, now); // C5
      playFreq(659.25, now + 0.1); // E5
      playFreq(783.99, now + 0.2); // G5
    } catch (e) {
      console.warn("Milestone sound failed", e);
    }
  }

  playGoalReachedSound() {
    try {
      this.init();
      if (!this.audioCtx || this.audioCtx.state === 'suspended') return;
      const now = this.audioCtx.currentTime;
      
      const playFreq = (f: number, startTime: number, duration: number) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, startTime);
        gain.gain.setValueAtTime(0.4, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      playFreq(523.25, now, 0.6); // C5
      playFreq(659.25, now + 0.1, 0.6); // E5
      playFreq(783.99, now + 0.2, 0.8); // G5
      playFreq(1046.50, now + 0.3, 1.2); // C6
    } catch (e) {
      console.warn("Goal reached sound failed", e);
    }
  }

  playSessionCompletedSound() {
    try {
      this.init();
      if (!this.audioCtx || this.audioCtx.state === 'suspended') return;
      const now = this.audioCtx.currentTime;
      const playFreq = (f: number, startTime: number, duration: number) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, startTime);
        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      playFreq(440, now, 0.4); // A4
      playFreq(554.37, now + 0.2, 0.4); // C#5
      playFreq(659.25, now + 0.4, 0.8); // E5
    } catch (e) {
      console.warn("Session completed sound failed", e);
    }
  }

  startAmbient(type: string = 'none') {
    this.stopAmbient();
    if (type === 'none') return;

    try {
      this.init();
      if (!this.audioCtx) return;

      const bufferSize = this.audioCtx.sampleRate * 2; 
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = buffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        let white = Math.random() * 2 - 1;
        if (type === 'space') {
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 4.0;
        } else if (type === 'nature') {
          output[i] = (lastOut + (0.05 * white)) / 1.05;
          lastOut = output[i];
          output[i] *= 1.5;
        } else {
           output[i] = (lastOut + (0.03 * white)) / 1.03;
           lastOut = output[i];
           output[i] *= 3.0;
        }
      }

      this.ambientSource = this.audioCtx.createBufferSource();
      this.ambientSource.buffer = buffer;
      this.ambientSource.loop = true;

      this.ambientGain = this.audioCtx.createGain();
      this.ambientGain.gain.value = type === 'space' ? 0.05 : 0.02;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = type === 'space' ? 400 : 800;

      this.ambientSource.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.audioCtx.destination);

      this.ambientSource.start();

    } catch (e) {
      console.warn("Ambient sound failed", e);
    }
  }

  stopAmbient() {
    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
        this.ambientSource.disconnect();
        this.ambientSource = null;
      } catch (e) {}
    }
    if (this.ambientGain) {
      try {
        this.ambientGain.disconnect();
        this.ambientGain = null;
      } catch (e) {}
    }
  }
}

export const soundManager = new SoundManager();
