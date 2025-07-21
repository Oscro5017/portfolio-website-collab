const buttons = document.querySelectorAll('.nav-link');
const lqhighlight = document.getElementById('lqOverlay');

let currentTarget = null;

function moveBoxToButton(btn) {
    lqhighlight.style.display = 'block';
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
