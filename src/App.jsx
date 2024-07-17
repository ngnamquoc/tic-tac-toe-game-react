import Player from "./components/Player";
import Gameboard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";

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

function App() {
  const [gameTurns, setGameTurn] = useState([]);

  //identify current active player
  const activePlayer = identifyActivePlayer(gameTurns);
  //gameboard is upddated ver of initial game board
  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { position, player } = turn;
    const { row, col } = position;
    //update gameboard
    gameBoard[row][col] = player;
  }

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {winner && <p>You won {winner}!</p>}
        <Gameboard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
