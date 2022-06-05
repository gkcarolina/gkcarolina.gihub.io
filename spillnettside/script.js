let playing = false;
let StartButton = document.getElementById("startButton");
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
let score = document.getElementById("score");

//highscoreheaderelement:
let highscore = document.querySelector("#highscore");

//Gjør highscore-verdien til localStorage
if (!localStorage.highscoreValue) {
  localStorage.highscoreValue = 0;
}
//skriver highscoreverdien inn i htmlen
highscore.innerText = `Beste score: ${localStorage.highscoreValue}`;

//lager funksjonen jump og får dino til å kunne hoppe
function jump() {
  dino.style.animation = `jump ${jumpLen}s`;
  setTimeout(function () {          //hopper og fjerner hoppet etter 500 millisekunder 
    dino.style.animation = "none"
  }, 500);
}

//om dino ikke hopper så hopper dino når man trykker inn en tast
document.addEventListener('keypress', function (event) {
  if (dino.style.animation.substr(0, 3) != "jump") {
    jump();
  }
})

//konstruerer dinosaurens posisjon 
setInterval(function () {
  if (playing == true) {
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
      let scoreValue = score.innerText;
      resul.innerText = `Du fikk en score på: ${scoreValue} 
        \n\nVil du spille igjen?`;
      resul.style.display = "block";
      document.getElementById("startbutton").style.display = "block";
      //location.reload();
      playing = false;
      rock.style.animation = "none";
      document.getElementById("resultater").style.backgroundColor = "rgba(21, 92, 19, 0.63)";
      //Redefinerer farten 
      speed = 1.8;
      jumpLen = 0.6;
      //Setter highscore-verdi og skriver den inn i highscore-h1-elementet
      if (scoreValue > Number(localStorage.highscoreValue)) {
        localStorage.highscoreValue = scoreValue;
        highscore.innerText = `Beste score: ${localStorage.highscoreValue}`;
      }
      
      addUser();

      score.innerText = 0;
    }
  }
}, 20);



//Informasjons og kilder modal

// henter modal
var modal = document.getElementById("infoModal");

// henter teksten som åpner modal
var info = document.getElementById("info");
//var kilder = document.getElementById("myBtn");

// Henter <span> elementet som lukker modal
var span = document.getElementsByClassName("close")[0];

// når bruker trykker på info, åpne modal 
info.onclick = function () {
  modal.style.display = "block";
}

// når bruker trykker på <span> (x), lukk modal
span.onclick = function () {
  modal.style.display = "none";
}

//når bruker trykker alle andre steder enn modal, lukk modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


//Top 10 modal

// henter modal
var topModal = document.getElementById("infoTopModal");

// henter teksten som åpner modal
var info = document.getElementById("top10");
//var kilder = document.getElementById("myBtn");

// Henter <span> elementet som lukker modal
var span = document.getElementsByClassName("close2")[0];

// når bruker trykker på info, åpne modal 
info.onclick = function () {
  topModal.style.display = "block";
}

// når bruker trykker på <span> (x), lukk modal
span.onclick = function () {
  topModal.style.display = "none";
}

//når bruker trykker alle andre steder enn modal, lukk modal
window.onclick = function (event) {
  if (event.target == topModal) {
    topModal.style.display = "none";
  }
}



let brukernavnSpill = document.querySelector("#brukerNavn");
brukernavnSpill.innerText = `brukernavn: ${localStorage.brukernavn}`;
/* brukernavnSpill.innerText="wdad"; */


//index.html script:


//database

const firebaseConfig = {
  apiKey: "AIzaSyBdBNFBz3uy-Zu9R-jdOWk13Z7lWmwE6xg",
  authDomain: "prosjekt1-b5a17.firebaseapp.com",
  projectId: "prosjekt1-b5a17",
  storageBucket: "prosjekt1-b5a17.appspot.com",
  messagingSenderId: "308759450317",
  appId: "1:308759450317:web:32c27ebf0b7f5dfec0cf84",
  measurementId: "G-H7EHHK4W53"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Lager en referanse til databasen
let db = firebase.firestore();

//Elementer fra DOM
let top5El = document.querySelector("#top5");

//Funksjon som legger til ny bruker i databasen
function addUser() {


  let scoreValue = Number(score.innerText);

  if(localStorage.brukernavn != "Ikke satt"){

    db.collection("brukere").add({
      Score: scoreValue,
      Brukernavn: localStorage.brukernavn
    })
    console.log("brukeren er lagt til i databasen")
  
    //Skriver ut brukerne på nytt
    getUsers()
  }
}

function getUsers() {

  // Henter data. Når dataene er ferdig hentet, starter "then"-biten
  //Henter dataen sortert fra høyest score og ned(descending)
  db.collection("brukere").orderBy("Score", "desc").get().then((snapshot) => {

    // Henter ut dokumentene
    let dokumenter = snapshot.docs;
    
    //Tømmer div som bruker skal være i
    top5El.innerHTML = "";

    //går gjennom dukumentene
    for (let i = 0; i < 5; i++) {
      //henter data for en enkeltbruker
      let bruker = dokumenter[i].data()

      console.log(bruker);

      top5El.innerHTML += `<h2 id="plassTitle">${i+1} plass</h2>`;
      top5El.innerHTML += `<p>Brukernavn: ${bruker.Brukernavn}</p>`;
      top5El.innerHTML += `<p>Score: ${bruker.Score}</p>`;

    }
  })
} 

//Laster inn top 5
getUsers();
