import { useState, useRef } from 'react'
import styles from '@/styles/Add.module.scss'
import { db, storage } from '@/constants/firebaseConfig'

export default function Add() {
  const [showModal, setShowModal] = useState(false)
  const [hasError, setHasError] = useState(false)
  const songRef = useRef()
  const idRef = useRef()
  const titleRef = useRef()
  const typeRef = useRef()
  const lyricsRef = useRef()
  const durationRef = useRef()
  const bpmRef = useRef()
  const noteRef = useRef()
  const dateRef = useRef()

  const save = () => {
    const file = songRef.current.files[0]
    const refValues = [
      idRef.current.value,
      titleRef.current.value,
      typeRef.current.value,
      file?.name || '',
      lyricsRef.current.value,
      durationRef.current.value,
      bpmRef.current.value,
      noteRef.current.value,
      dateRef.current.value,
    ]

    const hasEmpty = refValues.some(value => !value);

    if (!hasEmpty) {
      storage().ref(file.name).put(file)
      db().collection('lyrics').doc(idRef.current.value).set({
        id: idRef.current.value,
        title: titleRef.current.value,
        type: typeRef.current.value,
        media: file.name,
        text: lyricsRef.current.value,
        duration: durationRef.current.value,
        bpm: bpmRef.current.value,
        node: noteRef.current.value,
        date: dateRef.current.value,
      }).then(() => {
        setShowModal(true)
        idRef.current.value = ''
        titleRef.current.value = ''
        typeRef.current.value = ''
        songRef.current.value = ''
        lyricsRef.current.value = ''
        durationRef.current.value = ''
        bpmRef.current.value = ''
        noteRef.current.value = ''
        dateRef.current.value = ''
      })
    } else {
      setHasError(true)
      setShowModal(true)
    }
  }

  return (
    <>
    {
      showModal && <div className={styles.modal} onClick={() => setShowModal(false)}>{hasError ? 'OOOPS! fill me up!' : 'YAAAAY!'}</div>
    }
      <h1><span>New Song</span></h1>
      <div className={styles.addForm}>
        <label>Song</label>
        <input ref={songRef} type="file" accept='audio/*' />
        <label>ID:</label>
        <input ref={idRef} type="text" />
        <label>Title:</label>
        <input ref={titleRef} type="text" />
        <label>Type:</label>
        <select ref={typeRef} name="songType">
          <option value="SONG">Song</option>
          <option value="INST">Instrumental</option>
          <option value="IDEA">Idea</option>
        </select>
        <label>Lyrics:</label>
        <textarea ref={lyricsRef} defaultValue="..." />
        <div className={styles.row}>
          <div>
            <label>Duration:</label>
            <input ref={durationRef} type="text" />
          </div>
          <div>
            <label>BPM:</label>
            <input ref={bpmRef} type="text" />
          </div>
          <div>
            <label>Note:</label>
            <input ref={noteRef} type="text" />
          </div>
        </div>
        <label>Date:</label>
        <input ref={dateRef} type="text" />
        <button className={styles.saveButton} onClick={save}>SAVE</button>
      </div>
    </>
  )
}
