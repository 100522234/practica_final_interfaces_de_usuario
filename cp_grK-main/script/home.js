// Traducciones
const lang = {
    es: {
        welcome: '¡Bienvenido!',
        welcomeLogged: '¡Has iniciado sesión!',
        forum: 'Foro',
        corners: 'Otros rincones',
        experiences: 'Experiencias más económicas',
        login: 'Iniciar sesión',
        register: 'Registro',
        profile: 'Mi perfil',
        myProfile: 'Mi perfil',
        logout: 'Cerrar sesión',
        experiencesTitle: 'Experiencias más económicas',
        readExperiences: 'Leer experiencias',
        share: 'Compartir',
        othersCorners: 'Otros Rincones',
        forumTopics: 'Temas de nuestro foro',
        seeMore: 'Ver más',
        faq: 'Preguntas frecuentes',
        contact: 'Contacto',
        documentation: 'Documentación',
        logoutConfirm: '¿Estás seguro de que quieres cerrar sesión?',
        yes: 'Sí',
        no: 'No',
        modalShareTitle: 'Nuevo mensaje',
        modalFrom: 'De:',
        modalTo: 'Para:',
        modalToPlaceholder: 'destinatario@email.com',
        modalSubject: 'Asunto:',
        modalMessage: 'Mensaje:',
        modalMessagePlaceholder: 'Escribe tu mensaje aquí...',
        modalSend: 'Enviar',
        shareSubject: 'Te comparto',
        alertLogin: 'Para compartir una experiencia, tienes que iniciar sesión o registrarte',
        alertEmail: 'Por favor, introduce un email',
        alertValidEmail: 'Por favor, introduce un email válido',
        alertMessage: 'Por favor, escribe un mensaje',
        alertSuccess: '¡Correo enviado con éxito!'
    },
    en: {
        welcome: 'Welcome!',
        welcomeLogged: 'You have logged in!',
        forum: 'Forum',
        corners: 'Other corners',
        experiences: 'Most economical experiences',
        login: 'Log in',
        register: 'Sign up',
        profile: 'My profile',
        myProfile: 'My profile', 
        logout: 'Log out',
        experiencesTitle: 'Most economical experiences',
        readExperiences: 'Read experiences',
        share: 'Share',
        othersCorners: 'Other Corners',
        forumTopics: 'Our forum topics',
        seeMore: 'See more',
        faq: 'FAQ',
        contact: 'Contact',
        documentation: 'Documentation',
        logoutConfirm: 'Are you sure you want to log out?',
        yes: 'Yes',
        no: 'No',
        modalShareTitle: 'New message',
        modalFrom: 'From:',
        modalTo: 'To:',
        modalToPlaceholder: 'addressee@email.com',
        modalSubject: 'Affair:',
        modalMessage: 'Message:',
        modalMessagePlaceholder: 'Write your message here...',
        modalSend: 'Send',
        shareSubject: 'I share with you',
        alertLogin: 'To share an experience, you need to log in or register',
        alertEmail: 'Please enter an email address',
        alertValidEmail: 'Please enter a valid email address',
        alertMessage: 'Please write a message',
        alertSuccess: 'Email sent successfully!'
    }
};

let currentLang = localStorage.getItem('lang') || 'es';
let dyslexicMode = localStorage.getItem('dyslexic') === 'true';

// Guardar la última versión de home visitada en esta pestaña para retornos fiables
try {
    const lastHome = document.body.classList.contains('pagina-perfil')
        ? 'home_log.html'
        : 'home.html';
    sessionStorage.setItem('lastHomePage', lastHome);
} catch (err) {
    console.warn('No se pudo acceder a sessionStorage', err);
}

// Llamar a la función al cargar la página
renderActiveForumPosts();
renderForumTopics();

// Cambiar idioma
document.getElementById('lang-es').onclick = () => changeLang('es');
document.getElementById('lang-en').onclick = () => changeLang('en');

// Modo disléxico
document.getElementById('dyslexic-btn').onclick = () => {
    dyslexicMode = !dyslexicMode;
    localStorage.setItem('dyslexic', dyslexicMode);
    
    if (dyslexicMode) {
        document.body.classList.add('dyslexic');
        document.getElementById('dyslexic-btn').classList.add('active');
    } else {
        document.body.classList.remove('dyslexic');
        document.getElementById('dyslexic-btn').classList.remove('active');
    }
};

// Inicializar modo disléxico
if (dyslexicMode) {
    document.body.classList.add('dyslexic');
    document.getElementById('dyslexic-btn').classList.add('active');
}

