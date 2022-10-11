import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Icons from '@/components/Icons/Icons'
import styles from '@/styles/Home.module.scss'
import { ThemeContext } from '@/constants/themeContext'

export default function DefaultLayout({ children }) {
  const [darkmode, setDarkmode] = useState(true)

  useEffect(() => {
    const isDark = JSON.parse(localStorage.getItem('DARK')) || false
    setDarkmode(isDark)
  }, [])

  const setDark = (newVal) => {
    setDarkmode(newVal)
    localStorage.setItem('DARK', newVal)
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
          <a className={styles.headerLeft} href="/">
            <div className={styles.logo}>
              <Image src="/logo.png" alt="logo" className={styles.logoImg} height="96" width="96" />
            </div>
            <div className={styles.title}>
              Side Chick
            </div>
          </a>
          <div className={styles.themeToggle} onClick={() => setDark(!darkmode)}>
            <Icons name={darkmode ? 'dark' : 'light'} size="30" />
          </div>
        </div>
      </header>
      <main className={`${styles.main} ${darkmode ? styles.dark : styles.light}`}>
        <ThemeContext.Provider value={darkmode}>
          {children}
        </ThemeContext.Provider>
      </main>
    </>
  )
}
