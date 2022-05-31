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
      className="cell">
       {cellSelected}
    </div>
  );
}

export default Cell;