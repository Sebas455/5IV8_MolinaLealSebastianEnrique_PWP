// Estado del juego
let game = {
    smallBoards: Array(9).fill(null).map(() => Array(9).fill('')),
    bigBoard: Array(9).fill(''),
    currentPlayer: 'X',
    nextSmallBoard: null,
    gameOver: false,
    winner: null
};

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// DOM Elements
const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

// Funciones auxiliares
function checkWinner(cells) {
    for (const [a, b, c] of winningCombos) {
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }
    return null;
}

function isBoardFull(board) {
    return board.every(cell => cell !== '');
}

function updateStatus() {
    if (game.gameOver) {
        statusEl.textContent = `¡${game.winner} ha ganado el juego!`;
        statusEl.style.color = game.winner === 'X' ? '#667eea' : '#764ba2';
    } else {
        statusEl.textContent = `Turno: ${game.currentPlayer}`;
        statusEl.style.color = game.currentPlayer === 'X' ? '#667eea' : '#764ba2';
    }
}

function renderBoard() {
    boardEl.innerHTML = '';

    for (let boardIdx = 0; boardIdx < 9; boardIdx++) {
        const smallBoardEl = document.createElement('div');
        smallBoardEl.className = 'small-board';
        smallBoardEl.id = `board-${boardIdx}`;

        // Aplicar clase si el tablero fue ganado
        if (game.bigBoard[boardIdx] === 'X') {
            smallBoardEl.classList.add('won-x');
        } else if (game.bigBoard[boardIdx] === 'O') {
            smallBoardEl.classList.add('won-o');
        }

        // Indicar tablero activo obligatorio
        if (game.nextSmallBoard !== null && game.nextSmallBoard === boardIdx && game.bigBoard[boardIdx] === '') {
            smallBoardEl.classList.add('active-board');
        }

        // Crear celdas del tablero pequeño
        for (let cellIdx = 0; cellIdx < 9; cellIdx++) {
            const cellEl = document.createElement('button');
            cellEl.className = 'cell';
            cellEl.textContent = game.smallBoards[boardIdx][cellIdx];

            // Agregar clase según el jugador
            if (game.smallBoards[boardIdx][cellIdx] === 'X') {
                cellEl.classList.add('x');
            } else if (game.smallBoards[boardIdx][cellIdx] === 'O') {
                cellEl.classList.add('o');
            }

            // Resaltar celdas activas si este es el tablero obligatorio y la celda está vacía
            if (game.nextSmallBoard !== null && game.nextSmallBoard === boardIdx && game.bigBoard[boardIdx] === '' && game.smallBoards[boardIdx][cellIdx] === '') {
                cellEl.classList.add('active-cell');
            }

            cellEl.addEventListener('click', () => handleCellClick(boardIdx, cellIdx, cellEl));

            smallBoardEl.appendChild(cellEl);
        }

        boardEl.appendChild(smallBoardEl);
    }
}

function handleCellClick(boardIdx, cellIdx, cellEl) {
    // Validar si el juego ha terminado
    if (game.gameOver) return;

    // Función clara para decidir si se permite jugar en este tablero
    function canPlayInBoard(bIdx) {
        // si juego terminó no permite
        if (game.gameOver) return false;
        // si el tablero ya fue ganado no permite
        if (game.bigBoard[bIdx] !== '') return false;
        // si nextSmallBoard es null => se puede jugar en cualquier tablero no ganado
        if (game.nextSmallBoard === null) return true;
        // si nextSmallBoard está definido, solo se puede jugar ahí
        return bIdx === game.nextSmallBoard;
    }

    // Validar si se permite jugar en el tablero seleccionado
    if (!canPlayInBoard(boardIdx)) return;

    // Validar si la celda ya está ocupada
    if (game.smallBoards[boardIdx][cellIdx] !== '') return;

    // Realizar la jugada
    game.smallBoards[boardIdx][cellIdx] = game.currentPlayer;

    // Verificar si ganó el tablero pequeño
    const winnerSmall = checkWinner(game.smallBoards[boardIdx]);
    if (winnerSmall) {
        game.bigBoard[boardIdx] = winnerSmall;
    }

    // Verificar si ganó el juego grande
    const winnerBig = checkWinner(game.bigBoard);
    if (winnerBig) {
        game.gameOver = true;
        game.winner = winnerBig;
        updateStatus();
        renderBoard();
        return;
    }

    // Verificar si el juego es un empate (todos los tableros pequeños están llenos)
    const allBoardsFull = game.bigBoard.every(board => board !== '');
    if (allBoardsFull && !game.gameOver) {
        game.gameOver = true;
        game.winner = 'Empate';
        statusEl.textContent = '¡Empate!';
        statusEl.style.color = '#666';
        renderBoard();
        return;
    }

    // Cambiar turno
    game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';

    // Determinar el siguiente tablero pequeño
    const nextBoardIdx = cellIdx;
    if (game.bigBoard[nextBoardIdx] === '' && !isBoardFull(game.smallBoards[nextBoardIdx])) {
        game.nextSmallBoard = nextBoardIdx;
    } else {
        game.nextSmallBoard = null;
    }

    updateStatus();
    renderBoard();
}

function resetGame() {
    game = {
        smallBoards: Array(9).fill(null).map(() => Array(9).fill('')),
        bigBoard: Array(9).fill(''),
        currentPlayer: 'X',
        nextSmallBoard: null,
        gameOver: false,
        winner: null
    };
    updateStatus();
    renderBoard();
}

// Event Listeners
resetBtn.addEventListener('click', resetGame);

// Inicializar el juego
updateStatus();
renderBoard();
