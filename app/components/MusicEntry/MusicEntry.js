import { useState } from 'react';
import Icons from '../Icons/Icons';
import styles from '../../../styles/MusicList.module.css'

export default function MusicEntry({ entry }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const playPause = () => {
    const el = document.getElementById(`audio-${entry.id}`)
    
    if (isPlaying) {
      el.pause()
    } else {
      document.querySelectorAll('audio').forEach(el => el.pause());
      el.play()
      setIsPlaying(true)
    }
    
  }

  const onPause = () => {
    setIsPlaying(false)
  }

  return (
    <div className={styles.musicEntry}>
      <div className={styles.playIcon} onClick={playPause}>
        <Icons name={isPlaying ? 'pause' : 'play'} />
      </div>
      <div className={styles.song}>
        <div>{entry.title}</div>
        <audio id={`audio-${entry.id}`} onPause={onPause}>
          <source src={entry.file} type="audio/mpeg" />
        </audio>
        <div className={styles.duration}></div>
      </div>
    </div>
  )
}
