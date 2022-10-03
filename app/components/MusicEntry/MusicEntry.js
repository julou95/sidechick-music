import { useState } from 'react';
import Icons from '../Icons/Icons';
import styles from '../../../styles/MusicList.module.scss'

export default function MusicEntry({ entry }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState('00:00')
  const [isLooped, setIsLooped] = useState(false)
  const [showMore, setShowMore] = useState(false)


  const playPause = () => {
    const el = document.getElementById(`audio-${entry.id}`)
    if (isPlaying) {
      el.pause()
    } else {
      document.querySelectorAll('audio').forEach(el => el.pause());
      el.play()
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

  const copyLyrics = () => {
    navigator.clipboard.writeText(entry.lyrics);
  }

  const hasEnded = (e) => {
    if (!isLooped) {
      e.target.currentTime = 0;
      const el = document.getElementById(`audio-${entry.id+1}`)
      if (el) {
        el.play()
      } else {
        document.getElementById('audio-0').play()
      }
    }
  }

  const startAudio = () => {
    setIsPlaying(true)
  }

  return (
    <div className={`${styles.musicEntry} ${isPlaying ? styles.active : ''}`}>
      <div className={styles.mainEntry}>
        <div className={styles.playIcon} onClick={playPause}>
          <Icons name={isPlaying ? 'pause' : 'play'} />
        </div>
        <div className={styles.song}>
          <div className={styles.titleHead}>
            <div onClick={() => setShowMore(prev => !prev)} className={styles.songTitle}>{entry.title}</div>
            <div className={styles.download}>
              <a href={entry.file} target="_blank">
                <Icons
                  name="download"
                  size="26"
                />
              </a>
            </div>
          </div>
          <audio id={`audio-${entry.id}`} onTimeUpdate={onProgress} onPause={onPause} onPlay={startAudio} preload="auto" onEnded={hasEnded}>
            <source src={`/audio${entry.file}`} type="audio/mpeg" />
          </audio>
          <div className={styles.durationWrapper}>
            <div className={styles.reset}>
              <Icons
                name="reset"
                size="28"
                clickAction={reset}
              />
            </div>
            <div className={styles.progressWrapper}>
              <div className={styles.duration}>
                <div>{duration ? duration : ''}</div>
                <div>{entry.duration}</div>
              </div>
              <div id={`progressWrapper-${entry.id}`} onClick={clickProgress} className={`${styles.progressbar} ${isPlaying ? styles.activeProgressbar : ''}`}>
                <div id={`progress-${entry.id}`} className={`${styles.progress} ${isPlaying ? styles.activeProgress : ''}`}></div>
              </div>
            </div>
            <div className={`${styles.repeat} ${isLooped ? styles.loopActive : ''}`}>
              <Icons
                name="replayOff"
                size="24"
                clickAction={setLoop}
                // active={isLooped}
              />
            </div>
          </div>
        </div>
      </div>
      {
        entry.lyrics &&
          <div id={`lyrics-${entry.id}`} className={`${styles.more} ${showMore ? styles.show : ''}`}>
            <div className={styles.innerWrapper}>
              {entry.lyrics}
              <div className={styles.copyLyrics} onClick={copyLyrics}>
                <Icons name="copy" size="26" />
              </div>
            </div>
          </div>
      }
    </div>
  )
}
