// Función para agregar datos al Local Storage
function agregardatos() {
    // Obtener los valores del formulario
    var nombre = document.getElementById("nombre").value;
    var dni = document.getElementById("dni").value;
    var edad = document.getElementById("edad").value;
    var telefono = document.getElementById("telefono").value;
    var obrasocial = document.getElementById("obrasocial").value;
    var email = document.getElementById("email").value;
    var fecha = document.getElementById("fecha").value;

    // Verificar si hay datos en el Local Storage
    var pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

    // Agregar el nuevo paciente o editar si ya existe
    var index = encontrarPacientePorDNI(pacientes, dni);
    if (index !== -1) {
        // Editar paciente existente
        pacientes[index] = {
            nombre: nombre,
            dni: dni,
            edad: edad,
            telefono: telefono,
            obrasocial: obrasocial,
            email: email,
            fecha: fecha
        };
    } else {
        // Agregar nuevo paciente
        pacientes.push({
            nombre: nombre,
            dni: dni,
            edad: edad,
            telefono: telefono,
            obrasocial: obrasocial,
            email: email,
            fecha: fecha
        });
    }

    // Guardar en el Local Storage
    localStorage.setItem("pacientes", JSON.stringify(pacientes));

    // Limpiar el formulario
    limpiarFormulario();

    // Actualizar la tabla
    actualizarTabla();
}

// Función para actualizar la tabla con los datos del Local Storage
function actualizarTabla() {
    var cuerpoTabla = document.getElementById("cuerpoTabla");
    cuerpoTabla.innerHTML = "";

    // Obtener datos del Local Storage
    var pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

    // Recorrer la lista de pacientes y agregar filas a la tabla
    pacientes.forEach(function (paciente, index) {
        var fila = cuerpoTabla.insertRow();

        // Crear celdas
        var celdaNombre = fila.insertCell(0);
        var celdaDni = fila.insertCell(1);
        var celdaEdad = fila.insertCell(2);
        var celdaTelefono = fila.insertCell(3);
        var celdaObraSocial = fila.insertCell(4);
        var celdaEmail = fila.insertCell(5);
        var celdaFecha = fila.insertCell(6);
        var celdaAcciones = fila.insertCell(7);

        // Agregar datos a las celdas
        celdaNombre.innerHTML = paciente.nombre;
        celdaDni.innerHTML = paciente.dni;
        celdaEdad.innerHTML = paciente.edad;
        celdaTelefono.innerHTML = paciente.telefono;
        celdaObraSocial.innerHTML = paciente.obrasocial;
        celdaEmail.innerHTML = paciente.email;
        celdaFecha.innerHTML = paciente.fecha;

        // Agregar botones de acciones
        var botonEditar = document.createElement("button");
        botonEditar.innerHTML = "Editar";
        botonEditar.id = "butEditar";
        botonEditar.addEventListener("click" , function () {
            cargarDatosParaEditar(paciente.dni);
        });

        var botonEliminar = document.createElement("button");
        botonEliminar.innerHTML = "Eliminar";
        botonEliminar.id = "butEliminar";
        botonEliminar.addEventListener("click", function () {
            eliminarPaciente(index);
        });

        celdaAcciones.appendChild(botonEditar);
        celdaAcciones.appendChild(botonEliminar);
    });
}

// Función para eliminar un paciente del Local Storage
function eliminarPaciente(index) {
    var pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    pacientes.splice(index, 1);
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
    actualizarTabla();
}

// Función para encontrar el índice de un paciente por DNI
function encontrarPacientePorDNI(pacientes, dni) {
    for (var i = 0; i < pacientes.length; i++) {
        if (pacientes[i].dni === dni) {
            return i;
        }
    }
    return -1;
}

// Función para cargar los datos de un paciente en el formulario para editar
function cargarDatosParaEditar(dni) {
    var pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    var index = encontrarPacientePorDNI(pacientes, dni);

    if (index !== -1) {
        var paciente = pacientes[index];
        document.getElementById("nombre").value = paciente.nombre;
        document.getElementById("dni").value = paciente.dni;
        document.getElementById("edad").value = paciente.edad;
        document.getElementById("telefono").value = paciente.telefono;
        document.getElementById("obrasocial").value = paciente.obrasocial;
        document.getElementById("email").value = paciente.email;
        document.getElementById("fecha").value = paciente.fecha;

        // Cambiar el botón "Agendar turno" por "Guardar cambios"
        var botonGuardar = document.getElementById("botonguardar");
        botonGuardar.innerHTML = "Guardar cambios";
        botonGuardar.onclick = function () {
            guardarCambios(index);
        };
    }
}

// Función para guardar los cambios en un paciente
function guardarCambios(index) {
    var pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    var paciente = pacientes[index];

    // Obtener los nuevos valores del formulario
    paciente.nombre = document.getElementById("nombre").value;
    paciente.dni = document.getElementById("dni").value;
    paciente.edad = document.getElementById("edad").value;
    paciente.telefono = document.getElementById("telefono").value;
    paciente.obrasocial = document.getElementById("obrasocial").value;
    paciente.email = document.getElementById("email").value;
    paciente.fecha = document.getElementById("fecha").value;

    // Guardar en el Local Storage
    localStorage.setItem("pacientes", JSON.stringify(pacientes));

    // Limpiar el formulario y restablecer el botón
    limpiarFormulario();
    resetearBoton();

    // Actualizar la tabla
    actualizarTabla();
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("formulario").reset();
}

// Función para resetear el botón a su estado original
function resetearBoton() {
    var botonGuardar = document.getElementById("botonguardar");
    botonGuardar.innerHTML = "Agendar turno";
    botonGuardar.onclick = function () {
        agregardatos();
    };
}

// Cargar la tabla al cargar la página
window.onload = function () {
    actualizarTabla();
};

