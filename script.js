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

let alienArray = createAlienArray(6)
let USSHelloWorld = new Ship(20, 5, .7)

//Start Game after timeout
setTimeout(() => {
  let startMessage = window.confirm('The fate of Earth is in your hands. Are you ready?');
  if (startMessage) {
    playGame()
  }
}, '1000');

function playRound() {
  if (USSHelloWorld.hull > 0) {
    USSHelloWorld.shoot(alienArray[0]) //Player shoots if they have hull remaining
  }
  if (alienArray[0].hull > 0) {
    alienArray[0].shoot(USSHelloWorld) //Alien shoots if they have hull remaining
  }
}

function playGame() {

playRound() //both ships fire once if they have hull

 if (USSHelloWorld.hull <= 0) {
    console.log("you lose!")
    return
  } else if (alienArray[0].hull <= 0) {
    alienArray.shift()
    console.log(alienArray.length + " ships remaining")
    if (alienArray.length < 1) {
      console.log("you win!")
      return
    } else {
      retreatMsg = window.confirm('Alien ship defeated. Continue?') 
      if (!retreatMsg) {
        console.log("retreat")
        return
      }
    }
  }

  setTimeout(playGame, 1000)

}
