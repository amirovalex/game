import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export const boardContext = createContext();

export function BoardProvider({children}) {
    const [board, setBoard] = useState({});
    const [myTurn, setMyTurn] = useState(null);
    const [winMessage, setWinMessage] = useState("");
    const [mySymbol, setMySymbol] = useState("");
    const [gameRound, setGameRound] = useState(false);

    return (
        <boardContext.Provider value={{ board, setBoard, myTurn, setMyTurn, winMessage, setWinMessage, mySymbol, setMySymbol, gameRound, setGameRound }}>
          {children}
        </boardContext.Provider>
      )
}

export const useBoardProviderContext = () => {
    let context = useContext(boardContext)
    return context
  }