import React from 'react'
import { tv } from 'tailwind-variants'
import type { Cell as CellType } from './types'

interface CellProps
  extends CellType,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > {}

function Cell({ x, y, state, isMine, adjacentMines, ...props }: CellProps) {
  const cellClasses = tv({
    base: 'transition flex cursor-pointer items-center justify-center rounded md:rounded-lg bg-slate-400 text-blue-500 text-xl',
    variants: {
      state: {
        HIDDEN: 'shadow-md',
        REVEALED: 'shadow-inner border border-slate-300 bg-slate-200',
        FLAG_MINE: 'shadow-md',
        FLAG_QUESTION: 'shadow-md',
      },
    },
  })

  return (
    <div {...props} className={cellClasses({ state })}>
      {state === 'REVEALED' &&
        (isMine ? 'B' : adjacentMines > 0 ? adjacentMines : '')}
      {state === 'FLAG_MINE' && '!'}
      {state === 'FLAG_QUESTION' && '?'}
    </div>
  )
}

export default Cell
