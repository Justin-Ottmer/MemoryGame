const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClick = false;

const cardColors = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(cardColors);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    //newDiv.classList.add('hidden');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  console.log("you just clicked", event.target);
  if (noClick) return;
  if (event.target.classList.contains('flipped')) return;
  let clickedCard = event.target
  clickedCard.style.backgroundColor = clickedCard.classList[0];
//^^the [0] returns the color of the array class
  if (!card1 || !card2) {
    clickedCard.classList.add('flipped');
    card1 = card1 || clickedCard;
    //if ^^ set card1 = card2 it breaks whole code
    card2 = clickedCard === card1 ? null: clickedCard;
  }
  if (card1 && card2) {
    noClick = true;
    let face1 = card1.className;
    let face2 = card2.className;

    if (face1 === face2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClick = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1 = null;
        card2 = null;
        noClick = false;
      }, 1000);
    }
  }
  
  if (cardsFlipped === cardColors.length) alert ('Congratulations! You matched all cards!');
}

 
  //first thing is write logic so when clicked hidden removed and show color
  //write logic to check how many cards selected
  //write logic once two cards selected check to see if they match
  //if those two cards match leave showing, remove selected
  //write logic to handle if two cards don't match to reset
  

// when the DOM loads
createDivsForColors(shuffledColors);