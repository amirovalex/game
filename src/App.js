import { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board/Board.jsx";
import io from "socket.io-client";
import { gameBegin, moveMade, symbol } from "./utils/gameLogic";
export const socket = io(process.env.REACT_APP_BACKEND_URL);

function App() {
  const [board, setBoard] = useState({});
  const [myTurn, setMyTurn] = useState(null);
  const [winMessage, setWinMessage] = useState("");
  const [mySymbol, setMySymbol] = useState("");
  const [gameRound, setGameRound] = useState(false);

  const handleSetBoard = (position, symbol) => {
    console.log("handle set board", position, symbol);
    setBoard({ ...board, [position]: symbol });
  };
  const handleSetTurn = (bool) => {
    setMyTurn(bool);
  };

  useEffect(() => {
    console.log(winMessage);
  }, [winMessage]);
  useEffect(() => {
    setMySymbol(symbol);
    gameBegin(setMyTurn, setWinMessage, setMySymbol);
  }, []);

  // useEffect(() => {
  //   resetGame(setBoard, setMyTurn, setWinMessage);
  // }, [gameRound]);

  useEffect(() => {
    console.log("THE BOARD", board);
    // console.log(b)
    moveMade(myTurn, handleSetTurn, setWinMessage, board, handleSetBoard);
  }, [board]);

  return (
    <div className="App">
      <Board
        symbol={mySymbol}
        board={board}
        handleSetBoard={handleSetBoard}
        myTurn={myTurn}
      />
      <div
        className="win-message-container blaka-regular text-8xl" 
        style={{
          display:
            winMessage === "You won!" || winMessage === "You lost!"
              ? "flex"
              : "none",
        }}
      >
        {/* <button onClick={() => riseRound(setGameRound, gameRound)}>
          Reset
        </button> */}
        <h1 id="winMessage">{winMessage}</h1>
      </div>
    </div>
  );
}

export default App;
