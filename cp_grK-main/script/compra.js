// Traducciones
const lang = {
    es: {
        title: 'VIAJA LIBRE',
        destinationName: 'Nombre del destino',
        pricePerPerson: ' €/persona',
        companionsTitle: 'Acompañantes (Opcional)',
        travelWithCompanion: '¿Viajas acompañado? *',
        yes: 'Sí',
        no: 'No',
        nameSurname: 'Nombre, apellido',
        emailPlaceholder: 'Correo electrónico',
        addCompanion: '+ Añadir otro acompañante',
        petsTitle: 'Mascotas (Opcional)',
        travelWithPet: '¿Viajas con mascota? *',
        petType: 'Tipo',
        petSize: 'Tamaño',
        intolerancesTitle: 'Intolerancias / Alergias (Opcional)',
        intolerancesPlaceholder: ' ',
        departureDate: 'Fecha de salida *',
        arrivalDate: 'Fecha de llegada *',
        purchaseForm: 'Formulario de compra',
        cardType: 'Tipo de tarjeta *',
        selectOption: 'Selecciona una opción',
        cardNumber: 'Número de tarjeta *',
        cardHolder: 'Nombre del titular de la tarjeta *',
        expiryDate: 'Fecha caducidad *',
        cvv: 'CVV *',
        buyTrip: 'Comprar viaje',
        faq: 'Preguntas frecuentes',
        contact: 'Contacto',
        documentation: 'Documentación'
    },
    en: {
        title: 'VIAJA LIBRE',
        destinationName: 'Destination name',
        pricePerPerson: ' €/person',
        companionsTitle: 'Companions (Optional)',
        travelWithCompanion: 'Are you traveling with someone? *',
        yes: 'Yes',
        no: 'No',
        nameSurname: 'Name, surname',
        emailPlaceholder: 'Email address',
        addCompanion: '+ Add another companion',
        petsTitle: 'Pets (Optional)',
        travelWithPet: 'Are you traveling with a pet? *',
        petType: 'Type',
        petSize: 'Size',
        intolerancesTitle: 'Intolerances / Allergies (Optional)',
        intolerancesPlaceholder: ' ',
        departureDate: 'Departure date *',
        arrivalDate: 'Arrival date *',
        purchaseForm: 'Purchase form',
        cardType: 'Card type *',
        selectOption: 'Select an option',
        cardNumber: 'Card number *',
        cardHolder: 'Cardholder name *',
        expiryDate: 'Expiry date *',
        cvv: 'CVV *',
        buyTrip: 'Buy trip',
        faq: 'Frequently asked questions',
        contact: 'Contact',
        documentation: 'Documentation'
    }
};

let currentLang = 'es';

// Verificación de sesión - debe ejecutarse inmediatamente al cargar la página
const currentUser = localStorage.getItem('currentUser');

if (!currentUser) {
    // Usuario no está logueado - detener toda la ejecución
    const lang = localStorage.getItem('lang') || 'es';
    const mensaje = lang === 'es' 
        ? 'Debes iniciar sesión para acceder al formulario de compra. Serás redirigido a la página de registro.'
        : 'You must log in to access the purchase form. You will be redirected to the registration page.';
    
    alert(mensaje);
    window.location.replace('registro.html');
    // Detener ejecución del script completamente
    throw new Error('Usuario no autenticado');
}

// Solo ejecutar el resto del código si el usuario está logueado
// Función para buscar el precio de una ciudad en ciudadesData
function obtenerPrecioCiudad(nombreCiudad) {
    // Verificar si ciudadesData existe
    if (typeof ciudadesData === 'undefined') {
        console.warn('ciudadesData no está cargado');
        return 500; // Precio por defecto
    }

    // Buscar en todos los continentes
    for (const continente of ciudadesData.continents) {
        for (const pais of continente.countries) {
            for (const ciudad of pais.cities) {
                if (ciudad.name.toLowerCase() === nombreCiudad.toLowerCase()) {
                    return ciudad.precio || 500;
                }
            }
        }
    }
    
    return 500; // Si no se encuentra, precio por defecto
}

