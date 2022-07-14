import {
  SocketStatus,
  StreamingClient,
} from '@project-sunbird/open-speech-streaming-client'

class SocketConnection {
  streamingURL: string
  streaming: any
  text: string

  constructor() {
    this.streamingURL = 'http://localhost:9009'
    this.streaming = new StreamingClient()
  }

  handleStart = () => {
    const language = 'en'
    console.log('Connecting to server..')
    const _this = this
    this.streaming.connect(this.streamingURL, language, function (action, id) {
      console.log('Connected', id, 'action:', action)
      if (action === SocketStatus.CONNECTED) {
        console.log('Connected, Start Speaking..')
        _this.streaming.startStreaming(
          function (transcript) {
            console.log('Data: ', transcript)
            _this.text = transcript
          },
          e => {
            console.log('I got error', e)
          },
        )
      } else if (action === SocketStatus.TERMINATED) {
        // Socket is closed and punctuation can be done here.
        console.log('Punctuating: ', _this.text)

        // _this.handlePunctuation(_this.state.text);
      } else {
        console.log('Unexpected action', action, id)
      }
    })
  }

  handleStop = () => {
    console.log('Stopping: ' + 'text')
    this.streaming.stopStreaming()
  }

  getText = () => {
    return this.text
  }
}

export default SocketConnection
