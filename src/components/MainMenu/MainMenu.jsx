import {useState} from 'react';
import usFlag from '../../assets/usflag.jpg'
import germanyFlag from '../../assets/germanyflag.jpg'
import menuBar from '../../assets/menubar.png'
import './MainMenu.css'
import { useUserProviderContext } from '../../providers/UserProvider.js';

const MainMenu = ({}) => {

  const [cellSelected,setCellSelected] = useState(null)
  const userContext = useUserProviderContext();
  const {server,setServer, gameState, setGameState} = userContext

  const handleServerSelect = (serverName) => {
    setServer(serverName)
    setGameState('game')
    
  }

  return (
    <div className='flex flex-col w-full p-6'>
        <div className='relative flex justify-center'>
        <img src={menuBar} height={200} alt="menubar"/>
       <div className="p-3 rounded-md blaka-regular text-xl sm:text-5xl md:text-6xl w-full server-select-title absolute ml-auto text-[#e3c79c] ">Select Server</div>
        </div>
        <div className="grid grid-cols-2 grid-rows-1 gap-2">
            <div className='p-6 cursor-pointer' onClick={((e) => handleServerSelect('us'))}>
                <img src={usFlag} className="rounded-md" alt="usflag" />
            </div>
            <div className='p-6 cursor-pointer'>
                <img src={germanyFlag} className="rounded-md" alt="germanyflag" onClick={((e) => handleServerSelect('de'))} />
            </div>
        </div>
    </div>
  );
}

export default MainMenu;