import Icons from '@/components/Icons/Icons';
import styles from '@/styles/MusicList.module.scss'

export default function MusicEntry({ entry, setCurrentSong, currentSong }) {
  const isPlaying = () => currentSong?.id === entry.id
  return (
    <div className={`${styles.musicEntry} ${isPlaying() ? styles.active : ''}`} onClick={() => setCurrentSong(entry)}>
      <div className={styles.mainEntry}>
        <div className={styles.playIcon}>
          <Icons name={isPlaying() ? 'pause' : 'play'} size="35" />
        </div>
        <div className={styles.song}>
          {entry.title}
          <div className={styles.duration}>
            {entry.duration}
          </div>
        </div>
      </div>
    </div>
  )
}
