export const songs = [
  {
    id: 'nsya',
    type: 'SONG',
    title: 'Never See You Again',
    file: '/audio/NeverSeeYou.mp3',
    duration: '02:48',
    bpm: '-',
    note: '-',
    date: '04.10.22',
  },
  {
    id: 'doIt',
    type: 'SONG',
    title: 'Do it for me',
    file: '/audio/DoItForMe.mp3',
    duration: '03:16',
    bpm: '-',
    note: '-',
    date: '07.10.22',
  },
  {
    id: 'stranger',
    type: 'SONG',
    title: 'Stranger (fm&u)',
    file: '/audio/fmay.mp3',
    duration: '05:13',
    bpm: '-',
    note: '-',
    date: '04.10.22',
  },
  {
    id: 'teachMe',
    type: 'SONG',
    title: 'Teach Me',
    file: '/audio/TeachMe.mp3',
    duration: '06:00',
    bpm: '-',
    note: '-',
    date: '04.10.22',
  },
  {
    id: 'nsyaInst',
    type: 'INST',
    title: 'Never See You Again',
    file: '/audio/NeverSeeYouAgain(inst).mp3',
    duration: '02:48',
    bpm: '-',
    note: '-',
    date: '04.10.22',
  },
  {
    id: 'doItInst',
    type: 'INST',
    title: 'Do it for me',
    file: '/audio/DoItForMeInst.mp3',
    duration: '03:16',
    bpm: '-',
    note: '-',
    date: '07.10.22',
  },
  {
    id: 'strangerInst',
    type: 'INST',
    title: 'Stranger (fm&u)',
    file: '/audio/Stranger3.mp3',
    duration: '05:13',
    bpm: '-',
    note: '-',
    date: '04.10.22',
  },
  {
    id: 'teachMeInst',
    type: 'INST',
    title: 'Teach Me',
    file: '/audio/TeachMeInst.mp3',
    duration: '06:00',
    bpm: '-',
    note: '-',
    date: '04.10.22',
  },
  {
    id: 'moosefighter',
    type: 'INST',
    title: 'MooseFighter',
    file: '/audio/MooseFighter.mp3',
    duration: '04:47',
    bpm: '-',
    note: '-',
    date: '05.10.22',
  },
  {
    id: 'gethigh',
    type: 'INST',
    title: 'Get High',
    file: '/audio/Get_High_4.mp3',
    duration: '03:55',
    bpm: '-',
    note: '-',
    date: '04.10.22',
  },
  {
    id: 'earthburns',
    type: 'INST',
    title: 'The earth burns',
    file: '/audio/EarthBurnsSlowly_Inst.mp3',
    duration: '03:44',
    bpm: '-',
    note: '-',
    date: '04.10.22',
  },
  {
    id: 'redfang',
    type: 'IDEA',
    title: 'Red Fang',
    file: '/audio/RedFang.mp3',
    duration: '01:56',
    bpm: '-',
    note: '-',
    date: '04.10.22',
  },
  {
    id: 'sameloser',
    type: 'IDEA',
    title: 'Samelöser',
    file: '/audio/sameloeser.mp3',
    duration: '03:07',
    bpm: '-',
    note: '-',
    date: '04.10.22',
  },
  {
    id: 'easybreaze',
    type: 'IDEA',
    title: 'Easy Breaze',
    file: '/audio/easyBreaze.mp3',
    duration: '03:59',
    bpm: '-',
    note: '-',
    date: '04.10.22',
  },
  {
    id: 'korny',
    type: 'IDEA',
    title: 'Korny',
    file: '/audio/korny.mp3',
    duration: '01:59',
    bpm: '-',
    note: '-',
    date: '04.10.22',
  },
]

export const getNextId = (currentId) => {
  const currentIndex = songs.findIndex(song => song.id === currentId)
  if (currentIndex + 1 >= songs.length) return songs[0].id
  return songs[currentIndex + 1].id;
}
export const getPreviousId = (currentId) => {
  const currentIndex = songs.findIndex(song => song.id === currentId)
  if (currentIndex - 1 < 0) return songs[songs.length-1].id
  return songs[currentIndex - 1].id;
}



export const getSongInfo = (id) => {
  return songs.find(song => song.id === id)
}