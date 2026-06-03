// Convertir los datos del JSON (ciudadesData) a un formato plano para facilitar el filtrado
// ciudadesData viene del archivo ciudades-data.js que se carga antes

function procesarDatosJSON() {
    const ciudadesArray = [];
    
    ciudadesData.continents.forEach(continente => {
        continente.countries.forEach(pais => {
            pais.cities.forEach(ciudad => {
                ciudadesArray.push({
                    ciudad: ciudad.name,
                    pais: pais.name,
                    continente: continente.name,
                    descripcion: ciudad.description,
                    imagen: ciudad.image.url,
                    alt: ciudad.image.alt
                });
            });
        });
    });
    
    return ciudadesArray;
}

// Procesar los datos del JSON
const ciudades = procesarDatosJSON();

const lang = {
    es: {
        title: "Lista de ciudades",
        filterPais: "Filtrar por países",
        filterContinente: "Filtrar por continentes",
        details: "Detalles",
        faq: "Preguntas frecuentes",
        contact: "Contacto",
        documentation: "Documentación",
        back: "Volver",
        country: "País",
        continent: "Continente",
        buyTrip: "Comprar viaje",
        brandTagline: "¡Compra tu viaje!",
        sectionLabel: "Otros rincones"
    },
    en: {
        title: "City list",
        filterPais: "Filter by countries",
        filterContinente: "Filter by continents",
        details: "Details",
        faq: "FAQ",
        contact: "Contact",
        documentation: "Documentation",
        back: "Back",
        country: "Country",
        continent: "Continent",
        buyTrip: "Buy trip",
        brandTagline: "Buy your trip!",
        sectionLabel: "Other corners"
    }
};

let currentLang = localStorage.getItem('lang') || 'es';
let dyslexicMode = localStorage.getItem('dyslexic') === 'true';

const filterPais = document.getElementById('filter-pais');
const filterContinente = document.getElementById('filter-continente');
const citiesList = document.getElementById('cities-list');
const welcomeMessage = document.getElementById('welcome-message');
const backLink = document.querySelector('.back-link');

// Elementos del modal
const modal = document.getElementById('city-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalCountry = document.getElementById('modal-country');
const modalDescription = document.getElementById('modal-description');
const modalClose = document.querySelector('.modal-close');

// Determinar a qué home volver
function obtenerHomeDeRetorno() {
    try {
        const stored = sessionStorage.getItem('lastHomePage');
        if (stored === 'home.html' || stored === 'home_log.html') {
            return stored;
        }
    } catch (err) {
        console.warn('No se pudo leer sessionStorage', err);
    }
    return localStorage.getItem('currentUser') ? 'home_log.html' : 'home.html';
}

const homeDeRetorno = obtenerHomeDeRetorno();

if (backLink) {
    backLink.href = homeDeRetorno;
    backLink.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = homeDeRetorno;
    });
}

// Inicializar filtros
function initFilters() {
    const paises = [...new Set(ciudades.map(c => c.pais))].sort();
    const continentes = [...new Set(ciudades.map(c => c.continente))].sort();
    
    filterPais.innerHTML = `<option value="">${lang[currentLang].filterPais}</option>`;
    paises.forEach(p => filterPais.innerHTML += `<option value="${p}">${p}</option>`);
    
    filterContinente.innerHTML = `<option value="">${lang[currentLang].filterContinente}</option>`;
    continentes.forEach(c => filterContinente.innerHTML += `<option value="${c}">${c}</option>`);
}

// Renderizar ciudades
function renderCities() {
    const paisSeleccionado = filterPais.value;
    const continenteSeleccionado = filterContinente.value;
    
    let filtradas = ciudades;
    
    if (continenteSeleccionado) {
        filtradas = filtradas.filter(c => c.continente === continenteSeleccionado);
    }
    if (paisSeleccionado) {
        filtradas = filtradas.filter(c => c.pais === paisSeleccionado);
    }
    
    citiesList.innerHTML = filtradas.map((c, index) => `
        <div class="city-row">
            <span>${c.ciudad}</span>
            <span>${c.pais}</span>
            <span>${c.continente}</span>
            <button class="details-btn" data-index="${ciudades.indexOf(c)}">${lang[currentLang].details}</button>
        </div>
    `).join('');
    
    // Añadir event listeners a los botones de detalles
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            openModal(ciudades[index]);
        });
    });
}

// Abrir modal con detalles de la ciudad
function openModal(ciudad) {
    modalImage.src = ciudad.imagen;
    modalImage.alt = ciudad.alt;
    modalTitle.textContent = ciudad.ciudad;
    // ----- SISTEMA DE VALORACIÓN -----

// Contenedor para estrellas (si no existe lo crea)
let ratingContainer = document.getElementById("modal-rating");
if (!ratingContainer) {
    ratingContainer = document.createElement("div");
    ratingContainer.id = "modal-rating";
    ratingContainer.style.cssText = `
        position:absolute;
        right: 20px;
        top: 20px;
        font-size: 26px;
        cursor:pointer;
    `;
    document.querySelector(".modal-content").appendChild(ratingContainer);
}

// Cargar valor anterior (si existe)
const usuario = JSON.parse(localStorage.getItem("currentUser"))?.email || "anon";
const valoraciones = JSON.parse(localStorage.getItem("valoraciones")) || {};
const claveCiudad = ciudad.ciudad;
const puntuacionActual = valoraciones[usuario]?.[claveCiudad] || 0;

// Dibujar estrellas
function renderStars(puntos) {
    ratingContainer.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
        ratingContainer.innerHTML += i <= puntos ? "★" : "☆";
    }
}

