//Claves de almacenamiento local
const STORAGE_KEYS = {
    POSTS: "forumPosts",
    COMMENTS: "forumComments",
    NOTIFICATIONS: "forumNotifications",
    USER: "currentUser",
    LANG: "lang",
    DYSLEXIC: "dyslexic"
};

//Estado global
let currentLang = localStorage.getItem(STORAGE_KEYS.LANG) || 'es';
let dyslexicMode = localStorage.getItem(STORAGE_KEYS.DYSLEXIC) === 'true';
const IS_LOGGED_IN = document.body.classList.contains('forum-logged');

// Traducciones
const lang = {
    es: {
        slogan: 'Comparte tus viajes',
        navHome: 'Home',
        navForum: 'Foro',
        navOther: 'Otros rincones',
        navExperiences: 'Experiencias',

        forumTitle: 'Foro / Comunidad',
        forumSubtitle: 'Explora dudas, recomendaciones y experiencias de otros viajeros.',
        forumWelcome: '¡Bienvenido al foro, viajero!',

        noticeNotLogged: 'Parece que no te has registrado. Para poder participar en la comunidad, inicia sesión o regístrate.',
        noticeLogged: 'Estás conectado. Explora lo que otros viajeros han compartido.',

        noticeLoginBtn: 'Iniciar sesión',
        noticeRegisterBtn: 'Registrarse',

        searchPlaceholder: 'Buscar',

        filterAll: 'Todos',
        filterDestinations: 'Destinos',
        filterTips: 'Consejos',
        filterBuddy: 'Compañero',
        filterGear: 'Equipamiento',

        postsTitle: 'Posts',

        footerFaq: 'Preguntas frecuentes',
        footerContact: 'Contacto',
        footerDocs: 'Documentación',

        category_destinations: 'Destinos',
        category_tips: 'Consejos',
        category_buddy: 'Compañero de viaje',
        category_gear: 'Equipamiento',

        noResults: 'No se han encontrado posts con esos filtros.',

        postAddComment: 'Añadir comentario',
        postContact: 'Contactar',

        alertComment: 'Aquí podrías añadir un comentario a este post.',
        alertContact: 'Aquí podrías contactar con la persona que ha publicado este post.',
        alertNewPost: 'Aquí podrías crear un nuevo post en el foro.',
        alertNotifications: 'Aquí aparecerían tus notificaciones del foro.',

        newPostTitle: 'Nuevo post',
        newPostFieldTitle: 'Título',
        newPostFieldBody: 'Contenido / resumen',
        newPostFieldCategory: 'Categoría',
        newPostOptionDestinations: 'Destinos',
        newPostOptionTips: 'Consejos',
        newPostOptionBuddy: 'Compañero',
        newPostOptionGear: 'Equipamiento',
        newPostAnonymousLabel: 'Publicar como anónimo',
        newPostSubmit: 'Publicar',
        newPostCloseLabel: 'Cerrar ventana de nuevo post',

        commentsDefaultTitle: 'Comentarios',
        commentsEmpty: 'Todavía no hay comentarios en este post.',
        commentPrompt: 'Escribe tu comentario:',
        commentModalTitle: 'Nuevo comentario',
        commentFieldLabel: 'Comentario',
        commentAnonymousLabel: 'Comentar como anónimo',
        commentSubmit: 'Publicar comentario',
        commentCloseLabel: 'Cerrar ventana de comentario',

        deletePostLabel: 'Eliminar post',
        deletePostConfirm: '¿Seguro que quieres borrar este post? Se eliminarán también sus comentarios.',

        contactModalTitle: 'Contactar con el autor',
        contactMsgLabel: 'Mensaje de invitación',
        contactModalSubtitle: 'Envía un mensaje para solicitar el correo de contacto.',
        contactMsgPlaceholder: 'Hola, me gustaría saber más sobre tu viaje...',
        contactSubmit: 'Enviar solicitud',

        notifyTitle: 'Notificaciones',
        notifyEmpty: 'No tienes notificaciones',
        notifyRequestMsg: 'quiere contactar contigo por el post',
        notifyAcceptMsg: 'ha aceptado tu solicitud. Su correo es:',
        btnAccept: 'Aceptar y enviar mi correo',
        btnReject: 'Rechazar',

        alertRequestSent: 'Solicitud de contacto enviada correctamente'
    },
    en: {
        slogan: 'Share your trips',
        navHome: 'Home',
        navForum: 'Forum',
        navOther: 'Other corners',
        navExperiences: 'Experiences',

        forumTitle: 'Forum / Community',
        forumSubtitle: 'Browse questions, tips and experiences from other travellers.',
        forumWelcome: 'Welcome to the forum!',

        noticeNotLogged: 'It looks like you are not registered. To participate in the community, log in or sign up.',
        noticeLogged: 'You are logged in. Explore what other travellers have shared.',

        noticeLoginBtn: 'Log in',
        noticeRegisterBtn: 'Sign up',

        searchPlaceholder: 'Search',

        filterAll: 'All',
        filterDestinations: 'Destinations',
        filterTips: 'Tips',
        filterBuddy: 'Travel buddy',
        filterGear: 'Gear',

        postsTitle: 'Posts',

        footerFaq: 'FAQ',
        footerContact: 'Contact',
        footerDocs: 'Documentation',

        category_destinations: 'Destinations',
        category_tips: 'Tips',
        category_buddy: 'Travel buddy',
        category_gear: 'Gear',

        noResults: 'No posts match your filters.',

        postAddComment: 'Add comment',
        postContact: 'Contact',

        alertComment: 'Here you could add a comment to this post.',
        alertContact: 'Here you could contact the person who posted this.',
        alertNewPost: 'Here you could create a new post in the forum.',
        alertNotifications: 'Here your forum notifications would appear.',

        newPostTitle: 'New post',
        newPostFieldTitle: 'Title',
        newPostFieldBody: 'Content / summary',
        newPostFieldCategory: 'Category',
        newPostOptionDestinations: 'Destinations',
        newPostOptionTips: 'Tips',
        newPostOptionBuddy: 'Travel buddy',
        newPostOptionGear: 'Gear',
        newPostAnonymousLabel: 'Post anonymously',
        newPostSubmit: 'Publish',
        newPostCloseLabel: 'Close new post window',

        commentsDefaultTitle: 'Comments',
        commentsEmpty: 'There are no comments on this post yet.',
        commentPrompt: 'Write your comment:',
        commentModalTitle: 'New comment',
        commentFieldLabel: 'Comment',
        commentAnonymousLabel: 'Comment anonymously',
        commentSubmit: 'Post comment',
        commentCloseLabel: 'Close comment window',

        deletePostLabel: 'Delete post',
        deletePostConfirm: 'Are you sure you want to delete this post? Its comments will also be removed. ',

        contactModalTitle: 'Contact author',
        contactMsgLabel: 'Invitation message',
        contactModalSubtitle: 'Send a message to request contact email.',
        contactMsgPlaceholder: 'Hi, I would like to know more about your trip...',
        contactSubmit: 'Send request',

        notifyTitle: 'Notifications',
        notifyEmpty: 'You have no notifications',
        notifyRequestMsg: 'wants to contact you regarding post',
        notifyAcceptMsg: 'accepted your request. Their email is:',
        btnAccept: 'Accept and share email',
        btnReject: 'Decline',

        alertRequestSent: 'Contact request sent successfully.'
    }
};

