import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MusicList from '../app/components/MusicList/MusicList'
import Icons from '../app/components/Icons/Icons'

export default function Home() {
  return (
    <>
      <Head>
        <title>SideChicks Jukebox</title>
        <meta name="description" content="SideChick Jukebox - all our songs and demos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.innerHeader}>
          <div className={styles.logo}>
            <img src="/logo.png" className={styles.logoImg} />
          </div>
          <div className={styles.title}>
            SideChick Jukebox
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <MusicList type="SONG" />
        <MusicList type="INST" />
        <MusicList type="IDEA" />
      </main>
    </>
  )
}
