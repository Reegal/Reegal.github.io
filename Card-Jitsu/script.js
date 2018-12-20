function randInt(a, b){//function to get a random number *inclusive
  return a + Math.floor(Math.random() * (b - a + 1));
}
  
function submitCard(){//code that runs when the button is pressed
  if (selected==-1){//checks if a card is selected
    alert("You have not selected a card, click on one of the flipped cards to select it");
  }else{
    fillCompCard();//randomly generates a card for the computer
    setTimeout(function(){//evaluates the cards after 30ms to the screen updates
      alert(evaluateCards(playerHand[selected], compHand));

      for (var i = 0; i < 6; i++){//refreshes all your cards
        refreshCard(i);
      }
      emptyCompCard();//flips the computer card over again
    }, 30);   

    
  }
}

function emptyCompCard(){//flips the computer card back over
  compCard.innerHTML = "";

  compCard.style.backgroundImage = "";
}

function refreshCard(index){//refreshes a card
  playerHand[index] = new Card(types[randInt(0,2)], randInt(1,12)); //creates new card object


  playerCards[index].innerHTML = playerHand[index].power;//changes the text to match

  playerCards[index].style.backgroundImage = playerHand[index].img;//changes the background image to match
}

function fillCompCard(){
  compHand = new Card(types[randInt(0,2)], randInt(1,12));

  compCard.innerHTML = compHand.power;

  compCard.style.backgroundImage = compHand.img;
}


function evaluateCards(pCard, cCard){
  if(pCard.type==cCard.type){//if the card types are the same check which power is higher
    if(playerHand[selected].power>compHand.power){
      return "Since you had the same type, your power of " + pCard.power + " was greater than the power of the computer which was " + cCard.power + ", you have won!";
    }else if(playerHand[selected].power<compHand.power){
      return "Since you had the same type, your power of " + pCard.power + " was less than the power of the computer which was " + cCard.power + ", you have lost!";
    }else{
      return "You have the same type and power so it's a tie!";
    }
  }
  if(pCard.type=="fire"){//fire beats snow, loses to water
    if(cCard.type=="snow"){
      return "Since fire beats snow, you win!";
    }
    else{
      return "Since water beats fire, you lose!";
    }
  }
  if(pCard.type=="water"){//water beats fire loses to snow
    if(cCard.type=="fire"){
      return "Since water beats fire, you win!";
    }
    else{
      return "Since snow beats water, you lose!";
    }
  }
  if(pCard.type=="snow"){//snow beats water, loses to fire
    if(cCard.type=="water"){
        return "Since snow beats water, you win!";
    }
    else{
        return "Since fire beats snow, you lose!";
    }
  }  
}
//creating card function to allow new cards to be made
var Card = function(type, power) {
  this.type = type;//whether it's water fire or snow
  this.power = power;//the power value from 1-12
  if(type == "fire"){//adds the respective images
    this.img = "url('https://vignette.wikia.nocookie.net/clubpenguin/images/9/9e/CardJitsuFire_Logo.png/revision/latest/')";
  }else if(type == "snow"){
    this.img = "url('https://vignette.wikia.nocookie.net/clubpenguin/images/a/a0/CardJitsuSnow.PNG/revision/latest/')";
  }else{
    this.img = "url('https://vignette.wikia.nocookie.net/clubpenguin/images/e/e5/CardJitsuWater_Logo.png/revision/latest/')";
  }
};

types = ["water", "snow", "fire"];//an array containing the possible types


var playerHand = [];//an array containing all of the players cards

for(var i=0; i < 6; i++){//adding 6 cards to the players hands
  playerHand[i] = new Card(types[randInt(0,2)], randInt(1,12));
}

var playerCards = [];//an array for the element on screen

for(var i=0; i < playerHand.length; i++){
  playerCards[i] = document.createElement("card");

  //creates the element

  playerCards[i].innerHTML = playerHand[i].power;

  //adds the power value to the element

  playerCards[i].style.backgroundImage = playerHand[i].img;
  //adds the image


  document.getElementsByTagName("td")[i].appendChild(playerCards[i]);
  //appends it to the table
  
  
}

var compHand;//variable to hold the computer's card object

var compCard = document.createElement("card");
//a variable to hold the computer's element
//creates element

document.getElementsByTagName("td")[6].appendChild(compCard);//appends it to the table


var selected = -1;
//creates a variable to hold what card is selected and gives it a default value of -1


//adding event listeners
playerCards.forEach(function (element, index){
  element.addEventListener("click", function() {

    for (var i = 0; i < 6; i++){
      playerCards[i].style.border = "thick solid green"
    }//changes all the borders to green

    playerCards[index].style.border = "thick solid orange"
    //changes the card clicked to red

    selected = index; 
    //indicates the card as selected
  });
});
