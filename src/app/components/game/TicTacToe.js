"use client";
"use client"; // This might be a specific directive or comment related to the development environment.

import React, { useState, useEffect } from 'react';

export default function TicTacToe() {
  // Create an initial game board with 9 empty squares.
  const initialBoard = Array(9).fill(null);

  // Initialize the state for the game board and whose turn it is.
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true); // True means it's X's turn.

  useEffect(() => {
    // This effect is triggered whenever the board or player turn changes.
    if (!xIsNext) {
      // If it's not X's turn, it's the computer's turn.

      // Calculate the best move for the computer ('O').
      const bestMove = getBestMove(board, 'O');

      // Trigger a click event on the best move for the computer.
      handleClick(bestMove);
    }
  }, [board, xIsNext]);

  const handleClick = (index) => {
    // Handle a square click event.

    // If there's already a winner or the square is already filled, do nothing.
    if (calculateWinner(board) || board[index]) {
      return;
    }

    // Create a new board array with the updated square.
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';

    // Update the board state with the new board.
    setBoard(newBoard);

    // Toggle the player's turn.
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => (
    // Render a single square button with its click event handler.
    <button
      key={index} // Add a unique key prop to each square.
      className="w-16 h-16 border border-gray-300 flex items-center justify-center text-4xl font-bold"
      onClick={() => handleClick(index)}
    >
      {board[index]} {/* Display the 'X' or 'O' on the square. */}
    </button>
  );

  // Determine if there's a winner or if it's a draw.
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square);

  // Display the appropriate game status message.
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? 'Draw!'
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const handleRestart = () => {
    // Reset the game by setting the board back to its initial state.
    setBoard(initialBoard);
    setXIsNext(true);
  };

  return (
    <div className="w-60 mx-auto mt-10">
      <div className="mb-5 text-2xl font-bold">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {/* Render the 9 game squares using the renderSquare function. */}
        {Array.from({ length: 9 }, (_, index) => renderSquare(index))}
      </div>
      <div className="flex justify-center mt-5">
        {/* Display a "Play Again" button if there's a winner or it's a draw. */}
        {(winner || isDraw) && (
          <button
            className="px-4 py-2 bg-zinc-800 text-white rounded"
            onClick={handleRestart}
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  );
}

// Function to calculate if there's a winner by checking the lines on the board.
const calculateWinner = (squares) => {
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
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // If the squares on a winning line all have the same value, return the winner.
      return squares[a];
    }
  }

  return null; // If no winner is found, return null.
};

// Function to calculate the computer's best move on the board.
const getBestMove = (board, player) => {
  const corners = [0, 2, 6, 8];
  const center = 4;
  const sides = [1, 3, 5, 7];

  // Prefer corner squares if available.
  for (let i = 0; i < corners.length; i++) {
    if (!board[corners[i]]) {
      return corners[i];
    }
  }

  // Prefer the center square if available.
  if (!board[center]) {
    return center;
  }

  // Prefer side squares if available.
  for (let i = 0; i < sides.length; i++) {
    if (!board[sides[i]]) {
      return sides[i];
    }
  }

  // If none of the preferred moves are available, choose a random empty square.
  const emptySquares = [];
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      emptySquares.push(i);
    }
  }
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
};
