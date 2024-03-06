// Función para guardar el registro en Local Storage
function guardarRegistro() {
    const form = document.getElementById('clinicaForm');
    const registro = {
        nombre: form.nombre.value,
        apellido: form.apellido.value,
        edad: form.edad.value,
        fechaNacimiento: form.fechaNacimiento.value,
        direccion: form.direccion.value,
        patologia: form.patologia.value,
        estudios: form.estudios.value,
        fechaConsulta: form.fechaConsulta.value || new Date().toLocaleDateString()
    };

    // Obtener registros existentes de Local Storage
    //getItem accedemos a la informacion por medio de los parametros que son la variables
    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Agregar el nuevo registro
    registros.push(registro);

    // Guardar en Local Storage
    //el Setitem guarda y recibe los parametros,  
    //JSON.stringify recibe un objeto y lo conviente en string asi se pueda guardar en el local
    localStorage.setItem('registros', JSON.stringify(registros));

    // Limpiar el formulario
    form.reset();

    // Mostrar los registros en la tabla
    mostrarRegistros();
}

// Función para mostrar los registros en la tabla
function mostrarRegistros() {
    const tbodyRegistros = document.getElementById('tbodyRegistros');
    tbodyRegistros.innerHTML = '';

    // Obtener registros de Local Storage
    //JSON.parse lo que hace es que parsea convierte el string a un objeto
    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Mostrar cada registro en la tabla
    //
    registros.forEach((registro, index) => {
        const row = tbodyRegistros.insertRow();
        row.insertCell(0).textContent = registro.nombre;
        row.insertCell(1).textContent = registro.apellido;
        row.insertCell(2).textContent = registro.edad;
        row.insertCell(3).textContent = registro.fechaNacimiento;
        row.insertCell(4).textContent = registro.direccion;
        row.insertCell(5).textContent = registro.patologia;
        row.insertCell(6).textContent = registro.estudios;
        row.insertCell(7).textContent = registro.fechaConsulta;  // Nueva celda para la fecha de consulta

        // Agregar botón de editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = function() {
            editarRegistro(index);
        };
        row.insertCell(8).appendChild(editButton);

        // Agregar botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function() {
            eliminarRegistro(index);
        };
        row.insertCell(9).appendChild(deleteButton);
    });
}

// Función para editar un registro
function editarRegistro(index) {
    const form = document.getElementById('clinicaForm');
    const registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Obtener el registro que se va a editar
    const registroEdit = registros[index];

    // Llenar el formulario con los datos del registro seleccionado
    form.nombre.value = registroEdit.nombre;
    form.apellido.value = registroEdit.apellido;
    form.edad.value = registroEdit.edad;
    form.fechaNacimiento.value = registroEdit.fechaNacimiento;
    form.direccion.value = registroEdit.direccion;
    form.patologia.value = registroEdit.patologia;
    form.estudios.value = registroEdit.estudios;
    form.fechaConsulta.value = registroEdit.fechaConsulta; 

    // Eliminar el registro antiguo
    registros.splice(index, 1);

    // Actualizar Local Storage
    localStorage.setItem('registros', JSON.stringify(registros));

    // Mostrar los registros actualizados en la tabla
    mostrarRegistros();
}

// Función para eliminar un registro
function eliminarRegistro(index) {
    // Obtener registros de Local Storage
    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Eliminar el registro en la posición index
    registros.splice(index, 1);

    // Guardar en Local Storage
    localStorage.setItem('registros', JSON.stringify(registros));

    // Mostrar los registros actualizados en la tabla
    mostrarRegistros();
}

// Función para buscar registros por nombre o apellido
function buscarRegistros() {
    const inputBusqueda = document.getElementById('busquedaInput').value.toLowerCase();
    
    // Obtener registros de Local Storage
    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    // Filtrar registros por nombre o apellido que coincidan con la búsqueda
    const resultados = registros.filter(registro => {
        const nombreCompleto = `${registro.nombre} ${registro.apellido}`.toLowerCase();
        return nombreCompleto.includes(inputBusqueda);
    });

    // Mostrar los resultados de la búsqueda en la tabla
    mostrarResultadosBusqueda(resultados);
}

// Función para mostrar los resultados de la búsqueda en la tabla
function mostrarResultadosBusqueda(resultados) {
    const tbodyRegistros = document.getElementById('tbodyRegistros');
    tbodyRegistros.innerHTML = '';

    // Mostrar cada resultado de la búsqueda en la tabla
    resultados.forEach((registro, index) => {
        const row = tbodyRegistros.insertRow();
        row.insertCell(0).textContent = registro.nombre;
        row.insertCell(1).textContent = registro.apellido;
        row.insertCell(2).textContent = registro.edad;
        row.insertCell(3).textContent = registro.fechaNacimiento;
        row.insertCell(4).textContent = registro.direccion;
        row.insertCell(5).textContent = registro.patologia;
        row.insertCell(6).textContent = registro.estudios;
        row.insertCell(7).textContent = registro.fechaConsulta;  // Nueva celda para la fecha de consulta

        // Agregar botón de editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = function() {
            editarRegistro(index);
        };
        row.insertCell(8).appendChild(editButton);

        // Agregar botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function() {
            eliminarRegistro(index);
        };
        row.insertCell(9).appendChild(deleteButton);
    });
}

// Mostrar los registros al cargar la página
mostrarRegistros();
