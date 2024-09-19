let captchaCode = '';

function generateCaptcha() {
    const canvas = document.getElementById('captchaCanvas');
    const ctx = canvas.getContext('2d');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    captchaCode = '';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 6; i++) {
        captchaCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 10; i++) {
        ctx.strokeStyle = getRandomColor();
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }

    ctx.font = '30px Montserrat';
    ctx.fillStyle = '#000';
    ctx.fillText(captchaCode, 40, 50);

    for (let i = 0; i < 50; i++) {
        ctx.fillStyle = getRandomColor();
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

generateCaptcha();