// Guardar valoración
ratingContainer.onclick = (e) => {
    const x = e.offsetX;
    const starWidth = ratingContainer.offsetWidth / 5;
    const nuevaPuntuacion = Math.ceil(x / starWidth);

    if (!valoraciones[usuario]) valoraciones[usuario] = {};
    valoraciones[usuario][claveCiudad] = nuevaPuntuacion;

    localStorage.setItem("valoraciones", JSON.stringify(valoraciones));

    renderStars(nuevaPuntuacion);
};

renderStars(puntuacionActual);


    modalCountry.textContent = `${ciudad.pais} - ${ciudad.continente}`;
    modalDescription.textContent = ciudad.descripcion;
    
    // Verificar si ya existe el botón de compra, si no, crearlo
    let buyButton = document.getElementById('modal-buy-btn');
    if (!buyButton) {
        buyButton = document.createElement('button');
        buyButton.id = 'modal-buy-btn';
        buyButton.className = 'modal-buy-btn';
        document.querySelector('.modal-content').appendChild(buyButton);
    }
    
    // Actualizar texto del botón según idioma
    buyButton.textContent = lang[currentLang].buyTrip;
    
    // Añadir evento al botón de compra
    buyButton.onclick = () => {
        // Guardar datos de la ciudad en sessionStorage
        sessionStorage.setItem('destinoSeleccionado', JSON.stringify({
            ciudad: ciudad.ciudad,
            pais: ciudad.pais,
            continente: ciudad.continente,
            precio: 500 // Precio por defecto, puedes modificarlo según tus necesidades
        }));
        
        // Redirigir a la página de compra
        window.location.href = 'compra.html';
    };
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
}

// Cerrar modal
function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restaurar scroll
}

// Event listeners del modal
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// Actualizar opciones de país según continente
filterContinente.onchange = () => {
    const cont = filterContinente.value;
    const paisesDelContinente = cont 
        ? [...new Set(ciudades.filter(c => c.continente === cont).map(c => c.pais))].sort()
        : [...new Set(ciudades.map(c => c.pais))].sort();
    
    filterPais.innerHTML = `<option value="">${lang[currentLang].filterPais}</option>`;
    paisesDelContinente.forEach(p => filterPais.innerHTML += `<option value="${p}">${p}</option>`);
    
    renderCities();
};

filterPais.onchange = renderCities;

// Cambiar idioma
document.getElementById('lang-es').onclick = () => changeLang('es');
document.getElementById('lang-en').onclick = () => changeLang('en');

function changeLang(newLang) {
    currentLang = newLang;
    localStorage.setItem('lang', newLang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('lang-' + newLang).classList.add('active');
    
    document.getElementById('list-title').textContent = lang[newLang].title;
    
    if (welcomeMessage) {
        welcomeMessage.textContent = lang[newLang].brandTagline;
    }
    if (backLink) {
        backLink.textContent = lang[newLang].back;
    }
    
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks[0].textContent = lang[newLang].faq;
    footerLinks[1].textContent = lang[newLang].contact;
    footerLinks[2].textContent = lang[newLang].documentation;
    
    initFilters();
    renderCities();
}

// Modo disléxico (botón OO)
const colorblindBtn = document.getElementById('colorblind-btn');

function toggleColorblind() {
    if (colorblindBtn) colorblindBtn.click();
}

if (colorblindBtn) {
    colorblindBtn.onclick = () => {
        dyslexicMode = !dyslexicMode;
        localStorage.setItem('dyslexic', dyslexicMode);
        document.body.classList.toggle('dyslexic', dyslexicMode);
        colorblindBtn.classList.toggle('active', dyslexicMode);
    };
}

// Inicializar
if (dyslexicMode) {
    document.body.classList.add('dyslexic');
    if (colorblindBtn) colorblindBtn.classList.add('active');
}

changeLang(currentLang);

// Actualizar el enlace del logo (texto "VIAJA LIBRE") para que vaya a la página correcta
const homeLink = document.getElementById('home-link');
if (homeLink) {
    homeLink.href = homeDeRetorno;
    homeLink.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = homeDeRetorno;
    });
}

// Actualizar el enlace del botón VL (logo circular) para que vaya a la página correcta
const logoVlLink = document.getElementById('logo-vl-link');
if (logoVlLink) {
    logoVlLink.href = homeDeRetorno;
    logoVlLink.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = homeDeRetorno;
    });
}