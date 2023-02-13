export enum WinState {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  LOST = 'LOST',
  WON = 'WON',
}

export enum CellState {
  HIDDEN = 'HIDDEN',
  REVEALED = 'REVEALED',
  FLAG_MINE = 'FLAG_MINE',
  FLAG_QUESTION = 'FLAG_QUESTION',
}

export interface Cell {
  x: number
  y: number
  isMine: boolean
  adjacentMines: number
  state: CellState
  clicked: boolean
}
