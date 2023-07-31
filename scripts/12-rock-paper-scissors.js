
  // establish the score keeping system
      let score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        ties: 0,
        losses: 0  
      };

  // establish global HTML text elements
      updateScoreElement();

  // establish auto play feature
    let isAutoPlaying = false;
    let intervalID;

    document.querySelector('.js-auto-button')
      .addEventListener('click', () => {
        autoPlay();
      });
      
    function autoPlay() {
      if (!isAutoPlaying){
        intervalID = setInterval(() => {
          const playerMove = pickComputerMove();
          playGame(playerMove);
      }, 1000);

      isAutoPlaying = true;
      document.querySelector('.js-auto-button').innerHTML = 'Stop Playing';

      } else {
        clearInterval(intervalID);
        isAutoPlaying = false;
        document.querySelector('.js-auto-button').innerHTML = 'Auto Play';
      } 
    }
    
  // move from onClick to eventListener
    document.querySelector('.js-rock-button')
      .addEventListener('click', () => {
        playGame('rock');
      });
    
    document.querySelector('.js-paper-button')
      .addEventListener('click', () => {
        playGame('paper');
      });
    
    document.querySelector('.js-scissors-button')
      .addEventListener('click', () => {
        playGame('scissors');
      });
    
    document.querySelector('.js-reset-button')
      .addEventListener('click', () => {
        resetScore();
      });
  
    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'r') {
        playGame('rock');
      } else if (event.key === 'p') {
        playGame('paper');
      } else if (event.key === 's') {
        playGame('scissors');
      } else if (event.key === 'a') {
        autoPlay(); 
      } else if (event.key === 'Backspace') {
        resetScore();
      }
    });

  // establish computer move
    function pickComputerMove() {
      let randomNumber = Math.random();
      let computerMove = '';

      if (randomNumber >= 0 && randomNumber < 1/3){
        computerMove = 'rock';
      } else if (randomNumber >= 1/3 && randomNumber <= 2/3){
        computerMove = 'paper';
      } else if (randomNumber >= 2/3){
        computerMove = 'scissors';
      } 

      return computerMove;
      }
    
  // establish the game function
    function playGame (playerMove){
      const computerMove = pickComputerMove();
      let result = '';

  // (within the playGame function): compare player move to computer move
      if (playerMove === 'scissors'){
        if (computerMove === 'scissors'){
        result = `It's a tie!`;
        } else if (computerMove === 'paper'){
          result = 'You win!';
        } else if (computerMove === 'rock'){
          result = 'You lose!';
        }

      } else if (playerMove === 'paper'){
        if (computerMove === 'scissors'){
          result = `You lose!`;
         } else if (computerMove === 'paper'){
          result = `It's a tie!`;
         } else if (computerMove === 'rock'){
          result = 'You win!'; 
          }

      } else if (playerMove === 'rock'){
          if (computerMove === 'scissors'){
            result = `You win!`;
          } else if (computerMove === 'paper'){
            result = `You lose!`;
          } else if (computerMove === 'rock'){
            result = `It's a tie!`; 
          }
      }

      if (result === 'You win!'){
        score.wins ++;
      } else if (result === 'You lose!'){
        score.losses ++;
      } else if (result === `It's a tie!`){
        score.ties ++;
      }

      localStorage.setItem('score', JSON.stringify(score));

  // (within the playGame function): display result

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = `${result}`;
      
    document.querySelector('.js-moves').innerHTML = `You played <img src="images/${playerMove}-emoji.png" class="move-icon">  Computer played <img src="images/${computerMove}-emoji.png" class="move-icon">`;
    }
  
  // update scores
  function updateScoreElement() {
    document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
  }

  function resetScore() {
    document.querySelector('.js-reset-confirmation').innerHTML = 'Are you sure you want to reset the score? <button class="reset-button js-yes-reset">Yes</button> <button class="reset-button js-no-reset">No</button>';
    
    document.querySelector('.js-yes-reset')
      .addEventListener('click', () => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
    
        localStorage.removeItem('score');
        updateScoreElement();
        document.querySelector('.js-result').innerHTML = 'Score reset!';
        document.querySelector('.js-moves').innerHTML = '';
        document.querySelector('.js-score').innerHTML = '';
        document.querySelector('.js-reset-confirmation').innerHTML = '';    
      })

      document.querySelector('.js-no-reset')
        .addEventListener('click', () => {
          document.querySelector('.js-reset-confirmation').innerHTML = ''; 
        })


  }
    
