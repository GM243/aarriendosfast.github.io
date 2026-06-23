// =====================
//  ARRIENDOS FAST — APP
// =====================

// ---- DATA GENERAL DEL BARRIO ----
const ITEMS = [
  { id:1,  nombre:"Taladro Bosch GSB 550W",      cat:"herramientas", img:"https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=80", precio:1000, dep:15000, dist:0.3, rating:4.9, rev:24,  lat:-33.4342, lng:-70.6260, duen:"Francisco Meléndez · Barrio Italia",    desc:"Taladro percutor en excelente estado. Incluye set de brocas para madera y hormigón.",  ok:true  },
  { id:2,  nombre:"Proyector Epson Full HD",      cat:"audio",        img:"https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&q=80", precio:4000, dep:50000, dist:0.8, rating:4.7, rev:11, lat:-33.4365, lng:-70.6215, duen:"Joaquín Miño · Ñuñoa",                  desc:"Proyector 3000 lúmenes, 1080p. Incluye cable HDMI y mando. Ideal para presentaciones.",  ok:true  },
  { id:3,  nombre:"Carpa para eventos 4×4m",      cat:"eventos",      img:"https://images.unsplash.com/photo-1563299796-17596ed6b017?w=300&q=80", precio:8000, dep:40000, dist:1.1, rating:4.8, rev:9,  lat:-33.4320, lng:-70.6290, duen:"Miguel Retamales · Las Condes",          desc:"Carpa tipo pagoda impermeable 4×4m. Perfecta para cumpleaños al aire libre.",           ok:true  },
  { id:4,  nombre:"Sierra circular DeWalt 7\"",   cat:"herramientas", img:"https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&q=80", precio:1500, dep:20000, dist:0.6, rating:4.6, rev:7,  lat:-33.4380, lng:-70.6240, duen:"Miguel T. · Providencia",                desc:"Sierra circular 1600W, disco para madera incluido.",                                   ok:false }
];

// ---- STATE (CUENTA NUEVA) ----
let MIS_ARRIENDOS_DATA = []; 
let MENSAJES_DATA = [];      

let catActual   = 'todos';
let queryActual = '';
let horasModal  = 1;
let itemModal   = null;
let mapExplora  = null;
let mapFull     = null;
let mapModal    = null;
let vistaActual = 'list';
let tabActual   = 'explorar';
let userLat     = -33.4355;
let userLng     = -70.6260;
let usuarioActual = null;

// Variables globales para el flujo de códigos
let pendingConfirmId = null; 

// Variables para la publicación con imagen y mapa
let imagenPublicacionBase64 = null;
let mapPub = null;
let markerPub = null;

// ---- GEOLOCATION ----
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      userLat = pos.coords.latitude;
      userLng = pos.coords.longitude;
      const center = [userLat, userLng];
      if (mapExplora) { mapExplora.setView(center,15); addYouMarker(mapExplora,center); }
      if (mapFull)    { mapFull.setView(center,15);    addYouMarker(mapFull,center); }
    },
    () => { if (mapFull) addYouMarker(mapFull,[userLat,userLng]); }
  );
}

function addYouMarker(map, center) {
  if (!map) return;
  const youIcon = L.divIcon({
    className:'',
    html:`<div style="width:16px;height:16px;background:#4e8cff;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 6px rgba(78,140,255,0.25)"></div>`,
    iconSize:[16,16], iconAnchor:[8,8],
  });
  L.marker(center,{icon:youIcon}).addTo(map)
    .bindPopup('<div style="color:#0d0c0a;font-weight:700;font-size:13px">📍 Tú estás aquí</div>');
}

// ---- SPLASH + AUTH FLOW ----
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splash').classList.add('hide');
    document.getElementById('authScreen').style.display = 'flex';
  }, 1000);
});

// ---- AUTH ----
function mostrarPanel(id) {
  document.querySelectorAll('.auth-panel').forEach(p => p.style.display = 'none');
  document.getElementById(id).style.display = 'flex';
}

function hacerLogin() {
  const email = document.getElementById('loginEmail').value.trim() || 'Invitado';
  usuarioActual = { nombre: email.split('@')[0], email };
  entrarAlApp();
}

// ---- REGISTRO RUTS PARA EVITAR MULTICUENTAS ----
let REGISTRO_RUTS = ["12.345.678-9", "9.876.543-2"];

function previewDoc(event, type) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const previewId = type === 'selfie' ? 'regSelfiePreview' : `regDoc${type.charAt(0).toUpperCase() + type.slice(1)}Preview`;
    const previewEl = document.getElementById(previewId);
    if (previewEl) {
      previewEl.src = e.target.result;
      previewEl.style.display = 'block';
    }
  };
  reader.readAsDataURL(file);
}

