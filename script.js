// Ocultar el header al hacer scroll hacia abajo y mostrarlo al subir
let lastScrollY = window.scrollY;
let topbar = document.querySelector('.topbar');
window.addEventListener('scroll', function() {
  if (!topbar) topbar = document.querySelector('.topbar');
  if (!topbar) return;
  if (window.scrollY > lastScrollY && window.scrollY > 60) {
    // Scroll hacia abajo, ocultar
    topbar.style.transform = 'translateY(-100%)';
    topbar.style.transition = 'transform 0.3s';
  } else {
    // Scroll hacia arriba, mostrar
    topbar.style.transform = 'translateY(0)';
    topbar.style.transition = 'transform 0.3s';
  }
  lastScrollY = window.scrollY;
});
// Reproducir texto con voz (SpeechSynthesis)
function playText(text) {
  if (!window.speechSynthesis) {
    alert('Tu navegador no soporta síntesis de voz.');
    return;
  }
  window.speechSynthesis.cancel(); // Detener cualquier reproducción previa
  const utter = new SpeechSynthesisUtterance(text.replace(/^Resumen:|^Respuesta original:/i, '').trim());
  utter.lang = 'es-ES';
  utter.rate = 1;
  utter.pitch = 1;
  window.speechSynthesis.speak(utter);
}
// Efecto clic y selección para datos importantes
function setupImportantClickables() {
    // Fechas del cronograma (timeline): fecha y dato muestran selección, solo el dato crece
    document.querySelectorAll('.tl .date, .tl .tlTitle').forEach(el => {
      el.classList.add('important-clickable');
      el.addEventListener('click', function(e) {
        // Quitar selección previa de ambos
        document.querySelectorAll('.tl .date.important-clickable.clicked, .tl .tlTitle.important-clickable.clicked').forEach(x => x.classList.remove('clicked'));
        // Marcar ambos como seleccionados
        const tl = el.closest('.tl');
        if(tl){
          const date = tl.querySelector('.date');
          const title = tl.querySelector('.tlTitle');
          if(date) date.classList.add('clicked');
          if(title) title.classList.add('clicked');
        }
        // Salpicadura
        const splash = document.createElement('span');
        splash.className = 'splash';
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 0.7;
        splash.style.width = splash.style.height = size + 'px';
        const x = (e.clientX || rect.left + rect.width/2) - rect.left - size/2;
        const y = (e.clientY || rect.top + rect.height/2) - rect.top - size/2;
        splash.style.left = x + 'px';
        splash.style.top = y + 'px';
        el.appendChild(splash);
        splash.addEventListener('animationend', ()=> splash.remove());
        e.stopPropagation();
      });
    });

    // Títulos y meta de cada card
    document.querySelectorAll('.card h3, .card .meta').forEach(el => {
      el.classList.add('important-clickable');
      el.addEventListener('click', function(e) {
        // Quitar selección previa
        document.querySelectorAll('.card h3.important-clickable.clicked, .card .meta.important-clickable.clicked').forEach(x => x.classList.remove('clicked'));
        el.classList.add('clicked');
        // Salpicadura
        const splash = document.createElement('span');
        splash.className = 'splash';
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 0.7;
        splash.style.width = splash.style.height = size + 'px';
        const x = (e.clientX || rect.left + rect.width/2) - rect.left - size/2;
        const y = (e.clientY || rect.top + rect.height/2) - rect.top - size/2;
        splash.style.left = x + 'px';
        splash.style.top = y + 'px';
        el.appendChild(splash);
        splash.addEventListener('animationend', ()=> splash.remove());
        e.stopPropagation();
      });
    });
  // .miniCard y su h3
  document.querySelectorAll('.miniCard, .miniCard h3').forEach(el => {
    el.classList.add('important-clickable');
    el.addEventListener('click', function(e) {
      // Solo una seleccionada por grupo
      document.querySelectorAll('.miniCard.important-clickable.clicked').forEach(x => x.classList.remove('clicked'));
      if (el.classList.contains('miniCard')) el.classList.add('clicked');
      // Salpicadura
      const splash = document.createElement('span');
      splash.className = 'splash';
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 0.6;
      splash.style.width = splash.style.height = size + 'px';
      const x = (e.clientX || rect.left + rect.width/2) - rect.left - size/2;
      const y = (e.clientY || rect.top + rect.height/2) - rect.top - size/2;
      splash.style.left = x + 'px';
      splash.style.top = y + 'px';
      el.appendChild(splash);
      splash.addEventListener('animationend', ()=> splash.remove());
      e.stopPropagation();
    });
  });
  // .li b (datos clave)
  document.querySelectorAll('.li b').forEach(el => {
    el.classList.add('important-clickable');
    el.addEventListener('click', function(e) {
      document.querySelectorAll('.li b.important-clickable.clicked').forEach(x => {
        x.classList.remove('clicked');
        // También quitar a su texto hermano
        if(x.parentElement){
          // Buscar span.li-text y quitarle la clase clicked
          const span = x.parentElement.querySelector('.li-text.clicked');
          if(span) span.classList.remove('clicked');
        }
      });
      el.classList.add('clicked');
      // También aumentar texto hermano
      if(el.parentElement && el.parentElement.childNodes.length > 1){
        // Buscar nodo de texto después de <b>
        let sib = el.nextSibling;
        if(sib && sib.nodeType === 3) {
          // Si no hay span, envolver en span.li-text
          let text = sib.textContent;
          if(text && text.trim().length > 0){
            const span = document.createElement('span');
            span.className = 'li-text clicked';
            span.textContent = text;
            el.parentElement.replaceChild(span, sib);
          }
        } else if(sib && sib.classList && sib.classList.contains('li-text')) {
          sib.classList.add('clicked');
        }
      }
      // Salpicadura
      const splash = document.createElement('span');
      splash.className = 'splash';
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.2;
      splash.style.width = splash.style.height = size + 'px';
      const x = (e.clientX || rect.left + rect.width/2) - rect.left - size/2;
      const y = (e.clientY || rect.top + rect.height/2) - rect.top - size/2;
      splash.style.left = x + 'px';
      splash.style.top = y + 'px';
      el.appendChild(splash);
      splash.addEventListener('animationend', ()=> splash.remove());
      e.stopPropagation();
    });
  });
}
/* ========= Sections ========= */
    const SECTIONS = [
      {
        id: "datos-clave",
        title: "Datos clave",
        hint: "Resumen",
        tags: ["convocatoria", "ministerio", "ESFM", "UA", "2026", "001/2025"],
        meta: "Convocatoria Pública N° 001/2025",
        snippet: "Convocatoria del Ministerio de Educación para admisión ESFM/UA, gestión 2026.",
        content: `
          <ul class="list">
            <li class="li"><div><b>Entidad:</b> Ministerio de Educación (Estado Plurinacional de Bolivia)</div></li>
            <li class="li"><div><b>Dirigido a:</b> Bachilleres</div></li>
            <li class="li"><div><b>Formación:</b> Maestro con grado de <b>Licenciatura</b></div></li>
            <li class="li"><div><b>Instituciones:</b> ESFM y Unidades Académicas</div></li>
          </ul>
        `
      },
      {
        id: "admission",
        title: "Proceso de admisión",
        hint: "Ingreso",
        tags: ["admisión", "mérito", "plazas", "prueba"],
        meta: "Ingreso por Prueba Académica y mérito",
        snippet: "Rinden prueba; ingresan las mejores notas hasta cubrir plazas.",
        content: `
          <ul class="list">
            <li class="li"><div><b>Prueba Académica:</b> obligatoria</div></li>
            <li class="li"><div><b>Selección:</b> por <b>mejor nota</b> hasta cubrir plazas</div></li>
            <li class="li"><div><b>Segunda opción:</b> se considera si no hay cupo en la primera</div></li>
          </ul>
        `
      },
      {
        id: "pago",
        title: "Pago de postulación",
        hint: "Bs 108",
        tags: ["pago", "depósito", "banco unión", "108", "exentos"],
        meta: "Derecho de postulación",
        snippet: "Pago Bs 108; existen exenciones definidas por la convocatoria.",
        content: `
          <ul class="list">
            <li class="li"><div><b>Monto:</b> Bs. 108</div></li>
            <li class="li"><div><b>Banco Unión:</b> N° 10000004669343 (Ministerio de Educación)</div></li>
            <li class="li"><div><b>Anticipación:</b> realizar con 24 horas antes del formulario</div></li>
            <li class="li"><div><b>Exentos:</b> según convocatoria (pueblos indígenas/originarios y discapacidad)</div></li>
          </ul>
        `
      },
      {
        id: "registro",
        title: "Registro y formulario",
        hint: "Online",
        tags: ["registro", "formulario", "minedu", "segunda opción"],
        meta: "Registro en línea + formulario impreso",
        snippet: "Formulario online, revisar datos y entregar impreso y firmado el día de la prueba.",
        content: `
          <ul class="list">
            <li class="li"><div><b>Registro:</b> en el sitio del Ministerio</div></li>
            <li class="li"><div><b>Formulario:</b> imprimir y firmar (bolígrafo azul)</div></li>
            <li class="li"><div><b>Datos:</b> CI, contacto, unidad educativa, año de egreso</div></li>
          </ul>
        `
      },
      {
        id: "prueba",
        title: "Prueba Académica",
        hint: "Virtual",
        tags: ["prueba", "virtual", "100 preguntas", "120 minutos", "150", "discapacidad"],
        meta: "100 preguntas • 120 min (150 con discapacidad)",
        snippet: "Estructura: lectura, lógica, conocimientos generales y socioemocional.",
        content: `
          <ul class="list">
            <li class="li"><div><b>Duración:</b> 120 min (150 min con discapacidad)</div></li>
            <li class="li"><div><b>Preguntas:</b> 100 (todas valen lo mismo)</div></li>
            <li class="li"><div><b>Ámbitos:</b> Lectura (30), Lógica (30), Generales (20), Socioemocional (20)</div></li>
            <li class="li"><div><b>Puntaje:</b> sobre 100</div></li>
          </ul>
        `
      },
      {
        id: "documentos",
        title: "Documentos",
        hint: "Requisitos",
        tags: ["documentos", "ci", "formulario", "boleta", "discapacidad"],
        meta: "Para el día de la prueba",
        snippet: "Formulario impreso + boleta (si corresponde) + CI vigente; certificado de discapacidad si aplica.",
        content: `
          <ul class="list">
            <li class="li"><div><b>Entregar:</b> formulario impreso y firmado</div></li>
            <li class="li"><div><b>Entregar:</b> boleta de depósito (si corresponde)</div></li>
            <li class="li"><div><b>Presentar:</b> cédula de identidad vigente</div></li>
            <li class="li"><div><b>Si aplica:</b> carnet/certificado de discapacidad vigente</div></li>
          </ul>
        `
      },
      {
        id: "prohibiciones",
        title: "Prohibiciones",
        hint: "Ojo",
        tags: ["prohibiciones", "anulación", "celular", "reloj inteligente", "tableta", "fotografías"],
        meta: "Causales de anulación",
        snippet: "No celulares, relojes inteligentes, tablets, material, conversación o fotos; no suplantación.",
        content: `
          <ul class="list">
            <li class="li"><div><b>No:</b> celular, smartwatch, tablet, libros, cuadernos, mochilas</div></li>
            <li class="li"><div><b>No:</b> conversar o tomar fotografías</div></li>
            <li class="li"><div><b>No:</b> suplantación de identidad</div></li>
            <li class="li"><div><b>No:</b> formulario con datos erróneos</div></li>
          </ul>
        `
      },
      {
        id: "segunda-opcion",
        title: "Segunda opción",
        hint: "Asignación",
        tags: ["segunda opción", "asignación", "prioridad", "nota"],
        meta: "Alternativa si no hay cupo",
        snippet: "Si no hay plaza en la primera opción, se considera la segunda según nota.",
        content: `
          <ul class="list">
            <li class="li"><div><b>Se usa</b> si no hay cupo en tu primera ESFM/UA</div></li>
            <li class="li"><div><b>Prioridad:</b> mejor nota</div></li>
          </ul>
        `
      },
      {
        id: "empate",
        title: "Empate",
        hint: "Desempate",
        tags: ["empate", "promedio", "libretas", "SIE"],
        meta: "Criterio por promedio académico",
        snippet: "Si hay empate, se considera el promedio del último año (y años previos si continúa).",
        content: `
          <ul class="list">
            <li class="li"><div><b>Desempate:</b> promedio del último año</div></li>
            <li class="li"><div><b>Si continúa:</b> promedio de 2 últimos años, y así sucesivamente</div></li>
            <li class="li"><div><b>Si no aparece en SIE:</b> podrían solicitar libretas físicas/certificadas</div></li>
          </ul>
        `
      },
      {
        id: "cronograma",
        title: "Cronograma",
        hint: "Fechas",
        tags: ["cronograma", "registro", "pago", "prueba", "resultados", "matricula", "inicio"],
        meta: "Fechas clave 2025–2026",
        snippet: "Publicación, registro, prueba, resultados, matriculación e inicio.",
        content: `
          <div class="timeline">
            ${tl("19/12/2025", "Publicación de la convocatoria")}
            ${tl("26/12/2025", "Batería de preguntas")}
            ${tl("29/12/2025 a 06/01/2026", "Registro en línea")}
            ${tl("29/12/2025 a 05/01/2026", "Pago de postulación")}
            ${tl("19/01/2026 a 30/01/2026", "Prueba académica")}
            ${tl("04/02/2026", "Resultados oficiales")}
            ${tl("05/02/2026 – 09/02/2026", "Matriculación")}
            ${tl("09/02/2026", "Inicio de clases")}
          </div>
        `
      },
      {
        id: "plazas-depto",
        title: "Plazas por departamento",
        hint: "Tabla",
        tags: ["plazas", "departamento", "la paz", "cochabamba", "santa cruz", "oruro", "potosi", "pando", "tarija", "beni", "chuquisaca"],
        meta: "Filtra por departamento, ESFM/UA o especialidad",
        snippet: "Escribe “La Paz” y verás las plazas cargadas para ese departamento.",
        content: `
          <div class="tableTools">
            <input id="deptFilter" type="text" placeholder="Filtrar (ej: La Paz / Matemática / Inglés)" />
            <button id="clearDept" class="btn" type="button" style="padding:10px 12px">
              ${iconX()}
              <span>Limpiar</span>
            </button>
            <span class="pill" id="deptStats">0 filas</span>
          </div>

          <div class="tableWrap" role="region" aria-label="Tabla de plazas por departamento">
            <table>
              <thead>
                <tr>
                  <th>Departamento</th>
                  <th>ESFM / UA</th>
                  <th>Especialidad</th>
                  <th>Plazas</th>
                </tr>
              </thead>
              <tbody id="plazasBody"></tbody>
            </table>
            <div class="tableFooter">
              <div><b>Total plazas visibles:</b> <span id="plazasTotal">0</span></div>
              <div>Usa el filtro para encontrar rápido.</div>
            </div>
          </div>
        `
      },
      {
        id: "inclusion",
        title: "Inclusión",
        hint: "Acceso",
        tags: ["inclusión", "discapacidad", "lenguas", "plurinacional", "LSB", "CEPOS"],
        meta: "Enfoque plurinacional y accesibilidad",
        snippet: "Considera pueblos indígenas/originarios y personas con discapacidad según normativa.",
        content: `
          <ul class="list">
            <li class="li"><div><b>Plurinacional:</b> lenguas originarias (Anexo correspondiente)</div></li>
            <li class="li"><div><b>Discapacidad:</b> condiciones de accesibilidad y tiempo ampliado</div></li>
            <li class="li"><div><b>LSB:</b> certificación según entidades habilitadas (cuando corresponda)</div></li>
          </ul>
        `
      },
      {
        id: "resultados",
        title: "Resultados y matrícula",
        hint: "Final",
        tags: ["resultados", "nómina", "matriculación", "inicio"],
        meta: "Publicación oficial + matriculación",
        snippet: "Resultados se publican oficialmente; luego matrícula e inicio según cronograma.",
        content: `
          <ul class="list">
            <li class="li"><div><b>Resultados:</b> publicación oficial en el portal del Ministerio</div></li>
            <li class="li"><div><b>Matrícula:</b> en tu ESFM/UA en fechas del cronograma</div></li>
            <li class="li"><div><b>Inicio:</b> 09/02/2026</div></li>
          </ul>
        `
      }
    ];

    /* ========= Plazas dataset (puedes ampliar) ========= */
    const PLAZAS_DATA = [
      // LA PAZ (muestra)
      { dept:"La Paz", esfm:"EFD Antonio José de Sucre", esp:"Educación Física y Deportes", plazas:35 },
      { dept:"La Paz", esfm:"Mcal. Andrés de Santa Cruz y Calahumana", esp:"Educación Primaria Comunitaria Vocacional", plazas:35 },
      { dept:"La Paz", esfm:"Santiago de Huata", esp:"Educación Inicial en Familia Comunitaria", plazas:35 },
      { dept:"La Paz", esfm:"Santiago de Huata", esp:"Educación Primaria Comunitaria Vocacional", plazas:70 },
      { dept:"La Paz", esfm:"Simón Bolívar", esp:"Ciencias Sociales", plazas:35 },
      { dept:"La Paz", esfm:"Simón Bolívar", esp:"Comunicación y Lenguajes: Inglés", plazas:35 },
      { dept:"La Paz", esfm:"Simón Bolívar", esp:"Educación Primaria Comunitaria Vocacional", plazas:70 },
      { dept:"La Paz", esfm:"Simón Bolívar", esp:"Matemática", plazas:35 },

      // COCHABAMBA (muestra)
      { dept:"Cochabamba", esfm:"Simón Rodríguez", esp:"Educación Primaria Comunitaria Vocacional", plazas:35 },
      { dept:"Cochabamba", esfm:"UA - Cercado (Simón Rodríguez)", esp:"Comunicación y Lenguajes: Inglés", plazas:35 },
      { dept:"Cochabamba", esfm:"UA - Tarata (Simón Rodríguez)", esp:"Educación Musical", plazas:35 },

      // SANTA CRUZ (muestra)
      { dept:"Santa Cruz", esfm:"Enrique Finot", esp:"Ciencias Sociales", plazas:70 },
      { dept:"Santa Cruz", esfm:"Enrique Finot", esp:"Matemática", plazas:35 },
      { dept:"Santa Cruz", esfm:"Pluriétnica del Oriente y Chaco", esp:"Educación Primaria Comunitaria Vocacional", plazas:70 },

      // ORURO (muestra)
      { dept:"Oruro", esfm:"Ángel Mendoza Justiniano", esp:"Ciencias Sociales", plazas:35 },
      { dept:"Oruro", esfm:"Caracollo", esp:"Educación Especial", plazas:35 },

      // PANDO (muestra)
      { dept:"Pando", esfm:"Puerto Rico", esp:"Educación Primaria Comunitaria Vocacional", plazas:35 },
      { dept:"Pando", esfm:"UA - Cobija (Puerto Rico)", esp:"Matemática", plazas:35 },

      // POTOSÍ / TARIJA / BENI / CHUQUISACA (muestra)
      { dept:"Potosí", esfm:"Franz Tamayo", esp:"Educación Inicial", plazas:35 },
      { dept:"Tarija", esfm:"Juan Misael Saracho", esp:"Educación Primaria Comunitaria Vocacional", plazas:35 },
      { dept:"Beni", esfm:"Clara Parada de Pinto", esp:"Educación Primaria Comunitaria Vocacional", plazas:35 },
      { dept:"Chuquisaca", esfm:"Mariscal Sucre", esp:"Educación Primaria Comunitaria Vocacional", plazas:35 },
    ];

    /* ========= Render ========= */
    const nav = document.getElementById("nav");
    const content = document.getElementById("content");
    const drawerNav = document.getElementById("drawerNav");
    const activeHint = document.getElementById("activeHint");

    function render(){
      // Ordenar la sección de exámenes al final
      const sectionsOrdered = SECTIONS.slice();
      const exIdx = sectionsOrdered.findIndex(s => s.id === "examenes-gestion");
      if (exIdx > -1) {
        const ex = sectionsOrdered.splice(exIdx,1)[0];
        sectionsOrdered.push(ex);
      }
      nav.innerHTML = sectionsOrdered.map(s => `
        <a href="#${s.id}" data-id="${s.id}">
          <span class="left">
            <span class="dot"></span>
            <span class="label">${esc(s.title)}</span>
          </span>
          <span class="hint">${esc(s.hint)}</span>
        </a>
      `).join("");

      drawerNav.innerHTML = sectionsOrdered.map(s => `
        <a href="#${s.id}" data-id="${s.id}">
          <span>${esc(s.title)}</span>
          <span class="chip">${esc(s.hint)}</span>
        </a>
      `).join("");

      content.innerHTML = sectionsOrdered.map(s => `
        <article class="card" id="${s.id}"${s.id==='plazas-depto' ? ' data-plazas="true"' : ''}>
          <div class="head">
            <div>
              <h3>${esc(s.title)}</h3>
              <div class="meta">${esc(s.meta)}</div>
            </div>
            <span class="pill">${esc(s.hint)}</span>
          </div>
          <div class="body">${s.content}</div>
        </article>
      `).join("");

      // Para pruebas: hacer scroll automático a la tabla de plazas
      setTimeout(()=>{
        const plazas = document.getElementById('plazas-depto');
        if(plazas) plazas.scrollIntoView({behavior:'smooth'});
      }, 500);

      initPlazasTable();
      initActiveNav();
    }
    document.addEventListener("DOMContentLoaded", function() {
      render();
      setupImportantClickables();
    });

    /* ========= Active nav + progress ========= */
