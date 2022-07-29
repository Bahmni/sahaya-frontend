import {Button, TextArea} from '@carbon/react'
import React, {useEffect, useState} from 'react'
import {MicrophoneFilled, StopFilled} from '@carbon/icons-react'
import styles from './consultation-pad-container.scss'
import SocketConnection from '../../utils/socket-connection'
import {streamingURL} from '../../constants'

export const ConsultationPadContainer = () => {
  const [isRecording, setIsRecording] = useState(true)
  const [disableSaveButton, setDisableSaveButton] = useState(true)
  const [text, setText] = useState('')
  const [socketConnection, setSocketConnection] = useState(null)

  const onIncomingMessage = (message: string) => {
    setText(message)
  }
  const onSocketConnectionChange = (isRecording: boolean) => {
    setIsRecording(!isRecording)
  }

  useEffect(() => {
    setSocketConnection(
      new SocketConnection(
        streamingURL,
        onIncomingMessage,
        onSocketConnectionChange,
      ),
    )
  }, [])
  // const startRecording = () => {
  //   setIsRecording(!isRecording)
  //   textAreaRef.current.focus()
  // }
  const renderStopMic = () => {
    return (
      <>
        <StopFilled
          className={styles.stopIcon}
          onClick={() => {
            socketConnection.handleStop()
          }}
          aria-label="Stop Mic"
        />
        <h6> Listening...</h6>
      </>
    )
  }

  const renderStartMic = () => {
    return (
      <>
        <MicrophoneFilled
          className={styles.microphoneIcon}
          onClick={() => {
            socketConnection.handleStart()
          }}
          aria-label="Start Mic"
        />
        <h6>Start recording</h6>
      </>
    )
  }

  const renderTextArea = () => {
    return (
      <TextArea
        onChange={e => {
          e.target.value.length > 0
            ? setDisableSaveButton(false)
            : setDisableSaveButton(true)
        }}
        labelText=""
        ref={input => input && input.focus()}
        value={text}
      ></TextArea>
    )
  }
  return (
    <>
      {renderTextArea()}
      <div className={styles.padBottomArea}>
        {isRecording ? renderStartMic() : renderStopMic()}
        <Button className={styles.saveButton} disabled={disableSaveButton}>
          Save
        </Button>
      </div>
    </>
  )
}
