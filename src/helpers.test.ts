import { describe, expect, it } from 'vitest'
import {
  map1Dto2D,
  map2Dto1D,
  getNumberOfNeighborMines,
  unflattenArray,
} from './helpers'

describe('map1Dto2D', () => {
  it('maps 0 index', () => {
    expect(map1Dto2D(0, 10)).toEqual([0, 0])
  })

  it('maps first row', () => {
    expect(map1Dto2D(5, 6)).toEqual([5, 0])
  })

  it('maps not first row', () => {
    expect(map1Dto2D(4, 3)).toEqual([1, 1])
  })

  it('maps row boundary', () => {
    expect(map1Dto2D(3, 3)).toEqual([0, 1])
  })
})

describe('map2Dto1D', () => {
  it('maps 0 index', () => {
    expect(map2Dto1D(0, 0, 10)).toBe(0)
  })

  it('maps first row', () => {
    expect(map2Dto1D(5, 0, 6)).toBe(5)
  })

  it('maps not first row', () => {
    expect(map2Dto1D(1, 1, 3)).toBe(4)
  })

  it('maps row boundary', () => {
    expect(map2Dto1D(0, 1, 3)).toBe(3)
  })
})

describe('getNumberOfNeighborMines', () => {
  const grid = [true, false, true, false, true, false, true, false, true]

  it('get mines with full grid', () => {
    expect(getNumberOfNeighborMines(4, grid, 3)).toBe(4)
  })

  it('get mines with left boundary', () => {
    expect(getNumberOfNeighborMines(3, grid, 3)).toBe(3)
  })

  it('get mines with right boundary', () => {
    expect(getNumberOfNeighborMines(5, grid, 3)).toBe(3)
  })

  it('get mines with top boundary', () => {
    expect(getNumberOfNeighborMines(1, grid, 3)).toBe(3)
  })

  it('get mines with bottom boundary', () => {
    expect(getNumberOfNeighborMines(7, grid, 3)).toBe(3)
  })

  it('get mines with top left boundary', () => {
    expect(getNumberOfNeighborMines(0, grid, 3)).toBe(1)
  })

  it('get mines with top right boundary', () => {
    expect(getNumberOfNeighborMines(2, grid, 3)).toBe(1)
  })

  it('get mines with bottom left boundary', () => {
    expect(getNumberOfNeighborMines(6, grid, 3)).toBe(1)
  })

  it('get mines with bottom right boundary', () => {
    expect(getNumberOfNeighborMines(8, grid, 3)).toBe(1)
  })
})

describe('unflattenArray', () => {
  it('unflattens', () => {
    expect(unflattenArray([1, 2, 3], 1)).toEqual([[1], [2], [3]])
  })
})
