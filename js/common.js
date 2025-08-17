// Кнопки меню
const toggleBtn = document.getElementById('menu-toggle');
const closeBtn = document.getElementById('menu-close');
const sidebar = document.getElementById('sidebar');

if (toggleBtn && closeBtn && sidebar) {
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
}

// Повернення на попередню сторінку
function savePreviousPage() {
  localStorage.setItem('previousPage', window.location.href);
}

function goBack() {
  const previous = localStorage.getItem('previousPage');
  if (previous) {
    window.location.href = previous;
  } else {
    history.back(); // fallback
  }
}

// ======== Тема =========
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;
const themeImages = document.querySelectorAll('.theme-img');

// Функція зміни картинок
function changeImages(isDark) {
  themeImages.forEach(img => {
    if (img.dataset.dark && img.dataset.light) {
      img.src = isDark ? img.dataset.dark : img.dataset.light;
    }
  });
}

// Читаємо тему з localStorage
const savedTheme = localStorage.getItem('theme') === 'dark';
if (savedTheme) {
  body.classList.add('dark-theme');
}
changeImages(savedTheme);

// Якщо є перемикач — слухаємо його
if (themeSwitch) {
  themeSwitch.checked = savedTheme;

  themeSwitch.addEventListener('change', function () {
    const isDark = this.checked;
    body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    changeImages(isDark);
  });
}
