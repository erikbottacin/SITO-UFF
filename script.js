
    // ANIMAZIONE TESTO "THE PRESTIGE UNVEILED"
    var textWrapper = document.querySelector('.sottotitolo1');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    
    anime.timeline({loop: false})
      .add({
        targets: '.sottotitolo1 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 1250,
        delay: (el, i) => 60 * (i+1)
      });
      

      let fatto = true;
      const observer1 = new IntersectionObserver(entries => {
          entries.forEach(entry => {
              const sottotitolo = entry.target.querySelector('.sottotitolo');

              if (entry.isIntersecting && fatto==true) {
                 
                  fatto = false;
                  anime.timeline({loop: false})

//modificare questo per velocità seconda animazione
  .add({
  targets: '.sottotitolo .letter',
  opacity: [0,1],
  easing: "easeInOutQuad",
  duration: 1500,
  delay: (el, i) => 40 * (i+1)
});
                   // if we added the class, exit the function
              }

              // We're not intersecting, so remove the class!
              
          });
      });

      observer1.observe(document.querySelector('.sottotitolo-wrapper'));

// ANIMAZIONE TESTO "DID YOU WATCH IT CLOSELY?" 
let textWrapper2 = document.querySelector('.sottotitolo');
textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

// Imposta l'opacità iniziale a 0
textWrapper2.style.opacity = 0;

let animationExecuted = false; // Variabile di controllo per verificare se l'animazione è già stata eseguita

let observer2 = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animationExecuted) {
      anime.timeline({ loop: false })
      
      // Imposta l'opacità finale a 1 durante l'animazione
      textWrapper2.style.opacity = 1;
      
      animationExecuted = true; // Imposta la variabile di controllo a true per indicare che l'animazione è stata eseguita
    }
  });
}, { threshold: 1 });

observer2.observe(textWrapper2);

//ANIMAZIONE PALLINA E UCCELLO
const movingCircle = document.getElementById('movingCircle');
const Uccello = document.getElementById('Uccello');

function updatePosition() {
  const scrollY = window.scrollY;
  const scrollPercentage = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  const y = 25000 * scrollPercentage;  // velocità pallina
  const cappelloImg = document.getElementById('cappelloImg');
  const cappelloTop = cappelloImg.offsetTop;
  let opacity;

  if(scrollY< 20000){
  
  if (scrollY < 1000) {
    opacity = 1 - (y + 68) / (cappelloTop); // Calcola l'opacità in base alla coordinata y della pallina e alla posizione superiore dell'immagine del cappello
  } else {
    opacity = 0; // Rendi la pallina completamente invisibile quando raggiunge l'immagine del cappello
  }

  // Muovi la pallina in assoluto senza tener conto dell'SVG
  gsap.to(movingCircle, { duration: 0.5, attr: { cy: y + 68 }, opacity: opacity });

  if (y + 68 >= 1000) {
    movingCircle.style.visibility = 'visible';
  }
}

else {

  if (scrollY < 42200) {
    opacity = 0 ; // Calcola l'opacità in base alla coordinata y della pallina e alla posizione superiore dell'immagine del cappello
  } else if(scrollY < 42570) {
    opacity = ((scrollY-42200)/500); // Rendi la pallina completamente invisibile quando raggiunge l'immagine del cappello
  }
  else {
opacity = 1;

  }
  // Muovi la pallina in assoluto senza tener conto dell'SVG
  gsap.to(Uccello, { duration: 0.5, attr: { cy: y + 68}, opacity: opacity });

  if (y >= 36000) {
    Uccello.style.visibility = 'visible';
  }

}

}

window.onscroll = updatePosition;


//ANIMAZIONE TESTI PARAGRAFI PARTE INIZIALE E FINALE
const paragraphs = document.querySelectorAll(".section__paragraph, .header__text");

document.addEventListener("scroll", function() {
    paragraphs.forEach((paragraph) => {
        if (isInView(paragraph)) {
            paragraph.classList.add("section__paragraph--visible");
        }
    });
});

function isInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom > 0 && rect.top < (window.innerHeight - 150 || document.documentElement.clientHeight - 150)
    );
}


//ANIMAZIONE LAMPADINE
document.addEventListener("DOMContentLoaded", function() {
  var lampadinaImg = document.getElementById("lampadinaImg");

  window.addEventListener("scroll", function() {
    var scrollPosition = window.scrollY;

    // Modifica la condizione a seconda di quando vuoi che avvenga la transizione
    if (scrollPosition > 2000) {
      lampadinaImg.src = "png/lampadine accese.png";
    } else {
      lampadinaImg.src = "png/lampadine spente.png";
    }
  });
});

//ANIMAZIONE TIMELINE
var img = document.getElementById('image');
var timelineOverlay = document.querySelector('.timeline-overlay');
var ciboOverlay = document.querySelector('.cibo-overlay');
var overlayText = document.querySelector('.overlay-text');
var timelineText = document.querySelector('.timeline-text');
var ciboText = document.querySelector('.cibo-text');
var movieOrderText = document.querySelector('.movie-order');
var cronoOrderText = document.querySelector('.crono-order');

var totalDuration = 2 * 60 * 60 + 10 * 60; // Tempo totale in secondi

var movieOrderSrc = "png/movieorder.png";
var cronOrderSrc = "png/cronorder.png";
var currentSrc = movieOrderSrc;
var currentText = movieOrderText;

img.addEventListener('mouseenter', function() {
  if (currentSrc === movieOrderSrc) {
    timelineOverlay.style.opacity = 1;
    ciboOverlay.style.opacity = 0;
  } else if (currentSrc === cronOrderSrc) {
    ciboOverlay.style.opacity = 1;
    timelineOverlay.style.opacity = 0;
  }
});

img.addEventListener('mouseleave', function() {
  timelineOverlay.style.opacity = 0;
  ciboOverlay.style.opacity = 0;
});

img.addEventListener('mousemove', function(event) {
  var rect = img.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var positionPercentage = mouseX / rect.width;

  if (currentSrc === movieOrderSrc) {
    var percentage = mouseX / rect.width;
    var currentTime = Math.round(percentage * totalDuration);

    var hours = Math.floor(currentTime / 3600);
    var minutes = Math.floor((currentTime % 3600) / 60);
    var seconds = currentTime % 60;

    timelineText.textContent = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  } else if (currentSrc === cronOrderSrc) {
    if (positionPercentage <= 0.45) {
      ciboOverlay.style.opacity = 1;
      timelineOverlay.style.opacity = 0;
      ciboText.textContent = "The Pledge";
    } else if (positionPercentage > 0.45 && positionPercentage <= 0.69) {
      ciboOverlay.style.opacity = 1;
      timelineOverlay.style.opacity = 0;
      ciboText.textContent = "The Turn";
    } else if (positionPercentage > 0.69 && positionPercentage <= 1.00) {
      ciboOverlay.style.opacity = 1;
      timelineOverlay.style.opacity = 0;
      ciboText.textContent = "The Prestige";
    } else {
      ciboOverlay.style.opacity = 0;
      timelineOverlay.style.opacity = 1;
    }
  }
});

img.addEventListener('click', function() {
  if (currentSrc === movieOrderSrc) {
    img.src = cronOrderSrc;
    currentSrc = cronOrderSrc;
    currentText.style.opacity = 0;
    cronoOrderText.style.opacity = 1;
    currentText = cronoOrderText;
    timelineOverlay.style.opacity = 0;
  } else {
    img.src = movieOrderSrc;
    currentSrc = movieOrderSrc;
    currentText.style.opacity = 0;
    movieOrderText.style.opacity = 1;
    currentText = movieOrderText;
    ciboOverlay.style.opacity = 0;
  }

  timelineText.textContent = "00:00:00";

  if (currentSrc === movieOrderSrc) {
    timelineOverlay.style.opacity = 1;
  } else if (currentSrc === cronOrderSrc) {
    ciboOverlay.style.opacity = 1;
  }
});

