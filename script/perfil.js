const lang = {
    es: {
        welcome: '¡Bienvenido',
        userData: 'Datos usuario',
        myReservations: 'Mis reservas',
        myRatings: 'Experiencias que has valorado',
        firstName: 'Nombre:',
        lastName: 'Apellidos:',
        email: 'Dirección de correo:',
        back: 'Volver',
        faq: 'Preguntas frecuentes',
        contact: 'Contacto',
        documentation: 'Documentación',
        noReservations: 'No tienes reservas aún',
        noRatings: 'Todavía no has valorado ninguna experiencia.',
        cancelReservation: 'CANCELAR RESERVA',
        confirmCancel: '¿Estás seguro de que quieres cancelar esta reserva?',
        cancelSuccess: 'Reserva cancelada con éxito'
    },
    en: {
        welcome: 'Welcome',
        userData: 'User data',
        myReservations: 'My reservations',
        myRatings: 'Experiences you have rated',
        firstName: 'First name:',
        lastName: 'Last name:',
        email: 'Email address:',
        back: 'Back',
        faq: 'FAQ',
        contact: 'Contact',
        documentation: 'Documentation',
        noReservations: 'You have no reservations yet',
        noRatings: 'You have not rated any experience yet.',
        cancelReservation: 'CANCEL RESERVATION',
        confirmCancel: 'Are you sure you want to cancel this reservation?',
        cancelSuccess: 'Reservation cancelled successfully'
    }
};

let currentLang = localStorage.getItem('lang') || 'es';
let dyslexicMode = localStorage.getItem('dyslexic') === 'true';

function splitFullName(fullName) {
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) {
        return { firstName: parts[0], lastName: '' };
    }
    return {
        firstName: parts[0],
        lastName: parts.slice(1).join(' ')
    };
}

function loadUserData() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        alert('No hay sesión activa');
        window.location.href = 'home.html';
        return;
    }
    
    const user = JSON.parse(currentUser);
    const { firstName, lastName } = splitFullName(user.fullName);
    
    document.getElementById('welcome-message').textContent = `${lang[currentLang].welcome} ${firstName}!`;
    document.getElementById('user-firstname').textContent = firstName || '_____________';
    document.getElementById('user-lastname').textContent = lastName || '_____________';
    document.getElementById('user-email').textContent = user.email || '_____________';
}

// Cambiar idioma
document.getElementById('lang-es').onclick = () => changeLang('es');
document.getElementById('lang-en').onclick = () => changeLang('en');

// Modo disléctico
document.getElementById('colorblind-btn').onclick = () => {
    dyslexicMode = !dyslexicMode;
    localStorage.setItem('dyslexic', dyslexicMode);
    
    if (dyslexicMode) {
        document.body.classList.add('dyslexic');
        document.getElementById('colorblind-btn').classList.add('active');
    } else {
        document.body.classList.remove('dyslexic');
        document.getElementById('colorblind-btn').classList.remove('active');
    }
};

// Inicializar modo disléxico
if (dyslexicMode) {
    document.body.classList.add('dyslexic');
    document.getElementById('colorblind-btn').classList.add('active');
}

function changeLang(newLang) {
    currentLang = newLang;
    localStorage.setItem('lang', newLang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('lang-' + newLang).classList.add('active');
    
    const t = lang[newLang];
    
    document.querySelector('.back-link').textContent = t.back;
    document.querySelectorAll('h2')[0].textContent = t.userData;
    document.querySelectorAll('h2')[1].textContent = t.myReservations;
    
    if (document.querySelectorAll('h2')[2]) {
        document.querySelectorAll('h2')[2].textContent = t.myRatings;
    }
    
    document.querySelectorAll('.campo span')[0].textContent = t.firstName;
    document.querySelectorAll('.campo span')[2].textContent = t.lastName;
    document.querySelectorAll('.campo span')[4].textContent = t.email;
    
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks[0].textContent = t.faq;
    footerLinks[1].textContent = t.contact;
    footerLinks[2].textContent = t.documentation;
    
    loadUserData();
    cargarReservas();
    cargarValoraciones();
}

function cargarDatosUsuario() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    
    if (usuarioActual) {
        const welcomeMessage = document.getElementById('welcome-message');
        if (welcomeMessage) {
            welcomeMessage.textContent = `${lang[currentLang].welcome}, ${usuarioActual.nombre}!`;
        }
        
        document.getElementById('user-firstname').textContent = usuarioActual.nombre || '_____________';
        document.getElementById('user-lastname').textContent = usuarioActual.apellidos || '_____________';
        document.getElementById('user-email').textContent = usuarioActual.email || '_____________';
    }
}

