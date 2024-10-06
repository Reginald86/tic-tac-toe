let container = document.querySelector('#container');
let board = Array(9).fill("");
let gameStarted = false;

const gameboard = (() => {
  board.forEach((_, index) => {
    let square = document.createElement('div');
    square.className = "square";
    square.setAttribute('data-index', index);
    container.appendChild(square);
  });
  return {
    square: document.querySelectorAll('.square')
  }
})();

function gameplay() {
    let player1 = document.querySelector('#player1');
    let player2 = document.querySelector('#player2');
    let start = document.querySelector('#start');
    let restart = document.querySelector('#restart');

    const player = (name, mark) => {
        return { name, mark };
    };

    let playerOne, playerTwo, currentPlayer;

    start.addEventListener('click', () => {
        if (!gameStarted && player1.value && player2.value) {
            startgame();
            start.disabled = true;
        }
    });

    function startgame() {
        playerOne = player(player1.value, '');
        playerTwo = player(player2.value, '');
        gameStarted = true;
        player1.disabled = true;
        player2.disabled = true;

       
        let marker = ['X', 'O'][Math.floor(Math.random() * 2)];

        if (marker === "X") {
            playerOne.mark = "X";
            playerTwo.mark = "O";
        } else {
            playerOne.mark = "O";
            playerTwo.mark = "X";
        }

        currentPlayer = [playerOne, playerTwo][Math.floor(Math.random() * 2)]

        status.textContent = `${currentPlayer.name}'s turn (${currentPlayer.mark})`;

    }

    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    let status = document.querySelector('#status')

    gameboard.square.forEach(square => {
        square.addEventListener('click', (e) => {
            let index = e.target.getAttribute('data-index');

            if (gameStarted && board[index] === "") {
                board[index] = currentPlayer.mark;
                square.textContent = currentPlayer.mark;

                if (checkWin()) {
                    status.textContent = (`${currentPlayer.name} wins!  Press restart to play again.`);
                    gameStarted = false;
                    restart.disabled = false;
                } else if (!board.includes("")) {
                    status.textContent = ("It's a tie!  Press restart to play again.");
                    gameStarted = false;
                    restart.disabled = false;
                } else {
                    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
                    status.textContent = `${currentPlayer.name}'s turn (${currentPlayer.mark})`;
                }
            }
        });
    });

    function checkWin() {
        return winConditions.some(condition => {
            return condition.every(index => board[index] === currentPlayer.mark);
        });
    }

    restart.disabled = true;

    restart.addEventListener('click', () => {
        player1.disabled = false;
        player2.disabled = false;
        gameStarted = false;
        start.disabled = false; 
        board = Array(9).fill(""); 
        status.textContent = "Hit start to play again"
        gameboard.square.forEach(square => {
            square.textContent = "";
        });
    });
}

gameplay();