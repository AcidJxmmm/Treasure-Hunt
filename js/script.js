'use strict';

// function definitions
const selectLink = function ( event ) {
  console.log( 'clicked on', event.currentTarget );
  highlightLink( event.currentTarget );
};

const highlightLink = function ( element ) {
  for ( let link of links) {
    link.classList.remove( 'selected' );
  }
  element.classList.add( 'selected' );
};

const checkSections = function (entries) {
  console.log( entries );
  for ( let entry of entries ) {
    if ( entry.intersectionRatio >= 0.5 ) {
      console.log( 'scrolled to', entry.target );
      let hash = '#' + entry.target.id;
      for ( let link of links ) {
        if ( link.hash === hash ) highlightLink( link );
      }      
    }
  }  
};

//Section 2
const scrollToAnimate = function () {
  kidAnim.scrub('hand move', scrollAmount( section2 ));
  kid.style.animationDelay = -scrollAmount( section2 ) + 's';

  pirateAnim.scrub('hand move', scrollAmount( section2 ));
  pirate.style.animationDelay = -scrollAmount( section2 ) + 's';

  mountain1.style.animationDelay = -scrollAmount( section4 ) + 's';
  mountain2.style.animationDelay = -scrollAmount( section4 ) + 's';
  mountain3.style.animationDelay = -scrollAmount( section4 ) + 's';
  mountain4.style.animationDelay = -scrollAmount( section4 ) + 's';
};

const scrollAmount = function ( element ) {
  let scrollTop = innerHeight - element.getBoundingClientRect().top;
  let scrollHeight = element.offsetHeight + innerHeight;
  let scrollValue = scrollTop / scrollHeight;
  return scrollValue;
}

function update(e){
  var x = e.clientX || e.touches[0].clientX
  var y = e.clientY || e.touches[0].clientY

  document.documentElement.style.setProperty('--cursorX', x + 'px')
  document.documentElement.style.setProperty('--cursorY', y + 'px')
}

//Form function
const checkForm = function (event) {
  event.preventDefault();
  if ( username.value ) {
    form.submit();
  } else {
    error.classList.add( 'show' );
    username.focus();
  }  
};

const remainingChars = function (event) {
  let element = event.currentTarget;
  console.log(element.id, element.value);
  let remain = element.maxLength - element.value.length;
  if (remain <= 1) {
    remainingOutput.value = remain + ' character left';
  } else {
    remainingOutput.value = remain + ' characters left';
  }
}

// variable declarations

// Navigation
let links = document.querySelectorAll( 'nav a' );
let observer = new IntersectionObserver( checkSections , { threshold:[0.5] } );
let sections = document.querySelectorAll( 'section' );

let path = document.querySelector( '#path' );
let pathAnim = new rive.Rive( {
    src: 'media/rive.riv',
    artboard: 'Path.svg',
    canvas: path,
    autoplay: true,
    onLoad: () => {
      pathAnim.resizeDrawingSurfaceToCanvas();
    }
} );

// Section 1
let skull = document.querySelector( '#skull' );
let skullAnim = new rive.Rive( {
    src: 'media/rive.riv',
    artboard: 'Skull.svg',
    autoplay: true,
    canvas: skull,
} );

let ship = document.querySelector( '#ship' );
let shipAnim = new rive.Rive( {
    src: 'media/rive.riv',
    artboard: 'Ship.svg',
    canvas: ship,
    autoplay: true,
    onLoad: () => {
      shipAnim.resizeDrawingSurfaceToCanvas();
    },
} );

let treasure = document.querySelector( '#treasure' );
let treasureAnim = new rive.Rive( {
    src: 'media/rive.riv',
    artboard: 'Treasure.svg',
    canvas: treasure,
    autoplay: true,
} );


// Section 2
let section2 = document.querySelector( '#section2' );

let kid = document.querySelector( '#kid' );
let kidAnim = new rive.Rive( {
    src: 'media/rive.riv',
    artboard: 'Kid',
    canvas: kid,
    onLoad: () => {
      pathAnim.resizeDrawingSurfaceToCanvas();
    }
} );

let pirate = document.querySelector( '#pirate' );
let pirateAnim = new rive.Rive( {
    src: 'media/rive.riv',
    artboard: 'Pirate',
    canvas: pirate,
    onLoad: () => {
      pathAnim.resizeDrawingSurfaceToCanvas();
    }
} );



// Section 3
let boat = document.querySelector( '#boat' );
let boatAnim = new rive.Rive( {
    src: 'media/rive.riv',
    artboard: 'Boat',
    canvas: boat,
    autoplay: true,
    onLoad: () => {
      pathAnim.resizeDrawingSurfaceToCanvas();
    }
} );

// Section 4
let section4 = document.querySelector( '#section4' );
let mountain1 = document.querySelector( '#mountain1' );
let mountain2 = document.querySelector( '#mountain2' );
let mountain3 = document.querySelector( '#mountain3' );
let mountain4 = document.querySelector( '#mountain4' );

// Form 
let form = document.querySelector( '#form' );
let username = document.querySelector( '#username' );
let age = document.querySelector( '#age' );
let error = document.querySelector( '#error' );
let message = document.querySelector( '#message' );

// script initialisation
AOS.init({ duration: 1000 });

for ( let link of links ) {
  link.addEventListener( 'click', selectLink );
}

for ( let section of sections ) {
  observer.observe( section );
}

document.addEventListener( 'scroll', scrollToAnimate );

document.addEventListener('mousemove',update);
document.addEventListener('touchmove',update);

form.addEventListener( 'submit', checkForm );
message.addEventListener( 'input', remainingChars );


