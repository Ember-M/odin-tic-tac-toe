const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const startButton = document.getElementById('startGame');
const playerTurn = document.getElementById('playerTurn');
const winningMessage = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton');
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
let circleTurn;

// Re-Initialize Game State //
restartButton.addEventListener('click', ()=>{
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick)
        winningMessageElement.classList.remove('show');
})
    playerTurn.innerText = "";
    removeBoardHoverClass();
});


startButton.addEventListener('click', startGame)

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true})
    });
    setTurnDisplay(circleTurn);
    setBoardHoverClass()
    
}

//Game Logic For Each Game Board Cell //
function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark (cell,currentClass)
    if (checkWin(currentClass)){
        endGame(false);
    }
    else if (isDraw()){
        endGame(true);
    }
    else{ 
        swapTurns()
        setBoardHoverClass()
    }
    
    
}

function endGame(draw){
    if (draw){
        winningMessage.innerText = `It's a draw!`
    }
    else{
        winningMessage.innerText = `${circleTurn ? "Player 2":"Player 1"} Wins!`
    }
    winningMessageElement.classList.add('show');
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

// Initialize Mark Hover Display //
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
function removeBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS);
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS)||cell.classList.contains(CIRCLE_CLASS);
    })
}