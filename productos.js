// ==========================================
// BASE DE DATOS DE PRODUCTOS (70 PRENDAS)
// ==========================================
const productos = [
    // ===== POLERONES =====
    {
        id: 1,
        nombre: "Polerón Sportswear Pennant",
        talla: "L",
        precio: 8000,
        imagen: "poleronr.jpeg",
        categoria: "polerones",
        descripcion: "Polerón deportivo con estampado clásico."
    },
    {
        id: 2,
        nombre: "Polerón Verde Musgo - One Night at a Time Tour",
        talla: "L",
        precio: 7000,
        imagen: "image.jpeg",
        categoria: "polerones",
        descripcion: "Polerón color verde musgo con estampado de gira."
    },
    {
        id: 3,
        nombre: "Polerón Oversize Vintage",
        talla: "XL",
        precio: 19990,
        imagen: "poleron-oversize.jpg", // <-- CAMBIA ESTO POR TU IMAGEN
        categoria: "polerones",
        descripcion: "Polerón holgado estilo vintage, color violeta/negro."
    },
    // ===== PANTALONES =====
    {
        id: 4,
        nombre: "Pantalón Cargo Streetwear",
        talla: "M",
        precio: 22990,
        imagen: "cargo.jpg", // <-- CAMBIA ESTO POR TU IMAGEN
        categoria: "pantalones",
        descripcion: "Pantalón cargo de tela resistente, color negro."
    },
    // ===== POLERAS =====
    {
        id: 5,
        nombre: "Polera Graphic Print",
        talla: "L",
        precio: 14990,
        imagen: "polera.jpg", // <-- CAMBIA ESTO POR TU IMAGEN
        categoria: "poleras",
        descripcion: "Polera con estampado gráfico, blanco lavado."
    },
    // ===== ACCESORIOS =====
    {
        id: 6,
        nombre: "Gorro Beanie Neon",
        talla: "Única",
        precio: 8990,
        imagen: "gorro.jpg", // <-- CAMBIA ESTO POR TU IMAGEN
        categoria: "accesorios",
        descripcion: "Gorro de lana color verde lima."
    },
    // ===== CHAQUETAS =====
    {
        id: 7,
        nombre: "Chaqueta Windbreaker 90s",
        talla: "L",
        precio: 29990,
        imagen: "chaqueta.jpg", // <-- CAMBIA ESTO POR TU IMAGEN
        categoria: "chaquetas",
        descripcion: "Chaqueta cortaviento estilo años 90, púrpura/verde."
    },
    // ===== BOLSOS =====
    {
        id: 8,
        nombre: "Crossbody Bag Urbano",
        talla: "Única",
        precio: 12990,
        imagen: "bolso.jpg", // <-- CAMBIA ESTO POR TU IMAGEN
        categoria: "accesorios",
        descripcion: "Bolso bandolera estilo urbano, negro/púrpura."
    },
    // -------------------------------------------------------
    // AQUÍ AGREGA TUS OTROS 62 PRODUCTOS (COPIA EL FORMATO)
    // -------------------------------------------------------
    // Ejemplo de cómo agregar uno nuevo:
    // {
    //     id: 9,
    //     nombre: "Polerón Otro Modelo",
    //     talla: "M",
    //     precio: 12000,
    //     imagen: "otro-poleron.jpg",
    //     categoria: "polerones",
    //     descripcion: "Descripción corta de este producto."
    // },
];

// ==========================================
// CONFIGURACIÓN DE PAGINACIÓN
// ==========================================
const PRODUCTOS_POR_PAGINA = 12;
let paginaActual = 1;
let categoriaFiltro = 'todos';
let textoBusqueda = '';

// ==========================================
// FUNCIONES PARA MOSTRAR PRODUCTOS
// ==========================================

// Obtener productos filtrados
function getProductosFiltrados() {
    return productos.filter(producto => {
        // Filtro por categoría
        if (categoriaFiltro !== 'todos' && producto.categoria !== categoriaFiltro) {
            return false;
        }
        // Filtro por búsqueda (nombre o descripción)
        if (textoBusqueda.trim() !== '') {
            const busqueda = textoBusqueda.toLowerCase().trim();
            const nombreMatch = producto.nombre.toLowerCase().includes(busqueda);
            const descMatch = producto.descripcion.toLowerCase().includes(busqueda);
            if (!nombreMatch && !descMatch) {
                return false;
            }
        }
        return true;
    });
}

