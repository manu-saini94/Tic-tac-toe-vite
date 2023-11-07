
import './styles.scss'
import { useState } from 'react';
import Board from './components/Board';
import { calculateWinner } from './winner';
import StatusMessage from './components/StatusMessage';
import History from './components/History';

const NEW_GAME = [{squares:[null,null,null,null,null,null,null,null,null],isNext:false}];

function App()  {
  const [history, setHistory] = useState(NEW_GAME);


  const [currentMove,setCurrentMove] = useState(0);
  const gamingBoard = history[currentMove];

console.log(gamingBoard,"gamingBoard")
  const winner = calculateWinner(gamingBoard.squares);
  console.log(history,currentMove);

  const handleSquareClick = clickedPosition => {
    
    if (gamingBoard.squares[clickedPosition] || winner) return;
    setHistory(currentHistory => {

      const isTraversing = currentMove + 1 !== currentHistory.length

      const lastGamingState = isTraversing ? currentHistory[currentMove] : currentHistory[history.length - 1];

      const nextSquaresState = lastGamingState.squares.map(
        (squareValue, position) => {
          if (clickedPosition === position)
            return lastGamingState.isNext ? 'X' : 'O';
          return squareValue;
        }
      );

      const base = isTraversing ? currentHistory.slice(0,currentHistory.indexOf(lastGamingState)+1) : currentHistory;
      return base.concat({
        squares: nextSquaresState,
        isNext: !lastGamingState.isNext,
      });
    });

    setCurrentMove(move => move + 1);
  };

  const moveTo = (move) => {
    setCurrentMove(move);
  }

  return (
    <div className="app">
    <StatusMessage winner={winner} gamingBoard={gamingBoard} />
     <Board squares={gamingBoard.squares} handleSquareClick={handleSquareClick}/>  
     <h2>Current Game History</h2>
     <History history={history} currentMove={currentMove}  moveTo={moveTo} />
    </div>
  );
}

export default App
