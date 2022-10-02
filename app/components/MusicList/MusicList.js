import styles from '../../../styles/MusicList.module.css'
import MusicEntry from '../MusicEntry/MusicEntry'

const types = {
  DEMO: 'Demos',
  INST: 'Instrumentals',
  SINGLE: 'Songs'
}

const musicList = [
  {
    id: 0,
    type: 'DEMO',
    title: 'MooseFighter',
    file: '/MuseFighters.mp3',
  },
  {
    id: 1,
    type: 'DEMO',
    title: 'Never See You Again',
    file: '/NeverSeeYou.mp3',
  },
  {
    id: 2,
    type: 'DEMO',
    title: 'Red Fang',
    file: '/RedFang.mp3',
  },
  {
    id: 3,
    type: 'DEMO',
    title: 'Stranger (fm&u)',
    file: '/Stranger3.mp3',
  },
  {
    id: 4,
    type: 'INST',
    title: 'Never See You Again (Inst)',
    file: '/NeverSeeYouAgain(inst).mp3',
  },
]

export default function MusicList({ type }) {
  const songs = musicList
  .filter((entry) => entry.type === type)
  return (
    <div className={styles.musicList}>
      {songs.length ? <h1><span>{types[type]}</span></h1> : ''}
      {
        songs
          .map((entry, index) => <MusicEntry entry={entry} key={index} />)
      }
    </div> 
  )
}
