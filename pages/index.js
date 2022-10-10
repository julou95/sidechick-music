import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import MusicList from '@/components/MusicList/MusicList'
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer'
import { db } from '@/constants/firebaseConfig'

const types = [
  'SONG',
  'INST',
  'IDEA',
]

export default function Home() {
  const [songs, setSongs] = useState()
  const [currentSong, setCurrentSong] = useState()

  useEffect(() => {
    db().collection('lyrics').get().then((data) => {
      const sorted = [
        ...data.docs.map(doc => doc.data()).filter(entry => entry.type === 'SONG'),
        ...data.docs.map(doc => doc.data()).filter(entry => entry.type === 'INST'),
        ...data.docs.map(doc => doc.data()).filter(entry => entry.type === 'IDEA'),
      ]      
      setSongs(sorted)
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
      <Head>
        <title>Side Chick</title>
        <meta name="description" content="SideChick Jukebox - all our songs and demos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.innerHeader}>
          <div className={styles.logo}>
            <Image src="/logo.png" className={styles.logoImg} height="75" width="75" />
          </div>
          <div className={styles.title}>
            Side Chick
          </div>
        </div>
      </header>
      <main className={styles.main}>
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
      </main>
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