// FUNCIONES genéricas

//Obtener usuario actual
function getCurrentUser() {
    const raw = localStorage.getItem("currentUser");
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

//Cargar datos de LocalStorage
function getStorage(key){
    try{
        return JSON.parse(localStorage.getItem(key)) || []; 
    } catch {
        return [];
    }
}

//Guardar datos en LocalStorage
function setStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}


//CAMBIO DE IDIOMA
// CAMBIO DE IDIOMA
function changeLang(newLang) {
    currentLang = newLang;
    localStorage.setItem(STORAGE_KEYS.LANG, newLang);
    const t = lang[newLang];

    // 1. Botones de idioma 
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('lang-' + newLang)?.classList.add('active');

    // 2. Textos 
    const textMap = {
        '.eslogan': t.slogan,
        '.forum-title': t.forumTitle,
        '.forum-subtitle': t.forumSubtitle,
        '.posts-title': t.postsTitle,
        '#newPostModalTitle': t.newPostTitle,
        '#commentModalTitle': t.commentModalTitle,
        '#contactModalTitle': t.contactModalTitle,
        '#contactModalSubtitle': t.contactModalSubtitle
    };

    for (const [selector, text] of Object.entries(textMap)) {
        const el = document.querySelector(selector);
        if (el) el.textContent = text;
    }

    // Enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    if(navLinks.length >= 3) {
        navLinks[0].textContent = t.navHome;
        navLinks[1].textContent = t.navForum;
        navLinks[2].textContent = t.navOther;
    }

    // 3. Buscador
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;

    // 4. Filtros
    const filters = document.querySelectorAll('.filter-btn');
    if (filters.length >= 5) {
        filters[0].textContent = t.filterAll;
        filters[1].textContent = t.filterDestinations;
        filters[2].textContent = t.filterTips;
        filters[3].textContent = t.filterBuddy;
        filters[4].textContent = t.filterGear;
    }

    // 5. Botones login/registro (usuario no logueado)
    const loginBtns = document.querySelectorAll('.action-buttons-container .action-btn');
    if (loginBtns.length >= 2) {
        loginBtns[0].textContent = t.noticeLoginBtn;
        loginBtns[1].textContent = t.noticeRegisterBtn;
    }

    // 6. MODAL: NUEVO POST (Etiquetas y Botón)
    const npTitle = document.querySelector('label[for="postTitleInput"]');
    const npBody = document.querySelector('label[for="postBodyInput"]');
    const npCat = document.querySelector('label[for="postCategorySelect"]');
    const npAnon = document.querySelector('label[for="postAnonymousInput"]');
    const npSubmit = document.querySelector('#newPostForm .new-post-submit-btn');
    
    if (npTitle) npTitle.textContent = t.newPostFieldTitle;
    if (npBody) npBody.textContent = t.newPostFieldBody;
    if (npCat) npCat.textContent = t.newPostFieldCategory;
    if (npAnon) npAnon.textContent = t.newPostAnonymousLabel;
    if (npSubmit) npSubmit.textContent = t.newPostSubmit;

    // Opciones del Select de Categoría
    const catSelect = document.getElementById('postCategorySelect');
    if (catSelect) {
        catSelect.options[0].textContent = t.newPostOptionDestinations;
        catSelect.options[1].textContent = t.newPostOptionTips;
        catSelect.options[2].textContent = t.newPostOptionBuddy;
        catSelect.options[3].textContent = t.newPostOptionGear;
    }

    // 7. MODAL: COMENTARIO (Etiquetas y Botón)
    const cLabel = document.querySelector('label[for="commentTextInput"]');
    const cAnon = document.querySelector('label[for="commentAnonymousInput"]');
    const cSubmit = document.querySelector('#commentForm .comment-submit-btn');

    if (cLabel) cLabel.textContent = t.commentFieldLabel;
    if (cAnon) cAnon.textContent = t.commentAnonymousLabel;
    if (cSubmit) cSubmit.textContent = t.commentSubmit;

    // 8. MODAL: CONTACTO (Etiquetas, Placeholder y Botón)
    const contactLabel = document.querySelector('label[for="contactMessageInput"]');
    const contactInput = document.getElementById('contactMessageInput');
    const contactSubmit = document.querySelector('#contactForm .comment-submit-btn');

    if (contactLabel) contactLabel.textContent = t.contactMsgLabel;
    if (contactInput) contactInput.placeholder = t.contactMsgPlaceholder;
    if (contactSubmit) contactSubmit.textContent = t.contactSubmit;

    // 9. Actualizar Footer
    const footerLinks = document.querySelectorAll('.footer-links a');
    if (footerLinks.length >= 3) {
        footerLinks[0].textContent = t.footerFaq;
        footerLinks[1].textContent = t.footerContact;
        footerLinks[2].textContent = t.footerDocs;
    }

    // Renderizar contenido dinámico
    updateNotice();
    renderPosts();
    if (IS_LOGGED_IN) updateForumWelcome();
}

