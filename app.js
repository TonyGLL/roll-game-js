/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevDice, winningScore;

init();

// ROLL DICE BUTTON EVENT
document.querySelector('.btn-roll').addEventListener('click', function() { 

    if (gamePlaying) {

        // 1. Random number
        var dice = Math.floor((Math.random() * 6) + 1);
        var dice1 = Math.floor((Math.random() * 6) + 1);

        // 2. Display the result
        document.getElementById('dice').style.display = 'block';
        document.getElementById('dice1').style.display = 'block';  

        document.getElementById('dice').src = 'dice-' + dice + '.png';
        document.getElementById('dice1').src = 'dice-' + dice1 + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1 
        /*if (dice === 6 && prevDice === 6) {

            // Coding Challenge 1
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
            
        }*/
        if (dice !== 1 && dice1!==1) {

            // Add score
            roundScore += dice + dice1;

            document.querySelector('#current-' + activePlayer).textContent  = roundScore;
        }else {

            // Next player
            nextPlayer();

        } 
        
        //prevDice = dice;
        
    }    

});

// HOLD BUTTON EVENT
document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {
        
        // Add CURRENT score to the GLOBAL score
        scores[activePlayer] += roundScore;

        // Upadate th UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {

            document.querySelector('#name-' + activePlayer).textContent = 'WINNER !';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice1').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;

        } else {

            // Next player
            nextPlayer();

        }

    }
   
});

// Next Player
function nextPlayer() {

    // Next player turn
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // OPTION 1
    /*if (activePlayer === 0) { ///////////////////////////////////////////
        activePlayer = 1;     //
    } else {                  //                                OPTION 2
        activePlayer = 0;     //
    }*/                         ///////////////////////////////////////////

    roundScore = 0;
    prevDice = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

// Inizializate Game
function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    prevDice = 0;
    winningScore;

    winScore();

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

}

// Pick winning score  Coding Challenge 2
function winScore() {

    document.querySelector('.form').style.display = 'block';

    document.getElementById('send-button').addEventListener('click', function(e) {
        e.preventDefault();

        winningScore = document.getElementById('form-number').value;
        console.log(winningScore);
        
        document.querySelector('.form').style.display = 'none';
    });
    
}

/* 

3 More Challenges
Change the game follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previews dice in a separate variable).

2. Add an input fiel to the HTML where players can set the winning score,  so that they can change the predefined score of 100. (Hint: you can read that value with the value property in Javascript. Thi is a good oportunity to use google to figure this out).

3. Add another dice to the game, so that there are two dice now. The player looses his current score when one of them 1 one. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one).

*/

