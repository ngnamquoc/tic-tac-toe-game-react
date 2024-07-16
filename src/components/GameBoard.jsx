import { useState } from "react"

const initialGameBoard=[
    [null,null,null],
    [null,null,null],
    [null,null,null]
]
export default function Gameboard({onSelectSquare, turnsLog}){
    //gameBoard is a computed state which is derived from another state (Deriving state)
    let gameBoard=initialGameBoard;
    for(const turn of turnsLog){
        const {position, player}=turn;
        const {row,col} = position;
        //update gameboard
        gameBoard[row][col]=player;
    }
    
    return (
        <ol id="game-board">
            {gameBoard.map((row,rowIndex)=>(
                <li key={rowIndex}>
                <ol>
                    {row.map((symbol,colIndex) => (         
                        <li key={colIndex}><button onClick={()=>onSelectSquare(rowIndex,colIndex)}>{symbol}</button></li>
                        ))}
                </ol>
            </li>
        ))}
        

        </ol>
    )
}

