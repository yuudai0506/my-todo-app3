import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import TodoForm from './TodoForm'

describe('TodoForm', () => {
  it('入力→追加ボタンで onAdd が入力値付きで呼ばれる', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()

    render(<TodoForm onAdd={onAdd} />)

    const input = screen.getByPlaceholderText('やることを入力')
    await user.type(input, '牛乳を買う')
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(onAdd).toHaveBeenCalledWith('牛乳を買う')
  })

  it('送信後に入力欄が空になる', async () => {
    const user = userEvent.setup()
    render(<TodoForm onAdd={() => {}} />)

    const input = screen.getByPlaceholderText('やることを入力')
    await user.type(input, 'abc')
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(input).toHaveValue('')
  })

  it('空文字では onAdd が呼ばれない', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()

    render(<TodoForm onAdd={onAdd} />)
    await user.click(screen.getByRole('button', { name: '追加' }))

    expect(onAdd).not.toHaveBeenCalled()
  })

  it('Enter キーでも送信できる', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()

    render(<TodoForm onAdd={onAdd} />)
    const input = screen.getByPlaceholderText('やることを入力')
    await user.type(input, 'レポート{Enter}')

    expect(onAdd).toHaveBeenCalledWith('レポート')
  })
})
