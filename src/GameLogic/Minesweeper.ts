import { CellState, WinState } from './types'
import GameState from './GameState'

class Minesweeper {
  ////////////////////
  // Public Methods //
  ////////////////////
  public static createGameState(
    gridSize: number,
    numMines: number,
    seed?: string
  ): GameState {
    return new GameState(gridSize, numMines, seed)
  }

  public static revealCell(state: GameState, x: number, y: number): void {
    if (!state.isActive) return
    const cell = state.cells.get(x, y)
    if (cell.isHidden) {
      cell.state = CellState.REVEALED
      cell.clicked = true

      if (!cell.isMine) {
        state.cells
          .getNeighbors(x, y)
          .forEach((neighbor) => this.floodFill(state, neighbor.x, neighbor.y))
      } else {
        state.cells.forEach((c) => {
          if (c.isMine && c.isHidden) c.state = CellState.REVEALED
        })
      }
      this.checkWinState(state)
    }
  }

  public static flagCell(state: GameState, x: number, y: number): void {
    if (!state.isActive) return
    const cell = state.cells.get(x, y)
    if (cell.isFlagState) {
      cell.cycleFlagState()
      this.checkWinState(state)
    }
  }

  public static chordCell(state: GameState, x: number, y: number): void {
    if (!state.isActive) return
    const cell = state.cells.get(x, y)
    const numFlaggedNeighbors = state.cells
      .getNeighbors(x, y)
      .reduce(
        (sum, neighbor) =>
          sum + (neighbor.state === CellState.FLAG_MINE ? 1 : 0),
        0
      )

    if (cell.isRevealed && numFlaggedNeighbors === cell.adjacentMines) {
      state.cells
        .getNeighbors(x, y)
        .forEach((neighbor) =>
          this.dangerousFloodFill(state, neighbor.x, neighbor.y)
        )
      this.checkWinState(state)
    }
  }

  /////////////////////
  // Private Methods //
  /////////////////////

  private static floodFill(
    state: GameState,
    x: number,
    y: number,
    canUncoverMine: boolean = false
  ): void {
    const cell = state.cells.get(x, y)

    if (cell.isHidden && (canUncoverMine ? true : !cell.isMine)) {
      cell.state = CellState.REVEALED

      if (cell.adjacentMines === 0) {
        state.cells
          .getNeighbors(x, y)
          .forEach((neighbor) =>
            this.floodFill(state, neighbor.x, neighbor.y, canUncoverMine)
          )
      }
    }
  }

  private static dangerousFloodFill(
    state: GameState,
    x: number,
    y: number
  ): void {
    this.floodFill(state, x, y, true)
  }

  private static checkWinState(state: GameState): void {
    // check for loss
    const hasUncoveredMine = state.cells.some(
      (cell) => cell.isRevealed && cell.isMine
    )

    if (hasUncoveredMine) {
      state.winState = WinState.LOST
      return
    }

    const numRevealedCells = state.cells.reduce(
      (sum, cell) => sum + (cell.isRevealed ? 1 : 0),
      0
    )

    if (numRevealedCells === state.numCells - state.numMines) {
      state.winState = WinState.WON
      return
    }

    state.winState = WinState.IN_PROGRESS
  }
}

export default Minesweeper
