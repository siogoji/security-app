async function changeUserPassword() {
    if (!currentUser) {
        showMessage("Будь ласка, увійдіть у систему.");
        return;
    }

    const oldPassword = prompt("Введіть старий пароль:") || "";
    const hashedOldPassword = await hashPassword(oldPassword);
    console.log('Attempting with old password hash:', hashedOldPassword);

    if (currentUser.password === "" && oldPassword === "") {
        console.log('Old password is empty and current password is empty. Allowing password change.');
    } else if (currentUser.password !== hashedOldPassword) {
        showMessage("Невірний старий пароль.");
        return;
    }

    const newPassword = prompt("Введіть новий пароль:");
    const confirmPassword = prompt("Підтвердіть новий пароль:");

    if (newPassword !== confirmPassword) {
        showMessage("Паролі не співпадають.");
        return;
    }

    if (currentUser.restrictions && !isValidPassword(newPassword)) {
        showMessage("Пароль не відповідає вимогам.");
        return;
    }

    const hashedNewPassword = await hashPassword(newPassword);
    console.log('New password hash:', hashedNewPassword);

    currentUser.password = hashedNewPassword;
    const users = JSON.parse(localStorage.getItem('users'));
    const index = users.findIndex(u => u.username === currentUser.username);
    users[index] = currentUser;
    await saveUsers(users);

    showMessage("Пароль успішно змінено.");

    logUserAction(currentUser.username, "Зміна паролю");
}