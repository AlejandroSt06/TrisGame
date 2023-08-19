import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { render } from 'react-dom'

function App() {

const [board,setBoard] = useState(Array(9).fill(null))
const [currentPlayer,setCurrentPlayer] = useState('X');
const [winner,setWinner] = useState(null)

const handleClick = (index) =>{

  if (!board[index] && !winner) {
    const newBoard = [...board];//da capire
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    // Verifica se il giocatore corrente ha vinto
    if (checkWinner(newBoard, currentPlayer)) {
      setWinner(currentPlayer);
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
      return true; // Il giocatore ha vinto
    }
  }

  return false; // Nessuna combinazione vincente
};

const renderCell = (index) =>(

  <div key = {index + 1} className={`cell ${board[index] ? 'occupied' : ''}`} onClick={() => handleClick(index)}>
  {board[index]}
</div>
)
const winnerMessage = winner ? `Il giocatore ${winner} ha vinto!` : board.every((cell) => cell) ? 'Pareggio!' : '';
  return (
    <>
     <h1>Tris Game</h1>
     <div className='board'>

{board.map((cell,index) => renderCell(index))}

     </div>
     <p>{winnerMessage}</p>
    </>
  )
}

export default App
