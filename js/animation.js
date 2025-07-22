const buttons = document.querySelectorAll('.nav-link');
const lqhighlight = document.getElementById('lqOverlay');

let currentTarget = null;

function moveBoxToButton(btn) {
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

window.addEventListener('DOMContentLoaded', () => {
  const defaultBtn = document.querySelector('.nav-link');
  if (defaultBtn) {
    moveBoxToButton(defaultBtn);
  }
});



const pButtons = document.querySelectorAll('.filter-btn');
const highlightBox = document.getElementById('lq-project');

let currentTarget1 = null;

function moveBoxToButton1(btn) {
  const container = btn.parentElement;
  const btnRect = btn.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const left = btnRect.left - containerRect.left;
  const top = btnRect.top - containerRect.top;

  highlightBox.style.transform = `translate(${left}px, ${top}px)`;
  highlightBox.style.width = btn.offsetWidth + 'px';
  highlightBox.style.height = btn.offsetHeight + 'px';
  highlightBox.textContent = btn.dataset.info;

  currentTarget1 = btn;
}

pButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentTarget1 = btn;
    moveBoxToButton1(btn);
  });
});

// อัปเดตตำแหน่งทุกครั้งที่ resize หรือ scroll
window.addEventListener('resize', () => {
  if (currentTarget1) moveBoxToButton1(currentTarget1);
});

window.addEventListener('DOMContentLoaded', () => {
  const defaultBtn = document.querySelector('.filter-btn');
  if (defaultBtn) {
    moveBoxToButton1(defaultBtn);
  }
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