let navIo;
    function initActiveNav(){
      const navLinks = Array.from(nav.querySelectorAll("a"));
      const cards = Array.from(document.querySelectorAll(".card"));

      navIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            const id = entry.target.id;
            navLinks.forEach(a => a.classList.toggle("active", a.dataset.id === id));
          }
        });
      }, { rootMargin: "-35% 0px -60% 0px", threshold: 0.05 });

      cards.forEach(c => navIo.observe(c));

      window.addEventListener("scroll", () => {
        const st = window.scrollY;
        const dh = document.documentElement.scrollHeight - window.innerHeight;
        const pct = dh > 0 ? Math.min(100, Math.max(0, Math.round((st / dh) * 100))) : 0;
        activeHint.textContent = `${pct}% leído`;
      }, { passive:true });
    }

    /* ========= Search (sections) ========= */
    const q = document.getElementById("q");
    const results = document.getElementById("results");
    const resultsList = document.getElementById("resultsList");
    const resultsCount = document.getElementById("resultsCount");

    function showResults(term){
      const t = (term || "").trim().toLowerCase();
      if(!t){ results.classList.remove("show"); resultsList.innerHTML=""; return; }

      const matches = SECTIONS
        .map(s => {
          const hay = (s.title + " " + s.meta + " " + s.tags.join(" ") + " " + s.snippet).toLowerCase();
          const score = (hay.includes(t)?2:0) + (s.title.toLowerCase().includes(t)?3:0) + (s.tags.join(" ").toLowerCase().includes(t)?2:0);
          return { s, hay, score };
        })
        .filter(x => x.hay.includes(t) || x.score>0)
        .sort((a,b)=>b.score-a.score)
        .slice(0, 12);

      resultsCount.textContent = `${matches.length} resultado${matches.length===1?"":"s"}`;
      resultsList.innerHTML = matches.map(({s}) => `
        <div class="res-item" data-go="${s.id}" role="button" tabindex="0">
          <span class="pill">${esc(s.hint)}</span>
          <div>
            <p class="res-title">${hi(s.title, t)}</p>
            <p class="res-snippet">${hi(s.snippet, t)}</p>
          </div>
        </div>
      `).join("");

      results.classList.add("show");
    }

    function goTo(id){
      const el = document.getElementById(id);
      if(!el) return;
      results.classList.remove("show");
      q.blur();
      // Offset diferente según tamaño de pantalla
      let extraOffset;
      if(window.innerWidth <= 980){
        extraOffset = -40; // para móviles
      } else {
        extraOffset = -80; // para escritorio
      }
      const y = el.getBoundingClientRect().top + window.scrollY - 84 + extraOffset;
      window.scrollTo({ top:y, behavior:"smooth" });
    }

    q.addEventListener("input", e => showResults(e.target.value));
    q.addEventListener("keydown", (e) => {
      if(e.key === "Enter"){
        const first = resultsList.querySelector(".res-item");
        if(first) goTo(first.dataset.go);
      }
      if(e.key === "Escape"){
        results.classList.remove("show");
        q.value = "";
      }
    });

    resultsList.addEventListener("click", (e) => {
      const item = e.target.closest(".res-item");
      if(item) goTo(item.dataset.go);
    });

    document.addEventListener("click", (e) => {
      if(!e.target.closest(".searchbar")) results.classList.remove("show");
    });

    document.addEventListener("keydown", (e) => {
      const isK = e.key.toLowerCase() === "k";
      if((e.ctrlKey || e.metaKey) && isK){
        e.preventDefault();
        q.focus(); q.select();
      }
      if(e.key === "Escape") results.classList.remove("show");
    });

    /* ========= Mobile drawer ========= */
    const menuBtn = document.getElementById("menuBtn");
    const drawer = document.getElementById("drawer");
    const overlay = document.getElementById("drawerOverlay");
    const closeDrawer = document.getElementById("closeDrawer");

    function openDrawer(){
      console.log("Botón de menú clickeado");
      drawer.classList.add("show");
      overlay.classList.add("show");
    }
    function closeDrawerFn(){ drawer.classList.remove("show"); overlay.classList.remove("show"); }

    menuBtn.addEventListener("click", openDrawer);
    closeDrawer.addEventListener("click", closeDrawerFn);
    overlay.addEventListener("click", closeDrawerFn);

    drawerNav.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-id]");
      if(!a) return;
      e.preventDefault();
      closeDrawerFn();   // ✅ se cierra al elegir
      if(window.innerWidth > 980){
        // Solo en escritorio: forzar activación manual y pausar observer
        if(navIo) navIo.disconnect();
        goTo(a.dataset.id);
        setTimeout(() => {
          const navLinks = Array.from(nav.querySelectorAll("a"));
          navLinks.forEach(link => link.classList.toggle("active", link.dataset.id === a.dataset.id));
          if(navIo){
            const cards = Array.from(document.querySelectorAll(".card"));
            cards.forEach(c => navIo.observe(c));
          }
        }, 500);
      } else {
        goTo(a.dataset.id);
      }
    });

    /* ========= Table filter ========= */
    function initPlazasTable(){
      const body = document.getElementById("plazasBody");
      const filter = document.getElementById("deptFilter");
      const clearBtn = document.getElementById("clearDept");
      const totalEl = document.getElementById("plazasTotal");
      const stats = document.getElementById("deptStats");
      if(!body || !filter || !clearBtn) return;

      const norm = (s) => String(s||"").trim().toLowerCase();

      function renderRows(rows){
        body.innerHTML = rows.map(r => `
          <tr class="plaza-row">
            <td class="dept" data-label="Departamento">${esc(r.dept)}</td>
            <td data-label="ESFM / UA">${esc(r.esfm)}</td>
            <td data-label="Especialidad">${esc(r.esp)}</td>
            <td class="num" data-label="Plazas">${esc(r.plazas)}</td>
          </tr>
        `).join("");

        const total = rows.reduce((a,r)=>a+Number(r.plazas||0),0);
        totalEl.textContent = String(total);
        stats.textContent = `${rows.length} filas`;

        // Añadir listeners para efecto clic y salpicadura
        body.querySelectorAll('.plaza-row').forEach(row => {
          row.addEventListener('click', function(e) {
            // Quitar selección previa
            body.querySelectorAll('.plaza-row.clicked').forEach(r => r.classList.remove('clicked'));
            row.classList.add('clicked');
            // Salpicadura
            const splash = document.createElement('span');
            splash.className = 'splash';
            const rect = row.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 0.6;
            splash.style.width = splash.style.height = size + 'px';
            const x = e.clientX - rect.left - size/2;
            const y = e.clientY - rect.top - size/2;
            splash.style.left = x + 'px';
            splash.style.top = y + 'px';
            row.appendChild(splash);
            splash.addEventListener('animationend', ()=> splash.remove());
          });
        });
      }

      function apply(){
        const q = norm(filter.value);
        if(!q){ renderRows(PLAZAS_DATA); return; }
        const filtered = PLAZAS_DATA.filter(r => {
          const hay = `${norm(r.dept)} ${norm(r.esfm)} ${norm(r.esp)}`;
          return hay.includes(q);
        });
        renderRows(filtered);
      }

      filter.addEventListener("input", apply);
      clearBtn.addEventListener("click", () => { filter.value=""; filter.focus(); apply(); });

      renderRows(PLAZAS_DATA);
    }

    /* ========= Helpers ========= */
    function tl(date, title){
      return `
        <div class="tl">
          <div class="date">${esc(date)}</div>
          <p class="tlTitle">${esc(title)}</p>
        </div>
      `;
    }
    function esc(str){
      return String(str).replace(/[&<>"']/g, s => ({
        "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
      }[s]));
    }
    function hi(text, term){
      if(!term) return esc(text);
      const safe = esc(text);
      const re = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
      return safe.replace(re, `<span class="hl">$1</span>`);
    }
    function iconX(){
      return `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`;
    }