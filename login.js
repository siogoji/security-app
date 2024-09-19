let currentUser = null;
let loginAttempts = 0;

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const captchaInput = document.getElementById('captchaInput').value;

    if (captchaInput !== captchaCode) {
        showMessage("Невірна CAPTCHA.");
        generateCaptcha();
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length === 0) {
        showMessage("Немає зареєстрованих користувачів.");
        return;
    }

    const user = users.find(u => u.username === username);
    if (!user) {
        showMessage("Користувача не знайдено.");
        return;
    }

    if (user.blocked) {
        showMessage("Користувач заблокований.");
        return;
    }

    const hashedPassword = await hashPassword(password);
    if (user.password === hashedPassword || (user.password === '' && password === '')) {
        currentUser = user;
        loginAttempts = 0;
        showMenuForUser(user);

        logEvent("Вхід", `${user.username} увійшов у систему.`);
    } else {
        loginAttempts++;
        showMessage("Невірний пароль.");
        if (loginAttempts >= 3) {
            showMessage("Перевищено кількість спроб. Програму буде завершено.");
            logout();
        }
    }
}

function showMenuForUser(user) {
    document.querySelector('.login-container').classList.add('hidden');
    if (user.username === 'ADMIN') {
        document.getElementById('admin-menu').classList.remove('hidden');
        document.getElementById('current-user').innerText = "Ви увійшли як: Admin";
    } else {
        document.getElementById('user-menu').classList.remove('hidden');
        document.getElementById('user-name').innerText = user.username;
    }
}

function logout() {
    if (currentUser) {
        logEvent("Вихід", `${currentUser.username} вийшов із системи.`);
    }

    currentUser = null;
    document.getElementById('admin-menu').classList.add('hidden');
    document.getElementById('user-menu').classList.add('hidden');
    document.querySelector('.login-container').classList.remove('hidden');
    document.getElementById('message').innerText = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}