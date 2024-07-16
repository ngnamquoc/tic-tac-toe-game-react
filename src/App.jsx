import Player from "./components/Player"
import Gameboard from "./components/GameBoard"
import { useState } from "react"
function App() {
  const [activePlayer, setActivePlayer]=useState('X');

  function handleSelectSquare(){
    setActivePlayer(
      (curActivePlayer)=>(curActivePlayer==="X"?"O":"X")
    );
    console.log("set to: "+activePlayer);
  }
  

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer==='X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer==='O'}/>
        </ol>
        <Gameboard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
      </div>

    </main>
  )
}

export default App
