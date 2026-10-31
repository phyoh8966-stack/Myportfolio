import { useRef, useState } from 'react';
import { Music2, Pause, Play } from 'lucide-react';

export default function MusicPlayer({ music }) {
  const audioRef = useRef(null);
  const ambientRef = useRef(null);
  const ambientIntervalRef = useRef(null);
  const [mode, setMode] = useState('audio');
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');

  async function startAmbientMusic() {
    if (!window.AudioContext) {
      throw new Error('Web Audio is not available in this browser.');
    }

    const context = new window.AudioContext();
    await context.resume();

    const master = context.createGain();
    master.gain.value = 0.0001;
    master.connect(context.destination);

    const frequencies = [261.63, 329.63, 392, 493.88];
    const voices = frequencies.map((frequency) => {
      const oscillator = context.createOscillator();
      const volume = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      volume.gain.value = 0.12;
      oscillator.connect(volume);
      volume.connect(master);
      oscillator.start();
      return oscillator;
    });

    const progression = [
      [261.63, 329.63, 392, 493.88],
      [220, 261.63, 329.63, 392],
      [174.61, 220, 261.63, 329.63],
      [196, 246.94, 293.66, 392],
    ];
    let chordIndex = 0;
    master.gain.setTargetAtTime(0.2, context.currentTime, 0.8);
    ambientRef.current = { context, master, voices };
    ambientIntervalRef.current = window.setInterval(() => {
      chordIndex = (chordIndex + 1) % progression.length;
      voices.forEach((voice, index) => {
        voice.frequency.setTargetAtTime(progression[chordIndex][index], context.currentTime, 1.2);
      });
    }, 4800);
  }

  function stopAmbientMusic() {
    window.clearInterval(ambientIntervalRef.current);
    const ambient = ambientRef.current;
    if (!ambient) return;

    ambient.master.gain.setTargetAtTime(0.0001, ambient.context.currentTime, 0.35);
    window.setTimeout(() => {
      ambient.context.close();
    }, 1600);
    ambientRef.current = null;
  }

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      if (mode === 'ambient') stopAmbientMusic();
      setIsPlaying(false);
      setError('');
      return;
    }

    try {
      await audio.play();
      setMode('audio');
      setIsPlaying(true);
      setError('');
    } catch {
      try {
        await startAmbientMusic();
        setMode('ambient');
        setIsPlaying(true);
        setError('Playing a soft instrumental while the music stream is unavailable.');
      } catch {
        setIsPlaying(false);
        setError('Music could not be played. Check your browser audio settings and try again.');
      }
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="none"
        onEnded={() => setIsPlaying(false)}
      />
      <button
        className={`music-button${isPlaying ? ' music-button--playing' : ''}`}
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        aria-pressed={isPlaying}
        title={music.label}
      >
        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        <Music2 className="music-button__note" size={14} />
      </button>
      {error && <span className="music-error" role="status">{error}</span>}
    </>
  );
}
