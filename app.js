/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying, prevRole, winScore, prevRole1;




init();
// to select element by id use # and to select a class use .

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; // innerHTML is used to insert HTML code in the html webpage using js whereas textContent inserts plain text only

//var x = document.querySelector('#score-0').textContent; // to read the value of an element
//console.log(x);



document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    var dice = Math.floor(Math.random() * 6) + 1; // a numvber between 1 and 6 floor to get integer number , declared dice here cauz we wanna use dice only on click
    var dice1 = Math.floor(Math.random() * 6) + 1; // a numvber between 1 and 6 floor to get integer number , declared dice here cauz we wanna use dice only on click

    var diceDom0 = document.getElementById('dice-0'); // break code into vars for resablility
    var diceDom1 = document.getElementById('dice-1'); // break code into vars for resablility

    var currentDom = document.getElementById('current-' + activePlayer); // break code into vars for resablility
    var activeDom = document.querySelector('.player-' + activePlayer + '-panel');
    diceDom0.style.display = 'block'; // to change the style well we bring back the image at click.
    diceDom1.style.display = 'block'; // to change the style well we bring back the image at click.

    activeDom.classList.add('active'); // to manipulate classes

    if ((dice !== 1 && dice1 !== 1) && !((dice == 6 && prevRole[prevRole.length - 1] == 6) || (dice1 == 6 && prevRole1[prevRole1.length - 1] == 6))) { // if 1 does not occour

      prevRole.push(dice);
      prevRole1.push(dice1);

      roundScore = roundScore + (dice + dice1);

      currentDom.textContent = roundScore; // updating the score of the active player

      diceDom0.src = 'dice-' + dice + '.png'; // updating the img src according to the number which was rolled
      diceDom1.src = 'dice-' + dice1 + '.png'; // updating the img src according to the number which was rolled

    } else if ((dice == 6 && prevRole[prevRole.length - 1] == 6) || (dice1 == 6 && prevRole1[prevRole1.length - 1] == 6)) { //coding challenge 6 . if rolls two 6 in a row
      scores[activePlayer] = 0;
      document.getElementById('score-' + activePlayer).textContent = 0;
      nextPlayer();

    } else { // if 1 occours
      nextPlayer();
    }
  }



}) // to add the event listener 'click' tells the type of event and 2nd argument is the function we wanna call so its a callback or can use an anon function here if we want the function only to occour in this context


document.querySelector('.btn-hold').addEventListener('click', function() { // when player clicks the hold button
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    var nameDom = document.getElementById('name-' + activePlayer);
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]; // updating the score of the active player
    if (scores[activePlayer] >= winScore) // if a player winds
    {
      document.querySelector('.dice').style.display = 'none'; // to change the style well we bring back the image at click.

      nameDom.textContent = 'Winner!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); // to manipulate classes

      document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active'); // to manipulate classes
      gamePlaying = false;
    } else {
      nextPlayer();

    }
  }


})

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() { // applying dry principle to remove redundancy
  prevRole = [];
  prevRole1 = [];

  var diceDom0 = document.getElementById('dice-0'); // break code into vars for resablility
  var diceDom1 = document.getElementById('dice-1'); // break code into vars for resablility

  var currentDom = document.getElementById('current-' + activePlayer); // break code into vars for resablility
  //var activeDom = document.querySelector('.player-' + activePlayer + '-panel');
  document.querySelector('.player-0-panel').classList.toggle('active'); // to manipulate classes
  document.querySelector('.player-1-panel').classList.toggle('active'); // to manipulate classes

  roundScore = 0; // round score is set to 0

  diceDom0.style.display = 'none'; // to change the style well we bring back the image at click.
  diceDom1.style.display = 'none'; // to change the style well we bring back the image at click.

  currentDom.textContent = roundScore; // updating the score of the active player

  //  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // can use ternary operator in place of below if


  if (activePlayer === 0) {
    //  activeDom.classList.toggle('active'); // to manipulate classes
    activePlayer = 1; //changing the active player as we transfer the control


  } else {
    //  activeDom.classList.toggle('active'); // to manipulate classes

    activePlayer = 0;
  }

}


function init() {
  gamePlaying = true; // to stop the game
  scores = [0, 0]; // to store score of each player
  prevRole = [];
  prevRole1 = [];

  roundScore = 0;

  activePlayer = 0;
  winScore = prompt('Kindly Enter the winning score for the game: ');

  document.getElementById('dice-0').style.display = 'none'; // to change the style well we hide the image at start.
  document.getElementById('dice-1').style.display = 'none'; // to change the style well we hide the image at start.

  document.getElementById('score-0').textContent = '0';

  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'PLAYER 1';
  document.getElementById('name-1').textContent = 'PLAYER 2';
  document.querySelector('.player-0-panel').classList.remove('winner'); // to manipulate classes
  document.querySelector('.player-1-panel').classList.remove('winner'); // to manipulate classes
  document.querySelector('.player-0-panel').classList.remove('active'); // to manipulate classes
  document.querySelector('.player-0-panel').classList.add('active'); // to manipulate classes
  document.querySelector('.player-1-panel').classList.remove('active'); // to manipulate classes

}