// Cargar información del destino desde sessionStorage al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión nuevamente al cargar el DOM
    if (!localStorage.getItem('currentUser')) {
        const lang = localStorage.getItem('lang') || 'es';
        const mensaje = lang === 'es' 
            ? 'Debes iniciar sesión para acceder al formulario de compra. Serás redirigido a la página de registro.'
            : 'You must log in to access the purchase form. You will be redirected to the registration page.';
        alert(mensaje);
        window.location.replace('registro.html');
        return;
    }
    
    // Intentar cargar desde sessionStorage primero (cuando viene de otros_rincones.html)
    const destinoSeleccionado = sessionStorage.getItem('destinoSeleccionado');
    
    if (destinoSeleccionado) {
        const destino = JSON.parse(destinoSeleccionado);
        
        // Actualizar el nombre del destino con ciudad, país y continente
        document.getElementById('destination-name').textContent = 
            `${destino.ciudad}, ${destino.pais} - ${destino.continente}`;
        
        // Obtener el precio de ciudadesData o usar el que viene en destino
        let precioFinal = destino.precio;
        
        // Si no tiene precio o es el precio por defecto, buscar en ciudadesData
        if (!precioFinal || precioFinal === 500) {
            precioFinal = obtenerPrecioCiudad(destino.ciudad);
        }
        
        // Actualizar el precio en la página
        document.getElementById('price-per-person').textContent = 
            `${precioFinal} € / persona`;
        
        // Guardar en sessionStorage para la función de guardar reserva
        sessionStorage.setItem('destinoActual', JSON.stringify({
            nombre: `${destino.ciudad}, ${destino.pais} - ${destino.continente}`,
            precio: precioFinal,
            ciudad: destino.ciudad,
            pais: destino.pais,
            continente: destino.continente
        }));
    } else {
        // Si no hay datos en sessionStorage, intentar cargar desde URL (compatibilidad con versión anterior)
        const destinoNombre = getUrlParameter('destino');
        const precioPorPersona = getUrlParameter('precio');
        const ciudad = getUrlParameter('ciudad');
        const pais = getUrlParameter('pais');
        
        let precioFinal = precioPorPersona;
        
        // Si no hay precio en URL, buscar en ciudadesData
        if (!precioFinal && ciudad) {
            precioFinal = obtenerPrecioCiudad(ciudad);
        } else if (!precioFinal) {
            precioFinal = 500;
        }
        
        if (destinoNombre) {
            document.getElementById('destination-name').textContent = destinoNombre;
        }
        
        document.getElementById('price-per-person').textContent = `${precioFinal} € / persona`;
        
        sessionStorage.setItem('destinoActual', JSON.stringify({
            nombre: destinoNombre,
            precio: precioFinal,
            ciudad: ciudad,
            pais: pais
        }));
    }
});

// Función para obtener parámetros de la URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Cambiar idioma
if (currentUser) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.onclick = () => {
            const newLang = btn.textContent === 'ES' ? 'es' : 'en';
            changeLang(newLang);
        };
    });
}