function pad(num) {
  return num < 10 ? '0' + num : num;
}

// VECCHIA ANIMAZIONE LINEE
window.addEventListener('scroll', function() {
  let lineContainer = document.querySelector('.line-container');
  let startPosition = lineContainer.offsetTop;
  let pageHeight = document.documentElement.scrollHeight;
  let scrollPosition = window.scrollY;

  let paths = document.querySelectorAll('svg path');

  paths.forEach((path) => {
      let pathLength = path.getTotalLength();
      path.style.strokeDasharray = pathLength + ' ' + pathLength;
      path.style.strokeDashoffset = pathLength;

      if (scrollPosition >= startPosition) {
          // Il tuo codice da eseguire quando lo scroll raggiunge la posizione desiderata

          // Calcola la percentuale di completamento del disegno
          let scrollPercentage = Math.min(1, (scrollPosition - startPosition) / (pageHeight - startPosition));

          // Riduci la velocità regolando il valore seguente
          let drawLength = pathLength * scrollPercentage; // Puoi regolare il divisore per controllare la velocità

          // Disegna il tratto
          path.style.strokeDashoffset = pathLength - drawLength;
      } else {
          // Il tuo codice da eseguire quando lo scroll è al di sopra della posizione desiderata
          path.style.strokeDashoffset = pathLength;
      }
  });

  if (scrollPosition >= startPosition) {
      document.querySelector('.line-container').classList.add('show-line');
  } else {
      document.querySelector('.line-container').classList.remove('show-line');
  }
});

//ANIMAZIONE RETTANGOLO MASCHERA
// document.addEventListener("scroll", function() {
//   var triggerPoint = 4400;
//   var rectangularBox = document.querySelector(".rectangular-box");
  
//   // Modifica la posizione del rettangolo basata sulla posizione dello scroll
//   rectangularBox.style.bottom = scrollPosition + "px";

//   if (scrollPosition > triggerPoint) {
//     conditionalRectangle.classList.add("show");
//   } else {
//     conditionalRectangle.classList.remove("show");
//   }});

// window.addEventListener('scroll', function() {
//   const scrollY = window.scrollY;
//   const scrollPercentage = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
//   const newHeight = 143 + (9812 - 143) * scrollPercentage; // replace 143 and 9812 with the initial and final heights
//   document.getElementById('maskRect').setAttribute('height', newHeight);
// });



//ANIMAZIONE CLUE COUNTER
document.addEventListener('DOMContentLoaded', function () {
  hideClueCounter();
});

let previousScrollY;
let currentScrollY;
let direction;

let points = [
  { id: 0, top: 6200, visited: false, explanation: "He doesn't know which knot he tied because it was his twin." },
  { id: 1, top: 8000,  visited: false, explanation: "He doesn't love her; it's his twin who loves her." },
  { id: 2, top: 16000,  visited: false, explanation: "Cutter says that the trick involves the use of a double." },
  { id: 3, top: 16700,  visited: false, explanation: "It was his twin who had said no." },
  { id: 4, top: 18800, visited: false, explanation: "Borden himself tells Root that he uses a double in his trick." },
  { id: 5, top: 25500,  visited: false, explanation: "He's not always the person Sarah knows, as it's his twin." },
  { id: 6, top: 28200,  visited: false, explanation: "In this scene, it's truly Alfred, and therefore the love is authentic." },
  { id: 7, top: 28900,  visited: false, explanation: "Alfred asks his twin to assure Sarah that he loves her." },
  { id: 8, top: 29600, bottom: 40000, visited: false, explanation: "Sarah talks to the twin that doesn't love her, but she is unaware of it." },
];

let pointCounter = 0;

let clueCounterVisible = false; // Variabile per gestire la visibilità del clue counter

