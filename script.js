
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

 // CAPPELLO
 const newSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
 newSVG.setAttribute('id', 'newSVG');
 newSVG.setAttribute('width', '500');
 newSVG.setAttribute('height', '339');
 newSVG.setAttribute('viewBox', '0 0 500 360');
 newSVG.setAttribute('style', 'position: absolute; margin-top: 300px; left:50%; transform: translate(-50%,-50%)')
 newSVG.innerHTML = `
     <ellipse cx="249" cy="41.5" rx="249" ry="41.5" fill="#D9D9D9"/>
     <rect  x="58" y="19" width="380" height="339" rx="17" fill="#D9D9D9"/>
 `;
 
 document.body.appendChild(newSVG);
 newSVG.style.position = 'absolute';
 newSVG.style.top = '1000px';

//ANIMAZIONE PALLINA
 const movingCircle = document.getElementById('movingCircle');
 let textAnimationStarted = false;

 function updateCirclePosition() {
     const scrollY = window.scrollY;
     const scrollPercentage = scrollY / (document.documentElement.scrollHeight - window.innerHeight);
     const y = 25000 * scrollPercentage;  // velocità pallina
     const newSVGTop = parseInt(newSVG.style.top, 10);
     let opacity;

     if (y + 68 < newSVGTop + 100) {
         opacity = 1 - (y + 68) / (newSVGTop); // Calcola l'opacità in base alla coordinata y del cerchio e alla posizione superiore dell'elemento newSVG
     } else {
         opacity = 0; // Rendi il cerchio completamente invisibile quando raggiunge l'elemento newSVG
         if (!textAnimationStarted) {
             startTextAnimation();
             textAnimationStarted = true;
         }
     }
     
     gsap.to(movingCircle, { duration: 0.5, attr: { cy: y + 68 }, opacity: opacity });
     
     if (y + 68 >= 1000) {
         movingCircle.style.visibility = 'visible';
     }
 }

 window.onscroll = updateCirclePosition;


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

//ANIMAZIONE LINEE
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

//ANIMAZIONE CLUE COUNTER
document.addEventListener('DOMContentLoaded', function () {
  hideClueCounter();
});

let previousScrollY;
let currentScrollY;
let direction;

let points = [
  { id: 1, top: 6000, visited: false, explanation: "Spiegazione clue 1" },
  { id: 2, top: 7000, visited: false, explanation: "Spiegazione clue 2" },
  { id: 3, top: 8000, visited: false, explanation: "Spiegazione clue 3" },
  { id: 4, top: 9000, visited: false, explanation: "Spiegazione clue 4" },
  // aggiungere qua i punti, top definisce a che altezza
];

let pointCounter = 0;

let clueCounterVisible = false; // Aggiunta variabile per gestire la visibilità del clue counter

function onScroll() {
  const scrollTop = window.pageYOffset;

  if (currentScrollY === scrollTop) return;

  previousScrollY = currentScrollY;
  currentScrollY = scrollTop;

  if (!clueCounterVisible && currentScrollY >= points[0].top) {
    showClueCounter();
  }

  if (currentScrollY > previousScrollY) {
    direction = "down";
    checkPoints();
  } else if (currentScrollY < previousScrollY) {
    direction = "up";
    if (currentScrollY < points[0].top) {
      hideClueCounter(); // Nasconde il clue counter se torni indietro prima del punto 1
    } else {
      removePoints();
    }
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
    if (!point.visited && point.top <= currentScrollY) {
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

    // Mostra #explainCounter quando il puntatore passa sopra a #clueCounter
    counterElement.addEventListener('mouseover', function () {
      explainCounterElement.classList.add('show');
    });

    // Nascondi #explainCounter quando il puntatore esce da #clueCounter
    counterElement.addEventListener('mouseout', function () {
      explainCounterElement.classList.remove('show');
    });

    // Mostra #explainCounter per 3 secondi quando pointCounter viene incrementato
    if (pointCounter > 0) {
      explainCounterElement.classList.add('show');
      setTimeout(() => {
        explainCounterElement.classList.remove('show');
      }, 3000); // Nascondi dopo 3 secondi (3000 millisecondi)
    } else {
      // Nascondi #explainCounter quando pointCounter è 0
      explainCounterElement.classList.remove('show');
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