function changeLang(newLang) {
    currentLang = newLang;
    
    // Actualizar botones
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if ((btn.textContent === 'ES' && newLang === 'es') || 
            (btn.textContent === 'EN' && newLang === 'en')) {
            btn.classList.add('active');
        }
    });
    
    const t = lang[newLang];
    
    // Actualizar textos
    document.querySelector('.logo-section h1').textContent = t.title;
    
    // No actualizar destination-name aquí porque ya tiene el valor de la ciudad
    // Solo actualizar si no hay valor
    const destinationNameElement = document.getElementById('destination-name');
    if (destinationNameElement.textContent === 'Nombre del destino' || 
        destinationNameElement.textContent === 'Destination name') {
        destinationNameElement.textContent = t.destinationName;
    }
    
    const sections = document.querySelectorAll('.section-title');
    sections[0].textContent = t.companionsTitle;
    sections[1].textContent = t.petsTitle;
    sections[2].textContent = t.intolerancesTitle;
    
    document.querySelectorAll('.radio-group label')[0].childNodes[0].textContent = t.travelWithCompanion;
    document.querySelectorAll('.radio-group label')[1].childNodes[1].textContent = ' ' + t.yes;
    document.querySelectorAll('.radio-group label')[2].childNodes[1].textContent = ' ' + t.no;
    document.querySelectorAll('.radio-group label')[3].childNodes[0].textContent = t.travelWithPet;
    document.querySelectorAll('.radio-group label')[4].childNodes[1].textContent = ' ' + t.yes;
    document.querySelectorAll('.radio-group label')[5].childNodes[1].textContent = ' ' + t.no;
    
    document.querySelectorAll('input[placeholder]')[0].placeholder = t.nameSurname;
    document.querySelectorAll('input[type="email"]')[0].placeholder = t.emailPlaceholder;
    document.querySelector('.add-btn').textContent = t.addCompanion;
    document.querySelectorAll('input[placeholder]')[2].placeholder = t.petType;
    document.querySelectorAll('input[placeholder]')[3].placeholder = t.petSize;
    document.querySelector('textarea').placeholder = t.intolerancesPlaceholder;
    
    document.querySelectorAll('.date-group label')[0].textContent = t.departureDate;
    document.querySelectorAll('.date-group label')[1].textContent = t.arrivalDate;
    
    document.querySelector('.payment-title').textContent = t.purchaseForm;
    document.querySelector('.card-type label').textContent = t.cardType;
    
    const options = document.querySelectorAll('#card-type option');
    options[0].textContent = t.selectOption;
    
    document.querySelectorAll('input[placeholder]')[4].placeholder = t.cardNumber;
    document.querySelectorAll('input[placeholder]')[5].placeholder = t.cardHolder;
    document.querySelectorAll('input[placeholder]')[6].placeholder = t.expiryDate;
    document.querySelectorAll('input[placeholder]')[7].placeholder = t.cvv;
    
    document.querySelector('.submit-btn').textContent = t.buyTrip;
    
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks[0].textContent = t.faq;
    footerLinks[1].textContent = t.contact;
    footerLinks[2].textContent = t.documentation;
}

// Modo dislexico
function toggleDyslexic() {
    document.body.classList.toggle('dyslexic');
}

// control de acompañantes
if (!currentUser) {
    // Si no hay sesión, detener ejecución
    throw new Error('Usuario no autenticado');
}

const companionRadios = document.querySelectorAll('input[name="acompanado"]');
const companionInputs = document.querySelectorAll('.section-box')[0].querySelectorAll('.form-row input');
const addCompanionBtn = document.querySelector('.add-btn');
const companionFormRow = document.querySelectorAll('.form-row')[0];

// boton "No", si se pulsa se deshabilitan el resto de campos de acompañantes
companionRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'no') {
            // Obtener TODOS los inputs de acompañantes (incluidos los añadidos dinámicamente)
            const allCompanionInputs = document.querySelectorAll('.section-box')[0].querySelectorAll('.form-row input');
            allCompanionInputs.forEach(input => {
                input.disabled = true;
                input.value = '';
            });
            addCompanionBtn.disabled = true;
        } else {
            // Obtener TODOS los inputs de acompañantes (incluidos los añadidos dinámicamente)
            const allCompanionInputs = document.querySelectorAll('.section-box')[0].querySelectorAll('.form-row input');
            allCompanionInputs.forEach(input => input.disabled = false);
            addCompanionBtn.disabled = false;
        }
    });
});

