import { useState, useRef } from 'react';
import Icons from '@/components/Icons/Icons';
import styles from '@/styles/MusicList.module.scss'
import { getNextId } from '@/constants/songList'

export default function MusicEntry({ entry, setCurrentSong, currentSong }) {
  const isPlaying = () => currentSong === entry.id
  return (
    <div className={`${styles.musicEntry} ${isPlaying() ? styles.active : ''}`} onClick={() => setCurrentSong(entry.id)}>
      <div className={styles.mainEntry}>
        <div className={styles.playIcon}>
          <Icons name={isPlaying() ? 'pause' : 'play'} size="35" />
        </div>
        <div className={styles.song}>
          {entry.title}
        </div>
      </div>
    </div>
  )
}
