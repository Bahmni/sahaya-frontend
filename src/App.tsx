import React, {useCallback, useState} from 'react'
import {
  SocketStatus,
  StreamingClient,
} from '@project-sunbird/open-speech-streaming-client'

const App = () => {
  const streamingURL = 'http://localhost:9009'
  //  const  punctuateURL = '<Add Punctuate URL HERE>';
  const [hidden, setHidden] = useState(false)

  const [text, setText] = useState()
  const streaming = new StreamingClient()

  const handleStart = useCallback(() => {
    const language = 'en'
    console.log('Connecting to server..')
    streaming.connect(streamingURL, language, function (action, id) {
      console.log('Connected', id, 'action:', action)
      if (action === SocketStatus.CONNECTED) {
        console.log('Connected, Start Speaking..')
        streaming.startStreaming(
          function (transcript) {
            console.log('Data: ', transcript)
            setText(transcript)
          },
          e => {
            console.log('I got error', e)
          },
        )
      } else if (action === SocketStatus.TERMINATED) {
        // Socket is closed and punctuation can be done here.
        console.log('Punctuating: ', text)
        // _this.handlePunctuation(_this.state.text);
      } else {
        console.log('Un expected action', action, id)
      }
    })
  }, [])

  const handleStop = useCallback(() => {
    console.log('Stopping: ' + text)
    streaming.stopStreaming()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button
            onClick={() => {
              handleStart()
              setHidden(true)
            }}
            hidden={hidden}
          >
            Start
          </button>
          <button
            onClick={() => {
              handleStop()
              setHidden(false)
            }}
            hidden={!hidden}
          >
            Stop
          </button>
        </div>
        <p>{text}</p>
      </header>
    </div>
  )
}

export default App