function onScroll() {
  const scrollTop = window.scrollY;
  const explainCounterElement = document.getElementById('explainCounter');
  const fineCounter = 40000; //quando deve sparire il clue counter

  if (currentScrollY === scrollTop) return;

  previousScrollY = currentScrollY;
  currentScrollY = scrollTop;

  if (!clueCounterVisible && (currentScrollY >= points[0].top)) {
    showClueCounter();
  }

  if (currentScrollY > previousScrollY) {
    direction = "down";
    checkPoints();
    if((currentScrollY >= points[0].top) && (currentScrollY < points[8].bottom)){
      explainCounterElement.classList.add('show');
    }
    else {
      explainCounterElement.classList.remove('show'); 
    }
  } else if (currentScrollY < previousScrollY) {
    direction = "up";
    if ((currentScrollY < points[0].top) || (currentScrollY >= 40000)) {
      explainCounterElement.classList.remove('show');
      hideClueCounter(); // Nasconde il clue counter se torni indietro prima del punto 1
       // Nasconde l'explain counter se torni indietro
    } else {
      explainCounterElement.classList.add('show');
      removePoints();
       // Nasconde l'explain counter se torni indietro
    }
  }

  if (currentScrollY >= fineCounter) {
    hideClueCounter();
  }

}

function showClueCounter() {
  const counterElement = document.getElementById('clueCounter');
  const lenteElement = document.getElementById('lente');
  

  if (counterElement && lenteElement) {
    counterElement.style.display = 'block';
    lenteElement.style.display = 'block';
    clueCounterVisible = true;
  }
}

function hideClueCounter() {
  const counterElement = document.getElementById('clueCounter');
  const lenteElement = document.getElementById('lente');

  if (counterElement && lenteElement) {
    counterElement.style.display = 'none';
    lenteElement.style.display = 'none';
    clueCounterVisible = false;
  }
}

function checkPoints() {
  points.forEach(point => {
    if (!point.visited && (point.top <= currentScrollY)) {
      console.log(`Point ${point.id} reached!`);
      point.visited = true;
      pointCounter++; // Incrementa il contatore
      updateCounter(); // Aggiorna la visualizzazione del contatore
    }
  });
}

function removePoints() {
  points.slice().reverse().forEach(point => {
    if (point.visited && point.top > currentScrollY) {
      console.log(`Point ${point.id} removed!`);
      point.visited = false;
      pointCounter--; // Decrementa il contatore
      updateCounter(); // Aggiorna la visualizzazione del contatore
    }
  });
}

function updateCounter() {
  const counterElement = document.getElementById('clueCounter');
  const explainCounterElement = document.getElementById('explainCounter');

  if (counterElement && explainCounterElement) {
    counterElement.textContent = pointCounter.toString();

    // Aggiorna il testo di #explainCounter quando un punto viene raggiunto
    points.forEach(point => {
      if (point.visited) {
        explainCounterElement.textContent = point.explanation;
      }
    });

    counterElement.addEventListener('mouseover', function () {
      explainCounterElement.textContent = "Clue counter: highlights the clues provided throughout the movie.";
      explainCounterElement.classList.add('show');
    });

    // Nasconde #explainCounter quando il puntatore esce da #clueCounter
    counterElement.addEventListener('mouseout', function () {
      explainCounterElement.classList.remove('show');
    });

    // Controlla la posizione verticale per mostrare/nascondere #explainCounter
    

    // Verifica se almeno un punto è stato raggiunto e mostra l'explainCounter
    if (currentScrollY >= points[0].top) {
      explainCounterElement.classList.add('show');
    } 
    else if (currentScrollY < points[0].top) {
      explainCounterElement.classList.remove('show');
    } 
    else if (currentScrollY <= points[8].bottom) {
      explainCounterElement.classList.add('show');
    } 
    else if (currentScrollY > points[8].bottom) {
      explainCounterElement.classList.add('show');
    } 
    // Verifica se un nuovo punto è stato raggiunto
    if (pointCounter > 0 && points[pointCounter - 1].visited) {
      // Mostra l'explainCounter quando un nuovo punto viene raggiunto
      explainCounterElement.classList.add('show');

    
    }
  }
}

function setupScroll() {
  previousScrollY = 0;
  currentScrollY = 0;
  direction = "up";
  document.addEventListener("scroll", onScroll);
}

setupScroll();