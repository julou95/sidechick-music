import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Icons from '@/components/Icons/Icons'
import styles from '@/styles/Home.module.scss'
import { ThemeContext } from '@/constants/themeContext'

export default function DefaultLayout({ children }) {
  const [darkmode, setDarkmode] = useState(true)
  const [showOptions, setShowOptions] = useState(false)

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
          <Link href="/">
            <div className={styles.headerLeft} onClick={() => setShowOptions(false)}>
              <div className={styles.logo}>
                <Image src="/logo.png" alt="logo" className={styles.logoImg} height="96" width="96" />
              </div>
              <div className={styles.title}>
                Side Chick
              </div>
            </div>
          </Link>
          <div className={`${styles.optionsToggle} ${showOptions ? styles.showOptions : ''}`} onClick={() => setShowOptions(prev => !prev)}>
            <Icons name="options" size="30" />
          </div>
        </div>
      </header>
      <div className={`${styles.optionsWrapper} ${showOptions ? styles.optionsVisible : ''}`}>
        <div className={styles.optionsInner}>
          <Link href='/add'>
            <div className={styles.menuItem} onClick={() => setShowOptions(prev => !prev)}>
              Add Songs
              <Icons name="forth" size="30" />
            </div>
          </Link>
          <Link href="/remove">
            <div className={styles.menuItem} onClick={() => setShowOptions(prev => !prev)}>
              Remove Songs
              <Icons name="forth" size="30" />
            </div>
          </Link>
          <div className={styles.menuItem} onClick={() => setDark(!darkmode)}>Theme
            <div className={styles.themeToggle}>
              <div className={`${styles.toggleInner} ${darkmode ? styles.toggleDark : ''}`}>
                <Icons name="light" size="30" />
                <Icons name="dark" size="30" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className={`${styles.main} ${darkmode ? styles.dark : styles.light}`}>
        <ThemeContext.Provider value={darkmode}>
          {children}
        </ThemeContext.Provider>
      </main>
    </>
  )
}