function changeLang(newLang) {
    currentLang = newLang;
    localStorage.setItem('lang', newLang);

    // Actualizar botones de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.id !== 'dyslexic-btn') btn.classList.remove('active');
    });
    const activeLangBtn = document.getElementById('lang-' + newLang);
    if (activeLangBtn) activeLangBtn.classList.add('active');

    // Eslogan (bienvenida)
    const eslogan = document.querySelector('.eslogan');
    if (eslogan) {
        if (document.body.classList.contains('pagina-perfil')) {
            eslogan.textContent = lang[newLang].welcomeLogged;
        } else {
            eslogan.textContent = lang[newLang].welcome;
        }
    }

    // Enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks[0]) navLinks[0].textContent = lang[newLang].forum;
    if (navLinks[1]) navLinks[1].textContent = lang[newLang].corners;
    if (navLinks[2]) navLinks[2].textContent = lang[newLang].myProfile;

    // Botones de login/registro/perfil/logout
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const profileBtn = document.getElementById('profileBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginBtn) loginBtn.textContent = lang[newLang].login;
    if (registerBtn) registerBtn.textContent = lang[newLang].register;
    if (profileBtn) profileBtn.textContent = lang[newLang].profile;
    if (logoutBtn) logoutBtn.textContent = lang[newLang].logout;

    // Sección de experiencias
    const expTitle = document.querySelector('.seccion-experiencias h2');
    if (expTitle) expTitle.textContent = lang[newLang].experiencesTitle;

    // Sidebar
    const sidebarSections = document.querySelectorAll('.sidebar-section h3');
    if (sidebarSections[0]) sidebarSections[0].textContent = lang[newLang].othersCorners;
    if (sidebarSections[1]) sidebarSections[1].textContent = lang[newLang].forumTopics;

    const sidebarBtns = document.querySelectorAll('.sidebar-btn');
    sidebarBtns.forEach(btn => {
        btn.textContent = lang[newLang].seeMore;
    });

    // Footer
    const footerLinks = document.querySelectorAll('.footer-links a');
    if (footerLinks[0]) footerLinks[0].textContent = lang[newLang].faq;
    if (footerLinks[1]) footerLinks[1].textContent = lang[newLang].contact;
    if (footerLinks[2]) footerLinks[2].textContent = lang[newLang].documentation;

    // Botones de compartir
    document.querySelectorAll('.compartir-btn').forEach(btn => {
        btn.textContent = lang[newLang].share;
    });

    // --- Modal de compartir (solo si existe) ---
    const modalCompartir = document.getElementById('modalCompartir');
    if (modalCompartir) {
        document.querySelector('.modal-compartir-header h3').textContent = lang[newLang].modalShareTitle;
        document.querySelector('label[for="emailEmisor"]').textContent = lang[newLang].modalFrom;
        document.querySelector('label[for="emailDestinatario"]').textContent = lang[newLang].modalTo;
        document.getElementById('emailDestinatario').placeholder = lang[newLang].modalToPlaceholder;
        document.querySelector('label[for="emailAsunto"]').textContent = lang[newLang].modalSubject;
        document.querySelector('label[for="emailMensaje"]').textContent = lang[newLang].modalMessage;
        document.getElementById('emailMensaje').placeholder = lang[newLang].modalMessagePlaceholder;
        document.querySelector('.enviar-btn').textContent = lang[newLang].modalSend;
    }
}

// Inicializar idioma
changeLang(currentLang);
renderForumTopics();

// Función para mostrar ventana emergente
function showLogoutModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'modal-content';
    
    const message = document.createElement('p');
    message.className = 'modal-message';
    message.textContent = lang[currentLang].logoutConfirm;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'modal-buttons';
    
    const yesButton = document.createElement('button');
    yesButton.className = 'modal-btn modal-btn-yes';
    yesButton.textContent = lang[currentLang].yes;
    yesButton.onclick = () => {
        // Eliminar la sesión del usuario
        localStorage.removeItem('currentUser');
        document.body.removeChild(overlay);
        window.location.href = 'home.html';
    };
    
    const noButton = document.createElement('button');
    noButton.className = 'modal-btn modal-btn-no';
    noButton.textContent = lang[currentLang].no;
    noButton.onclick = () => {
        document.body.removeChild(overlay);
    };
    
    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
    modal.appendChild(message);
    modal.appendChild(buttonContainer);
    overlay.appendChild(modal);
    
    document.body.appendChild(overlay);
    
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    };
}

// Botones para home.html (sin sesión)
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');

if (loginBtn) {
    loginBtn.onclick = () => window.location.href = 'login.html';
}

if (registerBtn) {
    registerBtn.onclick = () => window.location.href = 'registro.html';
}

// Botones para home_log.html (con sesión)
const profileBtn = document.getElementById('profileBtn');
const logoutBtn = document.getElementById('logoutBtn');

if (profileBtn) {
    profileBtn.onclick = () => window.location.href = 'perfil.html';
}

if (logoutBtn) {
    logoutBtn.onclick = () => showLogoutModal();
}

// Función para abrir el modal de compartir
function abrirModalCompartir(experienciaId, event) {
    event.stopPropagation();
    
    // Obtener la tarjeta de experiencia por su posición
    const tarjetas = document.querySelectorAll('.experiencia-tarjeta');
    const tarjeta = tarjetas[experienciaId - 1];
    
    if (!tarjeta) return;

    // Obtener datos directamente del HTML
    const imagen = tarjeta.querySelector('img').src;
    const titulo = tarjeta.querySelector('h4').textContent;

    // Obtener email del usuario logueado
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const emailUsuario = currentUser ? currentUser.email : '';

    // Rellenar el modal
    document.getElementById('emailEmisor').value = emailUsuario;
    document.getElementById('emailAsunto').value = `${lang[currentLang].shareSubject} "${titulo}"`;
    document.getElementById('previewImagen').src = imagen;
    document.getElementById('emailDestinatario').value = '';
    document.getElementById('emailMensaje').value = '';
    
    // Mostrar el modal
    document.getElementById('modalCompartir').style.display = 'flex';
}

