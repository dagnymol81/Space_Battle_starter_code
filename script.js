let gameOver = false
let playerStats = document.querySelector(".playerStats")

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
  let enemy = this.findTarget()

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
  constructor(hull, firepower, accuracy, aliens) {
    super(hull, firepower, accuracy)
    this.aliens = aliens
  }

  findTarget() {
    if (this.aliens.length > 0) {
      console.log("Player ship shoots")
    } else {
      gameOver = true;
      console.log("you win")
    }
    return this.aliens[0]
  }

  defeatShip() {
    console.log("Kill!")
    this.aliens.shift()
    console.log("There are " + this.aliens.length + " enemy ships")

    setTimeout(() => {
      let retreatPrompt = window.confirm('Alien ship defeated. Continue?');
      if (!retreatPrompt) {
        console.log("Retreat")
        gameOver = true;
      } 
      }
    , '1000');

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

  // updatePlayerStats() {
  //   playerStats.innerHTML = `Hull: ${USSHelloWorld.hull}<br>Firepower: ${USSHelloWorld.firepower}<br>Accuracy: ${USSHelloWorld.accuracy}`
  // }

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
  const USSHelloWorld = new playerShip(20, 5, .7, alienArray)

  // let enemyStats = document.querySelector(".enemyStats")
  // if (alienArray.length > 0) {
  //   enemyStats.innerHTML = `Hull: ${alienArray[0].hull}<br>Firepower: ${alienArray[0].firepower}<br>Accuracy: ${alienArray[0].accuracy}`
  // }

    while (gameOver == false) {
      USSHelloWorld.shoot()
      if (USSHelloWorld.aliens.length > 0) {
        USSHelloWorld.aliens[0].shoot()
      }
    }
  
    console.log(gameOver)








