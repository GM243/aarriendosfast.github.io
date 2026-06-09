// =====================
//  ARRIENDOS FAST — APP
// =====================

// ---- DATA ----
const ITEMS = [
  { id:1,  nombre:"Taladro Bosch GSB 550W",      cat:"herramientas", img:"https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=80", precio:1000, dep:15000, dist:0.3, rating:4.9, rev:24,  lat:-33.4342, lng:-70.6260, duen:"Francisco Meléndez · Barrio Italia",    desc:"Taladro percutor en excelente estado. Incluye set de brocas para madera y hormigón.",  ok:true  },
  { id:2,  nombre:"Proyector Epson Full HD",      cat:"audio",        img:"https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&q=80", precio:4000, dep:50000, dist:0.8, rating:4.7, rev:11, lat:-33.4365, lng:-70.6215, duen:"Joaquín Miño · Ñuñoa",                  desc:"Proyector 3000 lúmenes, 1080p. Incluye cable HDMI y mando. Ideal para presentaciones.",  ok:true  },
  { id:3,  nombre:"Carpa para eventos 4×4m",      cat:"eventos",      img:"https://images.unsplash.com/photo-1563299796-17596ed6b017?w=300&q=80", precio:8000, dep:40000, dist:1.1, rating:4.8, rev:9,  lat:-33.4320, lng:-70.6290, duen:"Miguel Retamales · Las Condes",          desc:"Carpa tipo pagoda impermeable 4×4m. Perfecta para cumpleaños al aire libre.",           ok:true  },
  { id:4,  nombre:"Sierra circular DeWalt 7\"",   cat:"herramientas", img:"https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300&q=80", precio:1500, dep:20000, dist:0.6, rating:4.6, rev:7,  lat:-33.4380, lng:-70.6240, duen:"Miguel T. · Providencia",                desc:"Sierra circular 1600W, disco para madera incluido.",                                   ok:false },
  { id:5,  nombre:"Parlante JBL Xtreme 3",        cat:"audio",        img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80", precio:2000, dep:15000, dist:0.4, rating:5.0, rev:18, lat:-33.4355, lng:-70.6275, duen:"Gabriel Morales · Manuel Montt",         desc:"Parlante bluetooth portátil resistente al agua. 15 horas de batería.",                 ok:true  },
  { id:6,  nombre:"Mesa + 8 sillas plegables",    cat:"eventos",      img:"https://images.unsplash.com/photo-1561677978-583a6c4c5d3e?w=300&q=80", precio:3500, dep:20000, dist:1.5, rating:4.4, rev:6,  lat:-33.4395, lng:-70.6205, duen:"Patricia L. · Macul",                   desc:"Mesa rectangular 180cm + 8 sillas. Para reuniones o cumpleaños.",                      ok:true  },
  { id:7,  nombre:"Nivel láser Bosch Quigo",      cat:"herramientas", img:"https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=80", precio:800,  dep:10000, dist:0.7, rating:4.9, rev:15, lat:-33.4335, lng:-70.6300, duen:"Andrés V. · Pedro de Valdivia",         desc:"Nivel láser de líneas cruzadas. Perfecto para colgar cuadros o nivelar muebles.",      ok:true  },
  { id:8,  nombre:"Carpa camping 3 personas",     cat:"camping",      img:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&q=80", precio:2500, dep:18000, dist:1.8, rating:4.3, rev:4,  lat:-33.4310, lng:-70.6230, duen:"Sebastián O. · Irarrázaval",            desc:"Carpa iglú 3 personas, impermeable. Incluye bolso de transporte.",                     ok:true  },
  { id:9,  nombre:"Mezcladora de audio 4ch",      cat:"audio",        img:"https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=80", precio:3000, dep:25000, dist:1.2, rating:4.7, rev:8,  lat:-33.4372, lng:-70.6253, duen:"Diego R. · Ñuñoa",                     desc:"Yamaha MG06X, 6 canales. Ideal para fiestas y eventos. Incluye cables XLR.",          ok:true  },
  { id:10, nombre:"Cortadora de pasto eléctrica", cat:"jardin",       img:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80", precio:2000, dep:12000, dist:0.9, rating:4.5, rev:13, lat:-33.4348, lng:-70.6222, duen:"Roberto K. · Ñuñoa",                   desc:"Black & Decker 1200W. Ajuste de altura 3 niveles.",                                    ok:false },
  { id:11, nombre:"Decoración luces LED fiesta",  cat:"eventos",      img:"https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&q=80", precio:1500, dep:8000,  dist:0.5, rating:4.8, rev:22, lat:-33.4328, lng:-70.6270, duen:"Laura M. · Barrio Italia",           desc:"50m de luces LED + 10 globos luminosos + 2 cortinas de luz.",                         ok:true  },
  { id:12, nombre:"Llave de impacto neumática",   cat:"herramientas", img:"https://images.unsplash.com/photo-1581244277943-fe4a9c777540?w=300&q=80", precio:1200, dep:12000, dist:2.0, rating:4.6, rev:5,  lat:-33.4390, lng:-70.6285, duen:"Pablo S. · San Joaquín",             desc:"Llave de impacto 1/2\", 680Nm. Ideal para cambio de ruedas.",                         ok:true  },
];

const CAT_LABELS = {
  herramientas:"🔨 Herramientas",
  eventos:"🎉 Eventos",
  audio:"🔊 Audio",
  camping:"🏕️ Camping",
  jardin:"🌿 Jardín",
};

// Publicación de ejemplo en perfil
const MI_PUBLICACION = {
  id: 99,
  nombre: "Taladro Percutor Makita 750W",
  cat: "herramientas",
  img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=80",
  precio: 1200,
  dep: 12000,
  dist: 0.1,
  rating: 5.0,
  rev: 3,
  lat: -33.4355, lng: -70.6260,
  duen: "Tú · Barrio Italia",
  desc: "Taladro percutor Makita 750W en perfecto estado. Incluye maletín y set de brocas.",
  ok: true,
};
ITEMS.unshift(MI_PUBLICACION);

// ---- STATE ----
let catActual = 'todos';
let queryActual = '';
let horasModal = 1;
let itemModal = null;
let mapExplora = null;
let mapFull = null;
let mapModal = null;
let vistaActual = 'list';
let tabActual = 'explorar';
let userLat = -33.4355;
let userLng = -70.6260;

// ---- GEOLOCATION ----
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      userLat = pos.coords.latitude;
      userLng = pos.coords.longitude;
      const center = [userLat, userLng];
      if (mapExplora) { mapExplora.setView(center, 15); addYouMarker(mapExplora, center); }
      if (mapFull)    { mapFull.setView(center, 15);    addYouMarker(mapFull, center); }
    },
    () => { addYouMarker(mapFull, [userLat, userLng]); }
  );
}