// añadir otro acompañante
addCompanionBtn.addEventListener('click', () => {
    const newRow = document.createElement('div');
    newRow.className = 'form-row';
    newRow.innerHTML = `
        <input type="text" placeholder="${lang[currentLang].nameSurname}">
        <input type="email" placeholder="${lang[currentLang].emailPlaceholder}">
    `;
    companionFormRow.parentNode.insertBefore(newRow, addCompanionBtn);
});

// control de mascotas
const petRadios = document.querySelectorAll('input[name="mascota"]');
const petInputs = document.querySelectorAll('.section-box')[1].querySelectorAll('.form-row input');

// boton "No", si se pulsa se deshabilitan el resto de campos de mascotas
petRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'no') {
            petInputs.forEach(input => {
                input.disabled = true;
                input.value = '';
            });
        } else {
            petInputs.forEach(input => input.disabled = false);
        }
    });
});

// validacion de fecha de caducidad formato (MM/YY)
const expiryInput = document.querySelectorAll('input[placeholder]')[6];
expiryInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // solo numeros
    
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
});

expiryInput.addEventListener('blur', (e) => {
    const value = e.target.value;
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    
    if (value && !regex.test(value)) {
        alert(currentLang === 'es' ? 'Formato inválido. Use MM/YY' : 'Invalid format. Use MM/YY');
    }
});

// validacion de CVV (3 dígitos)
const cvvInput = document.querySelectorAll('input[placeholder]')[7];
cvvInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3); // solo numeros y como maximo 3
});


// validacion de fechas
const departureDateInput = document.querySelectorAll('.date-input')[0];
const arrivalDateInput = document.querySelectorAll('.date-input')[1];

function validateDates() {
    const departureDate = new Date(departureDateInput.value);
    const arrivalDate = new Date(arrivalDateInput.value);
    
    if (departureDateInput.value && arrivalDateInput.value) {
        if (departureDate >= arrivalDate) {
            alert(currentLang === 'es' 
                ? 'La fecha de salida debe ser anterior a la fecha de llegada' 
                : 'Departure date must be before arrival date');
            return false;
        }
    }
}

departureDateInput.addEventListener('change', validateDates);
arrivalDateInput.addEventListener('change', validateDates);

// Función para guardar la reserva
function guardarReserva(datosReserva) {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    const emailUsuario = usuarioActual?.email || 'usuario_default';
    
    let reservas = JSON.parse(localStorage.getItem('reservas')) || {};
    
    if (!reservas[emailUsuario]) {
        reservas[emailUsuario] = [];
    }
    
    reservas[emailUsuario].push({
        id: Date.now(),
        destino: datosReserva.destino,
        ciudad: datosReserva.ciudad,
        pais: datosReserva.pais,
        continente: datosReserva.continente,
        precio: datosReserva.precio,
        fechaSalida: datosReserva.fechaSalida,
        fechaLlegada: datosReserva.fechaLlegada,
        fechaReserva: new Date().toLocaleDateString('es-ES'),
        acompanantes: datosReserva.acompanantes || 0,
        mascota: datosReserva.mascota || false
    });
    
    localStorage.setItem('reservas', JSON.stringify(reservas));
    
    return true;
}

