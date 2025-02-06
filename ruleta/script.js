var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
document.getElementById("wheel").appendChild(canvas);

var names = [];
var startAngle = 0;
var spinning = false;
var colors = [
    "#FF6347", "#ADD8E6", "#90EE90", "#FFA07A", "#20B2AA",
    "#FFD700", "#FF69B4", "#9370DB", "#FFA500", "#00FA9A"
];
var spinSound = new Audio("./assets/sounds/spin.mp3");
var selectSound = new Audio("./assets/sounds/chosed.mp3");

// Desactivar botón de girar inicialmente
document.getElementById("spin-wheel").classList.add("disabled");

document.getElementById("load-names").addEventListener("click", function () {
    fetch("./data/noms.txt")
        .then(function (response) {
            return response.text();
        })
        .then(function (text) {
            names = text.split("\n").map(function (name) {
                return name.trim();
            }).filter(function (name) {
                return name;
            });
            if (names.length > 0) {
                drawWheel();
                alert("Nombres cargados correctamente.");
                document.getElementById("spin-wheel").classList.remove("disabled");
            } else {
                alert("El archivo de nombres está vacío.");
            }
        })
        .catch(function (error) {
            alert("Error al cargar los nombres. Verifica la ruta al archivo.");
            console.error(error);
        });
});

document.getElementById("spin-wheel").addEventListener("click", function () {
    if (names.length === 0) {
        alert("Primero carga los nombres.");
        return;
    }
    if (!spinning && !document.getElementById("spin-wheel").classList.contains("disabled")) {
        spinWheel();
    }
});

function drawWheel() {
    var arcSize = (2 * Math.PI) / names.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < names.length; i++) {
        var angle = startAngle + i * arcSize;
        ctx.beginPath();
        ctx.arc(200, 200, 200, angle, angle + arcSize, false);
        ctx.lineTo(200, 200);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.stroke();
        ctx.save();
        var textAngle = angle + arcSize / 2;
        ctx.translate(200 + Math.cos(textAngle) * 150, 200 + Math.sin(textAngle) * 150);
        ctx.rotate(textAngle);
        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        ctx.fillText(names[i], -ctx.measureText(names[i]).width / 2, 0);
        ctx.restore();
    }
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(200, 10);
    ctx.lineTo(190, 40);
    ctx.lineTo(210, 40);
    ctx.closePath();
    ctx.fill();
}

function spinWheel() {
    spinning = true;
    spinSound.play();
    var spinTime = 0;
    var spinTotal = Math.random() * 25000 + 26000;
    var arcSize = (2 * Math.PI) / names.length;

    function rotate() {
        spinTime += 30;
        startAngle += (Math.PI / 64) * (1 - spinTime / spinTotal);
        drawWheel();
        if (spinTime < spinTotal) {
            requestAnimationFrame(rotate);
        } else {
            var selectedIndex = names.length - 1 - Math.floor(((startAngle + Math.PI / 2) % (2 * Math.PI)) / arcSize) % names.length;
            setTimeout(function () {
                spinning = false;
                selectSound.play();
                showSelectedName(names[selectedIndex]);
            }, 500);
        }
    }
    rotate();
}

function showSelectedName(name) {
    document.getElementById("selected-name").textContent = "¡Nombre Seleccionado! " + name;
    var modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = '<div class="modal-content"><h2>¡Nombre Seleccionado!</h2><p>' + name + '</p><button id="close-modal" class="btn">Cerrar</button></div>';
    document.body.appendChild(modal);
    document.getElementById("close-modal").addEventListener("click", function () {
        document.body.removeChild(modal);
    });
}

// Función para alternar entre modo claro y oscuro
document.getElementById("toggle-mode").addEventListener("click", function () {
    const body = document.body;
    if (body.classList.contains("dark-mode")) {
        // Cambiar a modo claro
        body.classList.remove("dark-mode");
        this.textContent = "Modo Oscuro"; // Actualizar el texto del botón
    } else {
        // Cambiar a modo oscuro
        body.classList.add("dark-mode");
        this.textContent = "Modo Claro"; // Actualizar el texto del botón
    }
});