function addYouMarker(map, center) {
  if (!map) return;
  const youIcon = L.divIcon({
    className: '',
    html: `<div style="width:18px;height:18px;background:#4e8cff;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 6px rgba(78,140,255,0.25)"></div>`,
    iconSize: [18,18], iconAnchor: [9,9],
  });
  L.marker(center, { icon: youIcon }).addTo(map)
    .bindPopup('<div style="color:#0d0c0a;font-weight:700;font-size:13px">📍 Tú estás aquí</div>');
}

// ---- SPLASH ----
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splash').classList.add('hide');
    document.getElementById('appContent').style.display = 'block';
    document.getElementById('bottomNav').style.display = 'flex';
    renderList();
    setTimeout(() => initMaps(), 300);
  }, 2000);
});

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
    card.style.animationDelay = `${i * 0.05}s`;
    card.onclick = () => abrirModal(it.id);
    card.innerHTML = `
      <div class="lcard-img">
        <img src="${it.img}" alt="${it.nombre}" onerror="this.style.display='none';this.parentNode.style.fontSize='46px';this.parentNode.textContent='📦'"/>
      </div>
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
      <div class="mcard-imgwrap"><img src="${it.img}" alt="${it.nombre}" onerror="this.parentNode.innerHTML='<span style=font-size:28px>📦</span>'"/></div>
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
    mapExplora = L.map('leafletMap', { center, zoom: 15, zoomControl: true, attributionControl: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(mapExplora);
    agregarMarcadores(mapExplora);
    addYouMarker(mapExplora, center);
    initSheetSwipe();
  }

  if (!mapFull) {
    mapFull = L.map('fullMap', { center, zoom: 15, zoomControl: true, attributionControl: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(mapFull);
    agregarMarcadores(mapFull, true);
    addYouMarker(mapFull, center);
  }

  renderSheet(getFiltered());
}

function agregarMarcadores(map) {
  ITEMS.forEach(it => {
    const icon = L.divIcon({
      className: '',
      html: `<div class="custom-marker" style="${it.ok?'':'opacity:0.5;filter:grayscale(1)'}">
               <span class="marker-inner">📍</span>
             </div>`,
      iconSize: [28,28], iconAnchor: [14,28], popupAnchor: [0,-30],
    });
    const marker = L.marker([it.lat, it.lng], { icon }).addTo(map);
    marker.bindPopup(`
      <div class="popup-name">${it.nombre}</div>
      <div class="popup-price">$${it.precio.toLocaleString('es-CL')}/hora</div>
      <div class="popup-loc">📍 ${it.dist}km · ${it.duen.split('·')[1]?.trim()||''}</div>
      <button class="popup-btn" onclick="abrirModal(${it.id})">${it.ok ? 'Arrendar ahora →' : 'No disponible'}</button>
    `);
  });
}

// ---- SWIPE TO CLOSE — modal ----
function initModalSwipe() {
  const sheet = document.getElementById('bsModal');
  let startY = 0, curY = 0, dragging = false;

  const onStart = e => {
    startY = e.touches ? e.touches[0].clientY : e.clientY;
    dragging = true;
    sheet.style.transition = 'none';
  };
  const onMove = e => {
    if (!dragging) return;
    curY = (e.touches ? e.touches[0].clientY : e.clientY) - startY;
    if (curY < 0) curY = 0;
    sheet.style.transform = `translateY(${curY}px)`;
  };
  const onEnd = () => {
    dragging = false;
    sheet.style.transition = '';
    if (curY > 120) {
      sheet.style.transform = 'translateY(100%)';
      setTimeout(cerrarModal, 200);
    } else {
      sheet.style.transform = 'translateY(0)';
    }
    curY = 0;
  };
  sheet.addEventListener('touchstart', onStart, { passive: true });
  sheet.addEventListener('touchmove', onMove, { passive: true });
  sheet.addEventListener('touchend', onEnd);
  sheet.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);
}

// ---- SWIPE TO CLOSE — map sheet ----
function initSheetSwipe() {
  const sheet = document.querySelector('.map-sheet');
  if (!sheet) return;
  let startY = 0, curH = 0, origH = 0, dragging = false;

  const handle = sheet.querySelector('.sheet-handle');
  const onStart = e => {
    startY = e.touches ? e.touches[0].clientY : e.clientY;
    origH = sheet.offsetHeight;
    dragging = true;
    sheet.style.transition = 'none';
  };
  const onMove = e => {
    if (!dragging) return;
    const dy = (e.touches ? e.touches[0].clientY : e.clientY) - startY;
    const newH = Math.max(48, Math.min(340, origH - dy));
    sheet.style.maxHeight = newH + 'px';
  };
  const onEnd = () => {
    dragging = false;
    sheet.style.transition = '';
    const h = sheet.offsetHeight;
    if (h < 80) sheet.style.maxHeight = '48px';
    else sheet.style.maxHeight = '210px';
  };
  handle.addEventListener('touchstart', onStart, { passive: true });
  handle.addEventListener('touchmove', onMove, { passive: true });
  handle.addEventListener('touchend', onEnd);
  handle.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', e => { if(dragging) onMove(e); });
  window.addEventListener('mouseup', onEnd);
}

// ---- TABS ----
function setTab(name, el) {
  tabActual = name;
  document.querySelectorAll('.tab-view').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${name}`).classList.add('active');
  document.querySelectorAll('.bn-item').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  if (name === 'mapa') setTimeout(() => mapFull && mapFull.invalidateSize(), 100);
  if (name === 'arriendos') renderArriendos();
  if (name === 'mensajes') renderMensajes();
  if (name === 'perfil') actualizarMisPubs();
}

