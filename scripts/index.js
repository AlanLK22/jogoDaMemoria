//Deck

let deck = [
  {
    id: 1,
    name: "Jesus",
    color: "#84CFFA",
    imagem: "https://image.flaticon.com/icons/svg/3069/3069170.svg",
    descricao: ["descricao 1", "descricao 2", "descricao 3"],
    virado: true,
  },
  {
    id: 2,
    name: "arca",
    color: "#FA8484",
    imagem: "https://image.flaticon.com/icons/svg/3069/3069162.svg",
    descricao: ["descricao 1", "descricao 2", "descricao 3"],
    virado: true,
  },
  {
    id: 3,
    name: "cruz",
    color: "#E984FA",
    imagem: "https://image.flaticon.com/icons/svg/3069/3069163.svg",
    descricao: ["descricao 1", "descricao 2", "descricao 3"],
    virado: true,
  },
  {
    id: 4,
    name: "sansão",
    color: "#84FAAC",
    imagem: "https://image.flaticon.com/icons/svg/3069/3069169.svg",
    descricao: ["descricao 1", "descricao 2", "descricao 3"],
    virado: true,
  },
  {
    id: 5,
    name: "moisés",
    color: "#8684FA",
    imagem: "https://image.flaticon.com/icons/svg/3069/3069186.svg",
    descricao: ["descricao 1", "descricao 2", "descricao 3"],
    virado: true,
  },
  {
    id: 6,
    name: "davi",
    color: "#F7FA84",
    imagem: "https://image.flaticon.com/icons/svg/3069/3069224.svg",
    descricao: ["descricao 1", "descricao 2", "descricao 3"],
    virado: true,
  },
];

const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let movements = 0;
let winContador = 0;

function flipCard() {

  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

   if (!hasFlippedCard) {
     hasFlippedCard = true;
     firstCard = this;
     return;
    }

    console.log(winContador)
     
    secondCard = this;
 
    checkForMatch();
}
 

  function checkForMatch() {
    if(firstCard.dataset.nome !== secondCard.dataset.nome) {
      movements++;
    }
    document.getElementById("movimentos").innerHTML = `${movements}`;
    document.getElementById("movimentos2").innerHTML = `${movements}`;
      
    if (firstCard.dataset.nome === secondCard.dataset.nome) {
      winContador++;
      disableCards();
  
      if(winContador == 6) {
        setTimeout(() => {
          document.querySelector('#vitoria').style.display = 'block'
          document.querySelector('#movimentosvitoria').innerHTML = movements

          playVictorySound();
        }, 1000);
      } else {
            playMatchSound();    
      }

      return;
    }

 
    unflipCards();

    console.log(movements);

  }
 


  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
  }
 
  

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();

    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }



  (function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
  })();

cards.forEach(card => card.addEventListener('click', flipCard));





const flipSound = "./music/success-bell.mp3";


function playMatchSound() {
  const matchSound = new Audio(flipSound);
  matchSound.play();
}


const victorySound = "./music/success-fanfare-trumpets.mp3"


function playVictorySound() {
  const matchSound = new Audio(victorySound);
  matchSound.play();
}