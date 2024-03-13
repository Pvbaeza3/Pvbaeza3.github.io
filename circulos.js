let puntuacion = 0;
let tirosRealizados = 0;
let tirosAcertados = 1;
const puntuacionElemento = document.getElementById('puntuacion');

const porcentajeAciertosElemento = document.getElementById('porcentajeAciertos');

function incrementarPuntuacion() {
    puntuacion += 1000;
    actualizarPuntuacion();
}

function reiniciarPuntuacion() {
    puntuacion = 0;
    actualizarPuntuacion();
}

function restarPuntuacion(puntos) {
    if (puntuacion > 0) {
        puntuacion -= puntos;
        actualizarPuntuacion();
    }
}

function actualizarPuntuacion() {
    puntuacionElemento.textContent = `${puntuacion}`;
}

function actualizarPorcentajeAciertos() {
    const porcentajeAciertosElemento = document.getElementById('porcentajeAciertos');
    console.log(tirosRealizados)
    console.log(tirosAcertados)
    if (porcentajeAciertosElemento) {
        if (tirosRealizados > 0) {
            let porcentaje = (tirosAcertados / tirosRealizados) * 100;
            porcentajeAciertosElemento.textContent = `${porcentaje.toFixed(2)}%`;
        } else {
            porcentajeAciertosElemento.textContent = `0%`;
        }
    } else {
        console.error("El elemento 'porcentajeAciertos' no se encontró en el DOM.");
    }
}




function restarPuntosClickFuera(event) {
    const target = event.target;
    if (!target.classList.contains('circle')) {
        restarPuntuacion(500);
        tirosRealizados++;
        actualizarPorcentajeAciertos();
    }
}

function generarCirculosAutomaticamente(tiempoSeleccionado) {
    let tiempoTranscurrido = 0;

    const interval = setInterval(() => {
        tiempoTranscurrido += 500;
        if (tiempoTranscurrido >= tiempoSeleccionado * 1000) {
            clearInterval(interval);
            return;
        }

        setTimeout(function() {
            if (tiempoTranscurrido >= tiempoSeleccionado * 1000) {
                mostrarBotonContainer();
            }
        }, 8500);

        const circulos = document.querySelectorAll('.circle');
        if (circulos.length > 6) {
            for (let i = 0; i < circulos.length - 6; i++) {
                circulos[i].remove();
            }
        }
        if (circulos.length < 6) {
            generarCirculo();
        }
    }, 500);

    if (tiempoTranscurrido < tiempoSeleccionado * 1000) {
        let puntos = -500;

        document.body.addEventListener('click', restarPuntosClickFuera);
        restarPuntuacion(puntos);
    }
}

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    iniciarContadorSegundos();
    reiniciarPuntuacion();
    const tiempoSeleccionado = parseInt(document.getElementById('tiempoJuego').value);
    ocultarBotonContainer();
    generarCirculosAutomaticamente(tiempoSeleccionado);
});

function ocultarBotonContainer() {
    const botonContainer = document.querySelector('.boton-container');
    botonContainer.style.display = 'none';
}

function mostrarBotonContainer() {
    const botonContainer = document.querySelector('.boton-container');
    botonContainer.style.display = 'flex';
}

function iniciarContadorSegundos() {
    let segundosTranscurridos = 0;
    intervaloSegundos = setInterval(() => {
        segundosTranscurridos++;
        actualizarContadorSegundos(segundosTranscurridos);
        if (segundosTranscurridos >= 30) {
            clearInterval(intervaloSegundos);
        }
    }, 1000);
}

function actualizarContadorSegundos(segundosTranscurridos) {
    const contadorSegundos = document.getElementById('contadorSegundos');
    contadorSegundos.textContent = `${segundosTranscurridos}`;
}

function eliminarCirculosExcedentes() {
    const circulos = document.querySelectorAll('.circle');
    if (circulos.length > 6) {
        for (let i = 0; i < circulos.length - 6; i++) {
            circulos[i].remove();
        }
    }
}

const contenedor = document.querySelector('.circle-container');

function generarCirculo() {
    const radio = 40;
    const margenX = window.innerWidth * 0.1;
    const margenY = window.innerHeight * 0.1;

    let posX, posY;
    do {
        posX = Math.random() * (window.innerWidth - margenX * 2 - radio * 2) + margenX + radio;
        posY = Math.random() * (window.innerHeight - margenY * 2 - radio * 2) + margenY + radio;
    } while (haySuperposicion(posX, posY));

    const circulo = document.createElement('div');
    circulo.classList.add('circle');
    circulo.style.width = `${radio * 2}px`;
    circulo.style.height = `${radio * 2}px`;
    circulo.style.left = `${posX}px`;
    circulo.style.top = `${posY}px`;
    circulo.style.animation = 'crecer 3s forwards';

    circulo.addEventListener('click', () => {
        if (circulo.parentNode === contenedor) {
            contenedor.removeChild(circulo);
            incrementarPuntuacion();
            tirosRealizados++;
            tirosAcertados++;
            actualizarPorcentajeAciertos();
            eliminarCirculosExcedentes();
        }
    });
    

    contenedor.appendChild(circulo);

    setTimeout(() => {
        circulo.style.animation = 'encoger 3s forwards';
        setTimeout(() => {
            if (circulo.parentNode === contenedor) {
                contenedor.removeChild(circulo);
                eliminarCirculosExcedentes();
            }
        }, 1000);
    }, 2500);

    const circulos = document.querySelectorAll('.circle');
    if (circulos.length > 6) {
        for (let i = 0; i < circulos.length - 6; i++) {
            circulos[i].remove();
        }
    }
}

function haySuperposicion(posX, posY) {
    const circulos = document.querySelectorAll('.circle');
    for (const circulo of circulos) {
        const circuloPosX = parseInt(circulo.style.left);
        const circuloPosY = parseInt(circulo.style.top);
        const distancia = Math.sqrt((circuloPosX - posX) ** 2 + (circuloPosY - posY) ** 2);
        if (distancia < 80) {
            return true;
        }
    }
    return false;
}

function calcularPorcentajeAciertos() {
    if (tirosRealizados > 0) {
        const porcentaje = (tirosAcertados / tirosRealizados) * 100;
        return porcentaje.toFixed(2);
    } else {
        return 0;
    }
}

