import { useState, useRef, useEffect } from 'react';
import pride from './assets/artworks-OVC7PXRoH1iR-0-t500x500.jpg';
import graduation from './assets/ab67616d0000b273675561f3defd1d5a551936a8.jpg';
import flashingLights from './assets/Flashing Lights.mp3';
import prideSong from './assets/PRIDE..mp3';
import './App.css';

function App() {
  class Song {
    constructor(title, artist, duration, cover, song) {
      this.title = title;
      this.artist = artist;
      this.cover = cover;
      this.song = song;
      this.duration= duration;
    }
  }

  const songs = [
    new Song("Pride", "Kdot", 275, pride, prideSong),
    new Song("Flashing Lights" , "Ye" , 237, graduation, flashingLights)
  ];


  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const [time, settime] = useState(`0:00`);

  const prevSong = () => {
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    }
    else {
      if (index !== 0) {
        setIndex(index - 1);
        setPlaying(true);
      }
      else {
        setIndex(songs.length - 1);
        setPlaying(true);
      }
    }
  };
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      settime(formattedTime);
    };

    settime("0:00");

    audio.addEventListener("timeupdate", updateTime);


  }, [index]);



  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration * 100);
      }
    };
    if (audio) {
      audio.addEventListener('timeupdate', updateProgress)
    };
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateProgress);
      }
    }

  }, [index])


  const stopSong = () => {
    if (audioRef.current) {
      if (playing === false) {
        audioRef.current.play();
        setPlaying(true);
      } else {
        audioRef.current.pause();
        setPlaying(false);
      }
    }
  };


  const nextSong = () => {
    if (index !== songs.length - 1) {
      setIndex(index + 1);
      setPlaying(true);
    }
    else {
      setIndex(0);
      setPlaying(true);
    }
  };

  const handleSong = () => {
    if (index !== songs.length - 1) {
      setIndex(index + 1);
    }
    else {
      setIndex(0);
    }
  };

  return (
    <div className='song'>
      <div className='top'>
        <img src={songs[index].cover} alt={songs[index].title} />
      </div>
      <div className="bottom">
        <h1>{songs[index].title}</h1>
        <h3>{songs[index].artist}</h3>
        <audio ref={audioRef} src={songs[index].song} autoPlay onEnded={handleSong}></audio>
        <div className="progress-bar" >
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <div className='time'>
          <h4>{time}</h4>
          <h4>{Math.floor(songs[index].duration / 60)}:{songs[index].duration % 60}</h4>
        </div>
        <div className='buttons'>
          <button className='left' onClick={prevSong}>⏪</button>
          <button className='stop' onClick={stopSong}>{playing ? 'Pause' : 'Play'}</button>
          <button className='right' onClick={nextSong}>⏩</button>
        </div>
      </div>
    </div>
  );
}

export default App; 
