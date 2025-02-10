  import { useState, useRef, useEffect } from 'react';
  import pride from './assets/artworks-OVC7PXRoH1iR-0-t500x500.jpg';
  import graduation from './assets/ab67616d0000b273675561f3defd1d5a551936a8.jpg';
  import flashingLights from './assets/Flashing Lights.mp3';
  import prideSong from './assets/PRIDE..mp3';
  import './App.css';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faPause , faPlay , faRepeat, faCaretLeft , faCaretRight } from '@fortawesome/free-solid-svg-icons'

  function App() {
    class Song {
      constructor(title, artist, duration, cover, song) {
        this.title = title;
        this.artist = artist;
        this.cover = cover;
        this.song = song;
        this.duration = duration;
      }
    }

    const songs = [
      new Song("Pride", "Kdot", 275, pride, prideSong),
      new Song("Flashing Lights", "Ye", 237, graduation, flashingLights)
    ];


    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);
    const [repeat, setrepeat] = useState(false);
    const [time, settime] = useState(`0:00`);
    const songbar = useRef();

    const prevSong = () => {
      if(repeat===false){
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
    }

    else{
      audioRef.current.currentTime=0;
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


    const chose = (e) => {
      if (songbar.current) {
        const rect = songbar.current.getBoundingClientRect();
        const absoluteX = rect.left;  // Left position of the progress bar
        const width = rect.width; // Total width of the progress bar
        const cursorX = e.pageX - absoluteX; // Cursor position relative to the bar
    
        const fraction = cursorX / width; 
        audioRef.current.currentTime=fraction*audioRef.current.duration;
        console.log(fraction, cursorX, width);
      }
    };

    const nextSong = () => {
      if(repeat===false){
      if (index !== songs.length - 1) {
        setIndex(index + 1);
        setPlaying(true);
      }
      else {
        setIndex(0);
        setPlaying(true);
      }
    }
    else{
      audioRef.current.currentTime=0;
    }
  };

    const handleSong = () => {
      if(repeat===false){
      if (index !== songs.length - 1) {
        setIndex(index + 1);
      }
      else {
        setIndex(0);
      }
    }
    else{
      audioRef.current.currentTime=0;
      setPlaying(true);
    }
    };

    const rep = ()=> {
      if(repeat===true){
        setrepeat(false)
      }
      else{
      setrepeat(true)
    }
    }

    return (
      <div className='song'>
        <div className='top'>
          <img src={songs[index].cover} alt={songs[index].title} />
        </div>
        <div className="bottom">
          <h1>{songs[index].title}</h1>         
          <div className='b1'><h3>{songs[index].artist}</h3> <h3 className='repeat' onClick={rep} style={{ color: repeat ? 'green' : 'black' }}><FontAwesomeIcon icon = {faRepeat}/></h3></div>
          <audio ref={audioRef} src={songs[index].song} autoPlay onEnded={handleSong}></audio>
          <div className="progress-bar"  ref={songbar} onClick={(e) => chose(e)} >
            <div className="progress"  style={{ width: `${progress}%` }}></div>
          </div>
          <div className='time'>
            <h4>{time}</h4>
            <h4>{Math.floor(songs[index].duration / 60)}:{songs[index].duration % 60}</h4>
          </div>
          <div className='buttons'>
            <button className='left' onClick={prevSong}><FontAwesomeIcon icon={faCaretLeft}/></button>
            <button className='stop' onClick={stopSong}>{playing ? <FontAwesomeIcon icon={faPause}/> : <FontAwesomeIcon icon={faPlay}/>}</button>
            <button className='right' onClick={nextSong}><FontAwesomeIcon icon={faCaretRight}/></button>
          </div>
        </div>
      </div>
    );
  }

  export default App; 
