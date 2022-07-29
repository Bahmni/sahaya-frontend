import {render, screen} from '@testing-library/react'
import React from 'react'
import SocketConnectionButton from './socket-connection-button'

describe('Test Socket Connection Button', () => {
  it('should show the socket connection button ', async () => {
    render(<SocketConnectionButton />)
    expect(await screen.findByText('Start')).toBeInTheDocument()
  })
})
