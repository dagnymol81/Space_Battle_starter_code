let gameOver = false

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
      return enemy;
    } else {
      gameOver = true;
      console.log("you win")
    }
  }
  defeatShip() {
    console.log("Kill!")
    //todo: continue or retreat
    //retreat breaks gameplay loop
    if (!confirm("Ship defeated! Continue?")) {
      gameOver = true;
      console.log("Retreat")
    }
  }
}

class alienShip extends Ship {
  findTarget() {
    let enemy = USSHelloWorld;
    return enemy;
  }
  defeatShip() {
    console.log("You are defeated!")
    gameOver = true;
  }
}

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
  const USSHelloWorld = new playerShip(10, 5, .7)



  while (gameOver == false) {
    USSHelloWorld.shoot()
    if (alienArray.length > 0) {
      alienArray[0].shoot()
    }
  }





