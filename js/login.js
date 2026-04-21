/* ─── Password Toggle ───────────────────────────────────────── */
const togglePw  = document.getElementById('togglePw');
const pwInput   = document.getElementById('password');
const eyeIcon   = document.getElementById('eyeIcon');

if (togglePw && pwInput) {
    togglePw.addEventListener('click', () => {
        const isPassword = pwInput.type === 'password';
        pwInput.type = isPassword ? 'text' : 'password';

        eyeIcon.innerHTML = isPassword
            ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
               <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
               <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`
            : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
               <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>`;
    });
}

/* ─── Login Form ────────────────────────────────────────────── */
const loginForm = document.getElementById('loginForm');
const loginContainer = document.querySelector('.login-container');
const loginButton = loginForm?.querySelector('.btn-login');
const loginButtonText = loginForm?.querySelector('.btn-text');
const lockStatus = document.getElementById('lockStatus');
let unlockPreviewTimer;

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        if (!loginContainer || !loginButton || !loginButtonText) {
            console.log('Login submitted:', { username });
            return;
        }

        window.clearTimeout(unlockPreviewTimer);
        loginButton.disabled = true;
        loginButtonText.textContent = 'Verifying access...';
        if (lockStatus) lockStatus.textContent = 'Checking';
        loginContainer.classList.remove('is-unlocked');
        loginContainer.classList.add('is-authenticating');

        window.setTimeout(() => {
            loginContainer.classList.remove('is-authenticating');
            loginContainer.classList.add('is-unlocked');
            loginButtonText.textContent = 'Access granted';
            if (lockStatus) lockStatus.textContent = 'Unlocked';

            unlockPreviewTimer = window.setTimeout(() => {
                window.location.href = 'index.html';
            }, 900);
        }, 650);

        console.log('Login submitted:', { username });
    });
}