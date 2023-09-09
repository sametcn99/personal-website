"use client";
import React, { useState, useEffect } from 'react';

export default function TicTacToe() {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    if (!xIsNext) {
      // Bilgisayarın sırası
      const randomIndex = getRandomEmptySquare(board);
      handleClick(randomIndex);
    }
  }, [board, xIsNext]);

  const handleClick = (index) => {
    if (calculateWinner(board) || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (index) => (
    <button
      className="w-16 h-16 border border-gray-300 flex items-center justify-center text-4xl font-bold"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? 'Draw!'
      : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const handleRestart = () => {
    setBoard(initialBoard);
    setXIsNext(true);
  };

  return (
    <div className="w-60 mx-auto mt-10">
      <div className="mb-5 text-2xl font-bold">{status}</div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }, (_, index) => renderSquare(index))}
      </div>
      <div className="flex justify-center mt-5">
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
      return squares[a];
    }
  }

  return null;
};

const getRandomEmptySquare = (board) => {
  const emptySquares = [];
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      emptySquares.push(i);
    }
  }
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
};
