import React, {useEffect, useState} from 'react'
import SocketConnection from './utils/socket-connection'

const App = () => {
  const [hidden, setHidden] = useState(false)
  const [socketConnection, setSocketConnection] = useState(null)

  useEffect(() => {
    setSocketConnection(new SocketConnection())
  }, [])

  return (
    <div>
      <div>
        <button
          onClick={() => {
            socketConnection.handleStart()
            setHidden(true)
          }}
          hidden={hidden}
        >
          Start
        </button>
        <button
          onClick={() => {
            socketConnection.handleStop()
            setHidden(false)
          }}
          hidden={!hidden}
        >
          Stop
        </button>
      </div>
      {socketConnection && <p>{socketConnection.getText()}</p>}
    </div>
  )
}

export default App
