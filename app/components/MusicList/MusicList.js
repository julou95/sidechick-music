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
    title: 'Songtitel 1',
    duration: '3:33',
    file: '/MuseFighters.mp3',
  },
  {
    id: 1,
    type: 'DEMO',
    title: 'Songtitel 2',
    duration: '3:33',
    file: '/NeverSeeYou.mp3',
  },
  {
    id: 2,
    type: 'DEMO',
    title: 'Songtitel 3',
    duration: '3:33',
    file: '/MuseFighters.mp3',
  },
  {
    id: 3,
    type: 'DEMO',
    title: 'Songtitel 4',
    duration: '3:33',
    file: '/MuseFighters.mp3',
  },
  {
    id: 4,
    type: 'INST',
    title: 'Songtitel 5',
    duration: '3:33',
    file: '/MuseFighters.mp3',
  },
  {
    id: 5,
    type: 'INST',
    title: 'Songtitel 6',
    duration: '3:33',
    file: '/MuseFighters.mp3',
  },
  {
    id: 6,
    type: 'INST',
    title: 'Songtitel 7',
    duration: '3:33',
    file: '/MuseFighters.mp3',
  },
  {
    id: 7,
    type: 'INST',
    title: 'Songtitel 8',
    duration: '3:33',
    file: '/MuseFighters.mp3',
  },
  {
    id: 8,
    type: 'SINGLE',
    title: 'Songtitel 9',
    duration: '3:33',
    file: '/MuseFighters.mp3',
  },
  {
    id: 9,
    type: 'SINGLE',
    title: 'Songtitel 10',
    duration: '3:33',
    file: '/MuseFighters.mp3',
  },
  {
    id: 10,
    type: 'SINGLE',
    title: 'Songtitel 11',
    duration: '3:33',
    file: '/MuseFighters.mp3',
  },
  {
    id: 11,
    type: 'SINGLE',
    title: 'Songtitel 12',
    duration: '3:33',
    file: '/MuseFighters.mp3',
  },
]

export default function MusicList({ type }) {
  return (
    <div className={styles.musicList}>
      <h1><span>{types[type]}</span></h1>
      {
        musicList
          .filter((entry) => entry.type === type)
          .map((entry, index) => <MusicEntry entry={entry} key={index} />)
      }
    </div> 
  )
}
