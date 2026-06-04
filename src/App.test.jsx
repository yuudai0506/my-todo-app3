import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App 統合', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('TODO を追加するとリストに表示される', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('やることを入力')
    await user.type(input, '牛乳を買う')
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(screen.getByText('牛乳を買う')).toBeInTheDocument()
  })

  it('追加→削除でリストから消える', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('やることを入力')
    await user.type(input, '一時TODO')
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(screen.getByText('一時TODO')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '削除' }))
    expect(screen.queryByText('一時TODO')).not.toBeInTheDocument()
  })

  it('空のリストは「やることはありません」と表示される', () => {
    render(<App />)
    expect(screen.getByText('やることはありません')).toBeInTheDocument()
  })

  it('件数サマリが正しく表示される', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('やることを入力')
    await user.type(input, 'タスクA')
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(screen.getByText(/全1件/)).toBeInTheDocument()
    expect(screen.getByText(/未完了1件/)).toBeInTheDocument()
  })

  it('チェックボックスをクリックすると完了状態がトグルされる', async () => {
    const user = userEvent.setup()
    render(<App />)

    const input = screen.getByPlaceholderText('やることを入力')
    await user.type(input, 'トグルテスト')
    await user.click(screen.getByRole('button', { name: '追加' }))

    await user.click(screen.getByRole('checkbox'))
    expect(screen.getByText(/完了1件/)).toBeInTheDocument()

    await user.click(screen.getByRole('checkbox'))
    expect(screen.getByText(/完了0件/)).toBeInTheDocument()
  })

  it('localStorage に既存データがある場合は読み込まれる', () => {
    const existing = [{ id: 1, text: '保存済みTODO', completed: false }]
    localStorage.setItem('todos', JSON.stringify(existing))

    render(<App />)
    expect(screen.getByText('保存済みTODO')).toBeInTheDocument()
  })
})
