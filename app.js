const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const gameButton = document.getElementById('startGame');
const playerTurn = document.getElementById('playerTurn');
let circleTurn;

gameButton.addEventListener('click', startGame, {once: true});

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true})
    });
    setTurnDisplay(circleTurn);
    setBoardHoverClass()
}

function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark (cell,currentClass)
    swapTurns()
    setBoardHoverClass()
    
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn;
    setTurnDisplay(circleTurn);
}

function setTurnDisplay(turn){
    if (turn === false){
        playerTurn.innerText = "Player One's Turn!"
    }
    else{
        playerTurn.innerText = "Player Two's Turn!"
    }
}
function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}