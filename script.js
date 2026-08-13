
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
const passwordStrength = document.getElementById("passwordStrength");
const passwordStrengthText = document.getElementById("passwordStrengthText");

function cambiarAuth(modo){
    const login = modo === "login";
    loginTab.classList.toggle("active", login);
    registerTab.classList.toggle("active", !login);
    loginForm.classList.toggle("active", login);
    registerForm.classList.toggle("active", !login);
    authFeedback.textContent = "";
    authFeedback.className = "auth-feedback";
}

loginTab?.addEventListener("click", () => cambiarAuth("login"));
registerTab?.addEventListener("click", () => cambiarAuth("register"));

document.querySelectorAll(".show-pass").forEach(btn => {
    btn.addEventListener("click", () => {
        const input = document.getElementById(btn.dataset.target);
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
    if(password.length < 6){
        authFeedback.textContent = "La contraseña debe tener al menos 6 caracteres.";
        authFeedback.className = "auth-feedback error";
        return;
    }
    localStorage.setItem("apibeeUser", JSON.stringify({nombre,email,password}));
    authFeedback.textContent = "🐝 Cuenta creada. Ahora puedes iniciar sesión.";
    authFeedback.className = "auth-feedback ok";
    document.getElementById("loginEmail").value = email;
    cambiarAuth("login");
});

loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const saved = JSON.parse(localStorage.getItem("apibeeUser") || "null");
    if(!saved || saved.email !== email || saved.password !== password){
        authFeedback.textContent = "❌ Correo o contraseña incorrectos. Puedes registrarte primero.";
        authFeedback.className = "auth-feedback error";
        return;
    }
    authFeedback.textContent = `🍯 ¡Bienvenido a ApiBee, ${saved.nombre}!`;
    authFeedback.className = "auth-feedback ok";
    setTimeout(() => {
        authScreen.style.display = "none";
        siteApp.classList.remove("locked");
        window.scrollTo({top:0, behavior:"smooth"});
    }, 450);
});

const beePhrases = [
    "Las abejas trabajan en equipo. ¡Tú también puedes entrar a la colmena! 🐝",
    "Dato ApiBee: cada visita empieza con una buena bienvenida 🍯",
    "¡Bzzz! Regístrate y descubre todo el contenido de ApiBee 🌼",
    "La colmena está lista. ¿Iniciamos sesión? 🐝"
];
let beePhraseIndex = 0;
beeMascot?.addEventListener("click", () => {
    beePhraseIndex = (beePhraseIndex + 1) % beePhrases.length;
    beeMessage.textContent = beePhrases[beePhraseIndex];
    beeMascot.classList.remove("fly");
    void beeMascot.offsetWidth;
    beeMascot.classList.add("fly");
});
