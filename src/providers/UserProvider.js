import React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { startGame } from '../utils/gameLogic';
import io from "socket.io-client";

export const userContext = createContext();

export function UserProvider({children}) {

  const [selectedUser,setSelectedUser] = useState(null)
  const [socket,setSocket] = useState(io(process.env.REACT_APP_US_URL))
  const [oponent,setOponent] = useState(null)
  const [server,setServer] = useState(null)
  const [gameState,setGameState] = useState("mainmenu")
  const [menuState,setMenuState] = useState("home")

  const startup = async () => {
    setSelectedUser({id:'1',server:undefined,oponent:undefined})
  }

  useEffect(() => {
      startup()
  },[])

  useEffect(() => {
    server && startGame(server,socket)
  }
  ,[server])

  useEffect(() => {
    console.log('server',server)
  }, [server])
  return (
    <userContext.Provider value={{ selectedUser,setSelectedUser,oponent,setOponent,server,setServer,gameState,setGameState,menuState,setMenuState,socket,setSocket }}>
      {children}
    </userContext.Provider>
  )
}

export const useUserProviderContext = () => {
  let context = useContext(userContext)
  return context
}