const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const arriba = document.getElementById("arriba");
const form = document.getElementById("contactForm");

menuBtn.addEventListener("click", () => nav.classList.toggle("abierto"));
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("abierto"));
});

window.addEventListener("scroll", () => {
    header.style.boxShadow = window.scrollY > 50 ? "0 8px 25px rgba(0,0,0,.25)" : "none";
    arriba.style.display = window.scrollY > 450 ? "block" : "none";
});

arriba.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

function actualizarMensaje(){
    document.getElementById("mensaje").textContent =
        "La apiterapia aprovecha productos naturales de la colmena como complemento del bienestar.";
}

function modoOscuro(){
    document.body.classList.toggle("dark");
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const tratamiento = document.getElementById("tratamiento").value;
    const consulta = document.getElementById("consulta").value.trim();

    if (!nombre || !correo || !tratamiento || !consulta) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    const mensaje =
`🐝 *Nueva solicitud desde ApiBee*

👤 *Nombre:* ${nombre}
📧 *Correo:* ${correo}
📱 *Teléfono:* ${telefono || "No indicado"}
🍯 *Tratamiento:* ${tratamiento}

📝 *Consulta:*
${consulta}`;

    const numero = "593963913139";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
});

let mielJuego = 0;
let dineroJuego = 50;
let abejasJuego = 1;
let floresJuego = 3;
let colmenasJuego = 1;
let nivelProduccion = 1;
let precioAbeja = 40;
let precioFlor = 30;
let precioColmena = 120;
let precioUpgrade = 200;
let progreso = 0;

function actualizarJuego(){
    document.getElementById("miel").textContent = mielJuego;
    document.getElementById("dinero").textContent = dineroJuego;
    document.getElementById("abejas").textContent = abejasJuego;
    document.getElementById("flores").textContent = floresJuego;
    document.getElementById("colmenas").textContent = colmenasJuego;
    document.getElementById("precioAbeja").textContent = precioAbeja;
    document.getElementById("precioFlor").textContent = precioFlor;
    document.getElementById("precioColmena").textContent = precioColmena;
    document.getElementById("precioUpgrade").textContent = precioUpgrade;
    comprobarLogros();
}

function producirMiel(){
    const produccion = abejasJuego * floresJuego * nivelProduccion;
    mielJuego += produccion;
    dineroJuego += Math.floor(produccion / 2);
    progreso = progreso >= 100 ? 0 : progreso + 10;
    document.getElementById("progreso").style.width = progreso + "%";
    actualizarJuego();
}

function comprarAbeja(){
    if(dineroJuego < precioAbeja) return mensaje("❌ No tienes suficientes monedas");
    dineroJuego -= precioAbeja;
    abejasJuego++;
    precioAbeja += 20;
    actualizarJuego();
    mensaje("🐝 Nueva abeja comprada");
}

function comprarFlor(){
    if(dineroJuego < precioFlor) return mensaje("❌ Dinero insuficiente");
    dineroJuego -= precioFlor;
    floresJuego++;
    precioFlor += 15;
    actualizarJuego();
    mensaje("🌼 Compraste una flor");
}

function comprarColmena(){
    if(dineroJuego < precioColmena) return mensaje("❌ Necesitas más monedas");
    dineroJuego -= precioColmena;
    colmenasJuego++;
    precioColmena += 80;
    actualizarJuego();
    mensaje("🏠 Nueva colmena instalada");
}

function mejorarProduccion(){
    if(dineroJuego < precioUpgrade) return mensaje("❌ No puedes mejorar todavía");
    dineroJuego -= precioUpgrade;
    nivelProduccion++;
    precioUpgrade += 200;
    actualizarJuego();
    mensaje("⚡ Producción mejorada");
}

function comprobarLogros(){
    const logros = [];
    if(mielJuego >= 100) logros.push("🥉 Apicultor Novato");
    if(mielJuego >= 500) logros.push("🥈 Productor Profesional");
    if(mielJuego >= 1000) logros.push("🥇 Maestro de la Colmena");
    document.getElementById("listaLogros").innerHTML =
        logros.length ? logros.map(x => `<p>${x}</p>`).join("") : "<p>❌ Aún no has desbloqueado logros.</p>";
}

function mensaje(texto){
    const aviso = document.createElement("div");
    aviso.textContent = texto;
    Object.assign(aviso.style,{
        position:"fixed",top:"90px",right:"20px",background:"#111827",
        color:"white",padding:"14px 22px",borderRadius:"12px",
        boxShadow:"0 10px 25px rgba(0,0,0,.3)",zIndex:"9999"
    });
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 2000);
}

setInterval(() => {
    mielJuego += colmenasJuego * nivelProduccion;
    dineroJuego += colmenasJuego;
    actualizarJuego();
}, 3000);

actualizarJuego();

// ===== ACCESO / REGISTRO APIBEE =====
const authScreen = document.getElementById("authScreen");
const siteApp = document.getElementById("siteApp");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const authFeedback = document.getElementById("authFeedback");
const beeMascot = document.getElementById("beeMascot");
const beeMessage = document.getElementById("beeMessage");
const registerPassword = document.getElementById("registerPassword");
const registerPassword2 = document.getElementById("registerPassword2");
const passwordStrength = document.getElementById("passwordStrength");
const passwordStrengthText = document.getElementById("passwordStrengthText");
const logoutBtn = document.getElementById("logoutBtn");

