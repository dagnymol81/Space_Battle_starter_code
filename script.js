let gameOver = false
let enemy = "find enemy"

setTimeout(() => {
  let startMessage = window.confirm('The fate of Earth is in your hands. Are you ready?');
  // if (startMessage) {
  //     startGame()
  // }
}, '1000');



//Ship contains properties and methods common to both player and alien ships
class Ship {
  constructor(hull, firepower, accuracy) {
    this.hull = hull
    this.firepower = firepower
    this.accuracy = accuracy
  }

shoot() {

  //change this! pops new alien every time

  if (enemy == "find enemy" || enemy.hull <= 0) {
    enemy = this.findTarget()
  } 

  if(enemy) {
    if (Math.random() < this.accuracy) {
      enemy.hull -= this.firepower
      console.log("Hit!")
      console.log(enemy.constructor.name + " hull at " + enemy.hull)
    } else {
      console.log("Miss!")
    }

    if (enemy.hull <= 0) {
      this.defeatShip()
    }
  }
}
}


class playerShip extends Ship {

  findTarget() {
    if (alienArray.length > 0) {
      let enemy = alienArray.pop()
      console.log("Player ship shoots")
      return enemy;
    } else {
      gameOver = true;
      console.log("you win")
    }
  }

  defeatShip() {
    console.log("Kill!")
    console.log("There are " + alienArray.length + " enemy ships")

    setTimeout(() => {
      let retreatPrompt = window.confirm('Alien ship defeated. Continue?');
      if (!retreatPrompt) {
        gameOver = true;
        console.log("Retreat")
      }
    }, '1000');

  }
}

class alienShip extends Ship {
  findTarget() {
    let enemy = USSHelloWorld;
    console.log("Alien ship shoots")
    return enemy;
  }

  defeatShip() {
    console.log("You are defeated!")
    gameOver = true;
  }
}

//helper function for better random!
const randomInt = function(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const createAlienShip = function() {
  const hull = randomInt(3, 6)
  const firepower = randomInt(2, 4)
  const accuracy = (randomInt(6, 8)) / 10
  return new alienShip(hull, firepower, accuracy)
  }

const createAlienArray = function(numShips) {
  const arr = []
    for (let i = 0; i < numShips; i++) {
      arr.push(createAlienShip())
    }
  return arr;
  }

  const alienArray = createAlienArray(6)
  const USSHelloWorld = new playerShip(20, 5, .7)

  let enemyStats = document.querySelector(".enemyStats")
  if (alienArray.length > 0) {
    enemyStats.innerHTML = `Hull: <span id = "enemyhull">${alienArray[0].hull}</span><br>Firepower: ${alienArray[0].firepower}<br>Accuracy: ${alienArray[0].accuracy}`
  }

    while (gameOver == false) {
      USSHelloWorld.shoot(), 2000
      if (alienArray.length > 0) {
        USSHelloWorld.shoot(), 2000
      }
    }
  
let playerStats = document.querySelector(".playerStats")
playerStats.innerHTML = `Hull: <span id="playerhull">${USSHelloWorld.hull}</span><br>Firepower: ${USSHelloWorld.firepower}<br>Accuracy: ${USSHelloWorld.accuracy}`






