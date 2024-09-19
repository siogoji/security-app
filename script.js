async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log('Hashed Password:', hashHex);
    return hashHex;
}

async function loadUsers() {
    if (!localStorage.getItem('users')) {
        const hashedPassword = await hashPassword('1');
        const users = [{ username: 'ADMIN', password: hashedPassword, blocked: false, restrictions: false }];
        localStorage.setItem('users', JSON.stringify(users));
    }
}

async function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function showMessage(message) {
    document.getElementById('message').innerText = message;
}

function showAboutProgram() {
    const authorInfo = `
        Автор програми: Столярчук Єгор
        Версія програми: 1.0
        Опис програми: Система парольної аутентифікації з правами адміністратора та звичайного користувача.
    `;
    
    alert(authorInfo);
}

function isValidPassword(password) {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasLetter && hasDigit && hasSpecialChar;
}

function logEvent(eventType, message) {
    const timestamp = new Date().toLocaleString();
    const logs = JSON.parse(localStorage.getItem('logs')) || [];
    logs.push({ timestamp, eventType, message });
    localStorage.setItem('logs', JSON.stringify(logs));
}


function logUserAction(username, action) {
    const timestamp = new Date().toLocaleString();
    const actionEntry = { timestamp, username, action };
    let actions = JSON.parse(localStorage.getItem('actions')) || [];
    actions.push(actionEntry);
    localStorage.setItem('actions', JSON.stringify(actions));
}