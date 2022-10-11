import styles from '@/styles/Remove.module.scss'

export default function Add() {
  return (
    <>
      <h1><span>Delete Song</span></h1>
      <div className={styles.songlist}>
        <select name="songs">
          <option value="songId1">Song1</option>
        </select>
      </div>
    </>
  )
}
