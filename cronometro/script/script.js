// Función para actualizar el reloj (siempre activa)
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;
}

// Ejecutar el reloj cada segundo
setInterval(updateClock, 1000);

// Lógica del temporizador (solo se activa cuando el usuario lo configura)
let endTime;
let countdownInterval;
let alarmSound = new Audio();

function updateCountdown() {
    const now = new Date();
    if (endTime) {
        const remainingTime = endTime - now;
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').textContent = '00:00:00';
            playAlarm();
            return;
        }
        const remainingHours = String(Math.floor(remainingTime / (1000 * 60 * 60))).padStart(2, '0');
        const remainingMinutes = String(Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const remainingSeconds = String(Math.floor((remainingTime % (1000 * 60)) / 1000)).padStart(2, '0');
        document.getElementById('countdown').textContent = `${remainingHours}:${remainingMinutes}:${remainingSeconds}`;
    }
}

function setEndTime() {
    const endTimeInput = document.getElementById('endTime').value;
    const [hours, minutes] = endTimeInput.split(':');
    const now = new Date();
    endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    if (endTime <= now) {
        endTime.setDate(endTime.getDate() + 1);
    }
    clearInterval(countdownInterval);
    countdownInterval = setInterval(updateCountdown, 1000);
}

function playAlarm() {
    const soundSelect = document.getElementById('soundSelect');
    alarmSound.src = soundSelect.value;
    alarmSound.play();
}

// Función para cambiar el tema
function toggleTheme() {
    const body = document.body;
    const themeToggleButton = document.getElementById("themeToggle");

    if (body.classList.contains("dark-theme")) {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        themeToggleButton.textContent = "Cambiar a tema oscuro";
    } else {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        themeToggleButton.textContent = "Cambiar a tema claro";
    }
}

// Asignar la función al botón de cambio de tema
document.getElementById("themeToggle").addEventListener("click", toggleTheme);