import { CellState } from './types'

export function shuffle<T>(array: Array<T>): void {
  let m = array.length

  while (m) {
    const i = Math.floor(Math.random() * m--)
    const temp = array[m]
    array[m] = array[i]
    array[i] = temp
  }
}

export function unflattenArray<T>(array: T[], gridWidth: number): T[][] {
  const container: T[][] = []

  for (let i = 0; i < array.length; i += gridWidth) {
    container.push(array.slice(i, i + gridWidth))
  }

  return container
}

export function map1Dto2D(
  i: number,
  gridWidth: number
): readonly [number, number] {
  return [i % gridWidth, Math.floor(i / gridWidth)] as const
}

export function map2Dto1D(x: number, y: number, gridWidth: number): number {
  return gridWidth * y + x
}

export function getNumberOfNeighborMines(
  index: number,
  grid: boolean[],
  gridWidth: number
): number {
  let count = 0

  const [x, y] = map1Dto2D(index, gridWidth)

  // check top left
  if (x > 0 && y > 0 && grid[index - gridWidth - 1]) count++

  // check top middle
  if (y > 0 && grid[index - gridWidth]) count++

  // check top right
  if (x < gridWidth - 1 && y > 0 && grid[index - gridWidth + 1]) count++

  // check left
  if (x > 0 && grid[index - 1]) count++

  // check right
  if (x < gridWidth - 1 && grid[index + 1]) count++

  // check bottom left
  if (x > 0 && y < gridWidth - 1 && grid[index + gridWidth - 1]) count++

  // check bottom middle
  if (y < gridWidth - 1 && grid[index + gridWidth]) count++

  // check bottom right
  if (x < gridWidth - 1 && y < gridWidth - 1 && grid[index + gridWidth + 1])
    count++

  return count
}

export function getNextFlagState(state: CellState): CellState {
  switch (state) {
    case CellState.FLAG_MINE:
      return CellState.FLAG_QUESTION
    case CellState.FLAG_QUESTION:
      return CellState.HIDDEN
    case CellState.HIDDEN:
      return CellState.FLAG_MINE
    default:
      throw Error('Invalid flag state')
  }
}
