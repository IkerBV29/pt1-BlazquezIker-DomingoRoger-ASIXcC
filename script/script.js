// Obtener el botón de cambio de tema
const themeToggle = document.getElementById('theme-toggle');

// Comprobar si el usuario ya ha seleccionado un tema previamente
const currentTheme = localStorage.getItem('theme') || 'light';

// Aplicar el tema guardado
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = 'Claro';
} else {
    document.body.classList.remove('dark-mode');
    themeToggle.textContent = 'Oscuro';
}

// Agregar evento al botón para cambiar de tema
themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = 'Oscuro';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'Claro';
        localStorage.setItem('theme', 'dark');
    }
});