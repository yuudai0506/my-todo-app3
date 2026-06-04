import { render, screen, act } from '@testing-library/react'
import { vi } from 'vitest'
import AutoHide from './AutoHide'

describe('AutoHide', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('最初はメッセージが見える', () => {
    render(<AutoHide message="Hi" />)
    expect(screen.getByText('Hi')).toBeInTheDocument()
  })

  it('3秒経つと消える', () => {
    render(<AutoHide message="Hi" />)

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(screen.queryByText('Hi')).not.toBeInTheDocument()
  })
})
