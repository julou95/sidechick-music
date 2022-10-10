import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'

export default function DefaultLayout({ children }) {
  return (
    <>
      <Head>
        <title>Side Chick</title>
        <meta name="description" content="SideChick Jukebox - all our songs and demos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.innerHeader}>
          <a className={styles.headerLeft} href="/">
            <div className={styles.logo}>
              <Image src="/logo.png" alt="logo" className={styles.logoImg} height="96" width="96" />
            </div>
            <div className={styles.title}>
              Side Chick
            </div>
          </a>
        </div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </>
  )
}
