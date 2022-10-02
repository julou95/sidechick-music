import { useState } from 'react';
import styles from '../../../styles/MusicList.module.css'

export default function MusicEntry({ entry }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const playPause = () => {
    const el = document.getElementById(`audio-${entry.id}`)
    console.log('LJ - element', el);
    
    if (isPlaying) {
      console.log('LJ - ', 'pause');
      el.pause()
      setIsPlaying(false)
    } else { 
      document.querySelectorAll('audio').forEach(el => el.pause());
      console.log('LJ - ', 'play');
      el.play()
      setIsPlaying(true)
    }
    
  }

  return (
    <div className={styles.musicEntry}>
      <div className={styles.playIcon} onClick={playPause}></div>
      <div className={styles.song}>
        <div>{entry.title} - {isPlaying && 'true'}</div>
        <audio id={`audio-${entry.id}`}>
          <source src={entry.file} type="audio/mpeg" />
        </audio>
        <div className={styles.duration}></div>
      </div>
    </div>
  )
}
