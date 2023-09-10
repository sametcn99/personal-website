"use client"; // This might be a specific directive or comment related to the development environment.
import React, { useState, useEffect, useCallback } from 'react';

export default function TicTacToe() {
  const initialBoard = Array(9).fill(null); // Create an initial game board with 9 empty squares
  const [board, setBoard] = useState(initialBoard); // Create a state variable to hold the game board
  const [xIsNext, setXIsNext] = useState(true); // Create a state variable to track whose turn it is (X or O)
  const [firstMove, setFirstMove] = useState(false); // Create a state variable to track if it's the first move

  const calculateWinner = (squares) => {
    // Function to determine the winner
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      // Check all possible winning combinations
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        // If the same player occupies all three squares in a winning combination
        return squares[a]; // Return the winning player (X or O)
      }
    }

    return null; // Return null if there's no winner
  };

  const getBestMove = (board, player, isMaximizing) => {
    // Function to calculate the best move using the minimax algorithm
    const availableMoves = [];
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        availableMoves.push(i); // Find all available (empty) squares
      }
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      let bestMove = null;

      for (let i = 0; i < availableMoves.length; i++) {
        const move = availableMoves[i];
        const newBoard = [...board];
        newBoard[move] = player;
        const score = minimax(newBoard, player, false);
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }

      return bestMove; // Return the best move for the maximizing player (X)
    } else {
      let bestScore = Infinity;
      let bestMove = null;

      for (let i = 0; i < availableMoves.length; i++) {
        const move = availableMoves[i];
        const newBoard = [...board];
        newBoard[move] = player === 'X' ? 'O' : 'X';
        const score = minimax(newBoard, player, true);
        if (score < bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }

      return bestMove; // Return the best move for the minimizing player (O)
    }
  };

  const scores = {
    X: 1,
    O: -1,
    draw: 0,
  };

  const minimax = (board, player, isMaximizing) => {
    // Function to implement the minimax algorithm
    const result = calculateWinner(board);

    if (result) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;

      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          const newBoard = [...board];
          newBoard[i] = player;
          const score = minimax(newBoard, player, false);
          bestScore = Math.max(score, bestScore);
        }
      }

      return bestScore;
    } else {
      let bestScore = Infinity;

      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          const newBoard = [...board];
          newBoard[i] = player === 'X' ? 'O' : 'X';
          const score = minimax(newBoard, player, true);
          bestScore = Math.min(score, bestScore);
        }
      }

      return bestScore;
    }
  };

  const handleClick = useCallback((index) => {
    // Handle a square click
    if (calculateWinner(board) || board[index]) {
      // If there's a winner or the square is already filled, do nothing
      return;
    }

    const newBoard = [...board]; // Create a copy of the current board
    newBoard[index] = xIsNext ? 'X' : 'O'; // Place X or O on the clicked square
    setBoard(newBoard); // Update the game board state
    setXIsNext(!xIsNext); // Toggle the turn to the next player
  }, [board, xIsNext]);

  useEffect(() => {
    if (xIsNext && firstMove === false) {
      // If it's X's turn and it's the first move
      const randomIndex = Math.floor(Math.random() * 9); // Generate a random index
      handleClick(randomIndex); // Perform a random move
      setFirstMove(true); // Set firstMove to true to indicate that the first move has been made
    } else if (xIsNext) {
      // If it's X's turn and not the first move
      const bestMove = getBestMove(board, 'O', xIsNext); // Calculate the best move for X
      handleClick(bestMove); // Perform the best move
    }
  }, [xIsNext, firstMove, handleClick, board]);

  const renderSquare = (index) => (
    // Render a square button
    <button
      key={index}
      className="w-16 h-16 border border-gray-300 flex items-center justify-center text-4xl font-bold"
      onClick={() => handleClick(index)} // Call handleClick when the square is clicked
    >
      {board[index]} {/* Display the X or O on the square */}
    </button>
  );

  const winner = calculateWinner(board); // Determine if there's a winner
  const isDraw = !winner && board.every((square) => square); // Check if it's a draw

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? 'Draw!'
    : `${xIsNext ? 'Computer\'s Turn' : 'Your Turn'}`; // Determine the game status message

  const handleRestart = () => {
    // Handle game restart
    setBoard(initialBoard); // Reset the game board
    setXIsNext(true); // Set X as the first player
    setFirstMove(false); // Reset the firstMove variable
  };

  return (
    <div className="w-60 mx-auto mt-10">
      <div className="mb-5 text-2xl font-bold select-none">{status}</div>
      <div className="grid grid-cols-3 gap-2 select-none">
        {Array.from({ length: 9 }, (_, index) => renderSquare(index))}
        {/* Render the game board with squares */}
      </div>
      <div className="flex justify-center mt-5 select-none">
        {(winner || isDraw) && (
          // Show the "Play Again" button if there's a winner or it's a draw
          <button
            className="px-4 py-2 bg-zinc-800 text-white rounded select-none"
            onClick={handleRestart} // Call handleRestart when the button is clicked
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}