// Manejar el envío del formulario de compra
if (currentUser) {
    document.querySelector('.submit-btn').addEventListener('click', function(e) {
    e.preventDefault();

    let errors = [];

    // ---- VALIDACIONES ----

    // Fecha salida / llegada
    if (!departureDateInput.value) errors.push("departure");
    if (!arrivalDateInput.value) errors.push("arrival");

    // Tipo de tarjeta
    if (!document.getElementById("card-type").value)
        errors.push("cardType");

    // Obtener todos los inputs del formulario de pago
    const allInputs = document.querySelectorAll('input[type="text"]');
    
    // Encontrar los inputs de la tarjeta buscando desde el final del array
    let cardInputs = [];
    for (let i = allInputs.length - 1; i >= 0; i--) {
        if (allInputs[i].placeholder && 
            (allInputs[i].placeholder.includes('CVV') || 
             allInputs[i].placeholder.includes('caducidad') || 
             allInputs[i].placeholder.includes('Expiry') ||
             allInputs[i].placeholder.includes('titular') || 
             allInputs[i].placeholder.includes('Cardholder') ||
             allInputs[i].placeholder.includes('tarjeta') || 
             allInputs[i].placeholder.includes('Card number'))) {
            cardInputs.unshift(allInputs[i]);
        }
        if (cardInputs.length === 4) break;
    }
    
    // Número tarjeta
    const cardNumberInput = cardInputs[0];
    if (!cardNumberInput || !cardNumberInput.value.trim()) {
        errors.push("cardNumber");
    } else if (isNaN(cardNumberInput.value.trim())) {
        alert(currentLang === 'es' ? 'El número de tarjeta debe contener solo números' : 'Card number must contain only numbers');
        return;
    }

    // Nombre titular
    const cardHolderInput = cardInputs[1];
    if (!cardHolderInput || !cardHolderInput.value.trim())
        errors.push("cardHolder");

    // Expiry MM/YY
    const expiryValue = cardInputs[2].value.trim();
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiryValue))
        errors.push("expiry");

    // CVV
    const cvvValue = cardInputs[3].value.trim();
    if (cvvValue.length !== 3)
        errors.push("cvv");

    // Email acompañante si viaja acompañado
    const acompChoice = document.querySelector('input[name="acompanado"]:checked');
    if (!acompChoice) {
        errors.push("acompanado");
    } else if (acompChoice.value === "si") {
        const emailsAcomp = document.querySelectorAll('.section-box')[0].querySelectorAll('input[type="email"]');
        let hayAlMenosUnEmail = false;
        emailsAcomp.forEach(email => {
            if (email.value.trim() && !email.disabled) hayAlMenosUnEmail = true;
        });
        if (!hayAlMenosUnEmail) errors.push("emailAcomp");
    }

    // Si hay errores --> Mostrar alerta y no comprar
    if (errors.length > 0) {
        console.log("Errores detectados:", errors); // Para debug xq me sale un error al añadir acompañante con los *
        alert(
            currentLang === 'es'
            ? 'Los campos marcados con * son obligatorios'
            : 'Fields marked with * are required'
        );
        return; // detener la compra
    }

    // ---- SI TODO ESTÁ CORRECTO ----
    
    const destinoActual = JSON.parse(sessionStorage.getItem('destinoActual'));
    
    if (!destinoActual) {
        alert('Error: No se encontraron datos del destino');
        return;
    }
    
    const viajaAcompanado = document.querySelector('input[name="acompanado"]:checked');
    let numAcompanantes = 0;
    if (viajaAcompanado && viajaAcompanado.value === 'si') {
        const nombresAcompanantes = document.querySelectorAll('input[placeholder*="Nombre, apellido"]');
        nombresAcompanantes.forEach(input => {
            if (input.value.trim()) numAcompanantes++;
        });
    }
    
    const viajaMascota = document.querySelector('input[name="mascota"]:checked');
    const conMascota = viajaMascota && viajaMascota.value === 'si';
    
    const datosReserva = {
        destino: destinoActual.nombre,
        ciudad: destinoActual.ciudad,
        pais: destinoActual.pais,
        continente: destinoActual.continente || '',
        precio: destinoActual.precio,
        fechaSalida: departureDateInput.value,
        fechaLlegada: arrivalDateInput.value,
        acompanantes: numAcompanantes,
        mascota: conMascota
    };
    
    guardarReserva(datosReserva);

    alert(
        currentLang === 'es'
        ? 'Compra realizada con éxito'
        : 'Purchase completed successfully'
    );

    window.location.href = "home_log.html";
    });
}