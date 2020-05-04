/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

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
   window.open('index.html','_top',true);
   
});

//Get the name of player-1 and player-2 from user.
const  getPlayersName=()=>{
    if(confirm('Want Custom Player Names?\nThe Custom Nick-Names Should be MAXIMUM of 6 Characters (Without Spaces)..\nElse the Remaining Portion of Name Will NOT Included.'))
    {
        player_1_name.textContent=prompt('Enter Player-1 Nick-Name :').substr(0,6);
        player_2_name.textContent=prompt('Enter Player-2 Nick-Name :').substr(0,6);

        if( player_1_name.textContent.length<1 && player_2_name.textContent.length<1)
        {
            player_1_name.textContent='Player 1';
            player_2_name.textContent='Player 2';
        }
    }
    else
    {
        return;
    }
}

//Check the active player while playing.
//Here we check which player has .active class as a class member.
//The player having the active class will have its current score
//incremented here.
const checkActiveClassPlayer=(diceNumber)=>{
    if(main_wrapper.children[activePlayer].classList.contains('active'))
    {
        if(activePlayer){
            currentValue_1+=diceNumber;
            console.log(`current value is ${currentValue_1} and dice number is ${diceNumber}`);
            return currentValue_1;
        }
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
    }
    else{
        diceImage.src=`images/dice-${diceNumber}.png`;
        main_wrapper.children[activePlayer].children[2].children[1].textContent=0;
        currentValue_0=0;
        currentValue_1=0;
    }    
    
});

//Add an event listener to the Hold Button.
const holdDiceBtn=document.querySelector('.btn-hold');

//Add an click event in the Hold button
    //1. Pass the active class to the other player.
        //2. updates the current score to the global score of hat player.
    
        holdDiceBtn.addEventListener('click',()=>{

            //Here if the current active player is player-1 
            //then shift the active class to player-2 and if
            //the active player is player-2 then shift the active
            //class to again player-1.
            //This will go on in vice-versa loop.
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
        disableRollAndHoldBtn();
         main_wrapper.children[0].children[0].textContent='Winner';
         main_wrapper.children[0].children[0].style.cssText=" font-weight: bolder;transform: scale(1.5);color:#0f9b0f;";
         document.cookie=globalValue_0;
    }
    else if(globalValue_1>=100){
        disableRollAndHoldBtn();
         main_wrapper.children[1].children[0].textContent='Winner';
         main_wrapper.children[1].children[0].style.cssText=" font-weight: bolder;transform: scale(1.5);color:#0f9b0f;";
         document.cookie=globalValue_1;
    }
},100);


//When the window loads then call in game initializer function to resre all the values.
window.onload=()=>{
    initializeGame();
    setTimeout(getPlayersName,1000);
};