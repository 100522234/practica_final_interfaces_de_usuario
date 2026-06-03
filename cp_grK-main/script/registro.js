// Traducciones
const lang = {
    es: {
        fullName: 'Nombre completo *',
        email: 'correo@gmail.com *',
        password: 'Contraseña *',
        privacy: 'Acepto la ',
        privacyLink: 'política de privacidad',
        submit: 'Crear cuenta',
        errorName: 'Nombre inválido',
        errorEmail: 'Email inválido',
        errorPassword: 'Mínimo 8 caracteres',
        errorPrivacy: 'Debes aceptar',
        success: '¡Registro exitoso!'
    },
    en: {
        fullName: 'Full name *',
        email: 'email@gmail.com *',
        password: 'Password *',
        privacy: 'I accept the ',
        privacyLink: 'privacy policy',
        submit: 'Create account',
        errorName: 'Invalid name',
        errorEmail: 'Invalid email',
        errorPassword: 'Minimum 8 characters',
        errorPrivacy: 'You must accept',
        success: 'Registration successful!'
    }
};

let currentLang = localStorage.getItem('lang') || 'es';
let dyslexicMode = localStorage.getItem('dyslexic') === 'true';

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
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.id !== 'dyslexic-btn') btn.classList.remove('active');
    });
    document.getElementById('lang-' + newLang).classList.add('active');
    
    document.querySelector('label[for="fullName"]').textContent = lang[newLang].fullName;
    document.querySelector('label[for="email"]').textContent = lang[newLang].email;
    document.querySelector('label[for="password"]').textContent = lang[newLang].password;
    
    // Actualizar checkbox con link
    const privacyLabel = document.querySelector('label[for="privacy"]');
    privacyLabel.innerHTML = `
        <input type="checkbox" id="privacy" required>
        ${lang[newLang].privacy}<a href="#">${lang[newLang].privacyLink}</a>
    `;
    
    document.querySelector('button[type="submit"]').textContent = lang[newLang].submit;
}

// Inicializar idioma
changeLang(currentLang);

// Validación del formulario
document.getElementById('registerForm').onsubmit = function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const privacy = document.getElementById('privacy').checked;
    
    let valid = true;
    
    // Validar nombre
    if (fullName.length < 3) {
        showError('fullName', lang[currentLang].errorName);
        valid = false;
    } else {
        hideError('fullName');
    }
    
    // Validar email
    if (!email.includes('@') || !email.includes('.')) {
        showError('email', lang[currentLang].errorEmail);
        valid = false;
    } else {
        hideError('email');
    }
    
    // Validar contraseña
    if (password.length < 8) {
        showError('password', lang[currentLang].errorPassword);
        valid = false;
    } else {
        hideError('password');
    }
    
    // Validar privacidad
    if (!privacy) {
        alert(lang[currentLang].errorPrivacy);
        valid = false;
    }
    
    if (valid) {
        // Guardar en localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Verificar si email ya existe
        if (users.find(u => u.email === email)) {
            showError('email', 'Email ya registrado');
            return;
        }
        
        users.push({
            fullName: fullName,
            email: email,
            password: password,
            date: new Date().toISOString()
        });
        
        localStorage.setItem('users', JSON.stringify(users));
        
        // Guardar sesión actual del usuario recién registrado
        localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            fullName: fullName,
            loginTime: new Date().toISOString()
        }));

        alert(lang[currentLang].success);

        // Redirigir a home con sesión iniciada
        window.location.href = 'home_log.html';
    }
};

function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = input.nextElementSibling;
    input.classList.add('error');
    error.textContent = message;
    error.classList.add('show');
}

function hideError(fieldId) {
    const input = document.getElementById(fieldId);
    const error = input.nextElementSibling;
    input.classList.remove('error');
    error.classList.remove('show');
}