//Actualizar bienvenida (usuarios logueados)
function updateForumWelcome() {
    const el = document.getElementById("forum-welcome-notice");
    if (!el) return;
    const user = getCurrentUser();
    const name = user?.fullName?.split(" ")[0] || (currentLang === 'es' ? 'viajero' : 'traveler');
    el.textContent = currentLang === 'es' ? `¡Bienvenido al foro, ${name}!` : `Welcome to the forum, ${name}!`;
}

//Actualizar notificación inicio de sesión o registro (usuarios no logueados)
function updateNotice() {
    const notice = document.getElementById('forum-notice');
    if (notice && !IS_LOGGED_IN) {
        notice.textContent = lang[currentLang].noticeNotLogged;
        notice.style.display = 'block';
    } else if (notice) {
        notice.style.display = 'none';
    }
}


//Renderizar posts
function renderPosts() {
    const container = document.getElementById('postsList');
    if (!container) return;
    container.innerHTML = '';

    // Filtros y Búsqueda
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
    const searchText = document.getElementById('searchInput')?.value.trim().toLowerCase() || '';
    
    const t = lang[currentLang];
    const posts = getStorage(STORAGE_KEYS.POSTS);
    const comments = getStorage(STORAGE_KEYS.COMMENTS);

    // Filtrar
    const filtered = posts.filter(post => {
        const matchesCategory = activeFilter === 'all' || post.category === activeFilter;
        if (!searchText) return matchesCategory;
        
        const title = (post.title?.[currentLang] || "").toLowerCase();
        const body = (post.excerpt?.[currentLang] || "").toLowerCase();
        const author = (post.author || "").toLowerCase();
        // Comprobamos si el texto está en título, cuerpo o autor
        return matchesCategory && (
            title.includes(searchText) || 
            body.includes(searchText) || 
            author.includes(searchText)
        );
    });

    if (filtered.length === 0) {
        container.innerHTML = `<p>${t.noResults}</p>`;
        return;
    }

    // Crear HTML de cada post
    filtered.forEach(post => {
        const postComments = comments.filter(c => c.postId === post.id);
        const card = document.createElement('article');
        card.className = 'post-card';

        // Estructura del Post
        card.innerHTML = `
            <div class="post-header">
                <div class="post-avatar">👤</div>
                <div class="post-author">${post.author}</div>
                <div class="post-title" onclick="this.classList.toggle('expanded')" title="Ver completo">${post.title?.[currentLang]}</div>
            </div>
            <div class="post-category">${t['category_' + post.category]}</div>
            <p class="post-excerpt" onclick="this.classList.toggle('expanded')">${post.excerpt?.[currentLang]}</p>
        `;

        // Botones de acción (Solo si logueado)
        if (IS_LOGGED_IN) {
            const actions = document.createElement('div');
            actions.className = 'post-actions';
            actions.innerHTML = `
                <button class="post-action-btn post-comment-btn" data-id="${post.id}">
                    ✏️ <span class="action-text">${t.postAddComment}</span>
                </button>
                <button class="post-action-btn post-contact-btn" data-id="${post.id}">
                    🧍 <span class="action-text">${t.postContact}</span>
                </button>
            `;
            card.appendChild(actions);
        }

        // Footer (Estadísticas)
        const footer = document.createElement('div');
        footer.className = 'post-footer';
        
        const currentUser = getCurrentUser();
        const isLiked = currentUser && post.likedBy?.includes(currentUser.email);
        const heart = isLiked ? '❤️' : '🤍';
        const totalStats = (post.likes || 0) + postComments.length + (post.contactCount || 0);

        footer.innerHTML = `
            <button class="post-stat post-comments-stat" data-id="${post.id}">💬 ${postComments.length}</button>
            <button class="post-stat post-like-btn ${isLiked ? 'liked' : ''}" data-id="${post.id}">${heart} ${post.likes || 0}</button>
            <span class="post-stat">📊 ${totalStats}</span>
        `;

        // Papelera solo para el dueño del post (no anónimo)
        const isOwner =
            IS_LOGGED_IN &&
            currentUser &&
            post.authorEmail &&          
            currentUser.email === post.authorEmail &&
            !post.anonymous;

        if (isOwner) {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'post-action-btn post-delete-btn';
            deleteBtn.type = 'button';
            deleteBtn.dataset.postId = post.id;
            
            deleteBtn.innerHTML = '🗑️';
            deleteBtn.title = t.deletePostLabel; 
            footer.appendChild(deleteBtn);
        }

        card.appendChild(footer);
        container.appendChild(card);
    });

    if (IS_LOGGED_IN) updateNotificationBadge();
}

