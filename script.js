document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const cells = document.querySelectorAll('.cell');
    const resultScreen = document.querySelector('.result-screen');
    const resultMessage = document.querySelector('.result-message');
    const newGameBtn = document.querySelector('.new-game-btn');
    const resetGameBtn = document.querySelector('.reset-game-btn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });

    newGameBtn.addEventListener('click', () => resetGame());
    resetGameBtn.addEventListener('click', () => resetGame());

    function handleCellClick(cell) {
        const index = cell.getAttribute('data-cell-index');

        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);

            if (checkWinner()) {
                showResult(`Player ${currentPlayer} wins!`);
            } else if (gameBoard.every(cell => cell !== '')) {
                showResult('It\'s a draw!');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
        });
    }

    function showResult(message) {
        resultMessage.textContent = message;
        resultScreen.style.display = 'flex';
        gameActive = false;
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
        resultScreen.style.display = 'none';
        gameActive = true;
    }
});
