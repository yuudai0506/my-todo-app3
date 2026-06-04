import { describe, it, expect } from 'vitest'
import { addTodo, removeTodo, toggleCompleted, countCompleted } from './todoUtils'

describe('addTodo', () => {
  it('空配列に1件追加される', () => {
    const result = addTodo([], '牛乳を買う')
    expect(result.length).toBe(1)
    expect(result[0].text).toBe('牛乳を買う')
    expect(result[0].completed).toBe(false)
  })

  it('既存の配列に追加される', () => {
    const initial = [{ id: 1, text: '既存', completed: false }]
    const result = addTodo(initial, '新規')
    expect(result.length).toBe(2)
  })

  it('空文字は追加されない', () => {
    const result = addTodo([], '   ')
    expect(result.length).toBe(0)
  })

  it('元の配列を破壊しない（イミュータブル）', () => {
    const initial = []
    addTodo(initial, 'テスト')
    expect(initial.length).toBe(0)
  })
})

describe('removeTodo', () => {
  it('指定IDのTODOが消える', () => {
    const todos = [
      { id: 1, text: 'A', completed: false },
      { id: 2, text: 'B', completed: false },
    ]
    const result = removeTodo(todos, 1)
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(2)
  })

  it('存在しないIDを指定しても配列はそのまま', () => {
    const todos = [{ id: 1, text: 'A', completed: false }]
    const result = removeTodo(todos, 999)
    expect(result.length).toBe(1)
  })
})

describe('toggleCompleted', () => {
  it('false → true にトグルされる', () => {
    const todos = [{ id: 1, text: 'A', completed: false }]
    const result = toggleCompleted(todos, 1)
    expect(result[0].completed).toBe(true)
  })

  it('true → false にトグルされる', () => {
    const todos = [{ id: 1, text: 'A', completed: true }]
    const result = toggleCompleted(todos, 1)
    expect(result[0].completed).toBe(false)
  })

  it('存在しないIDは変化しない', () => {
    const todos = [{ id: 1, text: 'A', completed: false }]
    const result = toggleCompleted(todos, 999)
    expect(result[0].completed).toBe(false)
  })

  it('元の配列を破壊しない（イミュータブル）', () => {
    const todos = [{ id: 1, text: 'A', completed: false }]
    toggleCompleted(todos, 1)
    expect(todos[0].completed).toBe(false)
  })
})

describe('countCompleted', () => {
  it('完了済みの件数を返す', () => {
    const todos = [
      { id: 1, text: 'A', completed: true },
      { id: 2, text: 'B', completed: false },
      { id: 3, text: 'C', completed: true },
    ]
    expect(countCompleted(todos)).toBe(2)
  })

  it('空配列なら0', () => {
    expect(countCompleted([])).toBe(0)
  })
})
