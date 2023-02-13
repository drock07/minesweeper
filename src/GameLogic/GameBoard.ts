import { immerable } from 'immer'
import Cell from './Cell'

class GameBoard {
  public [immerable] = true

  public readonly cells: Cell[]
  public readonly width: number
  public readonly height: number
  public get length() {
    return this.width * this.height
  }

  constructor(width: number, height: number) {
    this.width = width
    this.height = height

    this.cells = new Array(width * height)
  }

  public get(x: number, y: number): Cell {
    const index = this.map2Dto1D(x, y)
    return this.cells[index]
  }

  public set(x: number, y: number, value: Cell): void {
    const index = this.map2Dto1D(x, y)
    this.cells[index] = value
  }

  public getNeighbors(x: number, y: number): Cell[] {
    return this.getNeighborIndices(x, y).map((i) => this.cells[i])
  }

  public toNestedArray(): Cell[][] {
    const container: Cell[][] = []

    for (let i = 0; i < this.cells.length; i += this.width) {
      container.push(this.cells.slice(i, i + this.width))
    }

    return container
  }

  public forEach(
    callback: (value: Cell, x: number, y: number, array: Cell[]) => void,
    thisArg?: any
  ): void {
    this.cells.forEach((value, index, array) => {
      const [x, y] = this.map1Dto2D(index)
      callback(value, x, y, array)
    }, thisArg)
  }

  public map<T>(
    callback: (value: Cell, x: number, y: number, array: Cell[]) => T,
    thisArg?: any
  ) {
    return this.cells.map((value, index, array) => {
      const [x, y] = this.map1Dto2D(index)
      callback(value, x, y, array)
    }, thisArg)
  }

  public some(
    predicate: (value: Cell, x: number, y: number, array: Cell[]) => boolean,
    thisArg?: any
  ): boolean {
    return this.cells.some((value, index, array) => {
      const [x, y] = this.map1Dto2D(index)
      return predicate(value, x, y, array)
    }, thisArg)
  }

  public reduce<T>(
    callbackfn: (
      previousValue: T,
      currentValue: Cell,
      x: number,
      y: number,
      array: Cell[]
    ) => T,
    initialValue: T
  ): T {
    return this.cells.reduce((prev, cur, index, array) => {
      const [x, y] = this.map1Dto2D(index)
      return callbackfn(prev, cur, x, y, array)
    }, initialValue)
  }

  public map2Dto1D(x: number, y: number): number {
    return this.width * y + x
  }

  public map1Dto2D(index: number): readonly [number, number] {
    return [index % this.width, Math.floor(index / this.width)] as const
  }

  public getNeighborIndices(x: number, y: number): number[] {
    const index = this.map2Dto1D(x, y)
    const indices: number[] = []

    // check top left
    if (x > 0 && y > 0) indices.push(index - this.width - 1)

    // check top middle
    if (y > 0) indices.push(index - this.width)

    // check top right
    if (x < this.width - 1 && y > 0) indices.push(index - this.width + 1)

    // check left
    if (x > 0) indices.push(index - 1)

    // check right
    if (x < this.width - 1) indices.push(index + 1)

    // check bottom left
    if (x > 0 && y < this.height - 1) indices.push(index + this.width - 1)

    // check bottom middle
    if (y < this.height - 1) indices.push(index + this.width)

    // check bottom right
    if (x < this.width - 1 && y < this.height - 1)
      indices.push(index + this.width + 1)

    return indices
  }
}

export default GameBoard
