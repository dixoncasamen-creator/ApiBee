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
