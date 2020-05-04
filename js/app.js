
 //Check if the service worker exists in the navigator object.
 if ("serviceWorker" in navigator) 
 {
     window.addEventListener("load", function() 
     {
     navigator.serviceWorker
         .register("../service-worker.js")
         .then(res => console.log("service worker registered"))
         .catch(err => console.log("service worker not registered", err))
     })
 }
console.log('Cookie storage :'+document.cookie);

//Get the name of player-1 from DOM
let player_1_name=document.getElementById('name-0');

//Get the name of player-2 from DOM 
let player_2_name=document.getElementById('name-1');

//Get the global score of player-1 from the DOM
let player_1_global_score=document.getElementById('score-0');

//Get the global score of player-2 from DOM
let player_2_global_score=document.getElementById('score-1');

//Get the current score of player-1
let player_1_current_score=document.getElementById('current-0');

//Get the current score of player-2.
let player_2_current_score=document.getElementById('current-1');

//Get the wrapper class
const main_wrapper=document.querySelector('.wrapper');

//Get all the elements from DOM having Button as their tag name
let allDOMButton=document.getElementsByTagName('button');

//Get the game intro audio element from DOM
const gameIntroAudio=document.getElementById('newGameIntro');

//Get the player wins the game audio element from DOM
const playerWinsAudio=document.getElementById('playerWins');

//Get the roll the dice audio element from DOM
const rollTheDiceAudio=document.getElementById('rollDiceSound');

//Get the pass the turn audio element from DOM
const passTurnAudio= document.getElementById('passTheTurn');

//Define the current active player.
//0- player-1
//1- player-2
let activePlayer=0;

//Value for the current score initialized as 0;
let currentValue_0=0,currentValue_1=0;

//Initialize a default global value for both player-1(0) and player-2(1)
let globalValue_0=0,globalValue_1=0;


const enableRollAndHoldBtn=()=>{
    allDOMButton[1].removeAttribute('disabled');
    allDOMButton[2].removeAttribute('disabled');
};

//A function to initialize all the values.
//Set all the parameters to 0.
const initializeGame=()=>{
    player_1_global_score.textContent=0;
    player_1_current_score.textContent=0;
    player_2_global_score.textContent=0;
    player_2_current_score.textContent=0;
    globalValue_0=0;
    globalValue_1=0;
    currentValue_0=0;
    currentValue_1=0
    enableRollAndHoldBtn();
};

//Add an event listener to the New game Button
//This will reset all the values
const newGameBtn=document.querySelector('.btn-new');
newGameBtn.addEventListener('click',function(){
    initializeGame();
    setTimeout(function(){
        window.open('index.html','_top',true);
    },2200);
    playerWinsAudio.pause();
   gameIntroAudio.play();
});

//Check the active player while playing.
//Here we check which player has .active class as a class member.
//The player having the active class will have its current score
//incremented here.
const checkActiveClassPlayer=(diceNumber)=>{
    if(main_wrapper.children[activePlayer].classList.contains('active'))
    {
        //Returns the current value for player-2
        if(activePlayer){
            currentValue_1+=diceNumber;
            console.log(`current value is ${currentValue_1} and dice number is ${diceNumber}`);
            return currentValue_1;
        }
         //Returns the current value for player-1
        else{
            currentValue_0+=diceNumber;
            console.log(`current value is ${currentValue_0} and dice number is ${diceNumber}`);
            return currentValue_0;
        }
        
    }
    else{
        return;
    }
}
    const disableRollAndHoldBtn=()=>{
        allDOMButton[1].setAttribute('disabled','disabled');
        allDOMButton[2].setAttribute('disabled','disabled');
    };

//Add an event listener to the Roll Dice button
const rollDiceBtn=document.querySelector('.btn-roll');

//Add click event to :
    //1. Generate a random number between 1-6
        //2. Change dice images.
            //3. Change the current score of the active player
rollDiceBtn.addEventListener('click',()=>{
    rollTheDiceAudio.play();
    //1. Generate a random Number.
    const diceNumber=parseInt((Math.random()*6)+1);
   //console.log(diceNumber);

     //2. Generate the dice image corresponding to the randomly generated dice number.
    let diceImage=document.querySelector('.dice-img');
    if(diceNumber>1){
        diceImage.src=`images/dice-${diceNumber}.png`;
        console.log( diceImage.src);

          //3. Append the randomly generated number to the current score of the current active player.
        main_wrapper.children[activePlayer].children[2].children[1].textContent=checkActiveClassPlayer(diceNumber);
        console.log("Active Player when number greater than 1 :"+activePlayer);
    }
    else{
        diceImage.src=`images/dice-${diceNumber}.png`;
        main_wrapper.children[activePlayer].children[2].children[1].textContent=0;
        currentValue_0=0;
        currentValue_1=0;

        //If activePlayer gets a 1 on dice.
        //Then the turn shift to the other player.
        if(activePlayer==0){
            activePlayer=1;
            main_wrapper.children[activePlayer].classList.toggle('active');
            main_wrapper.children[activePlayer-1].classList.remove('active');
        }
        else{
            activePlayer=0;
            main_wrapper.children[activePlayer].classList.toggle('active');
                main_wrapper.children[activePlayer+1].classList.remove('active');
        }
    }    
    
});