//GESTIÓN DE MODAL
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        
        // Resetear formularios si existen dentro
        const form = modal.querySelector('form');
        if (form) form.reset();
    }
}

// Cierre global: ESC, Click fuera, Botones cerrar
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.new-post-modal.show, .comment-modal.show, .comments-modal.show').forEach(m => closeModal(m.id));
});

document.querySelectorAll('.new-post-modal, .comment-modal, .comments-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal.id);
    });
});

// Busca todos los botones de cerrar dentro de modales (clase genérica o específica)
document.querySelectorAll('[id$="ModalClose"]').forEach(btn => {
    btn.onclick = () => closeModal(btn.closest('div[aria-hidden]').id);
});

//ACCIONES POSTS
// CREAR POST
const newPostForm = document.getElementById('newPostForm');
if (newPostForm) {
    newPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = getCurrentUser();
        if (!user) return;

        const title = document.getElementById('postTitleInput').value.trim();
        const body = document.getElementById('postBodyInput').value.trim();
        const category = document.getElementById('postCategorySelect').value;
        const isAnon = document.getElementById('postAnonymousInput').checked;

        const newPost = {
            id: `p_${Date.now()}`,
            category,
            author: isAnon ? (currentLang === 'es' ? "Anónimo" : "Anonymous") : (user.fullName || user.email),
            authorEmail: user.email,
            anonymous: isAnon,
            title: { es: title, en: title },
            excerpt: { es: body, en: body },
            createdAt: Date.now(),
            likes: 0, likedBy: [], contactCount: 0
        };

        const posts = getStorage(STORAGE_KEYS.POSTS);
        posts.unshift(newPost);
        setStorage(STORAGE_KEYS.POSTS, posts);
        
        closeModal('newPostModal');
        renderPosts();
    });
}

