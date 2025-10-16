(() => {
  const allowed = new Set(['pzr123', 'Pzr123', 'Abcd1234']);

  const overlay = document.getElementById('auth-overlay');
  const input = document.getElementById('auth-password');
  const submitBtn = document.getElementById('auth-submit');
  const errorEl = document.getElementById('auth-error');

  if (!overlay || !input || !submitBtn) {
    return;
  }

  const isAuthed = () => sessionStorage.getItem('authOk') === '1';

  const showOverlay = () => {
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
    setTimeout(() => input && input.focus(), 0);
  };

  const hideOverlay = () => {
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
  };

  if (!isAuthed()) {
    showOverlay();
  } else {
    hideOverlay();
  }

  function tryLogin() {
    const pwd = (input.value || '').trim();
    if (allowed.has(pwd)) {
      sessionStorage.setItem('authOk', '1');
      hideOverlay();
      if (errorEl) errorEl.textContent = '';
    } else {
      if (errorEl) errorEl.textContent = '密码错误，请重试';
      input.select();
    }
  }

  submitBtn.addEventListener('click', tryLogin);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      tryLogin();
    }
  });
})();