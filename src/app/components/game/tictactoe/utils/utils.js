export function minimax(board, player, isMaximizing) {
    // Function to implement the minimax algorithm
    const result = calculateWinner(board);
    const scores = {
        X: 1,
        O: -1,
        draw: 0,
    };
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

export function getBestMove(board, player, isMaximizing) {
    const availableMoves = [];
    for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
            availableMoves.push(i);
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

        return bestMove;
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

        return bestMove;
    }
}

export function calculateWinner(squares) {
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
}