//retrive html element and sore in variables
const gamestatus = $('.gamestatus');
const reset = $('.reset');
const cellBlocks = $(".block");
let gameIsOn = true;
let player1IsNext = true;

//get winner images and hide it
const player1Win = $('.player1');
const player2Win = $('.player2');
player1Win.hide();
player2Win.hide();

//declare variable for player 1 and player 2
const xSymbol = 'Player 1';
const oSymbol = 'player 2';

//function that take symbol as parameter and return player Id
const getSymbol = function (symbol) {
  if (symbol === 'x') {
    xSymbol;
  }
  else {
    oSymbol;
  }
};

//Announcing winner
const gameWinner = function (symbol) {
  gameIsOn = false;
  if (symbol === 'x') {
    gamestatus.innerHTML = `${getSymbol(symbol)} has won!`;
    player1Win.fadeIn(4000);

  } else {
    gamestatus.innerHTML = `${getSymbol(symbol)} has won!`;
    player2Win.fadeIn(3000);
  }
};

//check game status for win or tie
const updateGameSatus = function () {

  //get classlist 'x' or 'o' on block click event
  const firstBlock = cellBlocks[0].classList[1];
  const secondBlock = cellBlocks[1].classList[1];
  const thirdBlock = cellBlocks[2].classList[1];
  const fouthBlock = cellBlocks[3].classList[1];
  const fifthBlock = cellBlocks[4].classList[1];
  const sixthBlock = cellBlocks[5].classList[1];
  const seventhBlock = cellBlocks[6].classList[1];
  const eighthBlock = cellBlocks[7].classList[1];
  const ninthBlock = cellBlocks[8].classList[1];

//condition for win check with value in firstblock, if its undefined then condition will be true all the time
  if (firstBlock && firstBlock === secondBlock && firstBlock === thirdBlock) {
    gameWinner(firstBlock);
    cellBlocks[0].classList.add('won');
    cellBlocks[1].classList.add('won');
    cellBlocks[2].classList.add('won');
  }
   else if (fouthBlock && fouthBlock === fifthBlock && fouthBlock === sixthBlock) {
    gameWinner(fouthBlock);
    cellBlocks[3].classList.add('won');
    cellBlocks[4].classList.add('won');
    cellBlocks[5].classList.add('won');
  }
  else if (seventhBlock && seventhBlock === eighthBlock && seventhBlock === ninthBlock) {
    gameWinner(seventhBlock);
    cellBlocks[6].classList.add('won');
    cellBlocks[7].classList.add('won');
    cellBlocks[8].classList.add('won');
  }
  else if (firstBlock && firstBlock === fouthBlock && firstBlock === seventhBlock) {
    gameWinner(firstBlock);
    cellBlocks[0].classList.add('won');
    cellBlocks[3].classList.add('won');
    cellBlocks[6].classList.add('won');
  }
  else if (secondBlock && secondBlock === fifthBlock && secondBlock === eighthBlock) {
    gameWinner(secondBlock);
    cellBlocks[1].classList.add('won');
    cellBlocks[4].classList.add('won');
    cellBlocks[7].classList.add('won');
  }
  else if (thirdBlock && thirdBlock === sixthBlock && thirdBlock === ninthBlock) {
    gameWinner(thirdBlock);
    cellBlocks[2].classList.add('won');
    cellBlocks[5].classList.add('won');
    cellBlocks[8].classList.add('won');
  }
  else if (firstBlock && firstBlock === fifthBlock && firstBlock === ninthBlock) {
    gameWinner(firstBlock);
    cellBlocks[0].classList.add('won');
    cellBlocks[4].classList.add('won');
    cellBlocks[8].classList.add('won');
  }
  else if (thirdBlock && thirdBlock === fifthBlock && thirdBlock === seventhBlock) {
    gameWinner(thirdBlock);
    cellBlocks[2].classList.add('won');
    cellBlocks[4].classList.add('won');
    cellBlocks[6].classList.add('won');
  }
  //check for tie
  else if (firstBlock && secondBlock && thirdBlock && fouthBlock && fifthBlock && sixthBlock && seventhBlock && eighthBlock && ninthBlock) {
    gameIsOn = false;
    gamestatus.innerHTML = 'Game is tied!';
  }
  else {
    player1IsNext = !player1IsNext
    if (player1IsNext) {
      gamestatus.innerHTML = `${xSymbol} is next`;
    } else {
      gamestatus.innerHTML = `${oSymbol} is next`;
    }
  }
};

//Reset game and set player 1 is always as first player
const resetGame = function (event) {
  player1IsNext = true;
  gamestatus.innerHTML = `${xSymbol} is next`;
  for (let i = 0; i <cellBlocks.length; i++){
    cellBlocks[i].classList.remove('x');
    cellBlocks[i].classList.remove('o');
    cellBlocks[i].classList.remove('won');
  }
  gameIsOn = true;
};

//blockclick event to get classlists
const blockClick = function (event) {
  let classList = event.target.classList;

//if no class with name 'x' or 'y' then add class else return false
  if (!gameIsOn || classList[1] === 'x' || classList[1] === 'o') {
    return false;
  };

  if (player1IsNext) {
    classList.add('x');

    updateGameSatus();
    // player1IsNext = !player1IsNext
  }
  else {
    classList.add('o');

    updateGameSatus();
    // player1IsNext = !player1IsNext
  }
};

//reset click event with resetGame function as parameter
$('.reset').on('click', resetGame);

for (let i = 0; i <cellBlocks.length; i++) {
  // console.log(cellBlocks[i]);
  $(cellBlocks[i]).on('click', blockClick)
};