// COMENTAR
let currentCommentPostId = null;
const commentForm = document.getElementById('commentForm');

function prepareComment(postId) {
    currentCommentPostId = postId;
    openModal('commentModal');
    document.getElementById('commentTextInput')?.focus();
}

if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = getCurrentUser();
        if (!user || !currentCommentPostId) return;

        const text = document.getElementById('commentTextInput').value.trim();
        const isAnon = document.getElementById('commentAnonymousInput').checked;

        const newComment = {
            id: `c_${Date.now()}`,
            postId: currentCommentPostId,
            authorName: isAnon ? (currentLang === 'es' ? "Anónimo" : "Anonymous") : (user.fullName || user.email),
            authorEmail: user.email,
            text, createdAt: Date.now()
        };

        const comments = getStorage(STORAGE_KEYS.COMMENTS);
        comments.push(newComment);
        setStorage(STORAGE_KEYS.COMMENTS, comments);

        closeModal('commentModal');
        renderPosts();
    });
}

// VER COMENTARIOS
function showComments(postId) {
    const list = document.getElementById('commentsModalList');
    const comments = getStorage(STORAGE_KEYS.COMMENTS).filter(c => c.postId === postId);
    const post = getStorage(STORAGE_KEYS.POSTS).find(p => p.id === postId);
    
    document.getElementById('commentsModalTitle').textContent = post?.title?.[currentLang] || lang[currentLang].commentsDefaultTitle;
    
    list.innerHTML = '';
    if (comments.length === 0) {
        list.innerHTML = `<li>${lang[currentLang].commentsEmpty}</li>`;
    } else {
        comments.forEach(c => {
            const date = new Date(c.createdAt).toLocaleDateString();
            list.innerHTML += `<li><strong>${c.authorName}</strong> (${date}): ${c.text}</li>`;
        });
    }
    openModal('commentsModal');
}

// GESTIÓN DE CLICS EN POSTS 
document.getElementById('postsList')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const t = lang[currentLang]; 

    const id = btn.dataset.id;
    const user = getCurrentUser();

    // Like
    if (btn.classList.contains('post-like-btn')) {
        if (!user) return (window.location.href = 'login.html');
        const posts = getStorage(STORAGE_KEYS.POSTS);
        const post = posts.find(p => p.id === id);
        if (post) {
            if (!post.likedBy) post.likedBy = [];
            const idx = post.likedBy.indexOf(user.email);
            if (idx === -1) { post.likedBy.push(user.email); post.likes++; }
            else { post.likedBy.splice(idx, 1); post.likes--; }
            setStorage(STORAGE_KEYS.POSTS, posts);
            renderPosts();
        }
    }
    // Comentar
    else if (btn.classList.contains('post-comment-btn')) prepareComment(id);
    // Ver Comentarios
    else if (btn.classList.contains('post-comments-stat')) showComments(id);
    // Contactar
    else if (btn.classList.contains('post-contact-btn')) prepareContact(id);
    
    // Borrar (
    else if (btn.classList.contains('post-delete-btn')) {
        if (confirm(t.deletePostConfirm)) {
            const posts = getStorage(STORAGE_KEYS.POSTS).filter(p => p.id !== id);
            setStorage(STORAGE_KEYS.POSTS, posts);
            renderPosts();
        }
    }
});

//CONTACTAR Y NOTIFICACIONES
let currentContactPost = null;

function prepareContact(postId) {
    const post = getStorage(STORAGE_KEYS.POSTS).find(p => p.id === postId);
    const user = getCurrentUser();
    
    // Evitar auto-contacto
    if (post && post.authorEmail === user.email) {
        alert(currentLang === 'es' ? "No puedes contactar contigo mismo." : "You cannot contact yourself.");
        return;
    }
    
    currentContactPost = post;
    openModal('contactModal');
}

// Enviar solicitud de contacto
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user || !currentContactPost) return;

    const msg = document.getElementById('contactMessageInput').value;
    
    // Crear notificación
    const notifs = getStorage(STORAGE_KEYS.NOTIFICATIONS);
    notifs.unshift({
        id: `n_${Date.now()}`,
        toEmail: currentContactPost.authorEmail,
        type: 'request',
        read: false,
        createdAt: Date.now(),
        data: { fromName: user.fullName, fromEmail: user.email, postTitle: currentContactPost.title[currentLang], message: msg }
    });
    setStorage(STORAGE_KEYS.NOTIFICATIONS, notifs);

    // Incrementar contador contacto
    const posts = getStorage(STORAGE_KEYS.POSTS);
    const p = posts.find(x => x.id === currentContactPost.id);
    if(p) { p.contactCount = (p.contactCount || 0) + 1; setStorage(STORAGE_KEYS.POSTS, posts); }

    alert(lang[currentLang].alertRequestSent);
    closeModal('contactModal');
});

