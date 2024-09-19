async function changeAdminPassword() {
    const oldPassword = prompt("Введіть старий пароль:");
    const users = JSON.parse(localStorage.getItem('users'));
    const admin = users.find(u => u.username === 'ADMIN');

    const hashedOldPassword = await hashPassword(oldPassword);
    if (admin.password !== hashedOldPassword) {
        showMessage("Невірний старий пароль.");
        return;
    }

    const newPassword = prompt("Введіть новий пароль:");
    const confirmPassword = prompt("Підтвердіть новий пароль:");

    if (newPassword !== confirmPassword) {
        showMessage("Паролі не співпадають.");
        return;
    }

    const hashedNewPassword = await hashPassword(newPassword);
    admin.password = hashedNewPassword;
    await saveUsers(users);
    showMessage("Пароль адміністратора успішно змінено.");

    logUserAction('ADMIN', "Зміна паролю адміністратора");
}

function viewUsers() {
    const users = JSON.parse(localStorage.getItem('users'));
    const userList = users
        .map(user => `Ім'я: ${user.username}, Блоковано: ${user.blocked}, Обмеження: ${user.restrictions}`)
        .join('\n');
    alert(userList || "Немає зареєстрованих користувачів.");
}

async function addUser() {
    const username = prompt("Введіть ім'я нового користувача:");
    const users = JSON.parse(localStorage.getItem('users'));

    if (users.find(u => u.username === username)) {
        showMessage("Користувач вже існує.");
        return;
    }

    const newUser = { username: username, password: '', blocked: false, restrictions: false };
    users.push(newUser);
    await saveUsers(users);
    showMessage("Користувача успішно додано.");
}


function blockUser() {
    const username = prompt("Введіть ім'я користувача для блокування:");
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username);

    if (!user) {
        showMessage("Користувача не знайдено.");
        return;
    }

    user.blocked = !user.blocked;
    saveUsers(users);
    showMessage(`Користувача ${username} ${user.blocked ? 'заблоковано' : 'розблоковано'}.`);
}

function togglePasswordRestrictions() {
    const username = prompt("Введіть ім'я користувача для зміни обмежень:");
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === username);

    if (!user) {
        showMessage("Користувача не знайдено.");
        return;
    }

    user.restrictions = !user.restrictions;
    saveUsers(users);
    showMessage(`Обмеження пароля для ${username} ${user.restrictions ? 'включено' : 'виключено'}.`);
}

function viewLogs() {
    const logs = JSON.parse(localStorage.getItem('logs')) || [];
    const logMessages = logs.map(log => `${log.timestamp} - ${log.eventType}: ${log.message}`).join('\n');
    alert(logMessages || "Немає записів у реєстраційному журналі.");
}

function viewActions() {
    const actions = JSON.parse(localStorage.getItem('actions')) || [];
    const actionEntries = actions
        .map(action => `${action.timestamp} - ${action.username}: ${action.action}`)
        .join('\n');
    alert(actionEntries || "Журнал дій порожній.");
}