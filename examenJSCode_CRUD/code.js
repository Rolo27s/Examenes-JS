let diccionario = new Map([
    ["casa", ["house", "maison", "casa"]],
    ["coche", ["car", "voiture", "macchina"]],
    ["perro", ["dog", "chien", "cane"]],
    ["gato", ["cat", "chat", "gatto"]],
    ["sol", ["sun", "soleil", "sole"]]
]);

// Referencias al cuerpo de la tabla y al formulario
const cuerpoTabla = document.getElementById("tablaDiccionario").getElementsByTagName('tbody')[0];
const formulario = document.getElementById("formularioAgregarPalabra");

// Función para añadir palabras al diccionario y a la tabla HTML
function agregarPalabraDiccionario(espanol, ingles, frances, italiano) {
    diccionario.set(espanol, [ingles, frances, italiano]);

    const fila = cuerpoTabla.insertRow();
    fila.insertCell().textContent = espanol;
    fila.insertCell().textContent = ingles;
    fila.insertCell().textContent = frances;
    fila.insertCell().textContent = italiano;

    // Botón para borrar palabra
    let celdaBorrar = fila.insertCell();
    let botonBorrar = document.createElement("button");
    botonBorrar.textContent = "Borrar";
    botonBorrar.className = "boton-borrar";
    botonBorrar.onclick = function() {
        borrarPalabraDiccionario(espanol, fila);
    };
    celdaBorrar.appendChild(botonBorrar);

    // Botón para editar palabra
    let celdaEditar = fila.insertCell();
    let botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.className = "boton-editar";
    botonEditar.onclick = function() {
        editarPalabraDiccionario(espanol, fila);
    };
    celdaEditar.appendChild(botonEditar);
}

// Función para borrar palabras del diccionario y la tabla
function borrarPalabraDiccionario(espanol, fila) {
    diccionario.delete(espanol);

    // Borra la fila del HTML
    fila.remove();
}

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const espanol = document.getElementById("palabraEspanol").value;
    const ingles = document.getElementById("traduccionIngles").value;
    const frances = document.getElementById("traduccionFrances").value;
    const italiano = document.getElementById("traduccionItaliano").value;

    // ¿Estamos en modo edición?
    if (filaActualParaEditar) {
        //  Actualiza la tabla existente
        filaActualParaEditar.cells[0].textContent = espanol;
        filaActualParaEditar.cells[1].textContent = ingles;
        filaActualParaEditar.cells[2].textContent = frances;
        filaActualParaEditar.cells[3].textContent = italiano;

        // Actualizar el diccionario
        diccionario.set(espanol, [ingles, frances, italiano]);

        //  Reseteo la variable para proxima edicion
        filaActualParaEditar = null;
    } else {
        agregarPalabraDiccionario(espanol, ingles, frances, italiano);
    }

    formulario.reset();
});

for(let [espanol, traduccion] of diccionario){
    agregarPalabraDiccionario(espanol, traduccion[0], traduccion[1], traduccion[2]);
    // agregarPalabraDiccionario(espanol, ...traduccion);
}

// Parte del código para buscar las palabras
function buscarPalabra() {
    const inputBuscarPalabra = document.getElementById('buscarPalabra').value.toLowerCase().trim();
    const filas = cuerpoTabla.getElementsByTagName('tr'); // Obtener todas las filas de la tabla

    for (const fila of filas) {
        const celdas = fila.getElementsByTagName('td'); // Obtener todas las celdas de la fila

        let coincidenciaEncontrada = false;

        // -2 porque tengo en la tabla dos botones al final de cada fila
        for (let i = 0; i < celdas.length - 2; i++) {
            if (celdas[i].textContent.toLowerCase().includes(inputBuscarPalabra)) {
                coincidenciaEncontrada = true;
                break;
            }
        }

        if (coincidenciaEncontrada) {
            // Si se encuentra una coincidencia, no ocultar la fila.
            fila.classList.remove("hidden");
        } else {
            // Si no hay coincidencias, ocultar la fila.
            fila.classList.add("hidden");
        }
    }
}

const inputBuscarPalabra = document.getElementById('buscarPalabra');
inputBuscarPalabra.addEventListener('keyup', buscarPalabra);

// Parte del código para Modificar
let filaActualParaEditar = null;
function editarPalabraDiccionario(espanol, fila) {
    // Llenar el formulario con los datos de la fila
    document.getElementById('palabraEspanol').value = espanol;
    document.getElementById('traduccionIngles').value = fila.cells[1].textContent;
    document.getElementById('traduccionFrances').value = fila.cells[2].textContent;
    document.getElementById('traduccionItaliano').value = fila.cells[3].textContent;

    filaActualParaEditar = fila;
}