// Renderizar tarjetas
function renderizarProductos() {
    const grid = document.getElementById('productGrid');
    const filtrados = getProductosFiltrados();
    const totalProductos = filtrados.length;
    const totalPaginas = Math.ceil(totalProductos / PRODUCTOS_POR_PAGINA);

    // Calcular productos a mostrar en esta página
    const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const fin = inicio + PRODUCTOS_POR_PAGINA;
    const productosPagina = filtrados.slice(inicio, fin);

    // Si no hay productos
    if (productosPagina.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--ink-dim);">
                <p style="font-size: 20px; font-family: 'Anton', sans-serif;">No encontramos productos</p>
                <p style="margin-top: 10px;">Prueba con otra categoría o término de búsqueda.</p>
            </div>
        `;
        actualizarPaginacion(totalPaginas);
        return;
    }

    // Generar HTML de las tarjetas
    let html = '';
    productosPagina.forEach(producto => {
        html += `
            <div class="tag">
                <div class="tag-hole"></div>
                <div class="tag-photo">
                    <img src="${producto.imagen}" alt="${producto.nombre}" onclick="openModal(this)">
                </div>
                <div class="tag-body">
                    <div class="tag-name">${producto.nombre}</div>
                    <div class="tag-meta">Talla ${producto.talla}</div>
                    <div class="tag-price">$${producto.precio.toLocaleString('es-CL')}</div>
                    <a href="https://wa.me/56959641986?text=Hola!%20Me%20interesa%20${encodeURIComponent(producto.nombre)}" 
                       class="tag-buy" target="_blank" rel="noopener">Consultar</a>
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;
    actualizarPaginacion(totalPaginas);
}

// Actualizar controles de paginación
function actualizarPaginacion(totalPaginas) {
    const paginacionDiv = document.getElementById('paginacion');
    if (totalPaginas <= 1) {
        paginacionDiv.innerHTML = '';
        return;
    }

    let html = '';
    // Botón Anterior
    html += `<button class="btn-pagina" onclick="cambiarPagina(${paginaActual - 1})" ${paginaActual === 1 ? 'disabled' : ''}>‹</button>`;

    // Números de página
    for (let i = 1; i <= totalPaginas; i++) {
        html += `<button class="btn-pagina ${i === paginaActual ? 'active' : ''}" onclick="cambiarPagina(${i})">${i}</button>`;
    }

    // Botón Siguiente
    html += `<button class="btn-pagina" onclick="cambiarPagina(${paginaActual + 1})" ${paginaActual === totalPaginas ? 'disabled' : ''}>›</button>`;

    paginacionDiv.innerHTML = html;
}

// Cambiar de página
function cambiarPagina(nuevaPagina) {
    const filtrados = getProductosFiltrados();
    const totalPaginas = Math.ceil(filtrados.length / PRODUCTOS_POR_PAGINA);
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
    paginaActual = nuevaPagina;
    renderizarProductos();
    // Scroll suave hacia arriba
    document.getElementById('tienda').scrollIntoView({ behavior: 'smooth' });
}

// Aplicar filtros
function aplicarFiltros() {
    const selectCategoria = document.getElementById('filtroCategoria');
    categoriaFiltro = selectCategoria.value;
    textoBusqueda = document.getElementById('buscadorProductos').value;
    paginaActual = 1; // Reiniciar a la primera página al filtrar
    renderizarProductos();
}

// ==========================================
// INICIALIZAR AL CARGAR LA PÁGINA
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    // Llenar el select de categorías dinámicamente
    const select = document.getElementById('filtroCategoria');
    const categorias = ['todos', ...new Set(productos.map(p => p.categoria))];
    categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        select.appendChild(option);
    });

    // Renderizar productos iniciales
    renderizarProductos();

    // Ocultar splash después de 2 segundos
    setTimeout(function () {
        const splash = document.getElementById('splash');
        splash.classList.add('hidden');
    }, 2000);
});

// ==========================================
// FUNCIONES DEL MODAL (YA EXISTENTES)
// ==========================================
function openModal(imgElement) {
    var modal = document.getElementById('imageModal');
    var modalImg = document.getElementById('modalImg');
    modal.style.display = 'flex';
    modalImg.src = imgElement.src;
    modalImg.alt = imgElement.alt;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeModal();
});

document.getElementById('imageModal').addEventListener('click', function (event) {
    if (event.target === this) closeModal();
});