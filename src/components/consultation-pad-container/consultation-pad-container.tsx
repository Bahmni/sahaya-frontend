import {Button, TextArea} from '@carbon/react'
import React, {useRef, useState} from 'react'
import {MicrophoneFilled, StopFilled} from '@carbon/icons-react'
import styles from './consultation-pad-container.scss'

export const ConsultationPadContainer = () => {
  const textAreaRef = useRef(null)
  const [showMicroPhoneIcon, setShowMicroPhoneIcon] = useState(true)
  const [disableSaveButton, setDisableSaveButton] = useState(true)
  const startRecording = () => {
    setShowMicroPhoneIcon(!showMicroPhoneIcon)
    textAreaRef.current.focus()
  }
  const stopMic = () => {
    return (
      <>
        <StopFilled
          className={styles.stopIcon}
          onClick={startRecording}
          aria-label="Stop Mic"
        />
        <h6> Listening...</h6>
      </>
    )
  }

  const startMic = () => {
    return (
      <>
        <MicrophoneFilled
          className={styles.microphoneIcon}
          onClick={startRecording}
          aria-label="Start Mic"
        />
        <h6>Start recording</h6>
      </>
    )
  }

  const consultationNotesTextArea = () => {
    return (
      <TextArea
        onChange={e => {
          e.target.value.length > 0
            ? setDisableSaveButton(false)
            : setDisableSaveButton(true)
        }}
        labelText=""
        ref={textAreaRef}
      ></TextArea>
    )
  }
  return (
    <>
      {consultationNotesTextArea()}
      <div className={styles.footer}>
        {showMicroPhoneIcon ? startMic() : stopMic()}
        <Button className={styles.saveButton} disabled={disableSaveButton}>
          Save
        </Button>
      </div>
    </>
  )
}
