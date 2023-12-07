const boxes = document.querySelectorAll('.box');
// console.log(boxes);
const gameInfo = document.querySelector('.user-info');
const newGameBtn = document.querySelector('.btn');
let currentPlayer;
let gameGrid;
const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]


]
// console.log(winningPosition);

function initGame() {
    currentPlayer = "X";

    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = 'all';

        box.classList = 'box';
    })


    gameInfo.innerText = `Current Player-${currentPlayer}`;
    newGameBtn.classList.remove('active')



}
initGame();

function handleClick(index) {
    if (gameGrid[index] === '') {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"
        //swap the tern
        swapTurn();
        //check koi jeet to nahi gaya hai
        checkGameOver();


    }

}


function swapTurn() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';



    } else {
        currentPlayer = 'X';
    }
    gameInfo.innerText = `Current Player-${currentPlayer}`;

}
function checkGameOver() {
    // newGameBtn.classList.add('active');
    let answer = '';
    winningPosition.forEach((position) => {
        if ((gameGrid[position[0]] !== ''|| gameGrid[position[1] ]!== '' || gameGrid[position[2]] !== '') && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[2]] === gameGrid[position[1]])) {
            if (gameGrid[position[0]] === 'X') {
                answer = 'X'

            }
            else {
                answer = 'O'
            }
            //disable pointer event;
            boxes.forEach((box) => {
                box.style.pointerEvents = 'none'
            })
            //now we know the winner
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');

        }

    });
    if (answer !== "") {
        gameInfo.innerHTML = `Winner Player-${answer}`
        newGameBtn.classList.add("active");
        return;


    }
    //game tie
    let fillCount = 0
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;

        }
    })
    //bord is fill
    if (fillCount === 9) {
        gameInfo.innerText = 'Game Tied';
        newGameBtn.classList.add("active")

    }


}



//adding eventlistner
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index)
    })
})

newGameBtn.addEventListener('click', initGame);
