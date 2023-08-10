import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

describe('App Component', () => {
  it('Renders the Home component', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    expect(screen.getByRole('heading', { level:2 })).toHaveTextContent('Journal Entries')
  })
})