// Renderizar lista notificaciones
function renderNotifications() {
    const user = getCurrentUser();
    if (!user) return;
    
    const list = document.getElementById('notificationsList');
    const allNotifs = getStorage(STORAGE_KEYS.NOTIFICATIONS);
    // Filtramos las notificaciones dirigidas a mí
    const myNotifs = allNotifs.filter(n => n.toEmail === user.email);
    
    // Ordenar las más nuevas primero
    myNotifs.sort((a, b) => b.createdAt - a.createdAt);

    list.innerHTML = '';
    
    if (myNotifs.length === 0) {
        list.innerHTML = `<li>${lang[currentLang].notifyEmpty}</li>`;
        return;
    }

    // Marcar como leídas al abrir
    let changed = false;
    myNotifs.forEach(n => { if(!n.read) { n.read = true; changed = true; } });
    if(changed) setStorage(STORAGE_KEYS.NOTIFICATIONS, allNotifs);

    const t = lang[currentLang];

    myNotifs.forEach(n => {
        const li = document.createElement('li');
        li.className = 'notification-item';
        
        // Formatear fecha
        const dateStr = new Date(n.createdAt).toLocaleDateString();

        if (n.type === 'request') {
            li.innerHTML = `
                <div class="notification-header">
                    <strong>${n.data.fromName}</strong>
                    <small style="color:#666; float:right;">${dateStr}</small>
                </div>
                <div class="notification-body" style="margin: 5px 0;">
                    ${t.notifyRequestMsg} "<em>${n.data.postTitle}</em>":<br>
                    <div style="background:#eee; padding:5px; border-radius:4px; margin-top:5px; font-style:italic;">"${n.data.message}"</div>
                </div>
                <div class="notification-actions-row">
                    <button class="notif-btn notif-btn-accept" data-id="${n.id}">${t.btnAccept}</button>
                    <button class="notif-btn notif-btn-reject" data-id="${n.id}">${t.btnReject}</button>
                </div>
            `;
        } else {
            // Notificación de que alguien me aceptó
            li.innerHTML = `
                <div class="notification-header">
                    <strong>${n.data.fromName}</strong>
                    <small style="color:#666; float:right;">${dateStr}</small>
                </div>
                <div class="notification-body" style="margin-top: 5px;">
                    ${t.notifyAcceptMsg} <br>
                    <strong style="color:#2e7d32; background:#e8f5e9; padding:2px 5px; border-radius:4px;">${n.data.emailShared}</strong>
                </div>
            `;
        }
        list.appendChild(li);
    });

    // --- ACTIVAR LOS BOTONES ---
    // Una vez creados los botones en el HTML, les añadimos la lógica
    list.querySelectorAll('.notif-btn-accept').forEach(btn => {
        btn.onclick = () => handleAcceptContact(btn.dataset.id, user.email);
    });
    list.querySelectorAll('.notif-btn-reject').forEach(btn => {
        btn.onclick = () => handleRejectContact(btn.dataset.id);
    });
}

// Función para ACEPTAR solicitud
function handleAcceptContact(notifId, myEmail) {
    let allNotifs = getStorage(STORAGE_KEYS.NOTIFICATIONS);
    
    // 1. Buscar la notificación original para sacar el email del solicitante
    const originalNotif = allNotifs.find(n => n.id === notifId);
    if (!originalNotif) return;

    const requesterEmail = originalNotif.data.fromEmail;
    const user = getCurrentUser();
    const myName = user.fullName || user.email;

    // 2. Crear la NUEVA notificación de respuesta
    const newNotif = {
        id: `n_${Date.now()}_acc`,
        toEmail: requesterEmail,
        type: 'accepted',
        read: false,
        createdAt: Date.now(),
        data: {
            fromName: myName,
            emailShared: myEmail
        }
    };

    // 3. OPERACIÓN DE BORRADO Y AÑADIDO
    const updatedNotifs = allNotifs.filter(n => n.id !== notifId);
    updatedNotifs.unshift(newNotif);

    // 4. Guardar y Recargar
    setStorage(STORAGE_KEYS.NOTIFICATIONS, updatedNotifs);
    renderNotifications(); 

    alert(currentLang === 'es' ? "Has aceptado la solicitud. Se ha enviado tu correo." : "Request accepted. Your email has been sent.");
}

