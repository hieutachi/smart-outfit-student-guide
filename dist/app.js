const toc = document.getElementById('toc');
const wide = window.matchMedia('(min-width: 1051px)');
toc.open = wide.matches;
wide.addEventListener('change', (event) => { toc.open = event.matches; });

for (const link of document.querySelectorAll('.toc-links a')) {
  link.addEventListener('click', () => { if (!wide.matches) toc.open = false; });
}

const headings = [...document.querySelectorAll('.document h2')];
const links = [...document.querySelectorAll('.toc-links a')];
let scheduled = false;
function updateCurrentSection() {
  let current = headings[0];
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top <= 140) current = heading;
  }
  for (const link of links) {
    if (link.hash === `#${current?.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateCurrentSection);
  }
}, { passive: true });
updateCurrentSection();

const status = document.getElementById('copy-status');
let statusTimer;
for (const pre of document.querySelectorAll('.document pre')) {
  const wrapper = document.createElement('div');
  wrapper.className = 'code-wrapper';
  pre.before(wrapper);
  wrapper.append(pre);
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'copy-button';
  button.textContent = 'Sao chép';
  button.setAttribute('aria-label', 'Sao chép khối mã hoặc prompt');
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(pre.textContent);
      button.textContent = 'Đã sao chép';
      status.textContent = 'Đã sao chép nội dung.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(pre);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Trình duyệt chưa cho phép sao chép. Nội dung đã được chọn; hãy dùng lệnh Sao chép.';
    }
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => { status.textContent = ''; button.textContent = 'Sao chép'; }, 4500);
  });
  wrapper.prepend(button);
}
