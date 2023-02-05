import { useCallback } from 'react'
import { useImmerReducer } from 'use-immer'
import { GameState, CellState, type Cell } from './types'
import {
  getNextFlagState,
  getNumberOfNeighborMines,
  map1Dto2D,
  map2Dto1D,
  shuffle,
  unflattenArray,
} from './helpers'

interface ReducerState {
  grid: boolean[]
  cellStates: CellState[]
  gameState: GameState
  gridSize: number
  numMines: number
}

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

function generateNewGameState(
  gridSize: number,
  numMines: number
): ReducerState {
  const grid = new Array(gridSize * gridSize).fill(false)

  for (let i = 0; i < numMines; i++) {
    grid[i] = true
  }

  shuffle(grid)

  return {
    grid,
    cellStates: new Array(gridSize * gridSize).fill(CellState.HIDDEN),
    gameState: GameState.NEW,
    gridSize,
    numMines,
  }
}

function updateGameState(state: ReducerState): void {
  // check for loss
  const hasUncoveredMine = state.cellStates.some(
    (cellstate, i) => cellstate === CellState.REVEALED && state.grid[i]
  )
  if (hasUncoveredMine) {
    state.gameState = GameState.LOST
    return
  }

  // check for win
  const numRevealedCells = state.cellStates.reduce(
    (sum, cellState) => sum + (cellState === CellState.REVEALED ? 1 : 0),
    0
  )

  if (numRevealedCells === state.grid.length - state.numMines) {
    state.gameState = GameState.WON
    return
  }

  state.gameState = GameState.IN_PROGRESS
}

function useMinesweeper(gridSize: number = 10, numMines: number = 15) {
  const [state, dispatch] = useImmerReducer<ReducerState, Action, null>(
    (draft, action) => {
      switch (action.type) {
        case 'reveal': {
          const index = map2Dto1D(action.x, action.y, draft.gridSize)
          if (draft.cellStates[index] === CellState.HIDDEN) {
            draft.cellStates[index] = CellState.REVEALED
            updateGameState(draft)
          }
          break
        }
        case 'flag': {
          const index = map2Dto1D(action.x, action.y, draft.gridSize)
          if (draft.cellStates[index] !== CellState.REVEALED) {
            draft.cellStates[index] = getNextFlagState(draft.cellStates[index])
            updateGameState(draft)
          }
          break
        }
        default:
          break
      }
    },
    null,
    () => generateNewGameState(gridSize, numMines)
  )

  const revealCell = useCallback((x: number, y: number) => {
    dispatch({
      type: 'reveal',
      x,
      y,
    })
  }, [])

  const flagCell = useCallback((x: number, y: number) => {
    dispatch({
      type: 'flag',
      x,
      y,
    })
  }, [])

  const cells = unflattenArray(
    state.grid.map<Cell>((value, i) => {
      const [x, y] = map1Dto2D(i, state.gridSize)
      return {
        x,
        y,
        isMine: value,
        adjacentMines: getNumberOfNeighborMines(i, state.grid, state.gridSize),
        state: state.cellStates[i],
      }
    }),
    state.gridSize
  )

  return [cells, state.gameState, { revealCell, flagCell }, {}] as const
}

export default useMinesweeper
