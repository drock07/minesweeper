import { immerable } from 'immer'
import seedrandom from 'seedrandom'
import { CellState, WinState } from './types'
import GameBoard from './GameBoard'
import Cell from './Cell'

class GameState {
  public [immerable] = true

  public readonly cells: GameBoard
  public winState: WinState
  public gridSize: number
  public numMines: number
  public seed?: string

  public get numCells(): number {
    return this.cells.length
  }
  public get isActive(): boolean {
    return (
      this.winState === WinState.NEW || this.winState === WinState.IN_PROGRESS
    )
  }

  constructor(gridSize: number, numMines: number, seed?: string) {
    this.gridSize = gridSize
    this.numMines = numMines
    this.seed = seed
    this.cells = new GameBoard(gridSize, gridSize)
    this.winState = WinState.NEW

    // randomly pick mined indices
    const rng = seedrandom(seed)
    const minedIndices: number[] = []
    while (minedIndices.length < numMines) {
      const i = Math.floor(rng() * this.cells.length)
      if (!minedIndices.includes(i)) minedIndices.push(i)
    }

    // set the initial values for each cell
    for (let i = 0; i < this.cells.length; i++) {
      const [x, y] = this.cells.map1Dto2D(i)
      this.cells.set(
        x,
        y,
        new Cell(
          x,
          y,
          minedIndices.includes(i),
          this.cells
            .getNeighborIndices(x, y)
            .reduce(
              (sum, index) => sum + (minedIndices.includes(index) ? 1 : 0),
              0
            ),
          CellState.HIDDEN
        )
      )
    }
  }
}

export default GameState
