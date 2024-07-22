import {useState} from 'react';
import "./cell.css";
import { makeMove,symbol } from '../../utils/gameLogic';
const Cell = ({board,myTurn,cellId,handleSetBoard,symbol}) => {

  const [cellSelected,setCellSelected] = useState(null)

  return (
    <div
      id={cellId}
      onClick={(e) => {
        !board[cellId] && makeMove(cellSelected, cellId, myTurn,board, handleSetBoard,symbol)
        }
      }
      className="cell bg-zinc-400/25 rounded-xl w-full h-full relative">
        <div className='bg-black rounded-xl absolute top-0 left-0 h-full w-full opacity-50 hover:opacity-40'></div>
       {cellSelected && <img src={`../../../public/${cellSelected === "X" ? "xElement.png" : "oElement.png"}`}/>}

    </div>
  );
}

export default Cell;