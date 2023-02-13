import { describe, expect, it } from 'vitest'
import GameState from './GameState'
import { produce } from 'immer'

describe('GameState', () => {
  it('copies immutably', () => {
    const state1 = new GameState(3, 3)
    const state2 = produce<GameState>(state1, (draft) => {
      draft.mineGrid[0] = true
    })

    expect(state2).not.toBe(state1)
    expect(state1.mineGrid).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ])
    expect(state2.mineGrid).toEqual([
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ])
  })
})
