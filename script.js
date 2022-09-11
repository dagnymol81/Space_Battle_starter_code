//define DOM elements
let playerStats = document.querySelector(".playerStats")
let enemyStats = document.querySelector(".enemyStats")

//ship class
class Ship {
  constructor(hull, firepower, accuracy) {
    this.hull = hull
    this.firepower = firepower
    this.accuracy = accuracy
  }

  shoot(enemy) {
    if (Math.random() < this.accuracy) {
      enemy.hull -= this.firepower
      console.log("Hit!")
      console.log(enemy.constructor.name + " hull at " + enemy.hull)
    } else {
      console.log("Miss!")
    }
  }
}


//helper function for better random!
function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//function to alien ships
function createAlienShip() {
  let hull = randomInt(3, 6)
  let firepower = randomInt(2, 4)
  let accuracy = (randomInt(6, 8)) / 10
  return new Ship(hull, firepower, accuracy)
  }

function createAlienArray(numShips) {
  let arr = []
  for (let i = 0; i < numShips; i++) {
    arr.push(createAlienShip())
  }
  return arr;
  }

//function to update the DOM
function updateStats() {
  playerStats.textContent = `Hull: ${USSHelloWorld.hull} Firepower: ${USSHelloWorld.firepower} Accuracy: ${USSHelloWorld.accuracy}`
  enemyStats.textContent = `Hull: ${alienArray[0].hull} Firepower: ${alienArray[0].firepower} Accuracy: ${alienArray[0].accuracy}`
}

//create ships
let alienArray = createAlienArray(6)
let USSHelloWorld = new Ship(20, 5, .7)

//Start Game after timeout
setTimeout(() => {
  let startMessage = window.confirm('Alien ships are attacking. Are you ready?');
  if (startMessage) {
    playGame()
  }
}, '1000');

//Player ship shoots, then alien ship (if it survives)
function playRound() {
  if (USSHelloWorld.hull > 0) {
    USSHelloWorld.shoot(alienArray[0]) //Player shoots if they have hull remaining
  }
  if (alienArray[0].hull > 0) {
    alienArray[0].shoot(USSHelloWorld) //Alien shoots if they have hull remaining
  }
}

//write inital stats
updateStats()

//Gameplay function. Loops by calling itself at the end if the ending condition is not met
function playGame() {

  //update the DOM first
  updateStats()
  playRound() //both ships fire once if they have hull

  if (USSHelloWorld.hull <= 0) {
    console.log("you lose!") //end if player ship has 0 hull
    alert("You lose!")
    return
  } else if (alienArray[0].hull <= 0) { 
    alienArray.shift() //if alien ship has zero hull, move on to the next one
    console.log(alienArray.length + " ships remaining")
    if (alienArray.length < 1) {
      console.log("you win!") //if there are no alien ships remaining, end
      alert("You win!")
      return
    } else {
      retreatMsg = window.confirm('Alien ship defeated. Continue?') 
      if (!retreatMsg) {
        console.log("retreat")
        alert("Retreat is sometimes necessary")
        return //end if retreat
      }
    }
  }

  setTimeout(playGame, 1000) //give DOM time to update, then play again

}