import { immerable } from 'immer'
import { type Cell as CellInterface, CellState } from './types'

class Cell implements CellInterface {
  public [immerable] = true

  public x: number = 0
  public y: number = 0
  public isMine: boolean = false
  public adjacentMines: number = 0
  public state: CellState = CellState.HIDDEN
  public clicked: boolean = false

  constructor(
    x: number = 0,
    y: number = 0,
    isMine: boolean = false,
    adjacentMines: number = 0,
    state: CellState = CellState.HIDDEN,
    clicked: boolean = false
  ) {
    this.x = x
    this.y = y
    this.isMine = isMine
    this.adjacentMines = adjacentMines
    this.state = state
    this.clicked = clicked
  }

  public get isRevealed(): boolean {
    return this.state === CellState.REVEALED
  }

  public get isHidden(): boolean {
    return this.state === CellState.HIDDEN
  }

  public get isFlagState(): boolean {
    return !this.isRevealed
  }

  public cycleFlagState(): void {
    switch (this.state) {
      case CellState.FLAG_MINE:
        this.state = CellState.FLAG_QUESTION
        break
      case CellState.FLAG_QUESTION:
        this.state = CellState.HIDDEN
        break
      case CellState.HIDDEN:
        this.state = CellState.FLAG_MINE
        break
      default:
        break
    }
  }
}

export default Cell
