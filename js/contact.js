// HTML de la página de Contacto a partir de JS (DOM)

const contenedorformularioContacto = document.getElementById("formularioContacto");
const formularioContacto = document.createElement("article");

// titulo ingresado por js

const contenidoSuperior = {
    titulo: "¿Te interesa empezar con alguno de los servicios que ves?",
    texto: "Te invito a contactarme por cualquier información que necesites"
};

formularioContacto.innerHTML = `
                    <div class= "text-center mx-3">
                    <h4 class="formularioh4">${contenidoSuperior.titulo}</h4>
                    <p class="formularioParrafo">${contenidoSuperior.texto}</p>
                    </div>
                `;

contenedorformularioContacto.appendChild(formularioContacto);

// VALIDACIÓN FORMULARIO

// Modal para cuando el formulario es enviado

const abrirModal = document.getElementById("enviar")
const cerrarModal = document.getElementById("cerrarModal")
const modalContainer = document.getElementsByClassName("modalContainer")[0]

// FORMULARIO DE CONTACTO

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const textareas = document.querySelectorAll('#formulario textarea');

const usosPermitidos = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{5,40}$/,
    telefono: /^\d{7,14}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    mensaje: /^[a-zA-ZÀ-ÿ\s0-9_,.+-]{10,100}$/,
}

const datos = {
    nombre: false,
    telefono: false,
    correo: false,
    mensaje: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarDato(usosPermitidos.nombre, e.target, 'nombre')
            break;
        case "telefono":
            validarDato(usosPermitidos.telefono, e.target, 'telefono')
            break;
        case "correo":
            validarDato(usosPermitidos.correo, e.target, 'correo')
            break;
        case "mensaje":
            validarDato(usosPermitidos.mensaje, e.target, 'mensaje')
            break;
    }
}

const validarDato = (usosPermitidos, input, dato,) => {
    if (usosPermitidos.test(input.value)) {
        document.getElementById(`entrada__${dato}`).classList.remove('formulario__entrada-incorrecto');
        document.getElementById(`entrada__${dato}`).classList.add('formulario__entrada-correcto');
        document.querySelector(`#entrada__${dato} i`).classList.add('fa-check-circle');
        document.querySelector(`#entrada__${dato} i`).classList.remove('fa-times-circle');
        document.querySelector(`#entrada__${dato} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        datos[dato] = true;
    } else {
        document.getElementById(`entrada__${dato}`).classList.add('formulario__entrada-incorrecto');
        document.getElementById(`entrada__${dato}`).classList.remove('formulario__entrada-correcto');
        document.querySelector(`#entrada__${dato} i`).classList.add('fa-times-circle');
        document.querySelector(`#entrada__${dato} i`).classList.remove('fa-check-circle');
        document.querySelector(`#entrada__${dato} .formulario__input-error`).classList.add('formulario__input-error-activo');
        datos[dato] = false;

    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

textareas.forEach((textarea) => {
    textarea.addEventListener('keyup', validarFormulario);
    textarea.addEventListener('blur', validarFormulario);
});


// Para que el formulario se envie a mi mail sin utilizar Backend

const $form = document.querySelector("#formulario");

$form.addEventListener("submit", handleSubmit)

async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(this)
    const response = await fetch(this.action, {
        method: this.method,
        body: form,
        headers: {
            "Accept": "application/json"
        }
    });

    if (datos.nombre && datos.correo && datos.telefono && datos.mensaje) {
        response.ok;
        formulario.reset();

        modalContainer.classList.toggle("modalActive")
        document.querySelectorAll('.formulario__entrada-correcto').forEach((icono) => {
            icono.classList.remove('formulario__entrada-correcto');
        });
        
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 5000);
    }
}

cerrarModal.addEventListener("click", () => {
    modalContainer.classList.toggle("modalActive")
})
