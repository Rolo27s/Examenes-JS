const newDivContainer = document.createElement('div');

let lista = new Map([
    [1, ['Paco', 'Ausente']],
    [2, ['Miguel', 'Ausente']],
    [3, ['Natalia', 'Ausente']]
]);

console.log(lista);

function generarLista() {
    newDivContainer.innerHTML = ''; // Limpiar el contenido actual del div contenedor

    lista.forEach((Estudiante, key) => {
        const divEstudiante = document.createElement('div');
        divEstudiante.className = 'Estudiante';
        divEstudiante.id = "ID_" + key;
        
        const newSpan = document.createElement('span');
        newSpan.innerHTML = key;
        
        const newAlumnoP = document.createElement('p');
        newAlumnoP.innerHTML = Estudiante[0];
        
        const newStatusP = document.createElement('p');
        newStatusP.innerHTML = Estudiante[1];
        
        const btnState = document.createElement('button');
        btnState.innerHTML = 'Cambiar asistencia';
        btnState.classList.add(`btn-state-${key}`);
        btnState.classList.add(`btn-state`);
        btnState.addEventListener('click', () => {
        // comparo si estudiante[1] es ausente y lo guardo en esa parte del diccionario para la proxima vez que lo quiera comprobar. Esto hace el efecto toggle
        Estudiante[1] = Estudiante[1] === 'Ausente' ? 'Presente' : 'Ausente';
        // Actualiza el contenido del elemento <p> correspondiente
        newStatusP.innerHTML = Estudiante[1];
    });

        const btnDelete = document.createElement('button');
        btnDelete.innerHTML = 'Borrar';
        btnDelete.classList.add(`btn-delete-${key}`);
        btnDelete.classList.add(`btn-delete`);
        // Agrego la funcionalidad de eliminar la fila a cada botón
        btnDelete.addEventListener('click', () => {
            divEstudiante.remove();
        // Obtén el ID del estudiante
        const studentId = divEstudiante.querySelector('span').innerHTML;
        // Borra el estudiante del mapa utilizando su ID como clave
        lista.delete(Number(studentId));
        });
        
        divEstudiante.appendChild(newSpan);
        divEstudiante.appendChild(newAlumnoP);
        divEstudiante.appendChild(newStatusP);
        divEstudiante.appendChild(btnState);
        divEstudiante.appendChild(btnDelete);
        
        newDivContainer.appendChild(divEstudiante);
    });

    document.body.appendChild(newDivContainer);
}

generarLista();

function actualizarLista() {
    generarLista();
}

let id = 4;
const btnAnadir = document.getElementById('btn-anadir');
btnAnadir.addEventListener('click', (e) => {
    e.preventDefault();

    const estudianteNuevo = document.getElementById('nuevo-alumno').value;

    if (estudianteNuevo.trim() !== '') {
        lista.set(id, [estudianteNuevo, 'Ausente']);
        id++;

        document.getElementById('nuevo-alumno').value = '';

        actualizarLista();
    }
});
