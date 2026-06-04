import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import TodoItem from './TodoItem'

describe('TodoItem', () => {
  it('text が画面に表示される', () => {
    const todo = { id: 1, text: '牛乳を買う', completed: false }
    render(<TodoItem todo={todo} onDelete={() => {}} onToggle={() => {}} />)
    expect(screen.getByText('牛乳を買う')).toBeInTheDocument()
  })

  it('削除ボタンが存在する', () => {
    const todo = { id: 1, text: 'テスト', completed: false }
    render(<TodoItem todo={todo} onDelete={() => {}} onToggle={() => {}} />)
    expect(screen.getByRole('button', { name: '削除' })).toBeInTheDocument()
  })

  it('completed が true なら打ち消し線スタイルが当たる', () => {
    const todo = { id: 1, text: 'done', completed: true }
    render(<TodoItem todo={todo} onDelete={() => {}} onToggle={() => {}} />)
    const text = screen.getByText('done')
    expect(text).toHaveStyle({ textDecoration: 'line-through' })
  })

  it('completed が false なら打ち消し線は当たらない', () => {
    const todo = { id: 1, text: 'todo', completed: false }
    render(<TodoItem todo={todo} onDelete={() => {}} onToggle={() => {}} />)
    const text = screen.getByText('todo')
    expect(text).toHaveStyle({ textDecoration: 'none' })
  })

  it('削除ボタンを押すと onDelete が id 付きで呼ばれる', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    const todo = { id: 42, text: 'テスト', completed: false }

    render(<TodoItem todo={todo} onDelete={onDelete} onToggle={() => {}} />)
    await user.click(screen.getByRole('button', { name: '削除' }))

    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledWith(42)
  })

  it('チェックボックスを押すと onToggle が id 付きで呼ばれる', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    const todo = { id: 7, text: 'チェック', completed: false }

    render(<TodoItem todo={todo} onDelete={() => {}} onToggle={onToggle} />)
    await user.click(screen.getByRole('checkbox'))

    expect(onToggle).toHaveBeenCalledWith(7)
  })
})
