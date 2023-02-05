import useMinesweeper from './useMinesweeper'
import Cell from './Cell'

function App() {
  const [cells, gameState, { revealCell, flagCell }] = useMinesweeper(10, 15)

  return (
    <div
      className='relative flex h-full w-full flex-col items-center justify-center bg-cover bg-center landscape:flex-row'
      style={{
        backgroundImage: `url(${'https://images.unsplash.com/photo-1675208986290-a72414630bbe'})`,
      }}
    >
      <div className='text-white'>{gameState}</div>
      <div
        className='grid aspect-square gap-1 overflow-hidden rounded-lg bg-white/20 p-3 shadow-2xl backdrop-blur-xl portrait:w-4/5 landscape:h-4/5'
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
              onContextMenu={(e) => {
                flagCell(cell.x, cell.y)
                e.preventDefault()
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App
