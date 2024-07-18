export default function Gameover({winner, rematch, playerNames}){
    // console.log(playerNames, winner);

    return(
        <div id="game-over">
            <h2>Game Over!</h2>
           
            {winner && <p>{playerNames[winner]} won!</p>}
            {!winner && <p>It&apos;s a draw!</p>}

            <p>
                <button onClick={rematch}>Rematch!</button>
            </p>
        </div>
    )
}