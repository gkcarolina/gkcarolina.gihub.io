
var playing = false;
var StartButton = document.getElementById("startButton");
//spesifiserer fart på stein og hopp
let speed = 1.8;
let jumpLen = 0.6;
//henter elementene 
let rock = document.getElementById("rock");
let dino = document.getElementById("dino");
let resul = document.getElementById("resultater");


//når man trykker knappen starter funksjonen og spillet er i gang samt startbutton forsvinner
function startButton() {
  playing = true;
  document.getElementById("startbutton").style.display = "none";
  document.getElementById("resultater").style.backgroundColor = "none";

  //Steinen går uendelig mot dino
  rock.style.animation = `rock ${speed}s infinite`;
}

//poengsum/score
const score = document.getElementById("score");

//lager funksjonen jump og får dino til å kunne hoppe
function jump() {
  dino.style.animation = `jump ${jumpLen}s`;
  setTimeout(function(){          //hopper og fjerner hoppet etter 500 millisekunder 
    dino.style.animation = "none"
  }, 500);
}

//om dino ikke hopper så hopper dino når man trykker inn en tast
document.addEventListener('keypress', function(event){
  if (dino.style.animation.substr(0,3) != "jump") {
    jump();
  }
})

//konstruerer dinosaurens posisjon 
setInterval(function() {
  if(playing == true){
    const dinoTop = parseInt(window.getComputedStyle(dino)
    .getPropertyValue('top'));   //henter css atrribut top og henter verdien
    const rockLeft = parseInt(window.getComputedStyle(rock)
    .getPropertyValue('left'));   //henter css atrribut left og henter verdien
    score.innerText++;

    resul.style.display = "none";
//forandrer hastigheten på steinen
    speed *= 5.999;
    rock.style.animation = `rock ${speed} infinite`;

    jumpLen *= 0.9999;

    //om steinen treffer dinosaur kommer resultatmeny og startknapp frem
    if (rockLeft < 50 && rockLeft > 0 && dinoTop > 175) {
      resul.innerText = "Du fikk en score på: " + score.innerText +
        "\n\nVil du spille igjen?";
      resul.style.display = "block";
      document.getElementById("startbutton").style.display = "block";
      //location.reload();
      playing = false;
      rock.style.animation = "none";
      document.getElementById("resultater").style.backgroundColor = "rgba(21, 92, 19, 0.63)";
      score.innerText = 0;
      //Redefinerer farten 
      speed = 1.8;
      jumpLen = 0.6;
    }
  } 
}, 20);

// henter modal
var modal = document.getElementById("infoModal");

// henter teksten som åpner modal
var info = document.getElementById("info");
//var kilder = document.getElementById("myBtn");

// Henter <span> elementet som lukker modal
var span = document.getElementsByClassName("close")[0];

// når bruker trykker på info, åpne modal 
info.onclick = function() {
  modal.style.display = "block";
}

// når bruker trykker på <span> (x), lukk modal
span.onclick = function() {
  modal.style.display = "none";
}

//når bruker trykker alle andre steder enn modal, lukk modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



