let moves = ['Rock', 'Paper', 'Scissors'];
let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll('#playerMoves div');
const allButtons = document.querySelectorAll('#playerMoves div, #computerMoves div');

allButtons.forEach(button => button.addEventListener('transitionend', removeTransition));

const roundMsg = document.querySelector('#roundMsg');
const pScore = document.querySelector('#playerScore');
const cScore = document.querySelector('#computerScore');
const winnerMsg = document.querySelector('#winnerMsg');
const container = document.querySelector('#container');

const playAgain = document.createElement('div');
playAgain.textContent = 'Play Again';
playAgain.setAttribute('id', 'playAgain');
playAgain.addEventListener('click', newGame);

function formatMove(move) {
    return move.charAt(0).toUpperCase() + move.slice(1).toLowerCase();
}

function computerPlay() {
    let randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}

function playerWins(playerSelection, computerSelection) {
    wins = false;
    if (playerSelection == 'Paper' && computerSelection == 'Rock' ||
            playerSelection == 'Scissors' && computerSelection == 'Paper' ||
            playerSelection == 'Rock' && computerSelection == 'Scissors') {
        wins = true;
    }
    
    return wins;
}

function playRound(playerSelection, computerSelection) {
    playerSelection = formatMove(playerSelection);

    let pMove = '#' + playerSelection.toLowerCase();
    let cMove = '#' + 'c' + formatMove(computerSelection);

    let pButton = document.querySelector(pMove);
    let cButton = document.querySelector(cMove);
    
    pButton.style.cssText = 'background-color: red';
    cButton.style.cssText = 'background-color: blue';

    if (playerSelection == computerSelection) {
        return "It's a draw! " + playerSelection + " and " + computerSelection;
    }
    
    if (playerWins(playerSelection, computerSelection)) {
        playerScore += 1;
        return "You Win! " + playerSelection + " beats " + computerSelection;
    } else {
        computerScore += 1;
        return "You Lose! " + computerSelection + " beats " + playerSelection;
    }
}

function onSelection(e) {
    let msg = playRound(e.target.id, computerPlay());
    roundMsg.textContent = msg;
    
    pScore.textContent = "Player Score: " + playerScore;
    cScore.textContent = "Computer Score: " + computerScore;

    if (playerScore == 5 || computerScore == 5) {
        msg = playerScore > computerScore ? "You won the game!" :
                "The computer won the game :(";
        winnerMsg.style.cssText = "border: 1px solid white;";
        winnerMsg.textContent = msg;

        buttons.forEach(div => div.removeEventListener('click', onSelection));
        container.appendChild(playAgain);
        
    }  
}

function removeTransition(e) {
    e.target.style.cssText = "background-color: black";
}

function game() {
    buttons.forEach(div => div.addEventListener('click', onSelection));
}

function newGame() {
    playerScore = 0;
    computerScore = 0;
    pScore.textContent = "Player Score: " + playerScore;
    cScore.textContent = "Computer Score: " + computerScore;
    
    roundMsg.textContent = "";
    winnerMsg.textContent = "";
    winnerMsg.style.cssText = "border: none;";
    container.removeChild(playAgain);
    
    game();
}

game();