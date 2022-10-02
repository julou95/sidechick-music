import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MusicList from '../app/components/MusicList/MusicList'

export default function Home() {
  return (
    <>
      <Head>
        <title>SideChicks Jukebox</title>
        <meta name="description" content="SideChick Jukebox - all our songs and demos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.logo}>
          
        </div>
        <div className={styles.title}>
          SideChick Jukebox
        </div>
      </header>
      <main className={styles.main}>

        <MusicList type="DEMO" />
        <MusicList type="INST" />
        <MusicList type="SINGLE" />
      </main>
    </>
  )
}
