import { render, screen } from '@testing-library/react'
import Greeting from './Greeting'

describe('Greeting', () => {
  it('名前を含む挨拶が表示される', () => {
    render(<Greeting name="太郎" />)
    expect(screen.getByText('こんにちは、太郎さん！')).toBeInTheDocument()
  })

  it('違う名前を渡すと表示も変わる', () => {
    render(<Greeting name="花子" />)
    expect(screen.getByText('こんにちは、花子さん！')).toBeInTheDocument()
  })
})
