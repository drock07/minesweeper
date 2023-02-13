import { useCallback } from 'react'
import { useImmerReducer } from 'use-immer'
import Minesweeper from './GameLogic/Minesweeper'
import GameState from './GameLogic/GameState'

type Action =
  | {
      type: 'reveal'
      x: number
      y: number
    }
  | {
      type: 'flag'
      x: number
      y: number
    }
  | {
      type: 'chord'
      x: number
      y: number
    }

function useMinesweeper(
  gridSize: number = 10,
  numMines: number = 15,
  seed?: string
) {
  const [state, dispatch] = useImmerReducer<GameState, Action, null>(
    (draft, action) => {
      switch (action.type) {
        case 'reveal': {
          Minesweeper.revealCell(draft, action.x, action.y)
          break
        }
        case 'flag': {
          Minesweeper.flagCell(draft, action.x, action.y)
          break
        }
        case 'chord': {
          Minesweeper.chordCell(draft, action.x, action.y)
          break
        }
        default:
          break
      }
    },
    null,
    () => Minesweeper.createGameState(gridSize, numMines, seed)
  )

  const revealCell = useCallback(
    (x: number, y: number) =>
      dispatch({
        type: 'reveal',
        x,
        y,
      }),
    []
  )

  const flagCell = useCallback(
    (x: number, y: number) =>
      dispatch({
        type: 'flag',
        x,
        y,
      }),
    []
  )

  const chordCell = useCallback(
    (x: number, y: number) =>
      dispatch({
        type: 'chord',
        x,
        y,
      }),
    []
  )

  return [
    state.cells.toNestedArray(),
    {
      gameState: state.winState,
      numMines: state.numMines,
      gridSize: state.gridSize,
    },
    { revealCell, flagCell, chordCell },
    {},
  ] as const
}

export default useMinesweeper
