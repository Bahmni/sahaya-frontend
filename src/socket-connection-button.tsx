import React, {useEffect, useState} from 'react'
import SocketConnection from './utils/socket-connection'
import {streamingURL} from './constants'

const SocketConnectionButton = () => {
  const [toggle, setToggle] = useState(false)
  const [text, setText] = useState('')
  const [socketConnection, setSocketConnection] = useState(null)

  const onIncomingMessage = (message: string) => {
    setText(message)
  }
  const onSocketConnectionChange = (toggle: boolean) => {
    setToggle(toggle)
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

  return (
    <div>
      <div>
        <button
          onClick={() => {
            socketConnection.handleStart()
          }}
          hidden={toggle}
        >
          Start
        </button>
        <button
          onClick={() => {
            socketConnection.handleStop()
          }}
          hidden={!toggle}
        >
          Stop
        </button>
      </div>
      {socketConnection && <p>{text}</p>}
    </div>
  )
}

export default SocketConnectionButton