function cargarReservas() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    const emailUsuario = usuarioActual?.email || 'usuario_default';
    
    const todasLasReservas = JSON.parse(localStorage.getItem('reservas')) || {};
    const reservasUsuario = todasLasReservas[emailUsuario] || [];
    const seccionReservas = document.querySelector('.seccion-reservas');
    
    const reservasAnteriores = seccionReservas.querySelectorAll('.reserva');
    reservasAnteriores.forEach(reserva => reserva.remove());
    
    if (reservasUsuario.length === 0) {
        const divVacio = document.createElement('div');
        divVacio.className = 'reserva';
        divVacio.textContent = lang[currentLang].noReservations;
        divVacio.style.fontStyle = 'italic';
        divVacio.style.color = '#888';
        seccionReservas.appendChild(divVacio);
    } else {
        reservasUsuario.sort((a, b) => b.id - a.id);
        
        reservasUsuario.forEach((reserva, index) => {
            const divReserva = document.createElement('div');
            divReserva.className = 'reserva';
            
            let textoReserva = `${index + 1}. ${reserva.ciudad} (${formatearFecha(reserva.fechaSalida)} - ${formatearFecha(reserva.fechaLlegada)})`;
            
            divReserva.textContent = textoReserva;
            
            const btnEliminar = document.createElement('button');
            btnEliminar.textContent = lang[currentLang].cancelReservation;
            btnEliminar.className = 'btn-eliminar-reserva';
            btnEliminar.style.cssText = 'margin-left: 10px; color: #990000; border: none; background: none; cursor: pointer; font-size: 1.2em; font-weight: bold;';
            btnEliminar.onclick = function() {
                eliminarReserva(reserva.id);
            };
            
            divReserva.appendChild(btnEliminar);
            seccionReservas.appendChild(divReserva);
        });
    }
}

function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO + 'T00:00:00');
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
}

function eliminarReserva(idReserva) {
    if (!confirm(lang[currentLang].confirmCancel)) {
        return;
    }
    
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    const emailUsuario = usuarioActual?.email || 'usuario_default';
    const todasLasReservas = JSON.parse(localStorage.getItem('reservas')) || {};
    
    if (todasLasReservas[emailUsuario]) {
        todasLasReservas[emailUsuario] = todasLasReservas[emailUsuario].filter(
            reserva => reserva.id !== idReserva
        );
        
        localStorage.setItem('reservas', JSON.stringify(todasLasReservas));
        cargarReservas();
        alert(lang[currentLang].cancelSuccess);
    }
}

/* ======== SISTEMA DE VALORACIONES ======== */

function cargarValoraciones() {
    const usuario = JSON.parse(localStorage.getItem('currentUser'))?.email || "anon";
    const valoraciones = JSON.parse(localStorage.getItem("valoraciones")) || {};
    const cont = document.getElementById("lista-valoraciones");

    if (!cont) return;

    cont.innerHTML = "";

    if (!valoraciones[usuario] || Object.keys(valoraciones[usuario]).length === 0) {
        cont.innerHTML = `<p style='color:#3F51B5; font-style:italic;'>${lang[currentLang].noRatings}</p>`;
        return;
    }

    for (const ciudad in valoraciones[usuario]) {
        const puntos = valoraciones[usuario][ciudad];
        const estrellas = "★".repeat(puntos) + "☆".repeat(5 - puntos);

        const div = document.createElement("div");
        div.className = "valoracion-item";
        div.innerHTML = `<strong>${ciudad}</strong> – <span style="color:#3F51B5;font-size:20px;">${estrellas}</span>`;
        cont.appendChild(div);
    }
}

// Inicializar al cargar
window.onload = () => {
    changeLang(currentLang);
    loadUserData();
    cargarReservas();
    cargarValoraciones();
};

document.addEventListener('DOMContentLoaded', function() {
    cargarDatosUsuario();
    cargarReservas();
    cargarValoraciones();
});