// ---- VISTA LISTA/MAPA ----
function setVista(v) {
  vistaActual = v;
  const listView = document.getElementById('listView');
  const mapView = document.getElementById('mapView');
  document.getElementById('btnList').classList.toggle('active', v==='list');
  document.getElementById('btnMap').classList.toggle('active', v==='map');
  if (v === 'list') {
    listView.style.display = '';
    mapView.style.display = 'none';
  } else {
    listView.style.display = 'none';
    mapView.style.display = 'flex';
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
  if (vistaActual === 'map') renderSheet(getFiltered());
}

// ---- BÚSQUEDA ----
document.addEventListener('DOMContentLoaded', () => {
  const inp = document.getElementById('searchInput');
  const clr = document.getElementById('searchClear');
  if (!inp) return;
  inp.addEventListener('input', () => {
    queryActual = inp.value;
    clr.classList.toggle('show', !!inp.value);
    renderList();
    if (vistaActual === 'map') renderSheet(getFiltered());
  });
  initModalSwipe();
});

function limpiarBusqueda() {
  const inp = document.getElementById('searchInput');
  inp.value = '';
  queryActual = '';
  document.getElementById('searchClear').classList.remove('show');
  renderList();
  if (vistaActual === 'map') renderSheet(getFiltered());
}

// ---- MODAL ----
function abrirModal(id) {
  itemModal = ITEMS.find(i => i.id === id);
  if (!itemModal) return;
  horasModal = 1;

  const c = document.getElementById('bsmContent');
  c.innerHTML = `
    <div class="bsm-imgwrap">
      <img src="${itemModal.img}" alt="${itemModal.nombre}" onerror="this.style.display='none'"/>
    </div>
    <div class="bsm-title">${itemModal.nombre}</div>
    <div class="bsm-owner">📍 ${itemModal.duen} · ${itemModal.dist}km · ⭐ ${itemModal.rating} (${itemModal.rev} arriendos)</div>
    <p class="bsm-desc">${itemModal.desc}</p>

    <div class="bsm-section-label">Ubicación del objeto</div>
    <div id="modalMap" style="height:160px;border-radius:14px;overflow:hidden;margin-bottom:20px;"></div>

    <div class="bsm-grid">
      <div class="bsm-cell">
        <span class="bsm-cell-label">Precio / hora</span>
        <span class="bsm-cell-val">$${itemModal.precio.toLocaleString('es-CL')}</span>
      </div>
      <div class="bsm-cell">
        <span class="bsm-cell-label">Depósito garantía</span>
        <span class="bsm-cell-val">$${itemModal.dep.toLocaleString('es-CL')}</span>
      </div>
    </div>

    <div class="hours-section">
      <span class="hours-label">¿Cuántas horas necesitas?</span>
      <div class="hours-ctrl">
        <button class="h-btn" onclick="cambiarHoras(-1)">−</button>
        <div class="h-val" id="hVal">1 hora</div>
        <button class="h-btn" onclick="cambiarHoras(1)">+</button>
      </div>
    </div>

    <div class="total-box">
      <div class="total-left">
        <label>Total arriendo</label>
        <small>+ depósito $${itemModal.dep.toLocaleString('es-CL')} (retenido)</small>
      </div>
      <div class="total-right" id="totalVal">$${itemModal.precio.toLocaleString('es-CL')}</div>
    </div>

    <button class="btn-confirm" ${itemModal.ok?'':'disabled style="opacity:.5;cursor:not-allowed"'}
      onclick="${itemModal.ok?'confirmarArriendo()':'mostrarToast(\'Este objeto no está disponible\')'}">
      ${itemModal.ok ? 'Confirmar y pagar 🔒' : 'No disponible ahora'}
    </button>
  `;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';

  // Mapa del objeto dentro del modal
  setTimeout(() => {
    if (mapModal) { mapModal.remove(); mapModal = null; }
    mapModal = L.map('modalMap', {
      center: [itemModal.lat, itemModal.lng],
      zoom: 15, zoomControl: false, attributionControl: false,
      dragging: false, scrollWheelZoom: false, doubleClickZoom: false,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(mapModal);
    // Marcador del objeto
    const iconObj = L.divIcon({
      className: '',
      html: `<div class="custom-marker"><span class="marker-inner">📍</span></div>`,
      iconSize: [28,28], iconAnchor: [14,28],
    });
    L.marker([itemModal.lat, itemModal.lng], { icon: iconObj }).addTo(mapModal);
    // Marcador usuario
    const youIcon = L.divIcon({
      className: '',
      html: `<div style="width:14px;height:14px;background:#4e8cff;border:2.5px solid #fff;border-radius:50%;box-shadow:0 0 0 5px rgba(78,140,255,0.25)"></div>`,
      iconSize: [14,14], iconAnchor: [7,7],
    });
    L.marker([userLat, userLng], { icon: youIcon }).addTo(mapModal);
    // Línea entre usuario y objeto
    L.polyline([[userLat, userLng],[itemModal.lat, itemModal.lng]], {
      color: '#ff5c00', weight: 2, dashArray: '5,6', opacity: 0.7
    }).addTo(mapModal);
    // Encuadrar ambos puntos
    const bounds = L.latLngBounds([[userLat, userLng],[itemModal.lat, itemModal.lng]]);
    mapModal.fitBounds(bounds, { padding: [30, 30] });
    mapModal.invalidateSize();
  }, 100);
}

function cambiarHoras(d) {
  if (!itemModal) return;
  horasModal = Math.max(1, Math.min(72, horasModal + d));
  const label = horasModal === 1 ? '1 hora' : `${horasModal} horas`;
  document.getElementById('hVal').textContent = label;
  document.getElementById('totalVal').textContent = `$${(itemModal.precio * horasModal).toLocaleString('es-CL')}`;
}

function cerrarModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('bsModal').style.transform = '';
  document.body.style.overflow = '';
  if (mapModal) { mapModal.remove(); mapModal = null; }
  itemModal = null;
}

function confirmarArriendo() {
  if (!itemModal) return;
  const total = itemModal.precio * horasModal;
  const nombre = itemModal.nombre;
  const duenNombre = itemModal.duen.split('·')[0].trim();
  const idx = ITEMS.findIndex(i => i.id === itemModal.id);
  if (idx !== -1) ITEMS[idx].ok = false;

  // Agregar mensaje automático al dueño
  const msgExiste = MENSAJES_DATA.find(m => m.itemId === itemModal.id);
  if (!msgExiste) {
    MENSAJES_DATA.unshift({
      id: Date.now(),
      itemId: itemModal.id,
      ico: '👤',
      nombre: duenNombre,
      obj: nombre,
      preview: `¡Hola! Reservé tu objeto por ${horasModal} hora${horasModal>1?'s':''}. ¿Cuándo podemos coordinar la entrega?`,
      time: 'Ahora',
      unread: 0,
      online: true,
      autoMsg: true,
    });
    const badge = document.getElementById('msgBadge');
    if (badge) { badge.textContent = '1'; badge.style.display = 'flex'; }
  }

  cerrarModal();
  renderList();
  if (vistaActual === 'map') renderSheet(getFiltered());

  // Navegar a mensajes con toast
  setTimeout(() => {
    mostrarToast(`✅ Reservado · Mensaje enviado a ${duenNombre}`);
  }, 300);
}

// ---- PUBLICAR ----
function publicarObjeto() {
  const nombre = document.getElementById('pNombre').value.trim();
  const cat    = document.getElementById('pCategoria').value;
  const precio = parseInt(document.getElementById('pPrecio').value);
  const dep    = parseInt(document.getElementById('pDeposito').value) || 0;
  const desc   = document.getElementById('pDesc').value.trim();
  const dir    = document.getElementById('pDir').value.trim();

  if (!nombre) { mostrarToast('⚠️ Ingresa el nombre del objeto'); return; }
  if (!cat)    { mostrarToast('⚠️ Selecciona una categoría'); return; }
  if (!precio || precio < 100) { mostrarToast('⚠️ Precio mínimo $100'); return; }

  const imgs = {
    herramientas:'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=80',
    eventos:'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&q=80',
    audio:'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80',
    camping:'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=300&q=80',
    jardin:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80',
  };

  const nuevo = {
    id: ITEMS.length + 100,
    nombre, cat,
    img: imgs[cat]||imgs.herramientas,
    precio,
    dep: dep || precio * 5,
    dist: parseFloat((Math.random()*1.5+0.2).toFixed(1)),
    rating: 5.0, rev: 0,
    lat: userLat + (Math.random()-0.5)*0.01,
    lng: userLng + (Math.random()-0.5)*0.01,
    duen: `Tú · ${dir||'Tu barrio'}`,
    desc: desc || 'Sin descripción.',
    ok: true,
  };
  ITEMS.unshift(nuevo);

  ['pNombre','pPrecio','pDeposito','pDesc','pDir'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('pCategoria').value = '';

  actualizarMisPubs();
  catActual = 'todos';
  renderList();
  setTab('explorar', document.querySelector('[data-tab="explorar"]'));
  mostrarToast(`🚀 "${nombre}" publicado con éxito`);
}

function actualizarMisPubs() {
  const misPubs = document.getElementById('misPubs');
  const propios = ITEMS.filter(i => i.duen && i.duen.startsWith('Tú'));
  if (!propios.length) {
    misPubs.innerHTML = '<div class="empty-pubs">Aún no has publicado objetos</div>';
    return;
  }
  misPubs.innerHTML = propios.map(it => `
    <div class="pub-card">
      <div class="pub-card-img">
        <img src="${it.img}" alt="${it.nombre}" onerror="this.style.display='none'"/>
      </div>
      <div class="pub-card-body">
        <div class="lcard-name" style="font-size:14px">${it.nombre}</div>
        <div class="lcard-price" style="font-size:15px;margin-top:4px">$${it.precio.toLocaleString('es-CL')}<small>/hr</small></div>
        <div class="pub-btn-row">
          <button class="pub-action-btn confirm" onclick="mostrarToast('✅ Devolución confirmada para ${it.nombre}')">Confirmar devolución</button>
          <button class="pub-action-btn report" onclick="mostrarToast('🚨 Reporte enviado al equipo')">Reportar problema</button>
        </div>
      </div>
    </div>`).join('');
}

// ---- MIS ARRIENDOS ----
const MIS_ARRIENDOS_DATA = [
  { id:1, img:'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&q=80', nombre:'Taladro Bosch GSB 550W',  duen:'Francisco Meléndez', desde:'Hoy 10:00', hasta:'Hoy 13:00', progreso:60, restante:'1h 12min restante', precio:3000,  estado:'activo',     confirmaRecepcion:false, confirmaDev:false },
  { id:2, img:'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&q=80', nombre:'Proyector Epson Full HD',  duen:'Joaquín Miño',      desde:'Ayer 15:00', hasta:'Ayer 19:00', progreso:100, restante:'Finalizado',     precio:16000, estado:'finalizado',  confirmaRecepcion:true,  confirmaDev:false },
  { id:3, img:'https://images.unsplash.com/photo-1563299796-17596ed6b017?w=300&q=80', nombre:'Carpa para eventos 4×4m',  duen:'Miguel Retamales',   desde:'12 jun',     hasta:'13 jun',     progreso:100, restante:'Finalizado',     precio:40000, estado:'finalizado',  confirmaRecepcion:true,  confirmaDev:true  },
];

function renderArriendos() {
  const cont = document.getElementById('arriendosContent');
  if (!cont) return;
  const activos = MIS_ARRIENDOS_DATA.filter(a => a.estado === 'activo');
  const historial = MIS_ARRIENDOS_DATA.filter(a => a.estado === 'finalizado');
  let html = '';

  if (activos.length) {
    html += `<div class="arr-section-title">En curso</div>`;
    activos.forEach((a, i) => {
      html += `
      <div class="arr-card" style="animation-delay:${i*0.07}s">
        <div class="arr-card-header">
          <div class="arr-card-thumb"><img src="${a.img}" onerror="this.style.display='none'"/></div>
          <div class="arr-card-info">
            <div class="arr-card-name">${a.nombre}</div>
            <div class="arr-card-owner">Dueño: ${a.duen}</div>
          </div>
          <span class="arr-status activo">En curso</span>
        </div>
        <div class="arr-card-body">
          <div class="arr-detail-row">
            <div class="arr-detail"><span>Inicio</span><strong>${a.desde}</strong></div>
            <div class="arr-detail"><span>Fin</span><strong>${a.hasta}</strong></div>
            <div class="arr-detail"><span>Restante</span><strong class="orange">${a.restante}</strong></div>
          </div>
          <div class="aic-progress"><div class="aic-progress-fill" style="width:${a.progreso}%"></div></div>

          ${!a.confirmaRecepcion ? `
          <div class="confirm-strip">
            <div class="confirm-strip-text">¿Ya tienes el producto en tus manos?</div>
            <div class="confirm-strip-btns">
              <button class="confirm-strip-btn ok" onclick="confirmarRecepcion(${a.id})">✓ Confirmar recepción</button>
              <button class="confirm-strip-btn msg" onclick="solicitarMasHoras(${a.id}, '${a.duen}')">💬 Solicitar más horas</button>
            </div>
          </div>` : `
          <div class="confirmed-tag">✅ Recepción confirmada por ambas partes · Tiempo corriendo</div>
          <button class="confirm-strip-btn ok" style="width:100%;margin-top:8px" onclick="confirmarDevolucion(${a.id})">📦 Confirmar devolución</button>
          `}
        </div>
      </div>`;
    });
  }

  if (historial.length) {
    html += `<div class="arr-section-title" style="margin-top:4px">Historial</div>`;
    historial.forEach((a, i) => {
      html += `
      <div class="hist-item" style="animation-delay:${(activos.length+i)*0.07}s">
        <div class="hist-thumb"><img src="${a.img}" onerror="this.style.display='none'"/></div>
        <div class="hist-info">
          <div class="hist-name">${a.nombre}</div>
          <div class="hist-date">${a.desde} — ${a.hasta}</div>
          <div class="hist-date" style="color:var(--green);font-size:10px;margin-top:2px">${a.confirmaDev ? '✅ Devolución confirmada' : '⏳ Pendiente devolución'}</div>
        </div>
        <div class="hist-right">
          <div class="hist-price">$${a.precio.toLocaleString('es-CL')}</div>
          <div class="hist-rating">⭐ 5.0</div>
        </div>
      </div>`;
    });
  }

  if (!activos.length && !historial.length) {
    html = `<div class="arr-empty"><span class="ae-icon">📋</span><h3>Sin arriendos aún</h3><p>Explora objetos disponibles cerca tuyo y haz tu primer arriendo.</p><button class="arr-empty-btn" onclick="setTab('explorar', document.querySelector('[data-tab=explorar]'))">Explorar ahora ⚡</button></div>`;
  }

  cont.innerHTML = html;
}

function confirmarRecepcion(id) {
  const a = MIS_ARRIENDOS_DATA.find(x => x.id === id);
  if (a) { a.confirmaRecepcion = true; renderArriendos(); mostrarToast('✅ Recepción confirmada · El tiempo comenzó'); }
}

function confirmarDevolucion(id) {
  const a = MIS_ARRIENDOS_DATA.find(x => x.id === id);
  if (a) { a.estado = 'finalizado'; a.confirmaDev = true; renderArriendos(); mostrarToast('📦 Devolución confirmada · Garantía liberada'); }
}

function solicitarMasHoras(id, duen) {
  MENSAJES_DATA.unshift({
    id: Date.now(),
    ico: '👤',
    nombre: duen,
    obj: MIS_ARRIENDOS_DATA.find(x=>x.id===id)?.nombre || 'Objeto',
    preview: '¿Puedes extenderme el arriendo 2 horas más? Te pago la diferencia.',
    time: 'Ahora',
    unread: 0,
    online: true,
    solicitudHoras: true,
  });
  const badge = document.getElementById('msgBadge');
  if (badge) { badge.textContent = '!'; badge.style.display = 'flex'; }
  mostrarToast(`💬 Solicitud enviada a ${duen}`);
  setTab('mensajes', document.querySelector('[data-tab=mensajes]'));
}

// ---- MENSAJES ----
const MENSAJES_DATA = [
  { id:1, ico:'👤', nombre:'Francisco Meléndez', obj:'Taladro Bosch GSB',    preview:'Perfecto, lo tendré listo a las 10am', time:'Ahora', unread:2, online:true  },
  { id:2, ico:'👤', nombre:'Joaquín Miño',        obj:'Proyector Epson FHD',  preview:'¿Puedes extender 1 hora más?',          time:'14:32', unread:0, online:false },
  { id:3, ico:'👤', nombre:'Miguel Retamales',     obj:'Carpa 4×4m',           preview:'Gracias por cuidarla 🙌',               time:'Ayer',  unread:0, online:false },
  { id:4, ico:'👤', nombre:'Gabriel Morales',      obj:'Parlante JBL Xtreme',  preview:'¿Está disponible este fin de semana?',  time:'Lun',   unread:0, online:true  },
];

function renderMensajes() {
  const list = document.getElementById('mensajesList');
  if (!list) return;
  list.innerHTML = MENSAJES_DATA.map((m, i) => `
    <div class="msg-item" style="animation-delay:${i*0.06}s" onclick="abrirChat(${m.id}, '${m.nombre}', '${m.obj}')">
      <div class="msg-avatar ${m.unread?'unread':''}">
        👤
        ${m.online ? '<span class="msg-dot"></span>' : ''}
      </div>
      <div class="msg-body">
        <div class="msg-name">${m.nombre}</div>
        <div class="msg-preview ${m.unread?'bold':''}">${m.preview}</div>
        <span class="msg-obj-tag">${m.obj}</span>
        ${m.solicitudHoras ? `<div class="msg-solicitud-tag">Solicitud de extensión pendiente</div>` : ''}
      </div>
      <div class="msg-right">
        <div class="msg-time">${m.time}</div>
        ${m.unread ? `<div class="msg-unread-cnt">${m.unread}</div>` : ''}
      </div>
    </div>
  `).join('');
}

function abrirChat(id, nombre, obj) {
  const m = MENSAJES_DATA.find(x => x.id === id);
  if (m) { m.unread = 0; }
  const total = MENSAJES_DATA.reduce((s, x) => s + (x.unread||0), 0);
  const badge = document.getElementById('msgBadge');
  if (badge) badge.style.display = total ? 'flex' : 'none';
  renderMensajes();

  // Si es solicitud de horas, mostrar opciones confirmar/rechazar
  if (m && m.solicitudHoras) {
    mostrarChatExtension(nombre, obj, id);
    return;
  }
  mostrarToast(`💬 Chat con ${nombre}`);
}

function mostrarChatExtension(nombre, obj, msgId) {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('bsmContent');
  const modal = document.getElementById('bsModal');
  modal.style.transform = '';
  content.innerHTML = `
    <div class="chat-modal-header">
      <div class="chat-avatar">👤</div>
      <div>
        <div class="chat-name">${nombre}</div>
        <span class="msg-obj-tag">${obj}</span>
      </div>
    </div>
    <div class="chat-bubble-wrap">
      <div class="chat-bubble received">¿Puedes extenderme el arriendo 2 horas más? Te pago la diferencia.</div>
    </div>
    <div class="chat-extension-card">
      <div class="cec-label">Solicitud de extensión</div>
      <div class="cec-detail">+2 horas · $${(2000*2).toLocaleString('es-CL')}</div>
      <div class="cec-btns">
        <button class="cec-btn accept" onclick="responderExtension(${msgId}, true)">✓ Confirmar</button>
        <button class="cec-btn reject" onclick="responderExtension(${msgId}, false)">✕ Rechazar</button>
      </div>
    </div>
  `;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function responderExtension(msgId, acepto) {
  const m = MENSAJES_DATA.find(x => x.id === msgId);
  if (m) {
    m.solicitudHoras = false;
    m.preview = acepto ? '✅ Extensión confirmada' : '❌ Extensión rechazada';
  }
  cerrarModal();
  renderMensajes();
  mostrarToast(acepto ? '✅ Extensión confirmada · Tiempo actualizado' : '❌ Solicitud rechazada');
}

// ---- TOAST ----
function mostrarToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._to);
  t._to = setTimeout(() => t.classList.remove('show'), 3500);
}
