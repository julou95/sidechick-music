import { useEffect, useState } from 'react'
import Image from 'next/image'
import MusicList from '@/components/MusicList/MusicList'
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer'
import { db } from '@/constants/firebaseConfig'
import styles from '@/styles/Home.module.scss'

const types = [
  'SONG',
  'INST',
  'IDEA',
]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [songs, setSongs] = useState()
  const [currentSong, setCurrentSong] = useState()

  useEffect(() => {
    db().collection('lyrics').get().then((data) => {
      const sorted = [
        ...data.docs.map(doc => doc.data()).filter(entry => entry.type === 'SONG'),
        ...data.docs.map(doc => doc.data()).filter(entry => entry.type === 'INST'),
        ...data.docs.map(doc => doc.data()).filter(entry => entry.type === 'IDEA'),
      ]      
      setTimeout(() => {
        setSongs(sorted)
        setIsLoading(false)
      }, 500)
    })
  }, [])

  const nextSong = (currentId) => {
    const currentIndex = songs.findIndex(song => song.id === currentId)
    if (currentIndex + 1 >= songs.length) {
      setCurrentSong(songs[0])
    } else {
      setCurrentSong(songs[currentIndex + 1])
    }
  }

  const prevSong = (currentId) => {
    const currentIndex = songs.findIndex(song => song.id === currentId)
    if (currentIndex - 1 < 0) {
      setCurrentSong(songs[songs.length - 1])
    } else {
      setCurrentSong(songs[currentIndex - 1])
    }
  }

  return (
    <>
      {
        isLoading && <div className={styles.loading}><Image src="/loading.gif" height="200" width="210" /></div>
      }
      {
        types.map((type) =>
          <MusicList
            key={type}
            type={type}
            songs={songs?.filter(song => song.type === type)}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
          />
        )
      }
      {
        currentSong &&
          <MusicPlayer
            song={currentSong}
            prevSong={prevSong}
            nextSong={nextSong}
          />
      }
    </>
  )
}
