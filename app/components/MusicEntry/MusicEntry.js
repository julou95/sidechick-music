import { useState } from 'react';
import Icons from '../Icons/Icons';
import styles from '../../../styles/MusicList.module.css'

export default function MusicEntry({ entry }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState('00:00')
  const [isLooped, setIsLooped] = useState(false)


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
    const el = document.getElementById(`audio-${entry.id}`)
    
    if (!isPlaying) {
      el.currentTime = 0
    }
    setIsPlaying(false)
  }

  const onProgress = (e) => {
    const pb = document.getElementById(`progress-${entry.id}`)
    const el = document.getElementById(`audio-${entry.id}`)
    const elDuration = el.duration
    const currentTime = el.currentTime
    const progress = 100 / elDuration * currentTime

    setDuration(calculateCurrentValue(currentTime))
    pb.style.width = `${progress}%`
  }

  function calculateCurrentValue(currentTime) {
    const current_minute = parseInt(currentTime / 60) % 60,
      current_seconds_long = currentTime % 60,
      current_seconds = current_seconds_long.toFixed(),
      current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);
    return current_time;
  }

  const reset = () => {
    const el = document.getElementById(`audio-${entry.id}`)
    el.currentTime = 0
  }
  const setLoop = () => {
    const el = document.getElementById(`audio-${entry.id}`)
    el.loop = !el.loop
    setIsLooped(prev => !prev)
  }

  const clickProgress = (e) => {
    const el = document.getElementById(`audio-${entry.id}`)
    let bounds = document.getElementById(`progressWrapper-${entry.id}`).getBoundingClientRect();
    let x = e.clientX - bounds.left;
    const ratio = 100 / bounds.width * x;
    el.currentTime = el.duration / 100 * ratio
  }

  return (
    <div className={styles.musicEntry}>
      <div className={`${styles.playIcon} ${isPlaying ? styles.active : ''}`} onClick={playPause}>
        <Icons name={isPlaying ? 'pause' : 'play'} />
      </div>
      <div className={styles.song}>
        <div className={styles.titleHead}>
          <div>{entry.title}</div>
          <div className={styles.iconList}>
            <Icons
              name="reset"
              size="26"
              clickAction={reset}
            />
            <Icons
              name={isLooped ? 'replayOn' : 'replayOff'}
              size="26"
              clickAction={setLoop}
              active={isLooped}
            />
          </div>
        </div>
        <audio id={`audio-${entry.id}`} onTimeUpdate={onProgress} onPause={onPause} preload="auto">
          <source src={entry.file} type="audio/mpeg" />
        </audio>
        <div>

        <div className={styles.duration}>
          <div>{duration ? duration : ''}</div>
          <div>{entry.duration}</div>
        </div>
        <div id={`progressWrapper-${entry.id}`} onClick={clickProgress} className={styles.progressbar}>
          <div id={`progress-${entry.id}`} className={styles.progress}></div>
        </div>
        </div>
      </div>
    </div>
  )
}