function mostrarOverlayVerificacion() {
  let overlay = document.getElementById('verificationOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'verificationOverlay';
    overlay.style.position = 'absolute';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(13,12,10,0.96)';
    overlay.style.backdropFilter = 'blur(10px)';
    overlay.style.zIndex = '5000';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.padding = '24px';
    overlay.style.textAlign = 'center';
    
    overlay.innerHTML = `
      <div style="background: var(--card); border: 1.5px solid var(--border); border-radius: 24px; padding: 32px 24px; width: 100%; max-width: 320px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
        <div class="verif-spinner" style="width: 48px; height: 48px; border: 4px solid var(--border); border-top: 4px solid var(--orange); border-radius: 50%; margin: 0 auto 20px; animation: spin 1s linear infinite;"></div>
        <h3 style="font-family: var(--font-head); font-size: 18px; font-weight: 800; margin-bottom: 12px; color: var(--text);">Verificación KYC Fast</h3>
        <p id="verifStepText" style="font-size: 14px; font-weight: 600; color: var(--muted); line-height: 1.6;">Validando...</p>
      </div>
    `;
    
    if (!document.getElementById('spinStyle')) {
      const style = document.createElement('style');
      style.id = 'spinStyle';
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.querySelector('.app-shell').appendChild(overlay);
  }
  overlay.style.display = 'flex';
}

function cerrarOverlayVerificacion() {
  const overlay = document.getElementById('verificationOverlay');
  if (overlay) overlay.style.display = 'none';
}

function hacerRegistro() {
  const nombre = document.getElementById('regNombre').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPass').value.trim();
  const rut = document.getElementById('regRut').value.trim();
  const terms = document.getElementById('regTerms').checked;
  
  const docFront = document.getElementById('regDocFront').files[0];
  const docBack = document.getElementById('regDocBack').files[0];
  const selfie = document.getElementById('regSelfie').files[0];

  if (!nombre || !email || !pass || !rut) {
    mostrarToast("⚠️ Completa los campos obligatorios (*)");
    return;
  }
  if (!docFront || !docBack || !selfie) {
    mostrarToast("⚠️ Sube las fotos de tu cédula y selfie de validación.");
    return;
  }
  if (!terms) {
    mostrarToast("⚠️ Debes aceptar los términos y el sistema de garantías.");
    return;
  }

  // Prevenir multicuentas
  if (REGISTRO_RUTS.includes(rut)) {
    mostrarToast("❌ Este RUT ya tiene una cuenta registrada.");
    return;
  }

  // Iniciar simulación de verificación
  mostrarOverlayVerificacion();
  
  setTimeout(() => {
    REGISTRO_RUTS.push(rut);
    cerrarOverlayVerificacion();
    
    usuarioActual = { nombre, email, rut };
    
    // Limpiar campos del formulario de registro
    ['regNombre', 'regEmail', 'regPass', 'regRut'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    document.getElementById('regTerms').checked = false;
    
    // Limpiar archivos e imágenes previas del registro
    ['regDocFront', 'regDocBack', 'regSelfie'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    ['regDocFrontPreview', 'regDocBackPreview', 'regSelfiePreview'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });

    entrarAlApp();
  }, 2500);
}

function entrarAlApp() {
  document.getElementById('authScreen').style.display = 'none';
  document.getElementById('appContent').style.display = 'block';
  document.getElementById('bottomNav').style.display = 'flex';
  if (usuarioActual) {
    const el = document.getElementById('perfilNombre');
    if (el) el.textContent = usuarioActual.nombre;
  }
  renderList();
  setTimeout(() => initMaps(), 300);
  mostrarToast(`✅ Bienvenido/a, ${usuarioActual.nombre}`);
}

function cerrarSesion() {
  document.getElementById('appContent').style.display = 'none';
  document.getElementById('bottomNav').style.display = 'none';
  document.getElementById('authScreen').style.display = 'flex';
  mostrarPanel('panelLogin');
  usuarioActual = null;
  mostrarToast('👋 Sesión cerrada');
}

// ---- FILTRADO ----
function getFiltered() {
  return ITEMS.filter(it => {
    const matchCat = catActual === 'todos' || it.cat === catActual;
    const q = queryActual.toLowerCase();
    const matchQ = !q || it.nombre.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q);
    return matchCat && matchQ;
  });
}

// ---- RENDER LIST ----
function renderList() {
  const items = getFiltered();
  const scroll = document.getElementById('listScroll');
  document.getElementById('vtCount').textContent = `${items.length} objeto${items.length!==1?'s':''}`;
  scroll.innerHTML = '';
  if (!items.length) {
    scroll.innerHTML = `<div class="empty-state"><span class="ei">🔍</span><h3>Sin resultados</h3><p>Prueba otra categoría</p></div>`;
    return;
  }
  items.forEach((it, i) => {
    const card = document.createElement('div');
    card.className = 'lcard';
    card.style.animationDelay = `${i*0.05}s`;
    card.onclick = () => abrirModal(it.id);
    card.innerHTML = `
      <div class="lcard-img"><img src="${it.img}" alt="${it.nombre}"/></div>
      <div class="lcard-body">
        <div class="lcard-name">${it.nombre}</div>
        <div class="lcard-loc">📍 ${it.dist}km · ${it.duen.split('·')[1]?.trim()||''}</div>
        <div class="lcard-footer">
          <div class="lcard-price">$${it.precio.toLocaleString('es-CL')}<small>/hora</small></div>
          <span class="lcard-badge ${it.ok?'ok':'no'}">${it.ok?'● Disp.':'○ No disp.'}</span>
        </div>
      </div>`;
    scroll.appendChild(card);
  });
}

// ---- RENDER SHEET ----
function renderSheet(items) {
  const sheet = document.getElementById('sheetScroll');
  sheet.innerHTML = '';
  items.forEach(it => {
    const mc = document.createElement('div');
    mc.className = 'mcard';
    mc.onclick = () => abrirModal(it.id);
    mc.innerHTML = `
      <div class="mcard-imgwrap"><img src="${it.img}" alt="${it.nombre}"/></div>
      <div class="mcard-name">${it.nombre}</div>
      <div class="mcard-price">$${it.precio.toLocaleString('es-CL')}/hr</div>
      <div class="mcard-dist">📍 ${it.dist}km</div>`;
    sheet.appendChild(mc);
  });
}

// ---- INIT MAPS ----
function initMaps() {
  const center = [userLat, userLng];
  if (!mapExplora) {
    mapExplora = L.map('leafletMap',{center,zoom:15,zoomControl:true,attributionControl:false});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(mapExplora);
    agregarMarcadores(mapExplora);
    addYouMarker(mapExplora,center);
  }
  if (!mapFull) {
    mapFull = L.map('fullMap',{center,zoom:15,zoomControl:true,attributionControl:false});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(mapFull);
    agregarMarcadores(mapFull,true);
    addYouMarker(mapFull,center);
  }
  renderSheet(getFiltered());
}

function agregarMarcadores(map) {
  ITEMS.forEach(it => {
    const icon = L.divIcon({
      className:'',
      html:`<div class="custom-marker" style="${it.ok?'':'opacity:0.5;filter:grayscale(1)'}"><span class="marker-inner">📍</span></div>`,
      iconSize:[28,28], iconAnchor:[14,28], popupAnchor:[0,-30],
    });
    L.marker([it.lat,it.lng],{icon}).addTo(map).bindPopup(`
      <div class="popup-name">${it.nombre}</div>
      <div class="popup-price">$${it.precio.toLocaleString('es-CL')}/hora</div>
      <button class="popup-btn" onclick="abrirModal(${it.id})">${it.ok?'Arrendar ahora →':'No disponible'}</button>
    `);
  });
}

// ---- TABS ----
function setTab(name, el) {
  tabActual = name;
  document.querySelectorAll('.tab-view').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${name}`).classList.add('active');
  document.querySelectorAll('.bn-item').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  if (name==='mapa')      setTimeout(() => mapFull && mapFull.invalidateSize(), 100);
  if (name==='publicar')  setTimeout(() => initPubMap(), 100);
  if (name==='arriendos') renderArriendos();
  if (name==='mensajes')  renderMensajes();
  if (name==='perfil')    actualizarMisPubs();
}

// ---- VISTA LISTA/MAPA ----
function setVista(v) {
  vistaActual = v;
  const listView = document.getElementById('listView');
  const mapView  = document.getElementById('mapView');
  document.getElementById('btnList').classList.toggle('active', v==='list');
  document.getElementById('btnMap').classList.toggle('active', v==='map');
  if (v==='list') {
    listView.style.display=''; mapView.style.display='none';
  } else {
    listView.style.display='none'; mapView.style.display='flex';
    renderSheet(getFiltered());
    setTimeout(() => mapExplora && mapExplora.invalidateSize(), 100);
  }
}

// ---- CATEGORÍA ----
function setCategoria(el, cat) {
  catActual = cat;
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  renderList();
  if (vistaActual==='map') renderSheet(getFiltered());
}

function limpiarBusqueda() {
  document.getElementById('searchInput').value = ''; queryActual = '';
  document.getElementById('searchClear').classList.remove('show');
  renderList();
}

// ---- MODAL ARRIENDO (BOTTOM SHEET) ----
function abrirModal(id) {
  itemModal = ITEMS.find(i => i.id===id);
  if (!itemModal) return;
  horasModal = 1;
  document.getElementById('bsmContent').innerHTML = `
    <div class="bsm-imgwrap"><img src="${itemModal.img}"></div>
    <div class="bsm-title">${itemModal.nombre}</div>
    <div class="bsm-owner">📍 ${itemModal.duen} · ${itemModal.dist}km</div>
    <p class="bsm-desc">${itemModal.desc}</p>
    <div class="bsm-grid">
      <div class="bsm-cell"><span class="bsm-cell-label">Precio/hora</span><span class="bsm-cell-val">$${itemModal.precio}</span></div>
      <div class="bsm-cell"><span class="bsm-cell-label">Garantía</span><span class="bsm-cell-val">$${itemModal.dep}</span></div>
    </div>
    <div class="hours-section">
      <div class="hours-ctrl">
        <button class="h-btn" onclick="cambiarHoras(-1)">−</button>
        <div class="h-val" id="hVal">1 h</div>
        <button class="h-btn" onclick="cambiarHoras(1)">+</button>
      </div>
    </div>
    <div class="total-box">
      <div class="total-right" id="totalVal">$${itemModal.precio}</div>
    </div>
    <button class="btn-confirm" ${itemModal.ok?'':'disabled'} onclick="${itemModal.ok?'iniciarChat()':''}">
      ${itemModal.ok ? 'Enviar mensaje 💬' : 'No disponible'}
    </button>
  `;
  document.getElementById('modalOverlay').classList.add('open');
}

function cambiarHoras(d) {
  if (!itemModal) return;
  horasModal = Math.max(1, Math.min(72, horasModal+d));
  document.getElementById('hVal').textContent = horasModal + ' h';
  document.getElementById('totalVal').textContent = `$${itemModal.precio*horasModal}`;
}

function cerrarModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  itemModal = null;
}

// ---- 1. INICIAR CHAT Y NEGOCIACIÓN ----
let chatActivo = null;

function iniciarChat() {
  if (!itemModal) return;
  
  const nuevoChat = {
    idChat: Date.now(),
    item: itemModal,
    precioPropuesto: itemModal.precio,
    horasPropuestas: horasModal,
    minutosPropuestos: 0,
    tipoCobro: 'hora',
    propuestoPor: 'yo', // 'yo' o 'dueno'
    estado: 'Negociando', // Estados: Negociando, Acordado, Pagado
    mensajes: [
      { emisor: 'yo', texto: `Hola, me interesa arrendar ${itemModal.nombre}.` }
    ]
  };
  
  MENSAJES_DATA.unshift(nuevoChat);

  const idx = ITEMS.findIndex(i => i.id===itemModal.id);
  if (idx!==-1) ITEMS[idx].ok = false;

  cerrarModal();
  renderList();
  setTab('mensajes', document.querySelector('[data-tab="mensajes"]'));
  abrirChat(nuevoChat.idChat);
}

// ---- CHAT Y MENSAJERÍA ----
function renderMensajes() {
  const list = document.getElementById('mensajesList');
  if (MENSAJES_DATA.length === 0) {
    list.innerHTML = `<div class="empty-state"><h3>Bandeja vacía</h3><p>Aún no has contactado a nadie.</p></div>`;
    return;
  }
  
  let html = '';
  MENSAJES_DATA.forEach(chat => {
    let ultimoMsg = chat.mensajes.length ? chat.mensajes[chat.mensajes.length-1].texto : '';
    html += `
    <div class="chat-card" style="cursor:pointer;" onclick="abrirChat(${chat.idChat})">
      <div class="chat-header" style="margin-bottom:0;">
        <div class="chat-thumb"><img src="${chat.item.img}"></div>
        <div style="flex:1; min-width:0;">
          <div class="chat-title" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${chat.item.nombre}</div>
          <div style="font-size:12px; color:var(--muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${ultimoMsg}</div>
        </div>
        <div class="chat-status ${chat.estado}">${chat.estado}</div>
      </div>
    </div>`;
  });
  list.innerHTML = html;
}

function calcularTotalesNego(chat) {
  const h = parseInt(chat.horasPropuestas) || 0;
  const m = parseInt(chat.minutosPropuestos) || 0;
  const totalHoras = h + (m / 60);
  
  let totalPrecio = 0;
  if (chat.tipoCobro === 'total') {
    totalPrecio = chat.precioPropuesto;
  } else {
    totalPrecio = Math.round(chat.precioPropuesto * totalHoras);
  }
  
  return { totalHoras, totalPrecio };
}

function formatDuracion(h, m) {
  let text = "";
  if (h > 0) text += `${h}h`;
  if (m > 0) text += (text ? " " : "") + `${m}m`;
  return text || "0m";
}

function toggleTipoCobro() {
  const select = document.getElementById('negoTipoCobro');
  const label = document.getElementById('negoPrecioLabel');
  if (select && label) {
    label.textContent = select.value === 'total' ? 'Precio Total ($)' : 'Precio / hora ($)';
  }
}

function toggleNegoPanelBody() {
  const body = document.getElementById('chatNegoBody');
  const icon = document.getElementById('negoToggleIcon');
  if (body && icon) {
    if (body.style.display === 'none') {
      body.style.display = 'block';
      icon.textContent = '▼';
    } else {
      body.style.display = 'none';
      icon.textContent = '▲';
    }
  }
}

function abrirChat(idChat) {
  chatActivo = MENSAJES_DATA.find(c => c.idChat === idChat);
  if (!chatActivo) return;

  document.getElementById('mensajesListWrap').style.display = 'none';
  document.getElementById('activeChatView').style.display = 'flex';
  
  document.getElementById('chatHeaderImg').src = chatActivo.item.img;
  document.getElementById('chatHeaderName').textContent = chatActivo.item.nombre;
  document.getElementById('chatHeaderOwner').textContent = chatActivo.item.duen.split('·')[0];

  const negoBody = document.getElementById('chatNegoBody');
  const negoIcon = document.getElementById('negoToggleIcon');
  if (negoBody && negoIcon) {
    negoBody.style.display = 'block';
    negoIcon.textContent = '▼';
  }

  renderMensajesChat();
  renderPanelNegociacion();
}

function cerrarChat() {
  chatActivo = null;
  document.getElementById('activeChatView').style.display = 'none';
  document.getElementById('mensajesListWrap').style.display = 'flex';
  renderMensajes(); // update list with latest messages
}

function renderMensajesChat() {
  if(!chatActivo) return;
  const area = document.getElementById('chatMessagesArea');
  let html = '';
  chatActivo.mensajes.forEach(m => {
    if(m.emisor === 'sys') {
      html += `<div class="msg-sys">${m.texto}</div>`;
    } else {
      const cls = m.emisor === 'yo' ? 'me' : 'other';
      html += `<div class="msg-bubble ${cls}">${m.texto}</div>`;
    }
  });
  area.innerHTML = html;
  area.scrollTop = area.scrollHeight;
}

function enviarMensajeTexto() {
  if(!chatActivo) return;
  const input = document.getElementById('chatInputText');
  const txt = input.value.trim();
  if(!txt) return;
  chatActivo.mensajes.push({ emisor: 'yo', texto: txt });
  input.value = '';
  renderMensajesChat();
}

function renderPanelNegociacion() {
  if(!chatActivo) return;
  const panel = document.getElementById('chatNegoPanel');
  const actions = document.getElementById('negoActions');
  const pInput = document.getElementById('negoPrecio');
  const hInput = document.getElementById('negoHoras');
  const mInput = document.getElementById('negoMinutos');
  const tcSelect = document.getElementById('negoTipoCobro');
  const pLabel = document.getElementById('negoPrecioLabel');

  if(chatActivo.estado === 'Pagado') {
    panel.style.display = 'none';
    return;
  }
  panel.style.display = 'block';
  
  if (!chatActivo.tipoCobro) chatActivo.tipoCobro = 'hora';
  if (chatActivo.minutosPropuestos === undefined) chatActivo.minutosPropuestos = 0;
  
  tcSelect.value = chatActivo.tipoCobro;
  pLabel.textContent = chatActivo.tipoCobro === 'total' ? 'Precio Total ($)' : 'Precio / hora ($)';
  pInput.value = chatActivo.precioPropuesto;
  hInput.value = chatActivo.horasPropuestas;
  mInput.value = chatActivo.minutosPropuestos;

  const { totalPrecio } = calcularTotalesNego(chatActivo);
  const duracionTexto = formatDuracion(chatActivo.horasPropuestas, chatActivo.minutosPropuestos);

  let html = '';
  if(chatActivo.estado === 'Negociando') {
    pInput.disabled = false; hInput.disabled = false; mInput.disabled = false; tcSelect.disabled = false;
    if(chatActivo.propuestoPor === 'yo') {
      html += `<div style="font-size:11px; color:var(--orange); text-align:center; margin-bottom:8px;">Esperando respuesta del dueño... (Total propuesto: $${totalPrecio.toLocaleString('es-CL')})</div>`;
      html += `<button class="btn-nego" onclick="proponerNegociacion()">Modificar mi propuesta</button>`;
      html += `<button class="btn-nego" style="border-style:dashed;" onclick="simularDuenoPropone()">Simular: Dueño contraoferta</button>`;
      html += `<button class="btn-nego" style="border-style:dashed;" onclick="simularDuenoAcepta()">Simular: Dueño acepta</button>`;
    } else {
      const rateText = chatActivo.tipoCobro === 'total' ? 'precio fijo total' : `$${chatActivo.precioPropuesto}/hr`;
      html += `<div style="font-size:11px; color:var(--orange); text-align:center; margin-bottom:8px;">El dueño propone: ${rateText} por ${duracionTexto} (Total: $${totalPrecio.toLocaleString('es-CL')})</div>`;
      html += `<button class="btn-nego primary" onclick="aceptarNegociacion()">Aceptar propuesta del dueño</button>`;
      html += `<button class="btn-nego" onclick="proponerNegociacion()">Hacer contraoferta</button>`;
    }
  } else if (chatActivo.estado === 'Acordado') {
    pInput.disabled = true; hInput.disabled = true; mInput.disabled = true; tcSelect.disabled = true;
    html += `<div style="font-size:12px; color:var(--green); text-align:center; margin-bottom:8px; font-weight:700;">🤝 Condiciones aceptadas (Total: $${totalPrecio.toLocaleString('es-CL')})</div>`;
    html += `<button class="btn-nego success" onclick="pagarArriendo(${chatActivo.idChat})">Pagar Arriendo y Confirmar</button>`;
  }
  
  actions.innerHTML = html;
}

function proponerNegociacion() {
  if(!chatActivo) return;
  const np = parseInt(document.getElementById('negoPrecio').value);
  const nh = parseInt(document.getElementById('negoHoras').value) || 0;
  const nm = parseInt(document.getElementById('negoMinutos').value) || 0;
  const tc = document.getElementById('negoTipoCobro').value;

  if(isNaN(np) || np <= 0 || (nh === 0 && nm === 0) || nh < 0 || nm < 0 || nm >= 60) {
    mostrarToast('⚠️ Ingresa valores válidos (Precio > 0 y Duración > 0)');
    return;
  }

  chatActivo.precioPropuesto = np;
  chatActivo.horasPropuestas = nh;
  chatActivo.minutosPropuestos = nm;
  chatActivo.tipoCobro = tc;
  chatActivo.propuestoPor = 'yo';

  const { totalPrecio } = calcularTotalesNego(chatActivo);
  const duracionTexto = formatDuracion(nh, nm);
  const tipoTexto = tc === 'total' ? ` fijo` : `/hr`;

  chatActivo.mensajes.push({ emisor: 'sys', texto: `Propusiste $${np}${tipoTexto} por ${duracionTexto} (Total: $${totalPrecio.toLocaleString('es-CL')}).` });
  
  renderMensajesChat();
  renderPanelNegociacion();
}

function simularDuenoPropone() {
  if(!chatActivo) return;

  if (!chatActivo.tipoCobro) chatActivo.tipoCobro = 'hora';
  if (chatActivo.minutosPropuestos === undefined) chatActivo.minutosPropuestos = 0;

  if (chatActivo.tipoCobro === 'total') {
    chatActivo.precioPropuesto = Math.round(chatActivo.precioPropuesto * 1.08);
  } else {
    chatActivo.precioPropuesto = Math.round(chatActivo.item.precio * 1.1);
  }

  chatActivo.propuestoPor = 'dueno';

  const { totalPrecio } = calcularTotalesNego(chatActivo);
  const duracionTexto = formatDuracion(chatActivo.horasPropuestas, chatActivo.minutosPropuestos);
  const tipoTexto = chatActivo.tipoCobro === 'total' ? ` fijo` : `/hr`;

  chatActivo.mensajes.push({ emisor: 'dueno', texto: `Te propongo $${chatActivo.precioPropuesto}${tipoTexto}. ¿Te parece?` });
  chatActivo.mensajes.push({ emisor: 'sys', texto: `El dueño propuso $${chatActivo.precioPropuesto}${tipoTexto} por ${duracionTexto} (Total: $${totalPrecio.toLocaleString('es-CL')}).` });
  
  renderMensajesChat();
  renderPanelNegociacion();
}

function simularDuenoAcepta() {
  if(!chatActivo) return;
  chatActivo.propuestoPor = 'dueno'; // dueño lo acepta
  chatActivo.estado = 'Acordado';
  chatActivo.mensajes.push({ emisor: 'dueno', texto: `Perfecto, acepto tus condiciones.` });
  chatActivo.mensajes.push({ emisor: 'sys', texto: `🤝 El dueño ha aceptado la propuesta.` });
  renderMensajesChat();
  renderPanelNegociacion();
}

function aceptarNegociacion() {
  if(!chatActivo) return;
  chatActivo.propuestoPor = 'yo'; 
  chatActivo.estado = 'Acordado';
  chatActivo.mensajes.push({ emisor: 'yo', texto: `Perfecto, acepto las condiciones.` });
  chatActivo.mensajes.push({ emisor: 'sys', texto: `🤝 Has aceptado la propuesta.` });
  renderMensajesChat();
  renderPanelNegociacion();
}

// ---- 2. PAGO DEL ARRIENDO ----
function pagarArriendo(idChat) {
  const chat = MENSAJES_DATA.find(c => c.idChat === idChat);
  if(!chat || chat.estado !== 'Acordado') return;

  const codigo4Digitos = Math.floor(1000 + Math.random() * 9000).toString();
  const { totalHoras, totalPrecio } = calcularTotalesNego(chat);

  MIS_ARRIENDOS_DATA.unshift({
    id: Date.now(),
    itemId: chat.item.id,
    img: chat.item.img,
    nombre: chat.item.nombre,
    duen: chat.item.duen.split('·')[0].trim(),
    duracionHoras: totalHoras,
    precio: totalPrecio,
    dep: chat.item.dep,
    estado: 'Pagado', 
    codigo: codigo4Digitos,
    tiempoInicio: null
  });

  chat.estado = 'Pagado';
  chat.mensajes.push({ emisor: 'sys', texto: `💳 Has pagado $${totalPrecio.toLocaleString('es-CL')}. Revisa Mis Arriendos.` });
  
  if(chatActivo && chatActivo.idChat === chat.idChat) {
    renderMensajesChat();
    renderPanelNegociacion();
  } else {
    renderMensajes();
  }
  
  setTimeout(() => {
    cerrarChat();
    setTab('arriendos', document.querySelector('[data-tab="arriendos"]'));
    mostrarToast("Pago exitoso. Revisa Mis Arriendos.");
  }, 1000);
}

// ---- 3. VISTA EN MIS ARRIENDOS Y CÓDIGO ----
function renderArriendos() {
  const cont = document.getElementById('arriendosContent');
  if (!cont) return;

  if (MIS_ARRIENDOS_DATA.length === 0) {
    cont.innerHTML = `<div class="arr-empty"><span class="ae-icon">📋</span><h3>Aún no tienes arriendos</h3><p>Explora objetos y arrienda el primero.</p></div>`;
    return;
  }

  let html = '';
  MIS_ARRIENDOS_DATA.forEach(a => {
    html += `
    <div class="arr-card" style="margin-bottom:12px;">
      <div class="arr-card-header">
        <div class="arr-card-thumb"><img src="${a.img}"></div>
        <div class="arr-card-info">
          <div class="arr-card-name">${a.nombre}</div>
          <div class="arr-card-owner">Dueño: ${a.duen}</div>
        </div>
        <span class="arr-status ${a.estado}">${a.estado}</span>
      </div>
      <div class="arr-card-body">
        ${a.estado === 'Pagado' ? `
          <div class="confirm-strip">
            <div style="font-size:12px; color:var(--muted); margin-bottom: 8px; text-align: center;">Pago confirmado. Reúnete con el dueño para recibir el objeto.</div>
            <button class="confirm-strip-btn" onclick="verCodigo(${a.id})">Ver código de entrega</button>
          </div>
        ` : (a.estado === 'activo' ? `
          <div style="font-size:12px; color:var(--green); text-align:center;">✓ Objeto en tus manos. Tiempo corriendo.</div>
          <div class="arr-timer" id="timer-${a.id}">--:--:--</div>
        ` : (a.estado === 'finalizado' ? `
          <div style="background:rgba(255,59,48,0.1);color:#ff3b30;border:1.5px solid #ff3b30;border-radius:8px;padding:6px;text-align:center;font-size:11px;font-weight:700;margin-bottom:8px;">⏰ Tiempo de arriendo finalizado</div>
          <div style="font-size:12px; color:var(--text); text-align:center;">Por favor devuelve el objeto al dueño. Esperando confirmación de devolución...</div>
        ` : `
          <div style="background:var(--card);color:var(--muted);border:1.5px solid var(--border);border-radius:8px;padding:6px;text-align:center;font-size:11px;font-weight:700;">✅ Objeto devuelto exitosamente</div>
        `))}
      </div>
    </div>`;
  });
  cont.innerHTML = html;
}

// ---- 4. VER CÓDIGO Y VALIDACIÓN ----
function verCodigo(idArriendo) {
  const arr = MIS_ARRIENDOS_DATA.find(a => a.id === idArriendo);
  if(!arr) return;

  document.getElementById('cdIcon').textContent = '🔑';
  document.getElementById('cdTitle').textContent = 'Tu Código de Entrega';
  document.getElementById('cdText').textContent = 'Muestra este código al dueño únicamente cuando tengas el objeto en tus manos. Esto iniciará el tiempo acordado.';
  
  document.getElementById('cdAlert').style.display = 'block';

  document.getElementById('cdCodeWrap').style.display = 'block';
  document.getElementById('cdCode').textContent = arr.codigo;
  document.getElementById('cdInputWrap').style.display = 'none';

  const btnConfirm = document.getElementById('cdConfirm');
  btnConfirm.textContent = 'Cerrar';
  btnConfirm.onclick = cerrarConfirmDialog;
  document.getElementById('cdCancel').style.display = 'none';

  document.getElementById('confirmDialogOverlay').classList.add('open');
}

// ---- IMAGEN PREVIEW & MAPA PUBLICACIÓN ----
function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    imagenPublicacionBase64 = e.target.result;
    const preview = document.getElementById('pImagePreview');
    preview.src = imagenPublicacionBase64;
    preview.style.display = 'block';
    
    // Ocultar icono y texto
    const uploadBox = document.getElementById('imageUploadBox');
    uploadBox.querySelector('.upload-icon').style.display = 'none';
    uploadBox.querySelector('.upload-text').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function initPubMap() {
  const center = [userLat, userLng];
  if (!mapPub) {
    mapPub = L.map('pubMap', {
      center: center,
      zoom: 15,
      zoomControl: true,
      attributionControl: false
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(mapPub);

    markerPub = L.marker(center, { draggable: true }).addTo(mapPub);

    document.getElementById('pLat').value = center[0];
    document.getElementById('pLng').value = center[1];

    markerPub.on('dragend', function(e) {
      const latlng = markerPub.getLatLng();
      document.getElementById('pLat').value = latlng.lat;
      document.getElementById('pLng').value = latlng.lng;
    });

    mapPub.on('click', function(e) {
      markerPub.setLatLng(e.latlng);
      document.getElementById('pLat').value = e.latlng.lat;
      document.getElementById('pLng').value = e.latlng.lng;
    });
  } else {
    mapPub.setView(center, 15);
    markerPub.setLatLng(center);
    document.getElementById('pLat').value = center[0];
    document.getElementById('pLng').value = center[1];
    setTimeout(() => {
      mapPub.invalidateSize();
    }, 100);
  }
}

function refreshMapMarkers() {
  if (mapExplora) {
    mapExplora.eachLayer(layer => {
      if (layer instanceof L.Marker && layer.getPopup() && !layer.getPopup().getContent().includes('📍 Tú estás aquí')) {
        mapExplora.removeLayer(layer);
      }
    });
    agregarMarcadores(mapExplora);
  }
  if (mapFull) {
    mapFull.eachLayer(layer => {
      if (layer instanceof L.Marker && layer.getPopup() && !layer.getPopup().getContent().includes('📍 Tú estás aquí')) {
        mapFull.removeLayer(layer);
      }
    });
    agregarMarcadores(mapFull);
  }
}

function irAlChatDePublicacion(itemId) {
  const chat = MENSAJES_DATA.find(c => c.item.id === itemId);
  if (chat) {
    setTab('mensajes', document.querySelector('[data-tab="mensajes"]'));
    abrirChat(chat.idChat);
  } else {
    mostrarToast("⚠️ No se encontró chat para este objeto.");
  }
}

function verInfoContacto() {
  if (!chatActivo) return;
  
  const isOwner = chatActivo.item.duen.startsWith('Tú');
  
  let nombre = "";
  let rol = "";
  let email = "";
  let telefono = "";
  let avatar = "👤";
  let extra = "";

  if (isOwner) {
    nombre = usuarioActual ? usuarioActual.nombre : "Nuevo Cliente";
    rol = "Arrendatario (Cliente)";
    email = usuarioActual ? usuarioActual.email : "cliente@correo.com";
    telefono = "+56 9 7788 9900";
    avatar = "👤";
    extra = "⭐ Recién llegado · 1 arriendo activo";
  } else {
    const parts = chatActivo.item.duen.split('·');
    nombre = parts[0].trim();
    rol = "Dueño del Objeto (Arrendador)";
    const rawName = nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
    email = `${rawName}@correo.com`;
    telefono = "+56 9 " + Math.floor(50000000 + Math.random() * 49999999);
    avatar = "🎒";
    extra = `⭐ ${chatActivo.item.rating || '4.8'} (${chatActivo.item.rev || '12'} valoraciones)`;
  }

  document.getElementById('bsmContent').innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="font-size: 54px; margin-bottom: 10px;">${avatar}</div>
      <h3 style="font-family: var(--font-head); font-size: 22px; font-weight: 800; margin-bottom: 4px;">${nombre}</h3>
      <span style="font-size: 12px; color: var(--orange); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${rol}</span>
    </div>
    
    <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
      <div style="background: var(--card2); border: 1px solid var(--border); border-radius: 12px; padding: 14px; display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 20px;">📞</span>
        <div>
          <div style="font-size: 10px; color: var(--muted); text-transform: uppercase; font-weight: 700;">Teléfono</div>
          <div style="font-size: 14px; font-weight: 600; color: var(--text);">${telefono}</div>
        </div>
      </div>
      
      <div style="background: var(--card2); border: 1px solid var(--border); border-radius: 12px; padding: 14px; display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 20px;">✉️</span>
        <div>
          <div style="font-size: 10px; color: var(--muted); text-transform: uppercase; font-weight: 700;">Correo Electrónico</div>
          <div style="font-size: 14px; font-weight: 600; color: var(--text);">${email}</div>
        </div>
      </div>
      
      <div style="background: var(--card2); border: 1px solid var(--border); border-radius: 12px; padding: 14px; display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 20px;">📊</span>
        <div>
          <div style="font-size: 10px; color: var(--muted); text-transform: uppercase; font-weight: 700;">Reputación</div>
          <div style="font-size: 14px; font-weight: 600; color: var(--text);">${extra}</div>
        </div>
      </div>
    </div>
    
    <button class="btn-confirm" onclick="cerrarModal()">Cerrar</button>
  `;
  document.getElementById('modalOverlay').classList.add('open');
}

// ---- PUBLICAR OBJETO (DUEÑO) ----
function publicarObjeto() {
  const nombre = document.getElementById('pNombre').value.trim();
  const cat = document.getElementById('pCategoria').value;
  const precio = parseInt(document.getElementById('pPrecio').value);
  const dep = parseInt(document.getElementById('pDeposito').value) || (precio * 5);
  const desc = document.getElementById('pDesc').value.trim() || 'Publicado desde la App.';
  const dir = document.getElementById('pDir').value.trim() || 'Tu barrio';

  if (!nombre || !cat || isNaN(precio)) { mostrarToast('⚠️ Completa los datos obligatorios *'); return; }

  const pinEspejo = Math.floor(1000 + Math.random() * 9000).toString();

  const latVal = parseFloat(document.getElementById('pLat').value) || userLat;
  const lngVal = parseFloat(document.getElementById('pLng').value) || userLng;

  // Si no se subió una imagen, usar una genérica
  const finalImg = imagenPublicacionBase64 || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=80';

  const nuevo = {
    id: ITEMS.length + 100,
    nombre,
    cat,
    precio,
    dep,
    img: finalImg,
    dist: 0.1,
    lat: latVal,
    lng: lngVal,
    duen: `Tú · ${dir}`,
    desc: desc,
    ok: true,
    estadoPropio: 'pendiente', 
    codigoEspejo: pinEspejo
  };
  
  ITEMS.unshift(nuevo);

  // Limpiar campos del formulario
  ['pNombre','pPrecio','pDeposito','pDesc','pDir','pLat','pLng'].forEach(id => { 
    const el = document.getElementById(id); 
    if (el) el.value = ''; 
  });
  
  // Limpiar imagen cargada
  const fileInput = document.getElementById('pImageFile');
  if (fileInput) fileInput.value = '';
  const preview = document.getElementById('pImagePreview');
  if (preview) {
    preview.src = '';
    preview.style.display = 'none';
  }
  const uploadBox = document.getElementById('imageUploadBox');
  if (uploadBox) {
    uploadBox.querySelector('.upload-icon').style.display = 'block';
    uploadBox.querySelector('.upload-text').style.display = 'block';
  }
  imagenPublicacionBase64 = null;

  actualizarMisPubs();
  renderList();
  refreshMapMarkers();
  
  setTab('perfil', document.querySelector('[data-tab="perfil"]'));
  mostrarToast(`🚀 Publicado. PIN de simulación: ${pinEspejo}`);
}

// ---- ACTUALIZAR PERFIL Y VALIDAR ENTREGAS (DUEÑO) ----
function actualizarMisPubs() {
  const misPubs = document.getElementById('misPubs');
  const propios = ITEMS.filter(i => i.duen && i.duen.startsWith('Tú'));
  
  if (!propios.length) { 
    misPubs.innerHTML = '<div class="empty-pubs">Aún no has publicado objetos para ganar dinero.</div>'; 
    return; 
  }
  
  misPubs.innerHTML = propios.map(it => {
    const chat = MENSAJES_DATA.find(c => c.item.id === it.id);
    const chatBtn = chat ? `<button class="pub-action-btn chat" onclick="irAlChatDePublicacion(${it.id})">💬 Ir al chat del cliente</button>` : '';
    
    return `
      <div class="pub-card" style="margin-bottom:12px; display:flex;">
        <div class="pub-card-img" style="width:80px; flex-shrink:0;"><img src="${it.img}" style="width:100%; height:100%; object-fit:cover;"></div>
        <div class="pub-card-body" style="flex:1; padding:12px; display:flex; flex-direction:column; gap:6px;">
          <div style="font-size:13px; font-weight:700;">${it.nombre}</div>
          <div style="font-size:14px; font-weight:800; color:var(--orange)">$${it.precio}<small>/hr</small></div>
          <div class="pub-btn-row" style="display:flex; flex-direction:column; gap:6px; width:100%;">
            ${it.estadoPropio === 'pendiente' 
              ? `<button class="pub-action-btn confirm" onclick="abrirPopupValidacionDueno(${it.id})">🤝 Confirmar entrega (Ingresar PIN)</button>`
              : (it.estadoPropio === 'activo' ? `
                <div style="background:var(--card);color:var(--green);border:1.5px solid var(--green);border-radius:8px;padding:6px;text-align:center;font-size:11px;font-weight:700;">⚡ Objeto en uso (Activo)</div>
                <div style="text-align:center;">
                  <div style="font-size:10px; color:var(--muted); text-transform:uppercase; font-weight:700;">Tiempo Restante</div>
                  <div class="pub-timer" id="pub-timer-${it.id}">--:--:--</div>
                </div>
                <button class="pub-action-btn confirm" style="margin-top:6px; background:var(--card2); color:var(--text); border:1px solid var(--border);" onclick="simularFinTiempo(${it.id})">⏩ Simular fin del tiempo</button>
              ` : `
                <div style="background:rgba(255,59,48,0.1);color:#ff3b30;border:1.5px solid #ff3b30;border-radius:8px;padding:6px;text-align:center;font-size:11px;font-weight:700;">⏰ Tiempo finalizado</div>
                <div style="display:flex; flex-direction:column; gap:6px; margin-top:6px;">
                  <button class="pub-action-btn confirm" style="background:#34c759; color:white; border:none;" onclick="confirmarDevolucion(${it.id})">✅ Confirmar devolución OK</button>
                  <button class="pub-action-btn confirm" style="background:#ff3b30; color:white; border:none;" onclick="contactarSoporte(${it.id})">🚨 Problema / Soporte</button>
                </div>
              `)
            }
            ${chatBtn}
          </div>
        </div>
      </div>`;
  }).join('');
}

function abrirPopupValidacionDueno(idPublicacion) {
  pendingConfirmId = idPublicacion;

  document.getElementById('cdIcon').textContent = '🤝';
  document.getElementById('cdTitle').textContent = 'Confirmar Entrega';
  document.getElementById('cdText').textContent = 'Ingresa el código de 4 dígitos que el arrendatario te muestre en su pantalla.';
  
  document.getElementById('cdAlert').style.display = 'block';
  
  document.getElementById('cdCodeWrap').style.display = 'none';
  document.getElementById('cdInputWrap').style.display = 'block';
  document.getElementById('cdCodeInput').value = '';
  
  document.getElementById('cdCancel').style.display = 'block';
  
  const btnConfirm = document.getElementById('cdConfirm');
  btnConfirm.textContent = 'Validar Código';
  btnConfirm.onclick = verificarCodigoDeEntrega;

  document.getElementById('confirmDialogOverlay').classList.add('open');
}

function verificarCodigoDeEntrega() {
  const inputCode = document.getElementById('cdCodeInput').value.trim();
  const pub = ITEMS.find(i => i.id === pendingConfirmId);
  if (!pub) return;

  const arriendo = MIS_ARRIENDOS_DATA.find(a => a.codigo === inputCode);
  const esCorrecto = (pub.codigoEspejo === inputCode) || (arriendo !== undefined);

  if (esCorrecto) {
    pub.estadoPropio = 'activo';
    
    // Iniciar el tiempo exacto de uso
    if (arriendo) {
       arriendo.estado = 'activo';
       arriendo.tiempoInicio = Date.now(); 
    }
    
    cerrarConfirmDialog();
    actualizarMisPubs();
    renderArriendos();
    mostrarToast("✅ ¡Código validado! El tiempo de arriendo ha comenzado.");
  } else {
    mostrarToast("❌ Código incorrecto. Verifica con el cliente.");
  }
}

function cerrarConfirmDialog() {
  document.getElementById('confirmDialogOverlay').classList.remove('open');
  pendingConfirmId = null;
}

// ---- TEMPORIZADORES EN TIEMPO REAL ----
setInterval(actualizarTemporizadores, 1000);

function actualizarTemporizadores() {
  if(tabActual !== 'arriendos' && tabActual !== 'perfil') return; 
  
  if (tabActual === 'arriendos') {
    MIS_ARRIENDOS_DATA.forEach(a => {
      if(a.estado === 'activo' && a.tiempoInicio) {
        const el = document.getElementById(`timer-${a.id}`);
        if(el) {
          const fin = a.tiempoInicio + (a.duracionHoras * 3600000);
          const quedanMs = fin - Date.now();
          if(quedanMs <= 0) {
            el.textContent = "00:00:00";
            el.style.color = "var(--red)";
            el.style.textShadow = "0 0 10px rgba(240,74,74,0.3)";
          } else {
            const h = Math.floor(quedanMs / 3600000);
            const m = Math.floor((quedanMs % 3600000) / 60000);
            const s = Math.floor((quedanMs % 60000) / 1000);
            el.textContent = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
          }
        }
      }
    });
  }

  if (tabActual === 'perfil') {
    const propios = ITEMS.filter(i => i.duen && i.duen.startsWith('Tú') && i.estadoPropio === 'activo');
    propios.forEach(it => {
      const rental = MIS_ARRIENDOS_DATA.find(a => a.itemId === it.id && a.estado === 'activo');
      if (rental && rental.tiempoInicio) {
        const el = document.getElementById(`pub-timer-${it.id}`);
        if (el) {
          const fin = rental.tiempoInicio + (rental.duracionHoras * 3600000);
          const quedanMs = fin - Date.now();
          if (quedanMs <= 0) {
            el.textContent = "00:00:00";
            el.style.color = "var(--red)";
          } else {
            const h = Math.floor(quedanMs / 3600000);
            const m = Math.floor((quedanMs % 3600000) / 60000);
            const s = Math.floor((quedanMs % 60000) / 1000);
            el.textContent = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
          }
        }
      }
    });
  }
}

// ---- INFO MODALES ----
function mostrarInfoPago() {
  document.getElementById('bsmContent').innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="font-size: 40px; margin-bottom: 10px;">💳</div>
      <h3 style="font-family: var(--font-head); font-size: 22px; font-weight: 800; margin-bottom: 4px;">Información de Pago</h3>
    </div>
    <div style="background: var(--card2); border: 1px solid var(--border); border-radius: 12px; padding: 14px; margin-bottom: 24px;">
      <p style="font-size: 14px; line-height: 1.5; color: var(--text);">
        Los pagos en Arriendos Fast se realizan de forma segura mediante tarjetas de crédito o débito.<br><br>
        Al acordar un arriendo, se cobra el <strong>Precio Total</strong> del tiempo pactado y se realiza una <strong>retención preventiva</strong> por el monto de la Garantía en tu tarjeta.<br><br>
        El dinero del arriendo se libera al dueño una vez que ambas partes confirman la entrega del objeto.
      </p>
    </div>
    <button class="btn-confirm" onclick="cerrarModal()">Entendido</button>
  `;
  document.getElementById('modalOverlay').classList.add('open');
}

function mostrarInfoGarantia() {
  document.getElementById('bsmContent').innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="font-size: 40px; margin-bottom: 10px;">🛡️</div>
      <h3 style="font-family: var(--font-head); font-size: 22px; font-weight: 800; margin-bottom: 4px;">Sistema de Garantía</h3>
    </div>
    <div style="background: var(--card2); border: 1px solid var(--border); border-radius: 12px; padding: 14px; margin-bottom: 24px;">
      <p style="font-size: 14px; line-height: 1.5; color: var(--text);">
        La garantía es un seguro para proteger los objetos publicados.<br><br>
        <strong>¿Cómo funciona?</strong><br>
        Cuando pagas un arriendo, el sistema hace un bloqueo (retención) temporal en tu tarjeta por el monto de la garantía estipulada.<br><br>
        <strong>¿Cuándo se devuelve?</strong><br>
        Una vez devuelto el objeto en las mismas condiciones, la retención se cancela inmediatamente. Si el objeto presenta daños, el dueño puede solicitar parte o el total de la garantía, previa revisión de Arriendos Fast.
      </p>
    </div>
    <button class="btn-confirm" onclick="cerrarModal()">Entendido</button>
  `;
  document.getElementById('modalOverlay').classList.add('open');
}
function simularFinTiempo(id) {
  const pub = ITEMS.find(i => i.id === id);
  if(pub) {
    pub.estadoPropio = 'finalizado';
    const arriendo = MIS_ARRIENDOS_DATA.find(a => a.itemId === id && a.estado === 'activo');
    if (arriendo) arriendo.estado = 'finalizado';
    actualizarMisPubs();
    renderArriendos();
    mostrarToast("⏩ Simulación: El tiempo de arriendo ha finalizado.");
  }
}

function confirmarDevolucion(id) {
  const pub = ITEMS.find(i => i.id === id);
  if(pub) {
    pub.estadoPropio = 'pendiente';
    const arriendo = MIS_ARRIENDOS_DATA.find(a => a.itemId === id && a.estado === 'finalizado');
    if (arriendo) arriendo.estado = 'devuelto';
    mostrarToast("✅ Devolución confirmada. El objeto vuelve a estar disponible.");
    actualizarMisPubs();
    renderArriendos();
  }
}

function contactarSoporte(id) {
  document.getElementById('bsmContent').innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="font-size: 40px; margin-bottom: 10px;">🚨</div>
      <h3 style="font-family: var(--font-head); font-size: 22px; font-weight: 800; margin-bottom: 4px; color: var(--red);">Soporte por Retraso o Daño</h3>
    </div>
    <div style="background: var(--card2); border: 1px solid var(--border); border-radius: 12px; padding: 14px; margin-bottom: 24px;">
      <p style="font-size: 14px; line-height: 1.5; color: var(--text);">
        Al reportar un problema, abriremos un caso de mediación que congelará la garantía temporalmente.<br><br>
        <strong>⚠️ Atención:</strong> Este es un <strong>proceso manual y tardado</strong> (hasta 15 días hábiles), ya que nuestro equipo debe contactar al arrendatario, solicitar evidencias fotográficas, verificar posibles daños y validar los pagos antes de ejecutar la garantía o penalizaciones.<br><br>
        ¿Estás seguro que deseas iniciar este largo proceso y no puedes solucionarlo directamente con el cliente?
      </p>
    </div>
    <div style="display:flex; gap:10px; flex-direction:column;">
      <button class="btn-confirm" style="background: var(--red); color: white;" onclick="iniciarTicketSoporte()">Sí, iniciar caso de soporte</button>
      <button class="btn-confirm" style="background: var(--card); color: var(--text); border: 1px solid var(--border);" onclick="cerrarModal()">Cancelar</button>
    </div>
  `;
  document.getElementById('modalOverlay').classList.add('open');
}

function iniciarTicketSoporte() {
  cerrarModal();
  mostrarToast("Ticket de soporte abierto. El equipo de mediación te contactará por correo.");
}

function mostrarToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._to); t._to = setTimeout(() => t.classList.remove('show'), 3500);
}