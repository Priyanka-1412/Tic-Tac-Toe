//Hide game screen
$('.containerB').hide();
let xSymbol = '';
let oSymbol = '';

//get players name and change screen
const gameDisplay = function () {

//retrive the input value
  xSymbol = $('#player1').val();
  oSymbol = $('#player2').val();

if (xSymbol === '' || oSymbol === '') {
  xSymbol = 'Player 1';
  oSymbol = 'Player 2';
};

//change the screen
  $('.containerA').hide();
  $('.containerB').show();
  $('.gamestatus').text(`${xSymbol} is first`); //set xSymbol as first Player
  $('#score1').text(`Score: ${xSymbol} : ${0}`);  //set scoreboard
  $('#score2').text(`Score: ${oSymbol} : ${0}`); //set scoreboard
  resetGame();
};

$('#start').on('click', gameDisplay);

//retrive html element and sore in variables
const cellBlocks = $(".block");
let gameIsOn = true;
let player1IsNext = true;
let scoreBoard1 = 0;
let scoreBoard2 = 0;

//Hide the HTML elements
$('.player1win').hide();
$('.player2win').hide();
$('.tiegame').hide();

//Announcing winner
const gameWinner = function (symbol) {
  gameIsOn = false;

  if (symbol === 'x') {

    scoreBoard1 = scoreBoard1 + 1;

    $('.gamestatus').text(`${xSymbol} has won`);
    $('.gameFinish').get(0).play();
    $('#score1').text(`Score: ${xSymbol} : ${scoreBoard1}`);
    $('.playarea').hide(1000);
    $('.player1win').show(4000);
    $('.player1win').hide(1000);

    setTimeout(function() {
      $('.playarea').show(4000);
    }, 3000);

  }
  else {

    scoreBoard2 = scoreBoard2 + 1;

    $('.gamestatus').text(`${oSymbol} has won`);
    $('.gameFinish').get(0).play();
    $('#score2').text(`Score: ${oSymbol} : ${scoreBoard2}`);
    $('.playarea').hide(1000);
    $('.player2win').show(4000);
    $('.player2win').hide(1000);

    setTimeout(function() {
      $('.playarea').show(4000);
    }, 3000);
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

//condition for win check with value in blocks, if its undefined then condition will be true all the time
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

    $('.gamestatus').text(`It's a tie game`);
    $('.gameFinish').get(0).play();
    $('.playarea').hide(1000);
    $('.tiegame').show(4000);
    $('.tiegame').hide(1000);

    setTimeout(function() {
      $('.playarea').show(4000);
    }, 3000);
  }

  else {
    player1IsNext = !player1IsNext
    if (player1IsNext) {
      $('.gamestatus').text(`${xSymbol} is next`);
    }
    else {
      $('.gamestatus').text(`${oSymbol} is next`);
    }
  };
};

//Reset game and set player 1 is always as first player
const resetGame = function (event) {
  player1IsNext = true;
  $('.gamestatus').text(`${xSymbol} is next`);

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
  // $('.tickSound').get(0).duration = 10;
  $('.tickSound').get(0).pause();
  $('.tickSound').get(0).currentTime = 0;
  $('.tickSound').get(0).play();

  if (player1IsNext) {
    classList.add('x');

    updateGameSatus();
  }

  else {
    classList.add('o');
    updateGameSatus();
  }
};

//reset click event with resetGame function as parameter
$('.reset').on('click', resetGame);

for (let i = 0; i <cellBlocks.length; i++) {
  $(cellBlocks[i]).on('click', blockClick)
};

//Exit game and make input value to empty string before new game starts
const exitGame = function () {
  $('.containerB').hide();
  $('.containerA').show();
  $('#player1').val('');
  $('#player2').val('');
};
//click event for game exit
$('.quit').on('click', exitGame);
