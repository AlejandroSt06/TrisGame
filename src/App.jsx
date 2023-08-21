import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { render } from 'react-dom'

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [isPlaying,setIsPlaying] = useState(false)
  const [winner, setWinner] = useState(null)
  const [winningCells, setWinningCells] = useState([]);
  const [point,setPoint] = useState({
    player1 : 0,
    player2 : 0,
  })
  const[buttonText,setButtonText] = useState("Start")
  const handleClick = (index) => {

    if (!board[index] && !winner && isPlaying) {
      const newBoard = [...board];//da capire
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      // Verifica se il giocatore corrente ha vinto
      if (checkWinner(newBoard, currentPlayer)) {
        setWinner(currentPlayer);
        setPoint((prevPoint) => {
          if (currentPlayer === 'X') {
            return { ...prevPoint, player1: prevPoint.player1 + 1 };
          } else {
            return { ...prevPoint, player2: prevPoint.player2 + 1 };
          }
        });

      } else {
        // Cambia il turno
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }

    }

  }

  const checkWinner = (currentBoard, player) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Righe
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonne
      [0, 4, 8], [2, 4, 6] // Diagonali
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (currentBoard[a] === player && currentBoard[b] === player && currentBoard[c] === player) {
        setWinningCells(combo)
        return true; // Il giocatore ha vinto
        
      }
    }

    return false; // Nessuna combinazione vincente
  };

  function restartGame() {

    setBoard(Array(9).fill(null))
    setCurrentPlayer('X');
    setWinner(null)
    setWinningCells([])

  }
function startGame(){
  setIsPlaying(true)
  setButtonText("Restart")
  setCurrentPlayer("X")
}
  const renderCell = (index) => (

    <div 
    key={index + 1} 
    className={`cell ${board[index] ? 'occupied' : ''} ${winningCells.includes(index) ? 'winning-cell' : ''}`} 
    onClick={() => handleClick(index)}>
      {board[index]}
    </div>
  )

  const winnerMessage = winner ? `Il giocatore ${winner} ha vinto!` : board.every((cell) => cell) ? 'Pareggio!' : isPlaying ? ' ' : 'Start Game';
  const showIfIsWinner = winner ? 'show' : board.every((cell) => cell) && 'show ';
  const hideIfIsPlaying = isPlaying && 'hide'
  return (
    <>
      <h1 className='tris-title'>Tris Game</h1>

      <div className= {isPlaying ? `tris-points show` : 'tris-points' }>
      <div className= 'tris-point-container'>
        <span>{point.player1}</span>
        
        <div className={currentPlayer === "X" && 'current-player-dash'}></div>
      </div>

      <div className= 'tris-point-container'>
        
         <span>{point.player2}</span>
        <div className={currentPlayer === "O" && 'current-player-dash'}></div>
      </div>
      </div>  
      
      
          <div className='game-container'>
<p className='current-player'>Tocca al giocatore <span className='current-player-span'>{currentPlayer}</span></p>
        <article>
          <div className='board'>

            {board.map((cell, index) => renderCell(index))}

          </div>
          <p className={`winner-message ${showIfIsWinner}`} >{winnerMessage}</p>
        </article>
        <aside>
<button className={isPlaying ? `restart-button ${showIfIsWinner}`: `start-button ${hideIfIsPlaying}`} onClick={isPlaying ? restartGame: startGame}>{buttonText}</button>   

  </aside>
      </div>
    </>
  )
}

export default App