// Función para RECHAZAR solicitud
function handleRejectContact(notifId) {
    if(!confirm(currentLang === 'es' ? "¿Rechazar solicitud?" : "Reject request?")) return;
    
    let allNotifs = getStorage(STORAGE_KEYS.NOTIFICATIONS);
    // Simplemente filtramos para eliminar esa notificación
    const newNotifs = allNotifs.filter(n => n.id !== notifId);
    
    setStorage(STORAGE_KEYS.NOTIFICATIONS, newNotifs);
    renderNotifications();
}

function updateNotificationBadge() {
    const badge = document.getElementById('notifBadge');
    if (!badge) return;
    const user = getCurrentUser();
    const count = getStorage(STORAGE_KEYS.NOTIFICATIONS).filter(n => n.toEmail === user?.email && !n.read).length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
}

//INICIALIZACIÓN
// Botones Flotantes
document.getElementById('newPostBtn')?.addEventListener('click', () => {
    if (!getCurrentUser()) window.location.href = 'login.html';
    else openModal('newPostModal');
});

document.getElementById('notificationsBtn')?.addEventListener('click', () => {
    renderNotifications();
    openModal('notificationsModal');
    updateNotificationBadge(); 
});

// Filtros 
const filterBtns = document.querySelectorAll('.filter-btn');
const mobileSelect = document.getElementById('mobileFilterSelect');

filterBtns.forEach(btn => {
    btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (mobileSelect) mobileSelect.value = btn.dataset.category;
        renderPosts();
    };
});

if (mobileSelect) {
    mobileSelect.addEventListener('change', (e) => {
        filterBtns.forEach(b => {
            if (b.dataset.category === e.target.value) b.classList.add('active');
            else b.classList.remove('active');
        });
        renderPosts();
    });
}
// BUSCADOR
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

if (searchInput) {
    // Buscar mientras se escribe
    searchInput.addEventListener('input', () => {
        renderPosts();
    });

    // Buscar al presionar Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            renderPosts();
        }
    });
}

if (searchBtn) {
    // Buscar al hacer clic en la lupa
    searchBtn.addEventListener('click', () => {
        renderPosts();
    });
}

// Botones Idioma/Dislexia
document.getElementById('lang-es')?.addEventListener('click', () => changeLang('es'));
document.getElementById('lang-en')?.addEventListener('click', () => changeLang('en'));
document.getElementById('dyslexic-btn')?.addEventListener('click', () => {
    dyslexicMode = !dyslexicMode;
    localStorage.setItem(STORAGE_KEYS.DYSLEXIC, dyslexicMode);
    document.body.classList.toggle('dyslexic', dyslexicMode);
    document.getElementById('dyslexic-btn').classList.toggle('active', dyslexicMode);
});

