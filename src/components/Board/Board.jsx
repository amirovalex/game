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
        <div className="game-board grid grid-rows-3 grid-cols-3 sm:py-3 gap-6">
        {renderRows()}
        </div>
  );
}

export default Board;