//Add an event listener to the Hold Button.
const holdDiceBtn=document.querySelector('.btn-hold');

//Add an click event in the Hold button
    //1. Pass the active class to the other player.
        //2. updates the current score to the global score of hat player.
    
        holdDiceBtn.addEventListener('click',()=>{
            passTurnAudio.play();
            //Here if the current active player is player-1 
            //then shift the active class to player-2 
           
            if(activePlayer==0)
            {
               
                globalValue_0+=parseInt(main_wrapper.children[activePlayer].children[2].children[1].textContent);
                main_wrapper.children[activePlayer].children[1].textContent= globalValue_0;
                main_wrapper.children[activePlayer].children[2].children[1].textContent=0;
                activePlayer=1;
                main_wrapper.children[activePlayer].classList.toggle('active');
                main_wrapper.children[activePlayer-1].classList.remove('active');
                currentValue_0=0;
            }

            
            //and if the active player is player-2 then shift the active
            //class to again player-1.
             //This will go on in vice-versa loop.
            else
            {
                globalValue_1+=parseInt(main_wrapper.children[activePlayer].children[2].children[1].textContent);
                main_wrapper.children[activePlayer].children[1].textContent=globalValue_1 ;
                main_wrapper.children[activePlayer].children[2].children[1].textContent=0;
                activePlayer=0;
                main_wrapper.children[activePlayer].classList.toggle('active');
                main_wrapper.children[activePlayer+1].classList.remove('active');
                currentValue_1=0;
            }

        });

     
/*
    This set interval function keeps a check on the current game.
    This set interval function after every 1 second check for the global score of both players.
    If  at any second any player's global score becomes greater than or equal to 100.
    Then that player wins and it appends winner in place of that person.
*/
setInterval(function(){
    if(globalValue_0>=100){
        playerWinsAudio.play();
        disableRollAndHoldBtn();
         main_wrapper.children[0].children[0].textContent='Winner';
         main_wrapper.children[0].children[0].style.cssText=" font-weight: bolder;transform: scale(1.5);color:#0f9b0f;";
         document.cookie=globalValue_0;
    }
    else if(globalValue_1>=100){
        playerWinsAudio.play();
        disableRollAndHoldBtn();
         main_wrapper.children[1].children[0].textContent='Winner';
         main_wrapper.children[1].children[0].style.cssText=" font-weight: bolder;transform: scale(1.5);color:#0f9b0f;";
         document.cookie=globalValue_1;
    }
},100);


//When the window loads then call in game initializer function to resre all the values.
window.onload=()=>{
    initializeGame();
    
    setTimeout(()=>{
        const gameRules="Rules of DiceToWin:\n1. Player 1 is the first player to roll the dice.\nYou can roll the dice by clicking on ths Roll Dice button on the right side.\n3. On every dice roll you will get a dice number which will be added in your Current score in the Red Box \n4. But if you get a 1 then your entire Current Score becomes 0 and its Next Player's turn.\n5. At any point of time you can Pass the turn to the other player and your Current Score gets added in the Global Score(The score written below the players name.)\n6. You can Pass your turn any number of times to the other player.\n7. When you pass the turn then your Existing Current Score gets added to Global score and the Current Score becomes 0.\n\nTHE PLAYER GETTING A SCORE OF HUNDRED OR MORE THAN HUNDRED FIRST WINS THE GAME ";
        alert(gameRules);
    },1000);
    //When the page loads then after a minimum of 1 sec load the getPlayersName() function.
    setTimeout(()=>{
        alert('You Can Give Custom Names to the Players :)\n The Name Should be Less Than 7 Characters !');
    },1000);
    
};

//Function to keep a check on players name.
//It will return false and will not accept any character value
//after the player's name length becomes grater than 7 characters (0-6).
const playerNameEnter=()=>{
    console.log(1);
    if(player_1_name.textContent.length<=6 || player_2_name.textContent.length<=6){
        return true;
    }
    else{
        return false;
    }
}