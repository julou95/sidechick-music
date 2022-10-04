import styles from '@/styles/MusicList.module.scss'
import MusicEntry from '@/components/MusicEntry/MusicEntry'
import { songs } from '@/constants/songList'

const types = {
  INST: 'Instrumentals',
  SONG: 'Songs',
  IDEA: 'Ideas',
}

export default function MusicList({ type }) {
  const filtered = songs
    .filter((entry) => entry.type === type)
  return (
    <div className={styles.musicList}>
      {filtered.length ? <h1><span>{types[type]}</span></h1> : ''}
      {
        filtered
          .map((entry, index) => <MusicEntry entry={entry} key={index} />)
      }
    </div> 
  )
}