//DATOS DE PRUEBA
function initMockData() {
    // Obtenemos lo que hay guardado
    const rawPosts = localStorage.getItem(STORAGE_KEYS.POSTS);
    const currentPosts = rawPosts ? JSON.parse(rawPosts) : [];

    // Si no existe ningún post o si la lista está vacía: 
    if (!rawPosts || currentPosts.length === 0) {
        // A) POSTS DE EJEMPLO
        const mockPosts = [
            {
                id: "p_demo_1",
                category: "destinations",
                author: "ViajeroExperto",
                authorEmail: "profe@demo.com",
                anonymous: false,
                title: {
                    es: "Ruta de 15 días por Japón: Mi experiencia",
                    en: "15 days in Japan: My experience"
                },
                excerpt: {
                    es: "Os comparto mi itinerario usando el JR Pass. Visité Tokio, Kioto, Osaka y Hiroshima. ¡La comida fue lo mejor!",
                    en: "Sharing my itinerary using the JR Pass. visited Tokyo, Kyoto, Osaka and Hiroshima. Food was the best!"
                },
                createdAt: Date.now(),
                likes: 15,
                likedBy: [],
                contactCount: 3
            },
            {
                id: "p_demo_2",
                category: "tips",
                author: "Mochilera88",
                authorEmail: "mochi@demo.com",
                anonymous: false,
                title: {
                    es: "¿Mejor época para viajar a Islandia?",
                    en: "Best time to travel to Iceland?"
                },
                excerpt: {
                    es: "Quiero ver auroras boreales pero me da miedo el frío extremo. ¿Recomendáis ir en octubre o marzo?",
                    en: "I want to see northern lights but I'm scared of extreme cold. Do you recommend October or March?"
                },
                createdAt: Date.now() - 1000000, 
                likes: 8,
                likedBy: [],
                contactCount: 0
            },
            {
                id: "p_demo_3",
                category: "buddy",
                author: "Anónimo",
                authorEmail: "anon@demo.com",
                anonymous: true,
                title: {
                    es: "Busco compañero para Interrail en verano",
                    en: "Looking for Interrail buddy this summer"
                },
                excerpt: {
                    es: "Tengo 22 años y quiero recorrer Europa del Este (Praga, Budapest, Cracovia). Mis amigos no pueden venir por trabajo. Soy flexible con las fechas.",
                    en: "I'm 22 and want to travel Eastern Europe (Prague, Budapest, Krakow). My friends can't come due to work. I am flexible with dates."
                },
                createdAt: Date.now() - 8000000,
                likes: 2,
                likedBy: [],
                contactCount: 5
            },
            {
                id: "p_demo_4",
                category: "gear",
                author: "FotoNatura",
                authorEmail: "foto@demo.com",
                anonymous: false,
                title: {
                    es: "¿Sony A7III o Canon R6 para Safari?",
                    en: "Sony A7III or Canon R6 for Safari?"
                },
                excerpt: {
                    es: "Me voy a Kenia en dos meses y quiero renovar mi equipo. Tengo dudas sobre el sellado contra el polvo y el precio de los teleobjetivos. ¿Alguna experiencia?",
                    en: "Going to Kenya in two months and want to upgrade gear. Doubts about dust sealing and telephoto lens prices. Any experience?"
                },
                createdAt: Date.now() - 12000000,
                likes: 12,
                likedBy: [],
                contactCount: 1
            },
            {
                id: "p_demo_5",
                category: "tips",
                author: "Marina",
                authorEmail: "marina@gmail.com",
                anonymous: false,
                title: {
                    es: "Vuelta al mundo en 12 meses",
                    en: "Around the world 12 months"
                },
                excerpt: {
                    es: "Después de 5 años ahorrando, por fin me lancé. En este post masivo os cuento TODO. Empezamos con el debate: ¿Billete 'Round the World' o vuelos sueltos? Seguimos con el drama de las aduanas en Australia (cuidado con llevar comida). Analizo los seguros de viaje con letra pequeña para EEUU. Y lo más importante: un desglose de gastos céntimo a céntimo de mis primeros 6 meses en el Sudeste Asiático para demostrar que se puede viajar barato. ¡Preparaos un café que esto va para largo!",
                    en: "After 5 years of saving, I finally did it. In this massive post I tell you EVERYTHING. We start with the debate: 'Round the World' ticket or single flights? We continue with the customs drama in Australia (be careful with food). I analyze travel insurance with fine print for the USA. And most importantly: a penny-by-penny expense breakdown of my first 6 months in Southeast Asia to prove you can travel cheap. Grab a coffee, this is going to be long!"
                },
                createdAt: Date.now(),
                likes: 99,
                likedBy: [],
                contactCount: 15
            },
        ];

        // B) COMENTARIOS DE EJEMPLO
        const mockComments = [
            {
                id: "c_demo_1",
                postId: "p_demo_1",
                authorName: "SushiLover",
                authorEmail: "sushi@demo.com",
                anonymous: false,
                text: "¡Qué envidia! ¿Cuánto te gastaste en total más o menos?",
                createdAt: Date.now()
            },
            {
                id: "c_demo_2",
                postId: "p_demo_2", 
                authorName: "ViajeroNorte",
                authorEmail: "norte@demo.com",
                anonymous: false,
                text: "Yo fui en Marzo y fue espectacular, aunque prepárate para el viento.",
                createdAt: Date.now()
            },
            {
                id: "c_long_1",
                postId: "p_demo_5", 
                authorName: "Mochilera88",
                authorEmail: "mochi@demo.com",
                anonymous: false,
                text: "¡Madre mía, qué currazo de post! 😱 Me lo guardo en favoritos porque quiero hacer algo parecido el año que viene. Una duda rápida: ¿El presupuesto de 6 meses incluye los vuelos internacionales o eso lo calculas aparte?",
                createdAt: Date.now()
            },
            {
                id: "c_long_2",
                postId: "p_demo_5",
                authorName: "Australiano_Fake",
                authorEmail: "aus@demo.com",
                anonymous: true,
                text: "Lo de la aduana en Australia es totalmente cierto y no es broma. A mí me multaron con 200 dólares por llevar una manzana en la mochila que se me había olvidado declarar. ¡Revisad bien los bolsillos!",
                createdAt: Date.now()
            },
        ];

        // Guardamos y recargamos
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(mockPosts));
        localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(mockComments));
        
        // Forzamos la recarga visual inmediata
        renderPosts();
    }
    
}

// ARRANQUE
if (dyslexicMode) {
    document.body.classList.add('dyslexic');
    document.getElementById('dyslexic-btn')?.classList.add('active');
}
changeLang(currentLang);
initMockData();
