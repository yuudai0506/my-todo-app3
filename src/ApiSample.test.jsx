import { render, screen } from '@testing-library/react'
import { beforeEach, afterEach, vi } from 'vitest'
import ApiSample from './ApiSample'

describe('ApiSample', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('読み込み中は「読み込み中…」が表示される', () => {
    globalThis.fetch.mockReturnValue(new Promise(() => {}))
    render(<ApiSample />)
    expect(screen.getByText('読み込み中…')).toBeInTheDocument()
  })

  it('取得成功時にリストが表示される', async () => {
    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: async () => [
        { id: 1, title: 'タスクA', completed: false },
        { id: 2, title: 'タスクB', completed: true },
      ],
    })

    render(<ApiSample />)

    expect(await screen.findByText(/タスクA/)).toBeInTheDocument()
    expect(screen.getByText(/タスクB/)).toBeInTheDocument()
  })

  it('通信失敗時にエラーが表示される', async () => {
    globalThis.fetch.mockResolvedValue({ ok: false })
    render(<ApiSample />)
    expect(await screen.findByText(/エラー/)).toBeInTheDocument()
  })

  it('ネットワーク例外時にもエラー表示される', async () => {
    globalThis.fetch.mockRejectedValue(new Error('network down'))
    render(<ApiSample />)
    expect(await screen.findByText('エラー：network down')).toBeInTheDocument()
  })
})
