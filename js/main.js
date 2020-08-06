(function() {
  'use strict';

  var pairs = 2;
  var cards = [];
  var startTime;
  var isRunning = false;
  var correctCount = 0;
  var TimeoutId;
  
  var flipCount = 0;
  var firstCard = null;
  var secondCard = null;
  

  function init() {
    var i;
    var card;
    for (i = 1; i <= pairs; i++) {
    //   document.getElementById('stage').appendChild(createCard(i));
    //   document.getElementById('stage').appendChild(createCard(i));
        cards.push(createCard(i));
        cards.push(createCard(i));
    }
    while(cards.length){
        card = cards.splice(Math.floor(Math.random() * cards.length), 1)[0];
        document.getElementById('stage').appendChild(card);
    }
  }

  function createCard(num) {
    var container;
    var card;
    var inner;
    inner = '<div class="card-front">' + num + '</div><div class="card-back">?</div>';
    card = document.createElement('div');
    card.innerHTML = inner;
    card.className = 'card';
    card.addEventListener('click', function(){
        flipCard(this);
        if(isRunning === true){
          return;
        }
        startTime = Date.now();
        isRunning = true;
        runTimer();
        document.getElementById('restart').classList.remove('inactive');
    });
    container = document.createElement('div');
    container.className = 'card-container';
    container.appendChild(card);
    return container;
  }
  
  function flipCard(card) {
      if(firstCard != null && secondCard != null){
          return;
      }
      if(card.classList.contains('open')){
        return ;
      }
      card.className = 'card open';
      flipCount++;
      if(flipCount % 2 === 1){
          firstCard = card;
      } else {
          secondCard = card;
          secondCard.addEventListener('transitionend',check);
      }
  }
  function check() {
    if(
    firstCard.children[0].textContent !== secondCard.children[0].textContent
    ){
      firstCard.classList.remove('open');
      secondCard.classList.remove('open');
    } else {
      correctCount++;
      if(correctCount === pairs){
        clearTimeout(TimeoutId);
      }
    }
    firstCard = null;
    secondCard.removeEventListener('transitionend',check);
    secondCard = null;
  }
  
  function runTimer() {
    document.getElementById('score').textContent = ((Date.now() - startTime)/
    1000).toFixed(2);
    TimeoutId = setTimeout(function() {
      runTimer();
    },10);
  }
  init();
})();