const USERS_KEY = "apibeeUsers";
const SESSION_KEY = "apibeeSession";

function obtenerUsuarios(){
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
        return [];
    }
}

function guardarUsuarios(usuarios){
    localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
}

function mostrarFeedback(texto, tipo = ""){
    authFeedback.textContent = texto;
    authFeedback.className = `auth-feedback ${tipo}`.trim();
}

function cambiarAuth(modo, conservarMensaje = false){
    const login = modo === "login";
    loginTab.classList.toggle("active", login);
    registerTab.classList.toggle("active", !login);
    loginForm.classList.toggle("active", login);
    registerForm.classList.toggle("active", !login);
    if(!conservarMensaje) mostrarFeedback("");
}

function abrirSitio(nombre){
    authScreen.style.display = "none";
    siteApp.classList.remove("locked");
    if(nombre) mensaje(`🐝 Bienvenido a ApiBee, ${nombre}`);
    window.scrollTo({top:0, behavior:"smooth"});
}

function cerrarSitio(){
    localStorage.removeItem(SESSION_KEY);
    siteApp.classList.add("locked");
    authScreen.style.display = "grid";
    loginForm.reset();
    cambiarAuth("login");
    mostrarFeedback("Sesión cerrada correctamente. 🐝", "ok");
    window.scrollTo({top:0, behavior:"smooth"});
}

loginTab?.addEventListener("click", () => cambiarAuth("login"));
registerTab?.addEventListener("click", () => cambiarAuth("register"));
logoutBtn?.addEventListener("click", cerrarSitio);

document.querySelectorAll(".show-pass").forEach(btn => {
    btn.addEventListener("click", () => {
        const input = document.getElementById(btn.dataset.target);
        if(!input) return;
        input.type = input.type === "password" ? "text" : "password";
        btn.textContent = input.type === "password" ? "👁️" : "🙈";
    });
});

registerPassword?.addEventListener("input", () => {
    const value = registerPassword.value;
    let score = 0;
    if(value.length >= 6) score++;
    if(/[A-Z]/.test(value)) score++;
    if(/[0-9]/.test(value)) score++;
    if(/[^A-Za-z0-9]/.test(value)) score++;
    const widths = [0,25,50,75,100];
    const texts = ["Aún sin evaluar","Débil","Aceptable","Buena","Muy fuerte"];
    passwordStrength.style.width = widths[score] + "%";
    passwordStrengthText.textContent = texts[score];
});

registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = registerPassword.value;
    const password2 = registerPassword2.value;

    if(nombre.length < 2){
        mostrarFeedback("Escribe un nombre válido.", "error");
        return;
    }
    if(password.length < 6){
        mostrarFeedback("La contraseña debe tener al menos 6 caracteres.", "error");
        return;
    }
    if(password !== password2){
        mostrarFeedback("Las contraseñas no coinciden.", "error");
        return;
    }

    const usuarios = obtenerUsuarios();
    if(usuarios.some(u => u.email === email)){
        mostrarFeedback("Ese correo ya está registrado. Inicia sesión.", "error");
        return;
    }

    usuarios.push({nombre, email, password});
    guardarUsuarios(usuarios);
    registerForm.reset();
    passwordStrength.style.width = "0%";
    passwordStrengthText.textContent = "Aún sin evaluar";
    document.getElementById("loginEmail").value = email;
    cambiarAuth("login", true);
    mostrarFeedback("✅ Cuenta creada correctamente. Ahora inicia sesión con tu contraseña.", "ok");
});

loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if(!usuario){
        mostrarFeedback("❌ Correo o contraseña incorrectos. Si no tienes cuenta, regístrate primero.", "error");
        return;
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify({email: usuario.email, nombre: usuario.nombre}));
    mostrarFeedback(`🍯 ¡Bienvenido, ${usuario.nombre}!`, "ok");
    setTimeout(() => abrirSitio(usuario.nombre), 350);
});

const beePhrases = [
    "Las abejas trabajan en equipo. ¡Crea tu cuenta y entra a la colmena! 🐝",
    "Bzzz... tu cuenta queda guardada en este navegador 🍯",
    "¡Haz clic! Cada nueva cuenta es una abeja más en nuestra colmena 🌼",
    "Regístrate, inicia sesión y explora ApiBee 🐝"
];
let beePhraseIndex = 0;
beeMascot?.addEventListener("click", () => {
    beePhraseIndex = (beePhraseIndex + 1) % beePhrases.length;
    beeMessage.textContent = beePhrases[beePhraseIndex];
    beeMascot.classList.remove("fly");
    void beeMascot.offsetWidth;
    beeMascot.classList.add("fly");
});

// Si ya existe una sesión válida, entra directamente a la página.
try {
    const sesion = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    const usuarios = obtenerUsuarios();
    if(sesion && usuarios.some(u => u.email === sesion.email)){
        abrirSitio(sesion.nombre);
    }
} catch {}
