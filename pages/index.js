import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import MusicList from '@/components/MusicList/MusicList'
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer'
import { messaging } from '@/constants/firebaseConfig'

export default function Home() {
  const [currentSong, setCurrentSong] = useState()

  useEffect(() => {
    messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken()
      })
      .then(token => {
        console.log('LJ - ', 'token', token);
      })
      .catch(error => {
        console.log('LJ - ', 'error', error);
      })
  }, [])
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
        <MusicList type="SONG" setCurrentSong={setCurrentSong} currentSong={currentSong} />
        <MusicList type="INST" setCurrentSong={setCurrentSong} currentSong={currentSong} />
        <MusicList type="IDEA" setCurrentSong={setCurrentSong} currentSong={currentSong} />
      </main>
      {
        currentSong &&
          <MusicPlayer
            songId={currentSong}
            setSongId={setCurrentSong}
          />
      }
    </>
  )
}
