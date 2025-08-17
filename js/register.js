document.addEventListener('DOMContentLoaded', () => {
  const loginElement = document.querySelector('.login');
  const storedLogin = localStorage.getItem('login');
  const storedEmail = localStorage.getItem('email');
  const storedPassword = localStorage.getItem('password');

  // ===== Профіль: вставка даних =====
  if (loginElement && storedLogin && storedEmail) {
    loginElement.textContent = storedLogin;
    const infoValues = document.querySelectorAll('.profile-card p:not(.info-title)');
    if (infoValues.length > 0) {
      infoValues[0].textContent = storedEmail;
    }
  }

  // Якщо немає даних — редирект на реєстрацію
  const currentLogin = loginElement?.textContent.trim();
  if (currentLogin) {
    const infoValues = document.querySelectorAll('.profile-card p:not(.info-title)');
    const allEmpty = Array.from(infoValues).every(p => p.textContent.trim() === '');
    if (allEmpty && (!storedLogin || !storedEmail || !storedPassword)) {
      window.location.href = '/html/register.html';
    }
  }

  // ===== Реєстрація: логіка кнопки далі =====
  const checkboxes = document.querySelectorAll('.form-checkbox');
  const button = document.getElementById('continueBtn');
  const link = document.getElementById('link');

  function updateButtonState() {
    const anyChecked = [...checkboxes].some(ch => ch.checked);
    button?.classList.toggle('active', anyChecked);
    link?.classList.toggle('disabled-link', !anyChecked);
  }
  checkboxes.forEach(cb => cb.addEventListener('change', updateButtonState));

  // ===== Поля реєстрації =====
  const regNameInput = document.getElementById('name');
  const regEmailInput = document.getElementById('email');
  const regPasswordInput = document.getElementById('password');
  const regConfirmPasswordInput = document.getElementById('confirmPassword');
  const submitBtn = document.querySelector('.submit-btn');
  const registerLink = document.querySelector('a[href="/html/register2.html"], a[href="/html/profile.html"]');

  const emailError = document.getElementById('emailError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');

  const validateEmail = email => email.endsWith('@gmail.com');
  const validatePassword = password => password.length >= 8 && password.length <= 15;
  const passwordsMatch = () =>
    regPasswordInput?.value.trim() === regConfirmPasswordInput?.value.trim();

  function checkFields() {
    const allFilled =
      regNameInput?.value.trim() &&
      regEmailInput?.value.trim() &&
      regPasswordInput?.value.trim() &&
      regConfirmPasswordInput?.value.trim();
    submitBtn.disabled = !allFilled;
  }
  [regNameInput, regEmailInput, regPasswordInput, regConfirmPasswordInput]
    .forEach(input => input?.addEventListener('input', checkFields));

  // ===== Показ/приховування пароля =====
  function togglePasswordVisibility(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    if (!input || !toggle) return;

    const icons = {
      light: {
        show: '/img/show-password.svg',
        hide: '/img/hide-password.svg'
      },
      dark: {
        show: '/img/dark-show-password.svg',
        hide: '/img/dark-hide-password.svg'
      }
    };

    function getTheme() {
      return document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    }

    function updateIcon(isHidden) {
      const theme = getTheme();
      toggle.src = isHidden ? icons[theme].hide : icons[theme].show;
    }

    toggle.addEventListener('click', () => {
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      updateIcon(isHidden);
    });

    updateIcon(false);

    const observer = new MutationObserver(() => {
      updateIcon(input.type !== 'password');
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  togglePasswordVisibility('password', 'togglePassword');
  togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');

  // ===== Збереження реєстраційних даних =====
  registerLink?.addEventListener('click', e => {
    let valid = true;

    if (!validateEmail(regEmailInput.value.trim())) {
      emailError.innerHTML = 'Email повинен закінчуватись<br> на @gmail.com';
      valid = false;
    } else {
      emailError.textContent = '';
    }

    if (!validatePassword(regPasswordInput.value.trim())) {
      valid = false;
    }

    if (!passwordsMatch()) {
      confirmPasswordError.textContent = 'Паролі не співпадають';
      valid = false;
    } else {
      confirmPasswordError.textContent = '';
    }

    if (!valid) {
      e.preventDefault();
      return;
    }

    localStorage.setItem('login', regNameInput.value.trim());
    localStorage.setItem('email', regEmailInput.value.trim());
    localStorage.setItem('password', regPasswordInput.value.trim());
  });

  // ================= НАСТРОЙКИ =================
  const loginInput = document.getElementById('login');
  const cityInput = document.getElementById('city');
  const schoolInput = document.getElementById('school');

  const saveLoginBtn = document.getElementById('saveLogin');
  const saveCityBtn = document.getElementById('saveCity');
  const saveSchoolBtn = document.getElementById('saveSchool');
  const changePasswordBtn = document.getElementById('changePasswordBtn');

  const themeSwitch = document.getElementById('theme-switch');
  const themeImages = document.querySelectorAll('.theme-img');

  // Підставляємо значення
  if (loginInput) loginInput.value = localStorage.getItem('login') || '';
  if (cityInput) cityInput.value = localStorage.getItem('city') || '';
  if (schoolInput) schoolInput.value = localStorage.getItem('school') || '';

  // Збереження логіну
  saveLoginBtn?.addEventListener('click', () => {
    const newLogin = loginInput.value.trim();
    if (newLogin) {
      localStorage.setItem('login', newLogin);
      alert('Логін збережено!');
    }
  });

  // Збереження міста
  saveCityBtn?.addEventListener('click', () => {
    localStorage.setItem('city', cityInput.value.trim());
    alert('Місто збережено!');
  });

  // Збереження ліцею
  saveSchoolBtn?.addEventListener('click', () => {
    localStorage.setItem('school', schoolInput.value.trim());
    alert('Ліцей збережено!');
  });

  // Перехід на зміну пароля
  changePasswordBtn?.addEventListener('click', () => {
    window.location.href = '/html/change-password.html';
  });

  // ===== Тема =====
  function applyTheme(theme) {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    themeImages.forEach(img => {
      const lightSrc = img.getAttribute('data-light');
      const darkSrc = img.getAttribute('data-dark');
      img.src = theme === 'dark' ? darkSrc : lightSrc;
    });
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  if (themeSwitch) {
    themeSwitch.checked = savedTheme === 'dark';
    applyTheme(savedTheme);

    themeSwitch.addEventListener('change', () => {
      const newTheme = themeSwitch.checked ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  }
});

