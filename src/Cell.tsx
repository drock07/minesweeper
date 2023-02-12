import React from 'react'
import { tv } from 'tailwind-variants'
import type { Cell as CellType } from './types'

interface CellProps
  extends CellType,
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {}

function Cell({ x, y, state, isMine, adjacentMines, ...props }: CellProps) {
  const cellClasses = tv({
    base: 'transition flex cursor-pointer items-center justify-center rounded md:rounded-lg bg-blue-400 text-white text-xl',
    variants: {
      state: {
        HIDDEN: 'shadow-md',
        REVEALED: 'shadow-inner text-black bg-white',
        FLAG_MINE: 'shadow-md',
        FLAG_QUESTION: 'shadow-md',
      },
    },
  })

  return (
    <button type='button' {...props} className={cellClasses({ state })}>
      {state === 'REVEALED' &&
        (isMine ? 'B' : adjacentMines > 0 ? adjacentMines : '')}
      {state === 'FLAG_MINE' && '!'}
      {state === 'FLAG_QUESTION' && '?'}
    </button>
  )
}

export default Cell
