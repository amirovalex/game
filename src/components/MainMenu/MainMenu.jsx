import {useState} from 'react';
import usFlag from '../../assets/usflag.jpg'
import germanyFlag from '../../assets/germanyflag.jpg'
import menuBar from '../../assets/menubar.png'
import './MainMenu.css'
import { useUserProviderContext } from '../../providers/UserProvider.js';
import { useBoardProviderContext } from '../../providers/BoardProvider.js';
import io from "socket.io-client";
import {matchingBegin} from '../../utils/gameLogic.js'

const MainMenu = ({}) => {

  const [cellSelected,setCellSelected] = useState(null)
  const userContext = useUserProviderContext();
  const {server,setServer, gameState, setGameState,setSocket,socket} = userContext
  const boardContext = useBoardProviderContext();
  const {board,setBoard,myTurn,setMyTurn,winMessage,setWinMessage,mySymbol,setMySymbol,gameRound,setGameRound} = boardContext

  const handleServerSelect = (serverName) => {
    setServer(serverName)
    
    matchingBegin(setMyTurn, setWinMessage, setMySymbol,socket);
    setMySymbol(mySymbol);
    setGameState('game')
    // const socket = io(process.env.REACT_APP_US_URL);
    // setSocket(socket)
  }

  return (
    <div className='flex flex-col w-full p-6'>
        <div className='relative flex justify-center'>
        <img src={menuBar} height={200} alt="menubar"/>
       <div className="p-3 rounded-md blaka-regular text-xl sm:text-5xl md:text-6xl w-full server-select-title absolute ml-auto text-[#e3c79c] ">Select Server</div>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 gap-2">
            <div className='p-6 cursor-pointer relative'>
                <img src={usFlag} className="rounded-3xl hover:scale-105 ease-linear" alt="usflag" onClick={((e) => handleServerSelect('us'))}/>
            </div>
            <div className='p-6 cursor-pointer relative'>
                <img src={germanyFlag} className="rounded-3xl hover:scale-105 ease-linear" alt="germanyflag" onClick={((e) => handleServerSelect('de'))} />
            </div>
        </div>
    </div>
  );
}

export default MainMenu;