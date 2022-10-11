import { useState, useRef } from 'react'
import styles from '@/styles/Add.module.scss'
import { db, storage } from '@/constants/firebaseConfig'

export default function Add() {
  const [showModal, setShowModal] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [durationStr, setDurationStr] = useState()
  const songRef = useRef()
  const titleRef = useRef()
  const typeRef = useRef()
  const lyricsRef = useRef()
  const bpmRef = useRef()
  const noteRef = useRef()

  const str_pad_left = (string,pad,length) => {
    return (new Array(length+1).join(pad)+string).slice(-length);
  }

  const save = () => {
    const file = songRef.current.files[0]
    const refValues = [
      titleRef.current.value,
      typeRef.current.value,
      file?.name || '',
      lyricsRef.current.value,
    ]

    const hasEmpty = refValues.some(value => !value);
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear().toString();
    const dateStr = str_pad_left(day, '0', 2)+'.'+str_pad_left(month, '0', 2)+'.'+year.substring(2)

    if (!hasEmpty) {
      storage().ref(file.name).put(file).then((res) => {
        db().collection('lyrics').doc(file.name.split('.')[0]).set({
          id: file.name.split('.')[0],
          title: titleRef.current.value,
          type: typeRef.current.value,
          media: file.name,
          text: lyricsRef.current.value,
          duration: durationStr,
          bpm: bpmRef.current.value || '-',
          note: noteRef.current.value || '-',
          date: dateStr,
        }).then(() => {
          titleRef.current.value = ''
          typeRef.current.value = ''
          songRef.current.value = ''
          lyricsRef.current.value = ''
          bpmRef.current.value = ''
          noteRef.current.value = ''
          setHasError(false)
        }).catch(err => {
          console.log('LJ - ', 'error', err);
        })

      }).catch((err) => {
        console.log('LJ - ', 'error', err);
      })
    } else {
      setHasError(true)
    }
    setShowModal(true)
  }

  const loadAudio = () => {
    const file = songRef.current.files[0]
    const reader = new FileReader();
    console.log('LJ - file', file);

    reader.onload = async function (event) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      await audioContext.decodeAudioData(event.target.result, function(buffer) {
        // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
        const duration = buffer.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        setDurationStr(str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2))
      });
    }

    reader.onerror = function (event) {
      console.error("An error ocurred reading the file: ", event);
    };
    reader.readAsArrayBuffer(file);
  }

  return (
    <>
    {
      showModal && <div className={styles.modal} onClick={() => setShowModal(false)}>{hasError ? 'OOOPS! fill me up!' : 'YAAAAY!'}</div>
    }
      <h1><span>New Song</span></h1>
      <div className={styles.addForm}>
        <label>Song</label>
        <input className={hasError && !songRef.current.value ? styles.error : ''} ref={songRef} type="file" accept='audio/*' onChange={loadAudio} />
        <label>Title:</label>
        <input className={hasError && !titleRef.current.value ? styles.error : ''} ref={titleRef} type="text" />
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
            <label>BPM:</label>
            <input ref={bpmRef} type="text" />
          </div>
          <div>
            <label>Note:</label>
            <input ref={noteRef} type="text" />
          </div>
        </div>
        <button className={styles.saveButton} onClick={save}>SAVE</button>
      </div>
    </>
  )
}
