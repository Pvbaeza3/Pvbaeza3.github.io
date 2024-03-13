
// Función para generar automáticamente los 5 círculos con un retraso de 500 milisegundos entre cada uno
function generarCirculosAutomaticamente(tiempoSeleccionado) {
    let tiempoTranscurrido = 0;

    const interval = setInterval(() => {
        tiempoTranscurrido += 500; // Incrementamos el tiempo transcurrido en 500 milisegundos
        if (tiempoTranscurrido >= tiempoSeleccionado * 1000) { // Convertimos el tiempo seleccionado a milisegundos
            clearInterval(interval);
            console.log(tiempoTranscurrido)
            return;
        }

        setTimeout(function() {
            if (tiempoTranscurrido >= tiempoSeleccionado * 1000) { 
            mostrarBotonContainer()
        }
        }, 4500); // 3000 milisegundos son 3 segundos

        if (tiempoTranscurrido >= tiempoSeleccionado * 1000) { 
            mostrarBotonContainer()
        }
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
}
let puntuacion = 0;
const puntuacionElemento = document.getElementById('puntuacion');

function incrementarPuntuacion() {
    puntuacion = puntuacion + 1000;
    puntuacionElemento.textContent = `${puntuacion}`;
}
function reiniciarPuntuacion() {
    puntuacion = 0;
    puntuacionElemento.textContent = `${puntuacion}`;
}


const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    iniciarContadorSegundos();
    reiniciarPuntuacion()
    const tiempoSeleccionado = parseInt(document.getElementById('tiempoJuego').value);
    ocultarBotonContainer(); // Ocultar el contenedor del botón
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


// Función para iniciar el contador de segundos
function iniciarContadorSegundos() {
    let segundosTranscurridos = 0; // Declara la variable dentro de la función para que se reinicie cada vez que se inicia el contador
    intervaloSegundos = setInterval(() => {
        segundosTranscurridos++;
        actualizarContadorSegundos(segundosTranscurridos);
        if(segundosTranscurridos>=30) {
            clearInterval(intervaloSegundos)
        } // Pasa la variable como argumento
    }, 1000); // Ejecutar cada segundo (1000 milisegundos)
}

// Función para actualizar el contador de segundos en el HTML
function actualizarContadorSegundos(segundosTranscurridos) {
    const contadorSegundos = document.getElementById('contadorSegundos');
    contadorSegundos.textContent = `${segundosTranscurridos}`;
}

// Función para eliminar los círculos excedentes
function eliminarCirculosExcedentes() {
    const circulos = document.querySelectorAll('.circle');
    if (circulos.length > 6) {
        for (let i = 0; i < circulos.length - 6; i++) {
            circulos[i].remove();
        }
    }
}


// Obtenemos el contenedor donde se generarán los círculos
const contenedor = document.querySelector('.circle-container');

// Función para generar un círculo aleatorio
// Función para generar un círculo aleatorio
function generarCirculo() {
    const radio = 40; // Radio fijo del círculo

    const margenX = window.innerWidth * 0.1; // 10% del ancho de la pantalla
    const margenY = window.innerHeight * 0.1; // 10% del alto de la pantalla

    // Posición X e Y aleatoria dentro del margen de la pantalla
    let posX, posY;
    do {
        posX = Math.random() * (window.innerWidth - margenX * 2 - radio * 2) + margenX + radio;
        posY = Math.random() * (window.innerHeight - margenY * 2 - radio * 2) + margenY + radio;
    } while (haySuperposicion(posX, posY)); // Verificar si hay superposición

    // Creamos el elemento de círculo
    const circulo = document.createElement('div');
    circulo.classList.add('circle');
    circulo.style.width = `${radio * 2}px`;
    circulo.style.height = `${radio * 2}px`;
    circulo.style.left = `${posX}px`;
    circulo.style.top = `${posY}px`;

    // Agregamos la animación de crecimiento antes de agregar el círculo al contenedor
    circulo.style.animation = 'crecer 3s forwards';

    // Agregamos el evento de clic para eliminar el círculo
    circulo.addEventListener('click', () => {
        if (circulo.parentNode === contenedor) {
            contenedor.removeChild(circulo);
            incrementarPuntuacion();
            eliminarCirculosExcedentes()
        }
    });

    // Agregamos el círculo al contenedor después de aplicar la animación
    contenedor.appendChild(circulo);

    // Iniciamos la animación de encogimiento después de 3 segundos
    setTimeout(() => {
        circulo.style.animation = 'encoger 3s forwards'; // Cambiamos la animación a achicar después de 3 segundos
        setTimeout(() => {
            if (circulo.parentNode === contenedor) {
                contenedor.removeChild(circulo); // Eliminamos el círculo después de 3 segundos (tiempo total de animación)
                eliminarCirculosExcedentes()
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




// Función para verificar si hay superposición con los círculos existentes
function haySuperposicion(posX, posY) {
    const circulos = document.querySelectorAll('.circle');
    for (const circulo of circulos) {
        const circuloPosX = parseInt(circulo.style.left);
        const circuloPosY = parseInt(circulo.style.top);
        const distancia = Math.sqrt((circuloPosX - posX) ** 2 + (circuloPosY - posY) ** 2);
        if (distancia < 80) { // Suma de los radios de los círculos
            return true; // Hay superposición
        }
    }
    return false; // No hay superposición
}
