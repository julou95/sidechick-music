import styles from '../../../styles/MusicList.module.scss'
import MusicEntry from '../MusicEntry/MusicEntry'

const types = {
  INST: 'Instrumentals',
  SONG: 'Songs',
  IDEA: 'Ideas',
}

const musicList = [
  {
    id: 0,
    type: 'INST',
    title: 'MooseFighter',
    file: '/MuseFighters.mp3',
    duration: '05:33'
  },
  {
    id: 1,
    type: 'SONG',
    title: 'Never See You Again',
    file: '/NeverSeeYou.mp3',
    duration: '02:48'
  },
  {
    id: 2,
    type: 'INST',
    title: 'Red Fang',
    file: '/RedFang.mp3',
    duration: '01:56'
  },
  {
    id: 3,
    type: 'INST',
    title: 'Stranger (fm&u)',
    file: '/Stranger3.mp3',
    duration: '05:13'
  },
  {
    id: 4,
    type: 'INST',
    title: 'Never See You Again',
    file: '/NeverSeeYouAgain(inst).mp3',
    duration: '02:48'
  },
  {
    id: 5,
    type: 'IDEA',
    title: 'Samelöser',
    file: '/sameloeser.mp3',
    duration: '03:07'
  },
  {
    id: 6,
    type: 'INST',
    title: 'Get High',
    file: '/Get_High_4.mp3',
    duration: '03:55',
  },
  {
    id: 7,
    type: 'SONG',
    title: 'Stranger (fm&u)',
    file: '/fmay.mp3',
    duration: '05:13'
  },
  {
    id: 8,
    type: 'IDEA',
    title: 'Easy Breaze',
    file: '/easyBreaze.mp3',
    duration: '03:59'
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
