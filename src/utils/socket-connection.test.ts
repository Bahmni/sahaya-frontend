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
    connect: jest.fn((a, b, onConnecting) => {
      onConnecting: jest.fn()
    }),
    stopStreaming: jest.fn(),
  }

  StreamingClient.mockImplementation(() => mockStreamingclient)

  let url = 'http://localhost:9009'
  let message = message => {}
  let onSocketConnectionChange
  let isConnect = isConnect => {
    onSocketConnectionChange = isConnect
  }
  const connection = new SocketConnection(url, message, isConnect)

  afterAll(() => jest.clearAllMocks())

  it('should check for startstreaming and connect functions of streamingClient when handledStart is called', () => {
    expect(StreamingClient).toHaveBeenCalled()

    connection.handleStart()

    const connectUrl = mockStreamingclient.connect.mock.calls[0][0]
    const connectLanguage = mockStreamingclient.connect.mock.calls[0][1]
    const onConnectFunction = mockStreamingclient.connect.mock.calls[0][2]

    expect(mockStreamingclient.connect).toHaveBeenCalled()
    expect(connectUrl).toBe('http://localhost:9009')
    expect(connectLanguage).toBe('en')

    onConnectFunction(SocketStatus.CONNECTED)
    expect(onSocketConnectionChange).toBe(true)

    expect(mockStreamingclient.startStreaming).toHaveBeenCalled()

    const onMessageFunction =
      mockStreamingclient.startStreaming.mock.calls[0][0]

    onMessageFunction('this is a test message')

    expect(onMessageFunction).toBe(message)

    const onMessageFunctionForError =
      mockStreamingclient.startStreaming.mock.calls[0][1]

    expect(onMessageFunctionForError).toBe(
      'Error occurred while making streaming connection',
    )
  })

  it('should check for socketStatus when connection is terminated', () => {
    expect(StreamingClient).toHaveBeenCalled()

    connection.handleStart()

    const onConnectFunction = mockStreamingclient.connect.mock.calls[0][2]

    expect(mockStreamingclient.connect).toHaveBeenCalled()

    onConnectFunction(SocketStatus.TERMINATED)
    expect(onSocketConnectionChange).toBe(false)
  })

  it('should check for stopstreaming function when handledStop is called', () => {
    connection.handleStop()

    expect(mockStreamingclient.stopStreaming).toHaveBeenCalled()
  })
})
