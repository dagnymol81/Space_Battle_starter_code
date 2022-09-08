class Ship {
  constructor(hull, firepower, accuracy) {
    this.hull = hull
    this.firepower = firepower
    this.accuracy = accuracy
  }

shoot(enemy) {
    if (Math.random() < this.accuracy) {
      console.log("accuracy is " + this.accuracy)
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
}, '300');


//recursive function handles gameplay loop
function playGame() {

  //first check for winning condition
  if (alienArray.length < 1) {
    console.log("you win!")
  } 
    else {
    if (USSHelloWorld.hull > 0) {
      USSHelloWorld.shoot(alienArray[0]) //Player shoots if they have hull remaining
    }
    if (alienArray[0].hull > 0) {
      alienArray[0].shoot(USSHelloWorld) //Alien shoots if they have hull remaining
    }

    if (USSHelloWorld.hull < 0) {
      console.log("Defeat!") //Defeat condition
    } else {
      if (alienArray[0].hull < 0) {
        alienArray.shift() //remove ship if its hull is less than 0

        retreatMsg = window.confirm('Alien ship defeated. Continue?') //continue if ok, end if cancel
        if (retreatMsg) {
          setTimeout(playGame(), 300) //go back to top of function
        }  
        else {
          console.log("Retreat")
        }
      } else { //if both ships still have hull remaining, go back to top of function
        setTimeout(playGame(), 300)
      }
    }
  }
}







