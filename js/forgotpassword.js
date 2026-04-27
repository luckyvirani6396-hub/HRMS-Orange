/* ─── forgot-password.js ────────────────────────────────────── */
(() => {
    /* ── Helpers ── */
    const $ = (id) => document.getElementById(id);
    const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

    /* ── Step Management ── */
    let currentStep = 1;

    const dots  = [$('dot1'), $('dot2'), $('dot3')];
    const lines = [$('line1'), $('line2')];
    const steps = [$('step1'), $('step2'), $('step3'), $('step4')];

    function goToStep(n) {
        steps.forEach((s, i) => {
            s.classList.toggle('active', i === n - 1);
        });
        dots.forEach((d, i) => {
            d.classList.remove('active', 'done');
            if (i + 1 < n)  d.classList.add('done');
            if (i + 1 === n) d.classList.add('active');
        });
        lines.forEach((l, i) => {
            l.classList.toggle('done', i + 1 < n);
        });
        currentStep = n;
        if (n === 4) {
            $('stepProgress').style.display = 'none';
        }
    }

    /* ── Step 1: Send OTP ── */
    $('sendOtpBtn').addEventListener('click', () => {
        const email      = $('email').value.trim();
        const emailError = $('emailError');
        const emailInput = $('email');

        if (!isValidEmail(email)) {
            emailInput.classList.add('error');
            emailError.classList.add('show');
            return;
        }
        emailInput.classList.remove('error');
        emailError.classList.remove('show');

        const btn     = $('sendOtpBtn');
        const btnText = btn.querySelector('.btn-text');
        btn.disabled          = true;
        btnText.textContent   = 'Sending OTP...';

        setTimeout(() => {
            btn.disabled        = false;
            btnText.textContent = 'Send OTP';
            $('emailDisplay').textContent = email;
            goToStep(2);
            startResendTimer();
            document.querySelector('.otp-cell').focus();
        }, 900);
    });

    /* ── Step 1: Live email validation ── */
    $('email').addEventListener('input', () => {
        $('email').classList.remove('error');
        $('emailError').classList.remove('show');
    });

    /* ── Back to Step 1 ── */
    $('backToStep1').addEventListener('click', (e) => {
        e.preventDefault();
        clearOtp();
        goToStep(1);
    });

    /* ── Step 2: OTP Input ── */
    const otpCells = Array.from(document.querySelectorAll('.otp-cell'));

    otpCells.forEach((cell, idx) => {

        cell.addEventListener('input', (e) => {
            const val  = e.target.value.replace(/\D/g, '');
            cell.value = val.slice(-1);
            cell.classList.toggle('filled', !!cell.value);
            if (cell.value && idx < otpCells.length - 1) {
                otpCells[idx + 1].focus();
            }
            $('otpError').classList.remove('show');
        });

        cell.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !cell.value && idx > 0) {
                otpCells[idx - 1].focus();
                otpCells[idx - 1].value = '';
                otpCells[idx - 1].classList.remove('filled');
            }
            if (e.key === 'ArrowLeft'  && idx > 0)                    otpCells[idx - 1].focus();
            if (e.key === 'ArrowRight' && idx < otpCells.length - 1)  otpCells[idx + 1].focus();
        });

        /* Paste support */
        cell.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasted = (e.clipboardData || window.clipboardData)
                .getData('text')
                .replace(/\D/g, '')
                .slice(0, 6);
            pasted.split('').forEach((ch, i) => {
                if (otpCells[i]) {
                    otpCells[i].value = ch;
                    otpCells[i].classList.add('filled');
                }
            });
            const nextEmpty = otpCells.find(c => !c.value);
            (nextEmpty || otpCells[otpCells.length - 1]).focus();
        });
    });

    function clearOtp() {
        otpCells.forEach(c => { c.value = ''; c.classList.remove('filled'); });
        $('otpError').classList.remove('show');
    }

    /* ── Step 2: Verify OTP ── */
    $('verifyOtpBtn').addEventListener('click', () => {
        const otp = otpCells.map(c => c.value).join('');

        if (otp.length < 6) {
            $('otpError').textContent = 'Please enter the complete 6-digit OTP.';
            $('otpError').classList.add('show');
            return;
        }

        const btn     = $('verifyOtpBtn');
        const btnText = btn.querySelector('.btn-text');
        btn.disabled        = true;
        btnText.textContent = 'Verifying...';

        setTimeout(() => {
            btn.disabled        = false;
            btnText.textContent = 'Verify OTP';
            goToStep(3);
            $('newPassword').focus();
        }, 800);
    });

    /* ── Resend Timer ── */
    let timerInterval;

    function startResendTimer() {
        let seconds = 30;
        const link  = $('resendLink');
        const timer = $('resendTimer');
        link.classList.add('disabled');
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            seconds--;
            const m = Math.floor(seconds / 60);
            const s = seconds % 60;
            timer.textContent = `(${m}:${s.toString().padStart(2, '0')})`;
            if (seconds <= 0) {
                clearInterval(timerInterval);
                link.classList.remove('disabled');
                timer.textContent = '';
            }
        }, 1000);
    }

    $('resendLink').addEventListener('click', () => {
        if ($('resendLink').classList.contains('disabled')) return;
        clearOtp();
        startResendTimer();
        otpCells[0].focus();
    });

    /* ── Step 3: Password Strength ── */
    const segs = [$('seg1'), $('seg2'), $('seg3'), $('seg4')];

    function getStrength(pw) {
        let score = 0;
        if (pw.length >= 8)          score++;
        if (/[A-Z]/.test(pw))        score++;
        if (/[0-9]/.test(pw))        score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        return score;
    }

    $('newPassword').addEventListener('input', () => {
        const pw    = $('newPassword').value;
        const score = getStrength(pw);
        const label = $('strengthLabel');

        segs.forEach(s => s.className = 'strength-seg');
        if (!pw) { label.textContent = ''; return; }

        const levels = ['weak', 'weak', 'medium', 'strong'];
        const names  = ['Weak', 'Fair', 'Good',   'Strong'];
        const level  = levels[score - 1] || 'weak';

        segs.slice(0, score).forEach(s => s.classList.add(level));
        label.textContent  = names[score - 1] || 'Weak';
        label.style.color  = { weak: '#e53e3e', medium: '#ed8936', strong: '#38a169' }[level];

        $('confirmError').classList.remove('show');
        $('confirmPassword').classList.remove('error');
    });

    /* ── Toggle Password Visibility ── */
    const EYE_OPEN = `
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>`;

    const EYE_CLOSED = `
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;

    function makeToggle(btnId, inputId, iconId) {
        $(btnId).addEventListener('click', () => {
            const inp    = $(inputId);
            const icon   = $(iconId);
            const isPass = inp.type === 'password';
            inp.type     = isPass ? 'text' : 'password';
            icon.innerHTML = isPass ? EYE_CLOSED : EYE_OPEN;
        });
    }

    makeToggle('toggleNew',     'newPassword',     'eyeNew');
    makeToggle('toggleConfirm', 'confirmPassword', 'eyeConfirm');

    /* ── Step 3: Reset Password ── */
    $('resetBtn').addEventListener('click', () => {
        const pw           = $('newPassword').value;
        const cpw          = $('confirmPassword').value;
        const confirmError = $('confirmError');
        const confirmInput = $('confirmPassword');

        if (getStrength(pw) < 2) {
            $('newPassword').classList.add('error');
            return;
        }
        $('newPassword').classList.remove('error');

        if (pw !== cpw) {
            confirmInput.classList.add('error');
            confirmError.classList.add('show');
            return;
        }
        confirmInput.classList.remove('error');
        confirmError.classList.remove('show');

        const btn     = $('resetBtn');
        const btnText = btn.querySelector('.btn-text');
        btn.disabled        = true;
        btnText.textContent = 'Resetting...';

        setTimeout(() => { goToStep(4); }, 900);
    });

    /* ── Live confirm password match ── */
    $('confirmPassword').addEventListener('input', () => {
        $('confirmPassword').classList.remove('error');
        $('confirmError').classList.remove('show');
    });

})();