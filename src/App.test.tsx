import {render, screen} from '@testing-library/react'
import React from 'react'
import App from './App'

describe('Test Hello world', () => {
  it('should show the file upload box', async () => {
    render(<App />)
    expect(await screen.findByText('Start')).toBeInTheDocument()
  })
})
