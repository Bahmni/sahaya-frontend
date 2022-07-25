import {
  SocketStatus,
  StreamingClient,
} from '@project-sunbird/open-speech-streaming-client'

class SocketConnection {
  streamingURL: string
  streamingclient: any
  text: string
  setText: any
  onIncomingMessage: (message: string) => void
  onSocketConnectionChange: (toggle: boolean) => void

  constructor(streamingURL, onIncomingMessage, onSocketConnectionChange) {
    this.streamingURL = streamingURL
    this.streamingclient = new StreamingClient()
    this.onIncomingMessage = onIncomingMessage
    this.onSocketConnectionChange = onSocketConnectionChange
  }
  onErrorMessage = 'Error occurred while making streaming connection'
  onConnect = action => {
    const _this = this

    if (action === SocketStatus.CONNECTED) {
      _this.onSocketConnectionChange(true)
      _this.streamingclient.startStreaming(
        _this.onIncomingMessage,
        this.onErrorMessage,
      )
    } else if (action === SocketStatus.TERMINATED) {
      _this.onSocketConnectionChange(false)
    }
  }

  handleStart = () => {
    const language = 'en'

    this.streamingclient.connect(this.streamingURL, language, this.onConnect)
  }

  handleStop = () => {
    this.streamingclient.stopStreaming()
  }
}

export default SocketConnection
