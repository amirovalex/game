import { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board/Board.jsx";
import io from "socket.io-client";
import { matchingBegin, moveMade, symbol,riseRound } from "./utils/gameLogic";
import { useContext } from 'react';
import { useUserProviderContext } from './providers/UserProvider.js';
import { useBoardProviderContext } from "./providers/BoardProvider.js";
import MainMenu from "./components/MainMenu/MainMenu.jsx";
import TopBar from "./components/TopBar/TopBar.jsx"
import Footer from "./components/Footer/Footer.jsx"
// export let socket = io(process.env.REACT_APP_US_URL);
console.log(useUserProviderContext)
function App() {
  // const [board, setBoard] = useState({});
  // const [myTurn, setMyTurn] = useState(null);
  // const [winMessage, setWinMessage] = useState("");
  // const [mySymbol, setMySymbol] = useState("");
  // const [gameRound, setGameRound] = useState(false);
  const userContext = useUserProviderContext();
  const boardContext = useBoardProviderContext();
  const {board,setBoard,myTurn,setMyTurn,winMessage,setWinMessage,mySymbol,setMySymbol,gameRound,setGameRound} = boardContext
  const {selectedUser,setSelectedUser,oponent,setOponent,server,setServer,gameState,setGameState,menuState,setMenuState,socket} = userContext


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

    console.log(selectedUser)
  }, []);

  // useEffect(() => {
  //   resetGame(setBoard, setMyTurn, setWinMessage);
  // }, [gameRound]);

  useEffect(() => {
    console.log("THE BOARD", board);
    // console.log(b)
    moveMade(myTurn, handleSetTurn, setWinMessage, board, handleSetBoard,socket);
  }, [board]);

  return (
    <div className="App flex flex-col gap-6  justify-around" onClick={ ((e) => winMessage !== "" && riseRound(setGameRound,gameRound,socket) )}>
      <TopBar/>
      <div className="board-container w-[95%] sm:w-4/5 lg:w-3/5 xl:w-5/12 max-w-5/12">
      <div className="board bg-zinc-100/95 rounded-3xl p-6 w-full">
      {gameState==="game" ? <div className='blaka-regular text-[#392d36] text-xl sm:text-3xl md:text-4xl flex gap-2 w-full justify-between items-center'>
        <h1 className=''>{myTurn === null ? "Wait for another player to join" : myTurn ? "Your turn" : "Your opponent's turn"}</h1>
        <p className=''>Round 1/2</p>
      </div> :
      <div className='blaka-regular text-[#392d36] text-xl text-center sm:text-3xl md:text-4xl w-full'>
        {/* <h1 className="text-5xl">Hello User</h1> */}
        </div>}
        {gameState === "mainmenu" && 
          <MainMenu/>
        }
        {gameState === "game" && <Board
            symbol={mySymbol}
            board={board}
            handleSetBoard={handleSetBoard}
            myTurn={myTurn}
          />}

        </div>
      </div>
      <Footer/>
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
