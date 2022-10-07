import { useState, useRef, useEffect } from 'react'
import styles from '@/styles/MusicPlayer.module.scss'
import { getNextId, getPreviousId, getSongInfo } from '@/constants/songList'
import Icons from '../Icons/Icons'
import { db } from '@/constants/firebaseConfig'

// import {
//   getDoc,
//   setDoc,
//   doc
// } from 'firebase/firestore'

export default function MusicList({ songId, setSongId }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooped, setIsLooped] = useState(false)
  const [duration, setDuration] = useState('00:00')
  const [isExpanded, setIsExpanded] = useState(false)
  const [edit, setEdit] = useState(false)
  const [newLyrics, setNewLyrics] = useState('...')
  const [startX, setStartX] = useState()

  const audioRef = useRef()
  const sourceRef = useRef()
  const pwRef = useRef()
  const pbRef = useRef()
  const lyricRef = useRef()

  useEffect(() => {
    if (songId) {
      sourceRef.current.src = getSongInfo(songId).file
      audioRef.current.load()
      audioRef.current.play()
      setIsPlaying(true)
      db().collection('lyrics').doc(songId).get().then(doc => {
        setNewLyrics(doc.data()?.text || '...')
      })
    }
  }, [songId])

  const play = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }

  const onPause = () => {
    if (!isPlaying) {
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
  }

  const startAudio = () => {
    setIsPlaying(true)
  }

  const hasEnded = () => {
    if (!isLooped) {
      audioRef.current.currentTime = 0;
      setSongId(getNextId(songId))
    }
  }

  const prev = () => {
    if (audioRef.current.currentTime >= 3) {
      audioRef.current.currentTime = 0
    } else {
      setSongId(getPreviousId(songId))
    }
  }

  const next = () => {
    audioRef.current.currentTime = 0;
    setSongId(getNextId(songId))
  }

  const onProgress = () => {
    const elDuration = audioRef.current.duration
    const currentTime = audioRef.current.currentTime
    const progress = 100 / elDuration * currentTime
    
    setDuration(calculateCurrentValue(currentTime))
    pbRef.current.style.width = `${progress}%`
  }
  
  function calculateCurrentValue(currentTime) {
    const current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);
    return current_time;
  }

  const clickProgress = (e) => {
    let bounds = pwRef.current.getBoundingClientRect();
    let x = e.clientX - bounds.left;

    const ratio = 100 / bounds.width * x;
    audioRef.current.currentTime = audioRef.current.duration / 100 * ratio
  }

  const touchStart = (e) => {
    audioRef.current.pause()
    let touchObj = e.changedTouches[0];
    setStartX(parseInt(touchObj.clientX))
  }

  const touchEnd = (e) => {
    let touchObj = e.changedTouches[0];
    let bounding = pwRef.current.getBoundingClientRect()
    let distance = parseInt(touchObj.clientX)-startX
    let final = startX - bounding.x + distance

    const ratio = 100 / bounding.width * final;
    audioRef.current.currentTime = audioRef.current.duration / 100 * ratio
    setTimeout(() => {
      audioRef.current.play()
    }, 500)
  }

  const toggleInfo = () => {
    setIsExpanded(prev => !prev)
  }

  const toggleEdit = () => {
    if (!edit) {
      setEdit(true)
      setTimeout(() => {
        lyricRef.current.focus()
        lyricRef.current.setSelectionRange(lyricRef.current.value.length,lyricRef.current.value.length)
      }, 100)
    }
  }

  const saveNewLyrics = () => {
    db().collection('lyrics').doc(songId).set({
      text: lyricRef.current.value
    }).then(() => {
      setNewLyrics(lyricRef.current.value)
      setEdit(false)
    })
  }

  return (
    <>
      {
        isExpanded &&
          <div className={styles.info}>
            <div className={styles.infoInner}>
              <div className={styles.infoHead}>
                <div className={styles.infoTitle} onClick={toggleInfo}>
                  <Icons name="back" size="25" />
                  {getSongInfo(songId).title}
                </div>
                <div className={styles.download}>
                  <a href={getSongInfo(songId).file} download>
                    <Icons name="download" size="20" />
                  </a>
                </div>
              </div>
              <div className={styles.lyrics}>
                <div className={styles.metaInfo}>
                  <div><Icons name="date" size="20" />{getSongInfo(songId).date}</div>
                  <div><Icons name="clock" size="20" />{getSongInfo(songId).duration}</div>
                  <div><Icons name="metronome" size="20" viewBox="24" />{getSongInfo(songId).bpm}</div>
                  <div><Icons name="note" size="20" />{getSongInfo(songId).note}</div>
                </div>
                {newLyrics ?
                  <div>
                    <div className={styles.lyricHeader}>
                      <h4>Lyrics</h4>
                      {
                        !edit &&
                        <div className={styles.editButton} onClick={toggleEdit}>
                          <Icons name="edit" size="20" />
                        </div>
                      }
                    </div>
                    {!edit ?
                      <div>
                        {newLyrics}
                      </div> :
                      <div className={styles.editWrapper}>
                        <textarea ref={lyricRef} className={styles.textarea}>
                          {newLyrics}
                        </textarea>
                        <div className={styles.editButtons}>
                          <button className={`${styles.button} ${styles.cancel}`} onClick={() => setEdit(false)}>Cancel</button>
                          <button className={`${styles.button} ${styles.save}`} onClick={saveNewLyrics}>Save</button>
                        </div>
                      </div>
                    }
                  </div> : 
                  ''
                }
              </div>
            </div>
          </div>
      }
      <div className={styles.player}>
        <div className={styles.innerPlayer}>
          <audio
            ref={audioRef}
            onTimeUpdate={onProgress}
            loop={isLooped}
            onPause={onPause}
            onPlay={startAudio}
            preload="auto"
            onEnded={hasEnded}
          >
            <source ref={sourceRef} src={getSongInfo(songId).file} type="audio/mpeg" />
          </audio>
          <div className={styles.infoWrapper}>
            <div className={styles.playActions}>
              <div className={styles.actionButton} onClick={prev}>
                <Icons name="prev" size="30" />
              </div>
              <div className={styles.actionButton} onClick={play}>
                <Icons name={isPlaying ? 'pause' : 'play'} size="40" />
              </div>
              <div className={styles.actionButton} onClick={next}>
                <Icons name="next" size="30" />
              </div>
            </div>
            <div className={styles.songInfo}>
              <div className={`${styles.songName} ${ isExpanded ? styles.expanded : '' }`} onClick={toggleInfo}>
                {getSongInfo(songId).title}
                <Icons name="expand" size="22" />
              </div>
            </div>
          </div>
          <div className={styles.durationWrapper}>
            <div className={`${styles.loop} ${isLooped ? styles.active : ''}`} onClick={() => setIsLooped(prev => !prev)}>
              <Icons name="replayOff" size="15" />
            </div>
            <div className={styles.progressWrapper}>
              <div
                id="progressWrapper"
                ref={pwRef}
                onClick={clickProgress}
                onTouchStart={touchStart}
                onTouchMove={touchEnd}
                onTouchEnd={touchEnd}
                className={styles.progressbar}
                >
                <div
                  id="progress"
                  ref={pbRef}
                  className={styles.progress}
                  />
              </div>
              <div className={styles.duration}>{duration ? duration : ''}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
