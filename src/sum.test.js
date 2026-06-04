import { describe, it, expect } from 'vitest'
import { sum } from './sum'

describe('sum', () => {
  it('1 + 2 は 3 になる', () => {
    expect(sum(1, 2)).toBe(3)
  })

  it('マイナス同士も足せる', () => {
    expect(sum(-2, -3)).toBe(-5)
  })
})
