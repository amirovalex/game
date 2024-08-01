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
    <div className='flex items-center flex-col w-full h-100 justify-evenly'>
        <div className='max-w-[450px] relative flex justify-center'>
        <img src={menuBar} height={200} alt="menubar"/>
       <div className="rounded-md blaka-regular text-3xl sm:text-5xl md:text-6xl w-full server-select-title absolute ml-auto text-[#e3c79c] gap-6">Servers</div>
        </div>
        <div className="flex flex-row flex-nowrap gap-2 justify-center">
            <div className='max-w-[200px]  sm:p-6 cursor-pointer relative flex flex-col'>
                <img src={usFlag} className="rounded-3xl hover:scale-105 ease-linear" alt="usflag" onClick={((e) => handleServerSelect('us'))}/>
                <span className='text-2xl blaka-regular'>0/250</span>
            </div>
            <div className='max-w-[200px] sm:p-6 cursor-pointer relative flex flex-col'>
                <img src={germanyFlag} className="rounded-3xl hover:scale-105 ease-linear" alt="germanyflag" onClick={((e) => handleServerSelect('de'))} />
                <span className='text-2xl blaka-regular'>0/250</span>

            </div>
        </div>
    </div>
  );
}

export default MainMenu;