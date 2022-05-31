import { socket } from "../App";
import xSymbol from "../assets/xSymbol.svg";
import oSymbol from "../assets/oSymbol.svg";

export let symbol;

// const isGameOver = (board) => {
//   console.log("game over is true board", board);
//   let matches = ["XXX", "OOO"];
//   let rows = [
//     board.r0c0 + board.r0c1 + board.r0c2, // 1st line
//     board.r1c0 + board.r1c1 + board.r1c2, // 2nd line
//     board.r2c0 + board.r2c1 + board.r2c2, // 3rd line
//     board.r0c0 + board.r1c0 + board.r2c0, // 1st column
//     board.r0c1 + board.r1c1 + board.r2c1, // 2nd column
//     board.r0c2 + board.r1c2 + board.r2c2, // 3rd column
//     board.r0c0 + board.r1c1 + board.r2c2, // Primary diagonal
//     board.r0c2 + board.r1c1 + board.r2c0, // Secondary diagonal
//   ];

//   for (let i = 0; i < rows.length; i++) {
//     if (rows[i] === matches[0] || rows[i] === matches[1]) {
//       console.log("game over is true rows", rows[i]);
//       return true;
//     }
//   }

//   return false;
// };

// const renderTurnMessage = (myTurn) => {
//   if (!myTurn) {
//     const turnObj = { message: "Your opponent's turn", disabled: true };
//     return turnObj;
//   } else {
//     const turnObj = { message: "Your turn", disabled: false };
//     return turnObj;
//   }
// };

export const moveMade = (
  myTurn,
  setMyTurn,
  setWinMessage,
  board,
  handleSetBoard
) => {
  socket.on("move.made", (data) => {
    console.log("move made data", data);
    handleSetBoard(data.position, data.symbol);
    let theDiv = document.getElementById(data.position);
    let symbolSvg = document.createElement("img");
    symbolSvg.src =
      data.symbol === "X" ? xSymbol : data.symbol === "O" && oSymbol;
    symbolSvg.style.width = "50px";
    symbolSvg.style.height = "50px";
    // theDiv.textContent = data.symbol;
    theDiv.replaceChildren(symbolSvg);

    if (data.symbol !== symbol) {
      setMyTurn(true);
    }

    if (data.symbol === symbol) {
      setMyTurn(false);
    }

    // if (isGameOver(board)) {
    //   // Else show win/lose message
    //   if (myTurn) {
    //     setWinMessage("You lost.");
    //   } else {
    //     setWinMessage("You won!");
    //   }
    // }
  });
};

export const gameBegin = (setMyTurn, setWinMessage, setMySymbol) => {
  socket.on("game.begin", (data) => {
    symbol = data.symbol;
    setMyTurn(symbol === "X");
    setMySymbol(symbol);
  });
  socket.on("game.end", (data) => {
    setWinMessage(data.winMessage);
  });
};

export const makeMove = (
  cellSelected,
  position,
  myTurn,
  board,
  handleSetBoard,
  symbol
) => {
  if (!myTurn) {
    return;
  }

  if (cellSelected) {
    return;
  }
  const newBoard = { ...board, [position]: symbol };
  handleSetBoard(position, symbol);
  console.log(board, symbol);
  socket.emit("make.move", {
    symbol: symbol,
    position: position,
    board: newBoard,
  });
};

// export const riseRound = (setGameRound, gameRound) => {
//   socket.emit("reset.game");
//   setGameRound(gameRound + 1);
// };

// export const resetGame = (setBoard, setMyTurn, setWinMessage) => {
//   socket.on("game.reseted", (data) => {
//     const rowsId = [
//       "r0c0",
//       "r0c1",
//       "r0c2",
//       "r1c0",
//       "r1c1",
//       "r1c2",
//       "r2c0",
//       "r2c1",
//       "r2c2",
//     ];
//     rowsId.map((id) => {
//       let theDiv = document.getElementById(id);
//       theDiv.replaceChildren("");
//     });
//     setBoard({});
//     setMyTurn(data.myTurn);
//     setWinMessage("");
//   });
// };
