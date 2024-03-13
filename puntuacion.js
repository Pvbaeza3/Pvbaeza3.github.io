// Código para el archivo "puntuacion.js"

let puntuacion = 0;
const puntuacionElemento = document.getElementById('puntuacion');

function incrementarPuntuacion() {
    puntuacion = puntuacion + 1000;
    puntuacionElemento.textContent = `${puntuacion}`;
}

