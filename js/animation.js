const buttons = document.querySelectorAll('.nav-link');
const lqhighlight = document.getElementById('lqOverlay');

let currentTarget = null;

function moveBoxToButton(btn) {
    lqhighlight.style.opacity = 100;
  const rect = btn.getBoundingClientRect();
  currentTarget = btn;

  lqhighlight.textContent = btn.dataset.info;

  requestAnimationFrame(() => {
    const boxWidth = lqhighlight.offsetWidth;
    const boxHeight = lqhighlight.offsetHeight;

    const left = rect.left + rect.width / 2 - boxWidth / 2;
    const top = rect.top + rect.height / 2 - boxHeight / 2;

    lqhighlight.style.transform = `translate(${left}px, ${top}px)`;
  });
}

function updateActiveButtonFromScroll() {
  let closestSection = null;
  let minDistance = Infinity;

  buttons.forEach(btn => {
    const targetId = btn.dataset.target;
    const section = document.getElementById(targetId);
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top);

    if (distance < minDistance && rect.top < window.innerHeight) {
      closestSection = btn;
      minDistance = distance;
    }
  });

  if (closestSection && closestSection !== currentTarget) {
    moveBoxToButton(closestSection);
  }
}

window.addEventListener('scroll', updateActiveButtonFromScroll);

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const section = document.getElementById(targetId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });

    moveBoxToButton(btn);
  });
});

window.addEventListener('resize', () => {
  if (currentTarget) moveBoxToButton(currentTarget);
});



// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});