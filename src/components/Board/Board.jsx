import Cell from '../Cell/Cell.jsx';
import './board.css';

const Board = ({board,handleSetBoard,myTurn,symbol}) => {
  const rowsId = ["r0c0","r0c1","r0c2","r1c0","r1c1","r1c2","r2c0","r2c1","r2c2"]
  
  const renderRows = () => {
    return rowsId.map((id,index) => {
      return <Cell key={index} board={board} cellId={id} symbol={symbol} handleSetBoard={handleSetBoard} myTurn={myTurn}/>
      // return <div key={index} className="board-row">
      //   {row.map((id,indexId) => {
      //   })}
      // </div>
    })
  }

  return (
    <div className="board-container w-[95%] sm:w-4/5 lg:w-3/5 xl:w-5/12 max-w-5/12">
      <div className="board bg-zinc-100/95 rounded-3xl pb-6 w-full">
      <div className='blaka-regular text-[#392d36] text-xl sm:text-3xl md:text-4xl my-3 flex gap-2 w-[90%] justify-between items-center'>
        <h1 className=''>{myTurn === null ? "Wait for another player to join" : myTurn ? "Your turn" : "Your opponent's turn"}</h1>
        <p className=''>Round 1/2</p>

      </div>
        <div className="game-board grid grid-rows-3 grid-cols-3 p-6 gap-6">
        {renderRows()}
        </div>
      </div>
    </div>
  );
}

export default Board;