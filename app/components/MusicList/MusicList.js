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
    duration: '02:48',
    lyrics: '[verse 1]\n never see you again,\nrunning through the dark,\nand I get blinded by the light,\nof your heart,\nstruggeling cause i don\'t \n even know where to start, \n why are you making this at me so hard? \n\n [chorus] \n denied everything this whole time \n guess things were fine \n denied everything this whole time \n i guess you thought, things were fine \n\n [verse 2] \n never catch you again \n cause you\'re way too far \n you don\'t wanna be closer, \n i can\'t stay apart \n you cut my heart out my chest \n and put it in a char \n never see you again \n running through the dark \n\n [chorus] \n denied everything this whole time \n guess things were fine \n denied everything this whole time \n guess you thought, things were fine',
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
    duration: '05:13',
    lyrics: '[verse 1] \n have you ever stood infront of yourself and thought of \n what you have, what you need, what you dream about at \n night, while selling yourself for the greater good \n like we must, like we should, like we\'re supposed to do \n\n and you find yourself in a void of dellusion \n only to realize, that you\'ve already sold your soul \n\n [bridge] \n how you ever wanna speak \n if they shut up you and me \n\n how you ever ganna see \n if they blindfold you and me \n\n [chorus] you gonna do what you\'re gonna do \n (gonna do, gonna do) \n like this, like that, like me and you \n\n they gonna do what they gonna do \n (gonna do, gonna do) \n fuck this, fuck that, fuck me and you'
  },
  {
    id: 8,
    type: 'IDEA',
    title: 'Easy Breaze',
    file: '/easyBreaze.mp3',
    duration: '03:59'
  },
  {
    id: 9,
    type: 'SONG',
    title: 'Teach Me',
    file: '/TeachMe_Final.mp3',
    duration: '06:00'
  },
  {
    id: 10,
    type: 'INST',
    title: 'The earth burns',
    file: '/EarthBurnsSlowly_Inst.mp3',
    duration: '03:44'
  },
  {
    id: 11,
    type: 'IDEA',
    title: 'Korny',
    file: '/korny.mp3',
    duration: '01:59'
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
