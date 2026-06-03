// Traducciones
const lang = {
    es: {
        email: 'correo@gmail.com *',
        password: 'Contraseña *',
        remember: 'Recordar credenciales',
        submit: 'Iniciar Sesión',
        noAccount: '¿No tienes cuenta?',
        register: 'Regístrate',
        errorEmail: 'Email inválido',
        errorPassword: 'Contraseña requerida',
        errorLogin: 'Email o contraseña incorrectos',
        success: '¡Bienvenido!'
    },
    en: {
        email: 'email@gmail.com *',
        password: 'Password *',
        remember: 'Remember credentials',
        submit: 'Log In',
        noAccount: "Don't have an account?",
        register: 'Sign up',
        errorEmail: 'Invalid email',
        errorPassword: 'Password required',
        errorLogin: 'Incorrect email or password',
        success: 'Welcome!'
    }
};

let currentLang = localStorage.getItem('lang') || 'es';
let dyslexicMode = localStorage.getItem('dyslexic') === 'true';

// Cambiar idioma
document.getElementById('lang-es').addEventListener('click', function() {
    changeLang('es');
});

document.getElementById('lang-en').addEventListener('click', function() {
    changeLang('en');
});

// Modo disléxico
document.getElementById('dyslexic-btn').addEventListener('click', function() {
    dyslexicMode = !dyslexicMode;
    localStorage.setItem('dyslexic', dyslexicMode);
    
    if (dyslexicMode) {
        document.body.classList.add('dyslexic');
        document.getElementById('dyslexic-btn').classList.add('active');
    } else {
        document.body.classList.remove('dyslexic');
        document.getElementById('dyslexic-btn').classList.remove('active');
    }
});

// Inicializar modo disléxico
if (dyslexicMode) {
    document.body.classList.add('dyslexic');
    document.getElementById('dyslexic-btn').classList.add('active');
}

function changeLang(newLang) {
    currentLang = newLang;
    localStorage.setItem('lang', newLang);
    
    // Desactivar todos los botones de idioma excepto el disléxico
    document.getElementById('lang-es').classList.remove('active');
    document.getElementById('lang-en').classList.remove('active');
    document.getElementById('lang-' + newLang).classList.add('active');
    
    // Actualizar labels
    document.querySelector('label[for="email"]').textContent = lang[newLang].email;
    document.querySelector('label[for="password"]').textContent = lang[newLang].password;
    
    // Actualizar checkbox
    const rememberLabel = document.querySelector('label[for="remember"]');
    rememberLabel.innerHTML = `
        <input type="checkbox" id="remember">
        ${lang[newLang].remember}
    `;
    
    document.querySelector('button[type="submit"]').textContent = lang[newLang].submit;
}

// Inicializar idioma al cargar la página
changeLang(currentLang);

// Cargar credenciales guardadas si existen
window.addEventListener('load', function() {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    
    if (savedEmail && savedPassword) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('password').value = savedPassword;
        document.getElementById('remember').checked = true;
    }
});

// ============================================
// SOLUCIÓN: Limpiar errores cuando el usuario escribe o hace click
// ============================================
document.getElementById('email').addEventListener('input', function() {
    hideError('email');
});

document.getElementById('password').addEventListener('input', function() {
    hideError('password');
});

document.getElementById('email').addEventListener('focus', function() {
    hideError('email');
});

document.getElementById('password').addEventListener('focus', function() {
    hideError('password');
});

// Validación del formulario
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    let valid = true;
    
    // Validar email
    if (!email.includes('@') || !email.includes('.')) {
        showError('email', lang[currentLang].errorEmail);
        valid = false;
    } else {
        hideError('email');
    }
    
    // Validar contraseña
    if (password.length < 1) {
        showError('password', lang[currentLang].errorPassword);
        valid = false;
    } else {
        hideError('password');
    }
    
    if (!valid) return;
    
    // Verificar credenciales en localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login exitoso
        
        // Guardar o limpiar credenciales según el checkbox
        if (remember) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('rememberedPassword', password);
        } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
        }
        
        // Guardar sesión actual
        localStorage.setItem('currentUser', JSON.stringify({
            email: user.email,
            fullName: user.fullName,
            loginTime: new Date().toISOString()
        }));
        
        alert(lang[currentLang].success);

        // Redirigir a home con sesión iniciada
        window.location.href = 'home_log.html';
        
    } else {
        // Credenciales incorrectas
        showError('email', lang[currentLang].errorLogin);
        showError('password', '');
    }
});

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
    error.textContent = '';
    error.classList.remove('show');
}