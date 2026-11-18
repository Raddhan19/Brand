const theme = document.querySelector('#theme');
function setLight(light) {
  document.documentElement.classList.toggle('light', light);
  theme.textContent = light ? '☾ Tema oscuro' : '☼ Tema claro';
}
let saved;
try { saved = localStorage.getItem('jun-theme'); } catch {}
setLight(saved ? saved === 'light' : matchMedia('(prefers-color-scheme: light)').matches);
theme.hidden = false;
theme.onclick = () => {
  const light = !document.documentElement.classList.contains('light');
  setLight(light);
  try { localStorage.setItem('jun-theme', light ? 'light' : 'dark'); } catch {}
};

const compact = matchMedia('(max-width:950px)');
const tree = document.querySelector('#tree');
function sizeExplorer() { tree.open = !compact.matches; }
sizeExplorer();
compact.addEventListener('change', sizeExplorer);
tree.addEventListener('keydown', event => {
  if (event.key === 'Escape' && tree.open) {
    tree.open = false;
    tree.querySelector('summary').focus();
  }
});

const slots = document.querySelectorAll('[data-sprite]');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
function showDetails() {
  for (const slot of slots) {
    if (!slot.dataset.fallback) slot.dataset.fallback = slot.textContent;
    if (!document.documentElement.classList.contains('moving') || !customElements.get('piix-sprite')) {
      slot.textContent = slot.dataset.fallback;
      continue;
    }
    const sprite = document.createElement('piix-sprite');
    sprite.setAttribute('name', slot.dataset.sprite);
    sprite.setAttribute('size', '36');
    slot.replaceChildren(sprite);
  }
}
if (slots.length) {
  const library = document.createElement('script');
  library.src = 'assets/vendor/piixpal.min.js';
  library.onload = showDetails;
  document.head.append(library);

}

function updateMotion() {
  document.documentElement.classList.toggle('moving', !motion.matches);
  showDetails();
}
motion.addEventListener('change', updateMotion);
updateMotion();
