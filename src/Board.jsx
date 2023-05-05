import { useState } from 'react'

const Square = (props) =>{
    return(
        <>
            <button 
                className="square"
                onClick={props.onSquareClick}    
            >{props.value}</button>
        </>
    )
}

const calculateWinner = (squares) =>{
    const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i=0; i< wins.length; i++){
        const [a, b, c] = wins[i]
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
            return squares[a]
        }
    }
    return null
}

const Board = () =>{
    const [squares, setSquares] = useState(Array(9).fill(null));    
    const [xNext, setXNext] = useState(true)

    const winner = calculateWinner(squares)
    let gameStatus;

    if(winner){
        gameStatus = `${winner} Wins.`
    } else {
        gameStatus = `Next move: ${xNext ? "X" : "O"}`
    }

    const handleClick = (i) => {
        if (squares[i] || calculateWinner(squares)){
            return
        }
        const newSquares = squares.slice()
        if (xNext){
            newSquares[i] = "X"
        }else{
            newSquares[i] = "O"
        }
        setSquares(newSquares)
        setXNext(prevNext => !prevNext)
    }

    const resetGame = () => {
        setSquares(prevBoard => Array(9).fill(null))
        setXNext(true)
    }

    return (
        <>
            <div className="status">{gameStatus}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
            <button 
                className='reset-button'
                onClick={resetGame}
            >Reset</button>
        </>
      )
}

export default Board