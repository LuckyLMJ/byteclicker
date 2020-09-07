function restart() {
  //setup
  localStorage.clear()
  bytes = 0
  localStorage.setItem("bytes", 0);
  ram = 0
  localStorage.setItem("ram", 0);
  perClick = 1
  localStorage.setItem("perClick", 1);
  perSec = 0
  localStorage.setItem("perSec", 0);
  mouseCost = 15
  localStorage.setItem("mouseCost", 15);
  amountOfMice = 0
  localStorage.setItem("amountOfMice", 0);
  valueOfMice = 0.1
  localStorage.setItem("valueOfMice", 0.1);
  valueOfComputers = 1
  localStorage.setItem("valueOfComputers", 1.5);
  amountOfComputers = 0
  localStorage.setItem("amountOfComputers", 0);
  computerCost = 120
  localStorage.setItem("computerCost", 120);
  betterClickCost = 80
  localStorage.setItem("betterClickCost", 80);
  smallBoostCost = 1000
  localStorage.setItem("smallBoostCost", 1000);
  boost = 1
  localStorage.setItem("boost", 1)
  permBoost = 1
  localStorage.setItem("permBoost", 1)
  localStorage.setItem("exists", true);
  randomCost = 5000
  localStorage.setItem("randomCost", 5000)
  amountOfRandom = 0
  localStorage.setItem("amountOfRandom", amountOfRandom)
  valueOfRandom = 9
  localStorage.setItem("valueOfRandom", valueOfRandom)
  computerBoostCost = 4000
  localStorage.setItem("computerBoostCost", 4000)
  localStorage.setItem("hasReset", false)
  localStorage.setItem("resetMice", 0)
  
}
function setup() {
  //localStorage.clear() //uncomment this, start the game, and recomment or delete to reset your progress.
  setup = false;
  hasReset = false;
  createCanvas(windowWidth, windowHeight);
  if(!localStorage.getItem("exists")) { //if you have not played before, sets up the neccesary stuff!
    print("restarting")
    restart()
  } else { //loads your progress!
    print("reading")
    bytes = localStorage.getItem("bytes") / 1 //why do we have to divide by 1? I don't know, it just causes some REALLY odd glitches if I don't for some reason (try it, remove the / 1 from the bytes! you may need to reset afterwards)
    perClick = localStorage.getItem("perClick") / 1
    ram = localStorage.getItem("ram") / 1
    perSec = localStorage.getItem("perSec") / 1
    mouseCost = localStorage.getItem("mouseCost") / 1
    amountOfMice = localStorage.getItem("amountOfMice") / 1
    valueOfMice = localStorage.getItem("valueOfMice") / 1
    valueOfComputers = localStorage.getItem("valueOfComputers") / 1
    amountOfComputers = localStorage.getItem("amountOfComputers") / 1
    computerCost = localStorage.getItem("computerCost") / 1
    betterClickCost = localStorage.getItem("betterClickCost") / 1
    smallBoostCost = localStorage.getItem("smallBoostCost") / 1
    boost = localStorage.getItem("boost") / 1
    permBoost = localStorage.getItem("permBoost") / 1
    randomCost = localStorage.getItem("randomCost") / 1
    amountOfRandom = localStorage.getItem("amountOfRandom") / 1
    valueOfRandom = localStorage.getItem("valueOfRandom") / 1
    computerBoostCost = localStorage.getItem("computerBoostCost") / 1
    hasReset = localStorage.getItem("hasReset")
    resetMice = localStorage.getItem("resetMice") / 1
    ram = localStorage.getItem("ram") / 1
  }
  setup = true
  print ("done setup") //pretty self explanatory, prints in the log that setup is finished
  if (localStorage.getItem("oldTime") <= (Date.now() - 5000))  {
    bytes += (perSec * (Date.now() - localStorage.getItem("oldTime"))) / 2000 //offline progress checker! gives you 1/2 of the progress you would have otherwise got while offline
  }
  setInterval(getPerSec, 50) //resets your bytes value to add 1/20th of your per sec every 20th of a second
  setInterval(setCookies, 50) //Saves every 50ms
  print(bytes + " bytes")
  print(perSec + " per sec")
  print((boost - 1) * 100 + "% upgrade boost")
  print(perClick + " per click")
  print(computerBoostCost)
  //prints a bunch of info, for debugging!//

}
function reset() {
  ram += Math.round(((1 + (bytes / 100000)) * (1 + (perSec / 500)) - 1) / permBoost) 
  bytes = 0
  perClick = 1
  perSec = 0
  mouseCost = 15
  amountOfMice = resetMice
  valueOfMice = 0.1
  valueOfComputers = 1.5
  amountOfComputers = 0
  computerCost = 120
  betterClickCost = 80
  smallBoostCost = 1000
  computerBoostCost = 4000
  randomCost = 5000
  valueOfRandom = 10
  amountOfRandom = 0
  boost = 1
}
function draw() {
  if (setup === true) { //if setup is done, draw!
  bPerClick = (perClick * permBoost) * boost //calculates bytes per click!
  valueOfMice = perClick / 10 // calculates value of mice!
  perSec = 0
  perSec += amountOfMice * valueOfMice
  perSec += amountOfComputers * valueOfComputers
  perSec += amountOfRandom * valueOfRandom
  perSec *= (permBoost * boost)
  //calculates bytes per second
  if (bytes > 1000000) { //this whole section is making numbers easier to read!
    rBytes = Math.round((bytes / 1000000) * 100 + Number.EPSILON ) / 100
    sBytes = rBytes.toString() + " megabytes"
  } else if (bytes > 10000) {
    rBytes = Math.round((bytes / 1000) * 10 + Number.EPSILON ) / 10
    sBytes = rBytes.toString() + " kilobytes"
  } else if ( bytes > 1000){ 
    rBytes = Math.round((bytes / 1000) * 100 + Number.EPSILON ) / 100
    sBytes = rBytes.toString() + " kilobytes"
  } else {
    rBytes = Math.round(bytes * 10 + Number.EPSILON ) / 10
    sBytes = rBytes.toString() + " bytes"
  }
  if (perSec > 1000000) { 
    rPerSec = Math.round((perSec / 1000000) * 100 + Number.EPSILON ) / 100
    sPerSec = rPerSec.toString() + " megabytes"
  } else if (perSec > 10000) {
    rPerSec = Math.round((perSec / 1000) * 10 + Number.EPSILON ) / 10
    sPerSec = rPerSec.toString() + " kilobytes"
  } else if (perSec > 1000){ 
    rPerSec = Math.round((perSec / 1000) * 100 + Number.EPSILON ) / 100
    sPerSec = rPerSec.toString() + " kilobytes"
  } else {
    rPerSec = Math.round(perSec * 10 + Number.EPSILON ) / 10
    sPerSec = rPerSec.toString() + " bytes"
  }
  background(200); //fills in the background
  fill(255) //this whole section is making sections on the screen
  rect(0, 0, 300, windowHeight)
  fill(150)
  rect(300, 0, (windowWidth - 300), 125)
  fill(0, 200, 0)
  rect(100, 150, 50, 50, 30)
  if (true) { //makes the reset button show up
    strokeWeight(2)
    rect(10, windowHeight - 75, 275, 20, 10)
    fill(0)
    strokeWeight(1)
    textSize(10)
    text("Completely restart the entire game", 20, windowHeight - 60) //self-explanatory
    stroke(5)
  }
    if (bytes >= 15000) {
    strokeWeight(2)
    fill(0, 200, 0)
    rect(10, windowHeight - 100, 275, 20, 10)
    fill(0)
    strokeWeight(1)
    textSize(10)
    text("Format", 20, windowHeight - 85)
    stroke(5)
  }
  fill(200, 10, 10)
  rect(325, 150, 25, 25) //mice
  rect(375, 150, 25, 25) //computers
  rect(425, 150, 25, 25) //random number gen
  rect(325, 25, 25, 25) //click
  rect(375, 25, 25, 25) //boost
  rect(425, 25, 25, 25) //computer upgrade
  rect(325, 75, 25, 25) //RAM boost upgrade
  rect(375, 75, 25, 25) //RAM start with mice upgrade
  //rect(425, 75, 25, 25) // for later
  fill(255, 140, 0)
  rect(0, windowHeight - 50, windowWidth, 50)
  fill(0)
  noStroke()
  textSize(20)
  text(sBytes.toString(), 20, 30)
  textSize(13)
  if (ram > 0 || permBoost > 1) {
    text(ram.toString() + " bytes of RAM", 200, 30)
  }
  textSize(13)
  text(sPerSec.toString() + " per second, " + Math.round(bPerClick) + " per click", 20, 50)
  } 
  text("You have a "+ (Math.round((((permBoost * boost) *  100) - 100) * 10) / 10).toString() + "% boost to production", 20, 70) //boost display!
  textSize(16)
  if ((mouseX > 325 && mouseX < 350) && (mouseY > 150 && mouseY < 175)) {
    if (mouseCost < 1000) {
      text("A mouse. Clicks every 10 seconds. Mice cost " + mouseCost + " bytes, and you own " + amountOfMice +". They are worth " + valueOfMice + " per second.", 10, windowHeight - 20)
    } else { //displays some info!
      text("A mouse. Clicks every 10 seconds. Mice cost " + Math.round(mouseCost / 100) / 10 + " kilobytes, and you own " + amountOfMice +". They are worth " + valueOfMice + " per second.", 10, windowHeight - 20)
    }
  }
  if ((mouseX > 375 && mouseX < 400) && (mouseY > 150 && mouseY < 175)) {
    if (computerCost < 1000) {
      text("A computer. Each computer costs " + computerCost + " bytes, and you own " + amountOfComputers +". They are worth " + valueOfComputers + " per second.", 10, windowHeight - 20)
    } else { //displays more info!
      text("A computer. Each computer costs " + Math.round(computerCost / 100) / 10 + " kilobytes. You own " + amountOfComputers +". They are worth " + valueOfComputers + " per second.", 10, windowHeight - 20)
    }
  }
    if ((mouseX > 425 && mouseX < 450) && (mouseY > 150 && mouseY < 175)) {
    if (randomCost < 1000000) {
      text(  'A random number generator. "More bytes!" Costs ' + Math.round(randomCost / 100) / 10 + " kilobytes. You own " + amountOfRandom +". They are worth " + valueOfRandom + " per second.", 10, windowHeight - 20)
    } else { //randomness!
      text( 'A random number generator. "More bytes!" Costs ' + Math.round(randomCost / 100000) / 10 + " megabytes. You own " + amountOfRandom +". They are worth " + valueOfRandom + " per second.", 10, windowHeight - 20)
    }
  }
  if ((mouseX > 325 && mouseX < 350) && (mouseY > 25 && mouseY < 50)) {
    if (betterClickCost < 1000) {
      text("Doubles your clicking power. Also affects mice. Costs " + betterClickCost + " bytes.", 10, windowHeight - 20)
    } else {// upgrades
      text("Doubles your clicking power. Also affects mice. Costs " + Math.round(betterClickCost / 100) / 10 + " kilobytes.", 10, windowHeight - 20)
    }
  }
  if ((mouseX > 375 && mouseX < 400) && (mouseY > 25 && mouseY < 50)) {
    if (smallBoostCost < 1000) {
      text("Grants 1% increased production. Costs " + smallBoostCost + " bytes.", 10, windowHeight - 20)
    } else { //upgrades
      text("Grants 1% increased production. Costs " + Math.round(smallBoostCost / 100) / 10 + " kilobytes.", 10, windowHeight - 20)
    }
  }
  if ((mouseX > 425 && mouseX < 450) && (mouseY > 25 && mouseY < 50)) {
    if (computerBoostCost < 1000000) {
      text("Grants 25% increased production to computers. Costs " + Math.round(computerBoostCost / 100) / 10 + " kilobytes.", 10, windowHeight - 20)
    } else { //upgrades
      text("Grants 25% increased production to computers. Costs " + Math.round(computerBoostCost / 100000) / 10 + " megabytes.", 10, windowHeight - 20)
    }
  }
  if ((mouseX > 325 && mouseX < 350) && (mouseY > 75 && mouseY < 100)) {
      text("Grants a permenant 1% boost that lasts between formats for 1 byte of RAM.", 10, windowHeight - 20)
  }
  if ((mouseX > 375 && mouseX < 400) && (mouseY > 75 && mouseY < 100)) {
      text("Gives you 2 mice whenever you format. Costs 1 byte of RAM.", 10, windowHeight - 20)
  }
  
  if ((mouseX > 100 && mouseX < 150) && (mouseY > 150 && mouseY < 200)) {
    text("Click to gain bytes!", 10, windowHeight - 20)
  } // big green circle display
  strokeWeight(2)
  fill(0)
  stroke(20)
}
function mouseClicked() {
  if ((mouseX > 10 && mouseX < 150) && (mouseY > 150 && mouseY < 200)) {
    bytes += bPerClick // gives you bytes from clicking on the circle!
    //bytes += 1 //ignore this comment, it was for testing! 
  }
  if ((mouseX > 10 && mouseX < 285) && (mouseY > windowHeight - 75 && mouseY < windowHeight - 55)) {
    if  (confirm("Are you sure you would like to restart? You will lose everything, with no reward!") === true) {
    restart()
    }
  }
  if ((mouseX > 10 && mouseX < 285) && (mouseY > windowHeight - 100 && mouseY < windowHeight - 80)) {
    if (true) {
      if  (confirm("This will revert all progress and give RAM. You will get " + Math.round(((1 + (bytes / 100000)) * (1 + (perSec / 500)) - 1)) + " bytes of RAM if you reset now.") === true) {
      reset()
      hasReset = true;
      }
    } else {
      reset()
    }
  }
  if ((mouseX > 325 && mouseX < 350) && (mouseY > 150 && mouseY < 175) && bytes >= mouseCost) {
    amountOfMice++
    bytes -= mouseCost //mice
    mouseCost = mouseCost * 1.1
    mouseCost = Math.round(mouseCost)
  }
  if ((mouseX > 350 && mouseX < 400) && (mouseY > 150 && mouseY < 175) && bytes >= computerCost) {
    amountOfComputers++
    bytes -= computerCost //computers
    computerCost = computerCost * 1.1
    computerCost = Math.round(computerCost)
  }
  if ((mouseX > 400 && mouseX < 450) && (mouseY > 150 && mouseY < 175) && bytes >= computerCost) {
    amountOfRandom++
    bytes -= randomCost //randomness
    randomCost = randomCost * 1.13
    randomCost = Math.round(randomCost)
  }
  if ((mouseX > 325 && mouseX < 350) && (mouseY > 25 && mouseY < 50) && bytes >= betterClickCost) {
    perClick = perClick * 2
    bytes -= betterClickCost //upgrades
    betterClickCost = Math.round(betterClickCost * 5)
  }
  if ((mouseX > 375 && mouseX < 400) && (mouseY > 25 && mouseY < 50) && bytes >= smallBoostCost) {
    boost += 0.01
    bytes -= smallBoostCost //upgrades
    smallBoostCost = Math.round(smallBoostCost * 1.2)
  }
  if ((mouseX > 425 && mouseX < 450) && (mouseY > 25 && mouseY < 50) && bytes >= computerBoostCost) {
    valueOfComputers *= 1.25
    bytes -= computerBoostCost
    computerBoostCost *= 1.75
  }
  if ((mouseX > 325 && mouseX < 350) && (mouseY > 75 && mouseY < 100) && ram >= 1) {
    ram -= 1
    permBoost += 0.01
  }
  if ((mouseX > 375 && mouseX < 400) && (mouseY > 75 && mouseY < 100) && ram >= 1) {
    ram -= 1
    resetMice += 2
    amountOfMice += 2
  }
}
function getPerSec() { 
    bytes += perSec / 20 //does math, look at the top
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function setCookies() {
  if (setup !== false) {
    localStorage.setItem("bytes", bytes);
    localStorage.setItem("perClick", perClick);
    localStorage.setItem("perSec", perSec);
    localStorage.setItem("mouseCost", mouseCost);
    localStorage.setItem("amountOfMice", amountOfMice);
    localStorage.setItem("valueOfMice", valueOfMice);
    localStorage.setItem("valueOfComputers", valueOfComputers);
    localStorage.setItem("amountOfComputers", amountOfComputers);
    localStorage.setItem("computerCost", computerCost);
    localStorage.setItem("betterClickCost", betterClickCost);
    localStorage.setItem("smallBoostCost", smallBoostCost);
    localStorage.setItem("boost", boost);
    localStorage.setItem("permBoost", permBoost);
    localStorage.setItem("oldTime", Date.now())
    localStorage.setItem("randomCost", randomCost)
    localStorage.setItem("amountOfRandom", amountOfRandom)
    localStorage.setItem("valueOfRandom", valueOfRandom)
    localStorage.setItem("computerBoostCost", computerBoostCost)
    localStorage.setItem("ram", ram)
    localStorage.setItem("resetMice", resetMice)
  } 
}
