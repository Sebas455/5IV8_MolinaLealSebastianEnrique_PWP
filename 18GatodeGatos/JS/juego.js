const bigBoardEl = document.getElementById('bigBoard');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let boards = Array(9).fill(null).map(() => Array(9).fill(''));
let bigBoard = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;
let nextBoard = null; // tablero pequeño donde debe jugar el siguiente

// Crear las 9 tableros pequeños con sus 9 celdas
document.querySelectorAll('.small-board').forEach((sb, boardIndex) => {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('button');
    cell.classList.add('cell');
    cell.dataset.board = boardIndex;
    cell.dataset.index = i;
    sb.appendChild(cell);
  }
});

// Combinaciones ganadoras
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function updateStatus(msg) {
  statusEl.textContent = msg;
}

function checkWinner(cells) {
  for (const [a, b, c] of winningCombos) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

function handleCellClick(e) {
  if (gameOver) return;

  const cell = e.target;
  const boardIndex = parseInt(cell.dataset.board);
  const cellIndex = parseInt(cell.dataset.index);

  // Si el tablero obligatorio ya está lleno o ganado, liberar
  if (nextBoard !== null) {
    if (bigBoard[nextBoard] !== '' || !boards[nextBoard].includes('')) {
      nextBoard = null;
    }
  }

  // Validar turno en tablero correcto
  if (nextBoard !== null && nextBoard !== boardIndex) {
    return; // no puedes jugar aquí
  }

  if (boards[boardIndex][cellIndex] !== '') return;

  boards[boardIndex][cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  // Revisar si ganó tablero pequeño
  const winnerSmall = checkWinner(boards[boardIndex]);
  if (winnerSmall) {
    bigBoard[boardIndex] = winnerSmall;
    document
      .querySelectorAll(`.small-board[data-board="${boardIndex}"] .cell`)
      .forEach(c => c.classList.add('win'));
  }

  // Revisar si ganó tablero grande
  const winnerBig = checkWinner(bigBoard);
  if (winnerBig) {
    updateStatus(`¡Ganó ${winnerBig} en el tablero grande!`);
    gameOver = true;
    return;
  }

  // Cambiar turno
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`Turno: ${currentPlayer}`);

  // Determinar próximo tablero
  nextBoard = cellIndex;
}
  
function resetGame() {
  boards = Array(9).fill(null).map(() => Array(9).fill(''));
  bigBoard = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  nextBoard = null;
  updateStatus('Turno: X');

  document.querySelectorAll('.cell').forEach(c => {
    c.textContent = '';
    c.classList.remove('win');
  });
}

// Eventos
bigBoardEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('cell')) {
    handleCellClick(e);
  }
});

resetBtn.addEventListener('click', resetGame);
