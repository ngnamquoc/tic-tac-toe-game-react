import { useState } from "react"

const initialGameBoard=[
    [null,null,null],
    [null,null,null],
    [null,null,null]
]
export default function Gameboard(){
    const [gameBoard,setGameBoard]=useState(initialGameBoard);
    function handleSelectSquare(rowIndex,colIndex){
        setGameBoard((preGameBoard)=>{
            //create a copy of previous game board which is a js object
            //the best practice is not mutating js object directly
            const updatedGameBoard=[...preGameBoard.map(innnerArray=>[...innnerArray])];
            updatedGameBoard[rowIndex][colIndex]='X';
            return updatedGameBoard;

        })
    }
    return (
        <ol id="game-board">
            {gameBoard.map((row,rowIndex)=>(
                <li key={rowIndex}>
                <ol>
                    {row.map((symbol,colIndex) => (         
                        <li key={colIndex}><button onClick={()=>handleSelectSquare(rowIndex,colIndex)}>{symbol}</button></li>
                        ))}
                </ol>
            </li>
        ))}
        

        </ol>
    )
}

