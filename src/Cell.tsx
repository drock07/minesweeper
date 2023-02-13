import React from 'react'
import { tv } from 'tailwind-variants'
import { GiMineExplosion, GiUnlitBomb } from 'react-icons/gi'
import { GrFlagFill } from 'react-icons/gr'
import { BiQuestionMark } from 'react-icons/bi'
import type { Cell as CellType } from './GameLogic/types'

interface CellProps
  extends CellType,
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {}

function Cell({ state, isMine, clicked, adjacentMines, ...props }: CellProps) {
  const cellClasses = tv({
    base: 'transition flex cursor-pointer items-center justify-center rounded md:rounded-lg bg-blue-400 text-xl',
    variants: {
      state: {
        HIDDEN: 'shadow-md',
        REVEALED: 'shadow-inner text-black bg-white',
        FLAG_MINE: 'shadow-md',
        FLAG_QUESTION: 'shadow-md',
      },
      isMine: {
        true: '',
      },
      clicked: {
        true: '',
      },
    },
    compoundVariants: [
      {
        state: 'REVEALED',
        isMine: true,
        clicked: true,
        class: 'bg-red-400',
      },
    ],
  })

  return (
    <button
      type='button'
      {...props}
      className={cellClasses({ state, isMine, clicked })}
    >
      {state === 'REVEALED' &&
        isMine &&
        (clicked ? <GiMineExplosion className='' /> : <GiUnlitBomb />)}
      {state === 'REVEALED' &&
        !isMine &&
        (adjacentMines > 0 ? adjacentMines : '')}
      {state === 'FLAG_MINE' && <GrFlagFill className='text-red-500' />}
      {state === 'FLAG_QUESTION' && <BiQuestionMark />}
    </button>
  )
}

export default Cell
