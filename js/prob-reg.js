document.addEventListener('DOMContentLoaded', () => {
  const loginElement = document.querySelector('.login');
  const storedLogin = sessionStorage.getItem('login');
  const storedEmail = sessionStorage.getItem('email');

  // Якщо це сторінка профілю — вставляємо дані
  if (loginElement && storedLogin && storedEmail) {
    loginElement.textContent = storedLogin;
    const infoValues = document.querySelectorAll('.profile-card p:not(.info-title)');
    if (infoValues.length > 0) {
      infoValues[0].textContent = storedEmail;
    }
  }

  // Перевірка: якщо логін є, але інфа пуста — редирект на реєстрацію
  const currentLogin = loginElement?.textContent.trim();
  if (currentLogin) {
    const infoValues = document.querySelectorAll('.profile-card p:not(.info-title)');
    const allEmpty = Array.from(infoValues).every(p => p.textContent.trim() === '');
    if (allEmpty) {
      window.location.href = '/html/register.html';
    }
  }

  // Логіка для чекбоксів
  const checkboxes = document.querySelectorAll('.form-checkbox');
  const button = document.getElementById('continueBtn');
  const link = document.getElementById('link');

  function updateButtonState() {
    const anyChecked = [...checkboxes].some(ch => ch.checked);
    if (anyChecked) {
      button?.classList.add('active');
      link?.classList.remove('disabled-link');
    } else {
      button?.classList.remove('active');
      link?.classList.add('disabled-link');
    }
  }

  checkboxes.forEach(cb => cb.addEventListener('change', updateButtonState));

  // Логіка для полів реєстрації + валідація
  const regNameInput = document.getElementById('name');
  const regEmailInput = document.getElementById('email');
  const regPasswordInput = document.getElementById('password');
  const regConfirmPasswordInput = document.getElementById('confirmPassword');
  const submitBtn = document.querySelector('.submit-btn');
  const registerLink = document.querySelector('a[href="/html/register2.html"], a[href="/html/profile.html"]');

  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');

  function validateEmail(email) {
    return email.endsWith('@gmail.com');
  }

  function validatePassword(password) {
    const lengthValid = password.length >= 8 && password.length <= 15;
    const hasUppercase = /[A-ZА-Я]/.test(password);
    return lengthValid && hasUppercase;
  }

  function passwordsMatch() {
    return regPasswordInput.value.trim() === regConfirmPasswordInput.value.trim();
  }

  function checkFields() {
    const allFilled = regNameInput?.value.trim() &&
                      regEmailInput?.value.trim() &&
                      regPasswordInput?.value.trim() &&
                      regConfirmPasswordInput?.value.trim();
    submitBtn.disabled = !allFilled;
  }

  [regNameInput, regEmailInput, regPasswordInput, regConfirmPasswordInput]
    .forEach(input => input?.addEventListener('input', checkFields));

  // Показ/приховування пароля з іконкою
  function togglePasswordVisibility(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);

    if (!input || !toggle) return;

    toggle.addEventListener('click', () => {
      if (input.type === 'password') {
        input.type = 'text';
        toggle.src = '/img/hide-password.svg'; // іконка коли видно пароль
      } else {
        input.type = 'password';
        toggle.src = '/img/show-password.svg'; // іконка коли приховано пароль
      }
    });
  }

  // Виклик для обох полів
  togglePasswordVisibility('password', 'togglePassword');
  togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');

  // Збереження логіну та email при натисканні кнопки
  registerLink?.addEventListener('click', (e) => {
    let valid = true;

    if (!validateEmail(regEmailInput.value.trim())) {
      emailError.textContent = 'Email повинен закінчуватись на @gmail.com';
      valid = false;
    } else {
      emailError.textContent = '';
    }

    if (!validatePassword(regPasswordInput.value.trim())) {
      passwordError.textContent = 'Пароль 8-15 символів і має містити хоча б одну велику літеру';
      valid = false;
    } else {
      passwordError.textContent = '';
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

    sessionStorage.setItem('login', regNameInput.value.trim());
    sessionStorage.setItem('email', regEmailInput.value.trim());
  });
});