// Función para cerrar el modal
function cerrarModalCompartir() {
    document.getElementById('modalCompartir').style.display = 'none';
}

// Función para cuando intentan compartir sin login
function compartirSinLogin(event) {
    event.stopPropagation();
    alert(lang[currentLang].alertLogin);
}

// Función para enviar el correo para compartir una experiencia
function enviarCorreo() {
    const destinatario = document.getElementById('emailDestinatario').value;
    const mensaje = document.getElementById('emailMensaje').value;
    
    if (!destinatario) {
        alert(lang[currentLang].alertEmail);
        return;
    }

    if (!destinatario.includes('@') || !destinatario.includes('.')) {
        alert(lang[currentLang].alertValidEmail);
        return; 
    }

    if (!mensaje.trim()) {
        alert(lang[currentLang].alertMessage);
        return;
    }

    // Simular envío
    cerrarModalCompartir();
    alert(lang[currentLang].alertSuccess);
}

// Claves de localStorage compartidas con foro.js
function loadForumCommentsHome() {
    try {
        return JSON.parse(localStorage.getItem("forumComments")) || [];
    } catch {
        return [];
    }
}

function loadForumPostsHome() {
    try {
        return JSON.parse(localStorage.getItem("forumPosts")) || [];
    } catch {
        return [];
    }
}

function renderForumTopics() {
    const container = document.getElementById('forumTopics');
    if (!container) return;

    container.innerHTML = '';

    // Usamos tus funciones existentes
    const posts = loadForumPostsHome();
    const comments = loadForumCommentsHome();

    // Si no hay posts aún, mostramos un mensaje
    if (!posts || posts.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'forum-topic';
        empty.textContent = (currentLang === 'es')
            ? 'Todavía no hay posts en el foro.'
            : 'There are no posts in the forum yet.';
        container.appendChild(empty);
        return;
    }

    // Calculamos nº de comentarios por post
    const postsWithCounts = posts.map(post => {
        const count = comments.filter(c => c.postId === post.id).length;
        return {
            ...post,
            commentsCount: count
        };
    });

    // Orden: primero por nº de comentarios (desc), luego por fecha (más nuevo primero)
    postsWithCounts.sort((a, b) => {
        if (b.commentsCount !== a.commentsCount) {
            return b.commentsCount - a.commentsCount;
        }
        const aDate = a.createdAt || 0;
        const bDate = b.createdAt || 0;
        return bDate - aDate;
    });

    // Nos quedamos con los 7 primeros
    const top7 = postsWithCounts.slice(0, 7);

    top7.forEach(post => {
        const forumTopic = document.createElement('div');
        forumTopic.className = 'forum-topic';

        const iconSpan = document.createElement('span');
        iconSpan.className = 'topic-icon';
        iconSpan.textContent = '💬';

        const textSpan = document.createElement('span');
        textSpan.className = 'topic-text';

        // Intentamos coger el título en el idioma actual
        let titleText = '';
        if (post.title) {
            if (post.title[currentLang]) {
                titleText = post.title[currentLang];
            } else if (post.title.es) {
                titleText = post.title.es;
            } else if (post.title.en) {
                titleText = post.title.en;
            } else {
                titleText = String(post.title);
            }
        } else {
            titleText = (currentLang === 'es')
                ? 'Post sin título'
                : 'Untitled post';
        }

        textSpan.textContent = titleText;

        forumTopic.appendChild(iconSpan);
        forumTopic.appendChild(textSpan);

        container.appendChild(forumTopic);
    });
}


function renderActiveForumPosts() {
    const list = document.getElementById("forum-active-list");
    if (!list) return;

    const posts = loadForumPostsHome();
    const comments = loadForumCommentsHome();

    list.innerHTML = "";

    if (posts.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Todavía no hay posts en el foro.";
        list.appendChild(li);
        return;
    }

    // Contar comentarios por post
    const counts = {};
    comments.forEach(c => {
        if (!counts[c.postId]) counts[c.postId] = 0;
        counts[c.postId] += 1;
    });

    // Emparejar con los posts
    const postsWithCounts = posts.map(p => ({
        id: p.id,
        title: p.title?.es || p.title?.en || "Post",
        count: counts[p.id] || 0
    }));

    // Ordenar por nº de comentarios descendente
    postsWithCounts.sort((a, b) => b.count - a.count);

    const top = postsWithCounts.slice(0, 3); // top 3

    if (top.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Todavía no hay actividad en el foro.";
        list.appendChild(li);
        return;
    }

    top.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="foro_log.html">${item.title}</a> (${item.count} comentarios)`;
        list.appendChild(li);
    });
}
