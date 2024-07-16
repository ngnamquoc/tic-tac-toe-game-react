import Player from "./components/Player"
import Gameboard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
function App() {
  const [gameTurns, setGameTurn]= useState([]);
  const [activePlayer, setActivePlayer]=useState('X');

  function handleSelectSquare(rowIndex,colIndex){
    setActivePlayer(
      (curActivePlayer)=>(curActivePlayer==="X"?"O":"X")
    );

    setGameTurn((preTurns)=>{
      let currentPlayer="X";
      if(preTurns.length > 0 && preTurns[0].player==="X"){
        currentPlayer="O";
      }
      const updatedTurnsArray=[{
        position:{
          row: rowIndex,
          col: colIndex
        },
        player: currentPlayer
      },...preTurns];
      return updatedTurnsArray;

    })
  }
  

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer==='X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer==='O'}/>
        </ol>
        <Gameboard onSelectSquare={handleSelectSquare} turnsLog={gameTurns}/>
      </div>

      <Log turns={gameTurns}/>

    </main>
  )
}

export default App
