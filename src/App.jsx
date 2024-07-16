import Player from "./components/Player"
import Gameboard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";

//Helper function
function identifyActivePlayer(gameTurns){
   let currentPlayer="X";
   if(gameTurns.length > 0 && gameTurns[0].player==="X"){
     currentPlayer="O";
   }
   return currentPlayer;
}
function App() {
  const [gameTurns, setGameTurn]= useState([]);

  //identify current active player
  const activePlayer=identifyActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex,colIndex){
    setGameTurn((preTurns)=>{
      let currentPlayer=identifyActivePlayer(preTurns);
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
