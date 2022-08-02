import './socket-connection.ts'
import SocketConnection from './socket-connection'
import {
  SocketStatus,
  StreamingClient,
} from '@project-sunbird/open-speech-streaming-client'

jest.mock('@project-sunbird/open-speech-streaming-client')

describe('Socket Connections Testing', () => {
  const mockStreamingclient = {
    startStreaming: jest.fn(),
    connect: jest.fn((url, language, onConnect) => {
      onConnect: jest.fn()
    }),
    stopStreaming: jest.fn(),
  }

  afterEach(() => jest.clearAllMocks())

  it('should check for startstreaming and connect functions of streamingClient when handledStart is called', () => {
    StreamingClient.mockImplementation(() => mockStreamingclient)

    let url = 'http://localhost:9009'
    let onMessage = () => {}
    let onSocketConnection: boolean
    let onConnect = (isConnect: boolean) => {
      onSocketConnection = isConnect
    }
    const connection = new SocketConnection(url, onMessage, onConnect)

    connection.handleStart()

    expect(mockStreamingclient.connect).toHaveBeenCalled()

    const connectUrl = mockStreamingclient.connect.mock.calls[0][0]
    const connectLanguage = mockStreamingclient.connect.mock.calls[0][1]
    const onConnectFunction = mockStreamingclient.connect.mock.calls[0][2]

    expect(connectUrl).toBe('http://localhost:9009')
    expect(connectLanguage).toBe('en')

    onConnectFunction(SocketStatus.CONNECTED)
    expect(onSocketConnection).toBe(true)

    expect(mockStreamingclient.startStreaming).toHaveBeenCalled()
    expect(mockStreamingclient.startStreaming.mock.calls[0][0]).toBe(onMessage)
    const onErrorMessage = mockStreamingclient.startStreaming.mock.calls[0][1]
    expect(onErrorMessage()).toBe(
      'Error occurred while making streaming connection',
    )
  })

  it('should check for socketStatus when connection is terminated', () => {
    let url = 'http://localhost:9009'
    let message = () => {}
    let onSocketConnection: boolean
    let isConnect = (isConnect: boolean) => {
      onSocketConnection = isConnect
    }
    const connection = new SocketConnection(url, message, isConnect)

    expect(StreamingClient).toHaveBeenCalled()

    connection.handleStart()

    const onConnect = mockStreamingclient.connect.mock.calls[0][2]

    expect(mockStreamingclient.connect).toHaveBeenCalled()

    onConnect(SocketStatus.TERMINATED)
    expect(onSocketConnection).toBe(false)
  })

  it('should check for stopstreaming function when handledStop is called', () => {
    let url = 'http://localhost:9009'
    let message = () => {}

    const connection = new SocketConnection(url, message, jest.fn)

    connection.handleStop()

    expect(mockStreamingclient.stopStreaming).toHaveBeenCalled()
  })
})
