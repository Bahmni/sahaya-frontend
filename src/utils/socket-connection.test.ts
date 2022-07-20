import './socket-connection.ts'
import SocketConnection from './socket-connection'

describe('Testing connection', () => {
  jest.mock('./socket-connection')

  it('should test for handleStart function in socket-connections', () => {
    const handlestartmockfn = jest.fn(SocketConnection.prototype.handleStart)

    expect(handlestartmockfn).not.toHaveBeenCalled()
    handlestartmockfn()
    expect(handlestartmockfn).toHaveBeenCalled()
  })
  it('should test for handleStop function in socket-connections', () => {
    const mockfn = jest.fn(SocketConnection.prototype.handleStop)

    expect(mockfn).not.toHaveBeenCalled()
    mockfn()
    expect(mockfn).toHaveBeenCalled()
  })

  it('should verify handle start function in socket-connections', async () => {
    expect(SocketConnection.prototype.handleStart).toBeInTheDocument
    expect(SocketConnection.prototype.handleStop).toBeInTheDocument
  })
})
