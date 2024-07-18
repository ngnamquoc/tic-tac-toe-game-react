import Player from "./components/Player";
import Gameboard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import Gameover from "./components/Gameover";

//Helper function
function identifyActivePlayer(gameTurns) {
  //pass array
  let currentPlayer = "X"; //default
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const playerNotation={
  X:'Player 1',
  O:'Player 2'
}

function checkWinner(gameBoard){
  let winner = null;

  //Dynamically check for winner
  for (const combination of WINNING_COMBINATIONS) {
    let firstCellSymbol = gameBoard[combination[0].row][combination[0].column];
    let secondCellSymbol = gameBoard[combination[1].row][combination[1].column];
    let thirdCellSymbol = gameBoard[combination[2].row][combination[2].column];
    if (
      firstCellSymbol &&
      firstCellSymbol === secondCellSymbol &&
      firstCellSymbol === thirdCellSymbol
    ) {
      winner = firstCellSymbol;
    }
  }
  return winner;

}

function deriveGameBoard(gameTurns){
  //make a deep copy of initialGameBoard array
  let gameBoard = [...initialGameBoard.map(innerArray=>[...innerArray])];

  for (const turn of gameTurns) {
    const { position, player } = turn;
    const { row, col } = position;
    //update gameboard
    gameBoard[row][col] = player;
  }
  return gameBoard;

}

function App() {
  const [players, setPlayers]= useState(playerNotation);
  const [gameTurns, setGameTurn] = useState([]);

  //initial and dynamically update gameboard
  let gameBoard = deriveGameBoard(gameTurns);

  //identify current active player
  const activePlayer = identifyActivePlayer(gameTurns);
  
  //check for winner
  let winner = checkWinner(gameBoard);

  //check for draw game
  const isDraw = gameTurns.length===9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurn((preTurns) => {
      let currentPlayer = identifyActivePlayer(preTurns);
      const updatedTurnsArray = [
        {
          position: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...preTurns,
      ];
      return updatedTurnsArray;
    });
  }

  //function to rematch
  function handleRematch(){
    setGameTurn([]);
  }
  //function to record name change
  function handleNameChange(symbol,newName){
    setPlayers(prePlayers=>{
      return{
        ...prePlayers,
        [symbol]:newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={playerNotation.X}
            symbol="X"
            isActive={activePlayer === "X"}
            updatePlayerName={handleNameChange}
          />
          <Player
            initialName={playerNotation.O}
            symbol="O"
            isActive={activePlayer === "O"}
            updatePlayerName={handleNameChange}
          />
        </ol>
        {(winner || isDraw) && <Gameover playerNames={players} winner={winner} rematch={handleRematch}/>}
        <Gameboard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
