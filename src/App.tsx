import { tv } from 'tailwind-variants'
import useMinesweeper from './useMinesweeper'
import Cell from './Cell'
import { CellState, WinState } from './GameLogic/types'

function App() {
  const [cells, { gameState, numMines }, { revealCell, flagCell, chordCell }] =
    useMinesweeper(10, 15, 'david')

  const numFlags = cells.reduce(
    (sum, row) =>
      sum +
      row.reduce(
        (sum, cell) => sum + (cell.state === CellState.FLAG_MINE ? 1 : 0),
        0
      ),
    0
  )

  const boardClasses = tv({
    base: 'grid aspect-square gap-1 overflow-hidden rounded-lg bg-white/20 p-3 shadow-2xl backdrop-blur-xl portrait:w-4/5 landscape:h-4/5',
    variants: {
      gameState: {
        [WinState.NEW]: '',
        [WinState.IN_PROGRESS]: '',
        [WinState.LOST]: 'bg-red-500/20',
        [WinState.WON]: 'bg-green-500/20',
      },
    },
  })

  return (
    <div
      className='relative flex h-full w-full flex-col items-center justify-center gap-2 bg-cover bg-center landscape:flex-row'
      style={{
        backgroundImage: `url(${'https://images.unsplash.com/photo-1675208986290-a72414630bbe'})`,
      }}
    >
      <div className='flex flex-row text-white portrait:w-4/5 landscape:h-4/5 landscape:flex-col'>
        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 p-2 font-bold shadow-2xl backdrop-blur-xl landscape:h-16 landscape:w-16 landscape:text-2xl'>
          {numMines - numFlags}
        </div>
        {/* <div>{gameState}</div> */}
      </div>
      <div
        className={boardClasses({ gameState })}
        style={{
          gridTemplateColumns: `repeat(${10}, 1fr)`,
          gridTemplateRows: `repeat(${10}, 1fr)`,
        }}
      >
        {cells.map((row) =>
          row.map((cell) => (
            <Cell
              key={`${cell.x}-${cell.y}`}
              {...cell}
              onClick={() => revealCell(cell.x, cell.y)}
              onDoubleClick={() => chordCell(cell.x, cell.y)}
              onAuxClick={(e) => {
                if (e.button === 1) {
                  chordCell(cell.x, cell.y)
                } else if (e.button === 2) {
                  flagCell(cell.x, cell.y)
                }
              }}
              onContextMenu={(e) => e.preventDefault()}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App
