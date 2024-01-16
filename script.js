
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
.add({
  targets: '.sottotitolo .letter',
  opacity: [0,1],
  easing: "easeInOutQuad",
  duration: 2250,
  delay: (el, i) => 60 * (i+1)
});
                   // if we added the class, exit the function
              }

              // We're not intersecting, so remove the class!
              
          });
      });

      observer1.observe(document.querySelector('.sottotitolo-wrapper'));

// ANIMAZIONE TESTO "DID YOU WATCH IT CLOSELY?" 
//var textWrapper = document.querySelector('.sottotitolo');
//textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

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
    if (scrollPosition > 1950) {
      lampadinaImg.src = "png/lampadine accese.png";
    } else {
      lampadinaImg.src = "png/lampadine spente.png";
    }
  });
});

//ANIMAZIONE LINEE
window.addEventListener('scroll', function() {

  let lineContainer = document.querySelector('.line-container');
  let startPosition = lineContainer.offsetTop;
  let pageHeight = document.documentElement.scrollHeight;
  let scrollPosition = window.scrollY;

  if (scrollPosition >= startPosition) {
      // Il tuo codice da eseguire quando lo scroll raggiunge la posizione desiderata

      let paths = document.querySelectorAll('svg path');

      paths.forEach((path) => {
          let pathLength = path.getTotalLength();
          path.style.strokeDasharray = pathLength + ' ' + pathLength;
          path.style.strokeDashoffset = pathLength;

          // Calcola la percentuale di completamento del disegno
          let scrollPercentage = Math.min(1, (scrollPosition - startPosition) / (pageHeight - startPosition));

          // Riduci la velocità regolando il valore seguente
          let drawLength = pathLength * (scrollPercentage / 1); // Puoi regolare il divisore per controllare la velocità

          // Disegna il tratto
          path.style.strokeDashoffset = pathLength - drawLength;
      });

      document.querySelector('.line-container').classList.add('show-line');
  } else {
      // Il tuo codice da eseguire quando lo scroll è al di sopra della posizione desiderata

      let paths = document.querySelectorAll('svg path');

      paths.forEach((path) => {
          path.style.strokeDashoffset = path.getTotalLength();
      });

      document.querySelector('.line-container').classList.remove('show-line');
  }
});