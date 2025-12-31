


const container = document.getElementById('preguntaContainer');
const btnInicio = document.getElementById('btnInicio');
const btnAtras = document.getElementById('btnAtras');
const btnSiguiente = document.getElementById('btnSiguiente');
const btnFin = document.getElementById('btnFin');
const btnVerTodas = document.getElementById('btnVerTodas');
const clasificacionSelect = document.getElementById('clasificacionSelect');
let todasLasPreguntas = [];
let preguntas = [];
let idxActual = 0;


fetch('a_deforestacion.json')
    .then(response => response.json())
    .then(data => {
        todasLasPreguntas = data;
        cargarClasificaciones();
        filtrarPorClasificacion();
    });

function cargarClasificaciones() {
    const clasificaciones = [...new Set(todasLasPreguntas.map(p => p.clasificacion))];
    clasificacionSelect.innerHTML = clasificaciones.map(cl => `<option value="${cl}">${cl}</option>`).join('');
}

function filtrarPorClasificacion() {
    const seleccionada = clasificacionSelect.value;
    preguntas = todasLasPreguntas.filter(p => p.clasificacion === seleccionada);
    idxActual = 0;
    mostrarPregunta(idxActual);
}

clasificacionSelect.addEventListener('change', filtrarPorClasificacion);

function mostrarPregunta(idx) {
    if (!preguntas[idx]) {
        container.innerHTML = '<div>No hay datos para esta pregunta.</div>';
        return;
    }
    const p = preguntas[idx];
    container.innerHTML = `
        <div class="qa-block">
            <div class="qa-title-big">Pregunta ${p.id}</div>
            <div class="qa-label">Clasificación: <span style="color:rgb(55,95,122);font-weight:bold;">${p.clasificacion}</span></div>
            <div class="qa-pregunta"><span class="qa-title">Pregunta:</span> ${p.pregunta}</div>
            <div class="qa-respuesta"><span class="qa-title">Respuesta:</span> ${p.respuesta}</div>
            <div class="qa-resumen"><span class="qa-title">Resumen:</span> ${p.resumen}</div>
            <div style="margin-top:0.5em;color:#888;">${idx+1} de ${preguntas.length}</div>
        </div>
    `;
}

function mostrarTodas() {
    if (!preguntas.length) {
        container.innerHTML = '<div>No hay preguntas para mostrar.</div>';
        return;
    }
    container.innerHTML = preguntas.map((p, idx) => `
        <div class="qa-block">
            <div class="qa-title-big">Pregunta ${p.id}</div>
            <div class="qa-label">Clasificación: <span style="color:rgb(55,95,122);font-weight:bold;">${p.clasificacion}</span></div>
            <div class="qa-pregunta"><span class="qa-title">Pregunta:</span> ${p.pregunta}</div>
            <div class="qa-respuesta"><span class="qa-title">Respuesta:</span> ${p.respuesta}</div>
            <div class="qa-resumen"><span class="qa-title">Resumen:</span> ${p.resumen}</div>
            <div style="margin-top:0.5em;color:#888;">${idx+1} de ${preguntas.length}</div>
        </div>
    `).join('');
}

btnInicio.onclick = () => {
    idxActual = 0;
    mostrarPregunta(idxActual);
};
btnAtras.onclick = () => {
    if (idxActual > 0) idxActual--;
    mostrarPregunta(idxActual);
};
btnSiguiente.onclick = () => {
    if (idxActual < preguntas.length - 1) idxActual++;
    mostrarPregunta(idxActual);
};
btnFin.onclick = () => {
    idxActual = preguntas.length - 1;
    mostrarPregunta(idxActual);
};
btnVerTodas.onclick = () => {
    mostrarTodas();
};
