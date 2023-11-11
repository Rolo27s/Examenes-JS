// Control con expresión regular para 9 números consecutivos
const regExNum = /^\d{9}$/;

// Declaro mi nuevo mapa que se llamará agenda.
const agenda = new Map();

// Añadir contacto también está funcionando como actualizar DOM
function anadirContactoDOM () {
  const gridContainer = document.querySelector('.grid-container');
  // Con este planteamiento tendremos actualizado siempre el dom porque estará vinculado al mapa 'agenda'
  gridContainer.innerHTML = `<h3>Contactos</h3>`;
  agenda.forEach((telf, nom) => {
    // Lo primero que hago es pasar el nombre a MAYÚSCULAS
    nom = nom.toUpperCase();

    const newDiv = document.createElement('div');
    newDiv.classList.add('grid-item');
    // Al div que contendrá toda la información de contacto le agrego una clase con el nombre del contacto. Este nombre de contacto será la key en nuestro mapa, por lo que hacer esta estructura servirá a la hora de eliminar o modificar el div correcto.
    newDiv.classList.add(nom);

    const newContact = document.createElement('p');
    const newContactName = document.createTextNode(nom);
    newContact.appendChild(newContactName);
    newDiv.appendChild(newContact);

    const newTelf = document.createElement('span');
    const newTelfNumber = document.createTextNode(telf);
    newTelf.appendChild(newTelfNumber);
    newDiv.appendChild(newTelf);

    const newBtnDelete = document.createElement('button');
    newBtnDelete.classList.add(`delete`);
    newBtnDelete.classList.add(`delete-${nom}`);
    const delText = document.createTextNode('Eliminar');
    newBtnDelete.appendChild(delText);
    newDiv.appendChild(newBtnDelete);
    // Genero el evento de cada botón de borrar
    newBtnDelete.addEventListener('click', () => {
      agenda.delete(nom);
      console.log(nom);
      // Actualizo el DOM llamando a la misma función porque añade y también actualiza.
      anadirContactoDOM ();
    });

    const newBtnEdit = document.createElement('button');
    newBtnEdit.classList.add(`edit`);
    newBtnEdit.classList.add(`edit-${nom}`);
    const editText = document.createTextNode('Editar');
    newBtnEdit.appendChild(editText);
    newDiv.appendChild(newBtnEdit);
    // Genero el evento de cada botón de editar
    newBtnEdit.addEventListener('click', () => {
    // Rellena el formulario con el nombre y el teléfono actual
    document.getElementById('nombre').value = nom;
    // El get está cogiendo el value del key que se le pasa. En este caso el teléfono
    document.getElementById('telefono').value = agenda.get(nom);
    // Oculta el input de nombre
    document.getElementById('nombre').style.display = 'none';
    });

    // Agrego todo al DOM
    gridContainer.appendChild(newDiv);
  });
}

const enviarContacto = document.getElementById('enviar-contacto');
enviarContacto.addEventListener('click', (e) => {
  e.preventDefault();
  
  let nombreForm = document.getElementById('nombre').value;
  let telfForm = document.getElementById('telefono').value;

  // Control de sintáxis
  if ( regExNum.test(telfForm) && nombreForm !== '') {
    alert('Contacto agregado correctamente');
    // Lo primero que hago es pasar el nombre a MAYÚSCULAS
    nombreForm = nombreForm.toUpperCase();
    // Añado el contacto al mapa
    agenda.set(nombreForm, telfForm);
    anadirContactoDOM ();
  } else {
    alert('Error en la entrada de datos');
  }

  const formAdd = document.getElementById('form-add');
  formAdd.reset();
  document.getElementById('nombre').style.display = 'block';
});
