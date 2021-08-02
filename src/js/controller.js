'use strict';

// canvas

const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

const colorArray = [
  'rgba(0, 138, 229,0.5)',
  'rgb(76, 184, 255,0.5)',
  'rgba(144, 211, 255, 0.5)',
  'rgba(97, 186, 255, 0.5)',
  'rgba(111, 210, 231, 0.5)',
];

let mouse = {
  x: undefined,
  y: undefined,
};

class Circle {
  radius = Math.random() * 5 + 1;
  maxRadius = 20;
  minRadius = this.radius;
  x = Math.random() * (innerWidth - this.radius * 2) + this.radius;
  y = Math.random() * (innerHeight - this.radius * 2) + this.radius;
  dx = Math.random() * 0.5;
  dy = Math.random() * 0.5;
  dxMin = this.dx;
  dyMin = this.dy;
  increaseV = 0.3;
  fillColor = undefined;
  constructor(fillColor) {
    this.draw(fillColor);
    this.fillColor = colorArray[Math.floor(Math.random() * colorArray.length)];
  }
  draw = function (fillColor) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = `transparent`;
    c.stroke();
    c.fillStyle = fillColor;
    c.fill();
  };
  update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0)
      this.dx = -this.dx;
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
      this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50) {
      this.dx > 0 ? (this.dx += this.increaseV) : (this.dx -= this.increaseV);
      this.dy > 0 ? (this.dy += this.increaseV) : (this.dy -= this.increaseV);
    } else {
      if (Math.abs(this.dx) > Math.abs(this.dxMin))
        this.dx > 0 ? (this.dx -= this.increaseV) : (this.dx += this.increaseV);
      if (Math.abs(this.dy) > Math.abs(this.dyMin))
        this.dy > 0 ? (this.dy -= this.increaseV) : (this.dy += this.increaseV);
    }
    this.draw(this.fillColor);
  };
}
let circleArray = [];
for (let i = 0; i < 200; i++) {
  let fillColor = `rgba(${Math.random() * 255},${Math.random() * 255},${
    Math.random() * 255
  },${Math.random()})`;
  circleArray.push(new Circle(fillColor));
}
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) circleArray[i].update();
}

animate();

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const nav = document.querySelector('.header__navigation');

const stickyNavBar = function () {
  const navHeight = nav.getBoundingClientRect().height;
  const header = document.querySelector('.header');
  const stickyNav = function (entries) {
    const [entry] = entries;
    !entry.isIntersecting
      ? nav.classList.add('sticky')
      : nav.classList.remove('sticky');
  };
  const headerObserve = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0.15,
    rootMargin: `-${navHeight}px`,
  });
  headerObserve.observe(header);
};
const scrollToEffect = function () {
  const sectionAbout = document.querySelector('#section-about');

  document
    .querySelector('.toSectionAbout')
    .addEventListener('click', function (event) {
      event.preventDefault();
      sectionAbout.scrollIntoView({ behavior: 'smooth' });
    });

  const scrollSmooth = function (event) {
    event.preventDefault();
    const id = event.target.getAttribute('href');
    const coords = document.querySelector(id).getBoundingClientRect();
    window: scrollTo({
      left: coords.left + window.pageXOffset,
      top: coords.top + window.pageYOffset,
      behavior: 'smooth',
    });
  };
  document
    .querySelector('.navigation__list')
    .addEventListener('click', function (event) {
      if (event.target.classList.contains('navigation__link')) {
        scrollSmooth(event);
        document.querySelector('.navigation__checkbox').checked = false;
      }
    });
  document.querySelector('.menu').addEventListener('click', function (event) {
    if (
      event.target.classList.contains('nav_link') &&
      !event.target.classList.contains('nav_link-btn')
    ) {
      scrollSmooth(event);
    }
  });
};
const fadeIn = function () {
  //const projectBox = document.querySelector('.project-cards-box');
  const projectCards = document.querySelectorAll('.project-card');
  const showSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entries.forEach(entry => entry.target.classList.remove('section--hidden'));
    observer.unobserve(entry.target);
  };
  const sectionObserve = new IntersectionObserver(showSection, {
    root: null,
    threshold: 0.15,
  });
  //sectionObserve.observe(projectBox);
  //projectBox.classList.add('section--hidden');
  projectCards.forEach(projectCard => {
    sectionObserve.observe(projectCard);
    projectCard.classList.add('section--hidden');
  });
};
// const toggleClassCheckbox = function () {
//   const checkbox = document.querySelector('.classes__checkbox');
//   document.querySelector('body').addEventListener('click', function (event) {
//     if (
//       !event.target.classList.contains('classes__checkbox') &&
//       !event.target.classList.contains('nav_link-btn')
//     ) {
//       if (checkbox.checked) checkbox.checked = false;
//     }
//   });
// };
// toggleClassCheckbox();
stickyNavBar();
scrollToEffect();
fadeIn();
