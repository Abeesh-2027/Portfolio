// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Header scrolled state
const header = document.getElementById('site-header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Active link scroll-spy
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

sections.forEach(sec => spyObserver.observe(sec));

// Reveal-on-scroll animations
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Neon cursor effect (desktop / fine-pointer only)
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (isFinePointer) {
  const dot = document.getElementById('cursor-dot');
  const glow = document.getElementById('cursor-glow');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
    dot.classList.add('visible');
    glow.classList.add('visible');
  });

  window.addEventListener('mouseleave', () => {
    dot.classList.remove('visible');
    glow.classList.remove('visible');
  });

  // Trailing glow animation loop
  const animateGlow = () => {
    glowX += (mouseX - glowX) * 0.16;
    glowY += (mouseY - glowY) * 0.16;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    requestAnimationFrame(animateGlow);
  };
  animateGlow();

  // Hover state on interactive elements
  const hoverables = document.querySelectorAll('a, button, .skill-tag, .project-card, .field input, .field textarea');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hover');
      glow.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hover');
      glow.classList.remove('hover');
    });
  });

  // Click pulse
  window.addEventListener('mousedown', () => glow.classList.add('click'));
  window.addEventListener('mouseup', () => glow.classList.remove('click'));
}

window.formspree = window.formspree || function () {
    (formspree.q = formspree.q || []).push(arguments);
};

formspree("initForm", {
    formElement: "#contact-form",
    formId: "xqeraqqj"
});

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
    // Optional: prevent page reload
    // e.preventDefault();

    document.getElementById("success").innerHTML =
        "<div class='success-msg'><i class='fa-solid fa-circle-check'></i> Message Sent Successfully!</div>";
});