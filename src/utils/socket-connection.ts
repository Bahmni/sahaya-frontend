import {
  SocketStatus,
  StreamingClient,
} from '@project-sunbird/open-speech-streaming-client'

class SocketConnection {
  streamingURL: string
  streaming: any
  text: string
  setText: any
  onMessage: (message: string) => void
  onToggle: (toggle: boolean) => void

  constructor(streamingURL, onMessage, onToggle) {
    this.streamingURL = streamingURL
    this.streaming = new StreamingClient()
    this.onMessage = onMessage
    this.onToggle = onToggle
  }

  onConnect = action => {
    const _this = this

    if (action === SocketStatus.CONNECTED) {
      this.onToggle(true)
      _this.streaming.startStreaming(_this.onMessage, error => {
        console.log('Error occurred while making streaming connection', error)
      })
    } else if (action === SocketStatus.TERMINATED) {
      this.onToggle(false)
    }
  }

  handleStart = () => {
    const language = 'en'
    this.streaming.connect(this.streamingURL, language, this.onConnect)
  }

  handleStop = () => {
    this.streaming.stopStreaming()
  }
}

export default SocketConnection
