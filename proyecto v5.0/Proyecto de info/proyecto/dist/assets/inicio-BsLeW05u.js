// ==========================================================
// 1. SELECTORES DE ELEMENTOS DEL DOM (Variables Globales)
// ==========================================================
const mainContentDiv = document.getElementById('main-content');
const sidebarNav = document.getElementById('sidebar-nav');

// Elementos relacionados con el cambio de tema
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');

// Elementos relacionados con el menú de usuario
const userMenuBtn = document.getElementById('user-menu');
const userDropdown = document.getElementById('user-dropdown');

// Elementos relacionados con la información del usuario en el header
const usernameDisplay = document.getElementById('usernameDisplay');
const roleDisplay = document.getElementById('roleDisplay');

// Botón de cerrar sesión
const logoutButton = document.getElementById('logoutButton');

window.openFiltersModal = openFiltersModal;

let ivaRate = 19; // Valor inicial por defecto para el IVA (ajusta si es otro)
let profitMargins = {
    "Computacion": 35,
    "Libreria": 40,
    "Tintas": 45,
    "Otros_productos": 40
};


// ==========================================================
// 2. LÓGICA DE TEMA (Modo Oscuro/Claro)
// ==========================================================


const currentTheme = localStorage.getItem("theme") || "light";


document.documentElement.classList.toggle("dark", currentTheme === "dark");

/**
 * Actualiza el icono y el texto del botón de tema.
 * @param {boolean} isDarkTheme - true si el tema actual es oscuro, false si es claro.
 */
function updateThemeToggleUI(isDarkTheme) {
    themeIcon.innerHTML = isDarkTheme
        ? '<path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' // Luna (Modo Oscuro)
        : '<path d="M12 3V5M12 19V21M21 12H19M5 12H3M18.364 5.636L16.95 7.05M7.05 16.95L5.636 18.364M18.364 18.364L16.95 16.95M7.05 7.05L5.636 5.636" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>'; // Sol (Modo Claro)
    
    themeText.textContent = isDarkTheme ? "Modo Claro" : "Modo Oscuro";
}


updateThemeToggleUI(currentTheme === "dark");


if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        const isDarkNow = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isDarkNow ? "dark" : "light");
        updateThemeToggleUI(isDarkNow);
    });
}


// ==========================================================
// 3. LÓGICA DEL MENÚ DE USUARIO Y CERRAR SESIÓN
// ==========================================================


if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        userDropdown.classList.toggle("hidden");
    });
}


document.addEventListener("click", (event) => {
    if (userMenuBtn && userDropdown && !userMenuBtn.contains(event.target) && !userDropdown.contains(event.target)) {
        userDropdown.classList.add("hidden");
    }
});


if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok && data.success) {
                localStorage.removeItem('loggedInUsername'); 
                Swal.fire({
                    icon: 'success',
                    title: '¡Hasta pronto!',
                    text: data.message,
                    timer: 1500,
                    timerProgressBar: true,
                    didClose: () => {
                        window.location.href = '/index'; 
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cerrar sesión',
                    text: data.message || 'Hubo un problema al cerrar la sesión.'
                });
            }
        } catch (error) {
            console.error('Error de red al cerrar sesión:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de Conexión',
                text: 'No se pudo conectar con el servidor para cerrar sesión.'
            });
        }
    });
}

async function loadUserData() {
    if (!usernameDisplay || !roleDisplay) {
        console.error('Error: No se encontraron los elementos HTML con ID "usernameDisplay" o "roleDisplay".');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/search-user');
        const data = await response.json();

        if (response.ok && data.success) {
            usernameDisplay.textContent = data.user.username || 'Usuario Desconocido';
            roleDisplay.textContent = data.user.role || 'Rol Desconocido';
        } else {
            usernameDisplay.textContent = 'Error al cargar usuario';
            roleDisplay.textContent = data.message || 'Datos no disponibles';
            console.error('Error al obtener datos del usuario:', data.message || 'Error desconocido.');

            if (response.status === 401) {
                
                Swal.fire({
                    icon: 'warning',
                    title: 'Sesión Expirada',
                    text: 'Tu sesión ha expirado o no estás autenticado. Por favor, inicia sesión de nuevo.',
                    timer: 2000,
                    timerProgressBar: true,
                    didClose: () => {
                        window.location.href = '/';
                    }
                });
            }
        }
    } catch (err) {
        console.error('Error de red al intentar obtener datos del usuario:', err);
        usernameDisplay.textContent = 'Error de conexión';
        roleDisplay.textContent = 'Inténtalo de nuevo.';
        Swal.fire({
            icon: 'error',
            title: 'Error de Conexión',
            text: 'No se pudo conectar con el servidor para cargar los datos del usuario.'
        });
    }
}


// ==========================================================
// 4. FUNCIONES AUXILIARES
// ==========================================================

/**
 * Formatea una cadena de fecha (YYYY-MM-DD o ISO) a DD/MM/YYYY.
 * @param {string} dateString - La fecha en formato ISO (YYYY-MM-DD).
 * @returns {string} La fecha formateada o 'N/A'/'Fecha inválida' si es nula o incorrecta.
 */
function formatProductDate(dateString) {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        // Verificar si la fecha es válida
        if (isNaN(date.getTime())) {
            return 'Fecha inválida';
        }
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } catch (e) {
        console.error("Error al formatear fecha:", dateString, e);
        return 'Fecha inválida';
    }
}

// ==========================================================
// 5. FUNCIONES DE VISTAS (PÁGINAS DINÁMICAS)
// ==========================================================

/**
 * Muestra la vista de Inicio (Dashboard).
 */
async function renderDashboardPage() {
    mainContentDiv.innerHTML = `
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Inicio del Panel</h1>
            <p class="text-gray-600 dark:text-gray-400">Resumen y estadísticas generales de tu inventario.</p>
        </div>
        
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">Total de Productos Registrados</h3>
          <div class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <svg class="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.5 7.27783L12 12.0001M12 12.0001L3.49997 7.27783M12 12.0001L12 21.5001" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <p id="totalProducts" class="text-2xl font-bold text-gray-900 dark:text-white">523</p>
          <div class="flex items-center text-green-600 dark:text-green-400">
            <svg class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 17L13 7L17 11M11 7L7 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
          </div>
        </div>
      </div>
      
      
      <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">Bajo Stock</h3>
          <div class="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
            <svg class="h-6 w-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 12V8H4V12M20 12V16H4V12M20 12H4M4 20H20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <p id="stockLow" class="text-2xl font-bold text-gray-900 dark:text-white">24</p>
          <div class="flex items-center text-orange-600 dark:text-orange-400">
            <svg class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 17L13 7L17 11M11 7L7 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
          </div>
        </div>
      </div>
      
    <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">Stock Crítico</h3>
          <div class="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
            <svg class="h-6 w-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 12V8H4V12M20 12V16H4V12M20 12H4M4 20H20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <p id="stockCritical" class="text-2xl font-bold text-gray-900 dark:text-white">0</p>
          <div class="flex items-center text-orange-600 dark:text-orange-400">
            <svg class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 17L13 7L17 11M11 7L7 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
          </div>
        </div>
      </div>



      <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">Sin Stock</h3>
          <div class="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
            <svg class="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 14L12 7L5 14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <p id="stockOut" class="text-2xl font-bold text-gray-900 dark:text-white">0</p>
          <div class="flex items-center text-red-600 dark:text-red-400">
            <svg class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 14L12 7L5 14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
        <div class="flex justify-between items-start mb-3">
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">Valor Total</h3>
          <div class="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
            <svg class="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 3V5M12 19V21M21 12H19M5 12H3M18.364 5.636L16.95 7.05M7.05 16.95L5.636 18.364M18.364 18.364L16.95 16.95M7.05 7.05L5.636 5.636" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="flex items-baseline justify-between">
          <p class="text-2xl font-bold text-gray-900 dark:text-white">-</p>
          <div class="flex items-center text-green-600 dark:text-green-400">
            <svg class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 17L13 7L17 11M11 7L7 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
          </div>
        </div>
      </div>
    </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-5 border-b border-gray-200 dark:border-gray-700">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Resumen de últimos productos ingresados</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="bg-gray-50 dark:bg-gray-900/50">
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Marca</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categoría</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Color</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Precio Bruto (C/U)</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fecha de Compra</th>
                        </tr>
                    </thead>
                    <tbody id="latest-products-table-body" class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                       
                    </tbody>
                </table>
            </div>
            <div id="latest-products-message" class="p-4 text-center text-gray-500 dark:text-gray-400">
                Cargando últimos productos...
            </div>
        </div>
    `;

    const tableBody = document.getElementById('latest-products-table-body');
    const messageDiv = document.getElementById('latest-products-message');

    try {
        messageDiv.textContent = 'Cargando últimos productos...';
        const response = await fetch('http://localhost:8080/ultimos5-productos');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const products = await response.json();

        if (products.length === 0) {
            messageDiv.textContent = 'No hay productos recientes para mostrar.';
            tableBody.innerHTML = ''; 
            return;
        }

        let tableRowsHtml = '';
        products.forEach(product => {
            tableRowsHtml += `
                <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">${product.id_producto}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.nombre_producto}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.marca_producto}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.categoria_producto}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.color_producto}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">$${product.precio_venta_producto ? product.precio_venta_producto.toFixed(0) : 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.stock_producto}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${formatProductDate(product.fecha_compra_producto)}</td>
                </tr>
            `;
        });
        tableBody.innerHTML = tableRowsHtml;
        messageDiv.textContent = '';

    } catch (error) {
        console.error('Error al cargar los últimos productos para el dashboard:', error);
        messageDiv.textContent = 'Error al cargar los productos. Por favor, intenta de nuevo.';
        tableBody.innerHTML = ''; 
    }
}

/**
 * Muestra el formulario para agregar un nuevo producto.
 * Después de renderizar el HTML, adjunta los event listeners necesarios.
 */
function renderAddProductForm() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const maxDate = `${year}-${month}-${day}`; // Fecha actual para el atributo max

    // Calcular la fecha de hace 10 años
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(today.getFullYear() - 10);
    const minYear = tenYearsAgo.getFullYear();
    const minMonth = String(tenYearsAgo.getMonth() + 1).padStart(2, '0');
    const minDay = String(tenYearsAgo.getDate()).padStart(2, '0');
    const minDate = `${minYear}-${minMonth}-${minDay}`; // Fecha de hace 10 años para el atributo min

    // Generar el HTML del formulario y lo inserta en el 'mainContentDiv'
    mainContentDiv.innerHTML = `
        <div class="min-h-screen flex items-center justify-center p-4">
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Agregar Nuevo Producto</h2>
        <form id="addProductForm" class="space-y-4" novalidate>
            <div>
                <label for="product_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Producto</label>
                <input type="text" id="product_name" name="product_name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" required>
            </div>

            <div>
                <label for="product_brand" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Marca</label>
                <input type="text" id="product_brand" name="product_brand" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" required>
            </div>

            <div>
                <label for="product_category" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoría</label>
                <select id="product_category" name="product_category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" required>
                    <option value="" disabled selected>Selecciona una categoría</option>
                    <option value="Computación">Computación</option>
                    <option value="Libreria">Librería</option>
                    <option value="Tintas">Tintas</option>
                    <option value="Otros_productos">Otros</option>
                </select>
            </div>

            <div>
                <label for="product_color" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
                <input type="text" id="product_color" name="product_color" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" required>
            </div>

            <div>
                <label for="product_price_compra" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Costo (C/U)</label>
                <input type="number" id="product_price_compra" name="product_price_compra" step="0.01" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" required>
            </div>

            <div>
                <label for="product_quantity" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
                <input type="number" id="product_quantity" name="product_quantity" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" required>
            </div>

            <div>
                <label for="product_purchase_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de Compra</label>
                <input type="date" id="product_purchase_date" name="product_purchase_date"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                        max="${maxDate}"
                        min="${minDate}" required>
            </div>

            <div>
                <label for="product_availability" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Disponibilidad</label>
                <select id="product_availability" name="product_availability" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" required>
                    <option value="" disabled selected>Selecciona una disponibilidad</option>
                    <option value="Disponible">Disponible</option>
                    <option value="No Disponible">No Disponible</option>
                </select>
            </div>

            <div>
                <p id="formMessage" class="mt-4 text-center text-sm font-medium"></p>
            </div>

            <div class="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                <button type="button" id="cancelAddProduct" class="w-full sm:w-auto bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700">
                    Cancelar
                </button>
                <button type="submit" id="addProductSubmitBtn" class="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600">
                    Agregar Producto
                </button>
            </div>
        </form>
    </div>
</div>
    `;

    // Adjuntar event listeners después de que el HTML ha sido renderizado
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', async (event) => { // Función anónima async para el submit
            event.preventDefault(); // Evita el envío tradicional del formulario

            const formMessage = document.getElementById('formMessage');
            formMessage.textContent = ''; // Limpiar mensajes anteriores
            formMessage.className = 'mt-4 text-center text-sm font-medium'; // Resetear clases

            // 1. Recolectar los datos del formulario
            const productName = document.getElementById('product_name').value;
            const productBrand = document.getElementById('product_brand').value;
            const productCategory = document.getElementById('product_category').value;
            const productColor = document.getElementById('product_color').value;
            const productPriceCompra = parseFloat(document.getElementById('product_price_compra').value);
            const productQuantity = parseInt(document.getElementById('product_quantity').value, 10); // Importante parsear a entero
            const productPurchaseDate = document.getElementById('product_purchase_date').value;
            const productAvailability = document.getElementById('product_availability').value;

    // 2. Validaciones con SweetAlert2
            if (!productName || !productBrand || !productCategory || !productColor || isNaN(productPriceCompra) || isNaN(productQuantity) ||
                !productPurchaseDate || !productAvailability || productCategory === "" || productAvailability === "") {

                Swal.fire({
                    icon: 'error',
                    title: 'Error de Validación',
                    text: 'Por favor, completa todos los campos correctamente.',
                    confirmButtonText: 'Entendido',
                    customClass: {
                        confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
                    },
                    buttonsStyling: false,
                });
                return; // Detiene la ejecución si hay campos incompletos
            }

            if (productPriceCompra < 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Validación',
                    text: 'El costo no puede ser un número negativo.',
                    confirmButtonText: 'Corregir',
                    customClass: {
                        confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
                    },
                    buttonsStyling: false,
                });
                return; // Detiene la ejecución
            }

            if (productQuantity < 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Validación',
                    text: 'Las existencias no pueden ser un número negativo o cero.',
                    confirmButtonText: 'Corregir',
                    customClass: {
                        confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
                    },
                    buttonsStyling: false,
                });
                return; // Detiene la ejecución
            }

            // --- INICIO DE CAMBIOS ---

            // Obtener el porcentaje de ganancia para la categoría seleccionada
            const categoryProfitMargin = profitMargins[productCategory] || 0; // Si la categoría no tiene un margen definido, usa 0

            // Calcular el precio de venta
            // Formula: precio_venta = precio_compra * (1 + margen_ganancia/100) * (1 + iva/100)
            // Calcular el precio de venta bruto
            let productPriceVenta = productPriceCompra * (1 + categoryProfitMargin / 100);
            productPriceVenta = productPriceVenta * (1 + ivaRate / 100);

            // Redondear SIEMPRE hacia arriba al siguiente decimal (excepto si ya es exacto)
            productPriceVenta = Math.ceil(productPriceVenta * 10) / 10;

            // Si termina en .0, dejarlo como está (no sumar un decimal extra)
            productPriceVenta = parseFloat(productPriceVenta.toFixed(1));

            // --- FIN DE CAMBIOS ---

            // 3. ¡Nuevo! Calcular el estado del stock usando la función getStockStatus
            const stockStatus = getStockStatus(productQuantity);
            console.log(`Cantidad ingresada: ${productQuantity}, Estado del Stock calculado: ${stockStatus}`);


            // Crear el objeto con todos los datos a enviar (claves que coinciden con tu backend)
            const productData = {
                name: productName,
                brand: productBrand,
                category: productCategory,
                color: productColor,
                price_compra: productPriceCompra,
                price_venta: productPriceVenta, // <-- ¡Aquí se añade el precio de venta calculado!
                quantity: productQuantity,
                purchase_date: productPurchaseDate,
                availability: productAvailability,
                status: stockStatus // Este es el campo que enviará el estado calculado
            };

            console.log('Datos enviados desde el frontend:', productData);

                        try {
                            // 4. Enviar los datos al backend
                            const response = await fetch(`${API_BASE_URL}/anadir-productos`, { // Usar API_BASE_URL
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${sessionStorage.getItem('jwt_token')}` // Asegúrate de enviar el token
                                },
                                body: JSON.stringify(productData)
                            });

                            const result = await response.json();
                            console.log('Respuesta del servidor:', result);

                            // Llamar a la ruta /api/HistorialCosto después de agregar el producto
                            try {
                                await fetch('/api/HistorialCosto', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${sessionStorage.getItem('jwt_token')}`
                                    },
                                    body: JSON.stringify({
                                        name: productName,
                                        quantity: productQuantity,
                                        cost: productPriceCompra,
                                        purchase_date: productPurchaseDate
                                    })
                                });
                            } catch (histError) {
                                console.warn('No se pudo guardar el historial de costo:', histError);
                            }


                // 5. Manejar la respuesta
                 if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Producto Agregado!',
                        text: result.message || 'El producto ha sido añadido exitosamente.',
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        document.getElementById('addProductForm').reset();
                        renderStockPage();

                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al Agregar Producto',
                        text: result.message || 'Hubo un problema al agregar el producto. Por favor, intenta de nuevo.',
                        confirmButtonText: 'Entendido',
                        customClass: {
                            confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
                        },
                        buttonsStyling: false,
                    });
                }
            } catch (error) {
                console.error('Error en la comunicación con el servidor:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Conexión',
                    text: 'Error de red o del servidor. Por favor, verifica tu conexión o inténtalo más tarde.',
                    confirmButtonText: 'Cerrar',
                    customClass: {
                        confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
                    },
                    buttonsStyling: false,
                });
            }
        });
    } else {
        console.error("Error: addProductForm no se encontró después de renderizar.");
    }

    const cancelAddProductBtn = document.getElementById('cancelAddProduct');
    if (cancelAddProductBtn) {
        cancelAddProductBtn.addEventListener('click', renderStockPage);
        updateStockSummaryCards();
        updateDashboardVisualAlerts();
    } else {
        console.error("Error: cancelAddProduct no se encontró después de renderizar.");
    }
}

/**
 * Determina el estado del stock de un producto basándose en su cantidad.
 * @param {number} quantity - La cantidad de stock del producto.
 * @returns {string} El estado del stock ("Stock normal", "Stock medio", "Stock bajo", "Sin stock", "Stock crítico").
 */
function getStockStatus(quantity) {
    if (quantity === 0) {
        return "Sin stock";
    } else if (quantity >= 20) {
        return "Stock normal";
    } else if (quantity >= 10) { // Mayor a 20 y menor o igual a 50
        return "Stock medio";
    } else if (quantity >= 5) { // Mayor o igual a 5 y menor o igual a 20
        return "Stock bajo";
    } else { // Cantidades entre 1 y 4
        return "Stock crítico";
    }
}

/**
 * Función auxiliar para obtener productos de la API y renderizar la tabla.
 * @param {string} searchTerm - El término de búsqueda opcional.
 */
async function fetchAndRenderProducts(searchTerm = '') {
    const tableBody = document.getElementById('products-table-body');
    const messageDiv = document.getElementById('stock-message');

    
    tableBody.innerHTML = '';
    messageDiv.textContent = 'Cargando productos...';
    messageDiv.classList.remove('text-red-600');
    messageDiv.classList.add('text-gray-500', 'dark:text-gray-400'); 

    try {
        const url = `http://localhost:8080/obtener-productos${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Error al obtener productos desde el servidor.');
        }

        const products = data.products;

        if (products.length === 0) {
            messageDiv.textContent = searchTerm ? 'No se encontraron productos que coincidan con la búsqueda.' : 'No hay productos para mostrar.';
            return;
        }

        let tableRowsHtml = '';
        products.forEach(product => {
            tableRowsHtml += `
                          <tr>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.id}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.name}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.brand}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.category}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.color}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.price_venta ? product.price_venta.toFixed(0) : 'N/A'}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.price_compra ? product.price_compra.toFixed(0) : 'N/A'}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.quantity}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    ${product.status === 'Stock normal'
                                        ? '<span class="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30 rounded-full">Stock Normal</span>'
                                        : product.status === 'Stock medio'
                                            ? '<span class="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30 rounded-full">Stock Medio</span>'
                                            : product.status === 'Stock bajo'
                                                ? '<span class="px-2 py-1 text-xs font-medium text-orange-700 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30 rounded-full">Stock Bajo</span>'
                                                : product.status === 'Stock crítico' || 'Stock critico'
                                                ? '<span class="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30 rounded-full">Stock Crítico</span>'
                                                : '<span class="px-2 py-1 text-xs font-medium text-red-800 bg-red-200 dark:text-red-500 dark:bg-red-900/50 rounded-full">Sin Stock</span>' // Clases ajustadas aquí
                                    }
                                </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.purchase_date ? new Date(product.purchase_date).toLocaleDateString() : 'N/A'}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    ${product.availability === 'Disponible'
                                        ? '<span class="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30 rounded-full">Disponible</span>'
                                        :'<span class="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30 rounded-full">No Disponible</span>'
                                    }
                                </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                        <button onclick="editProduct('${product.id}')" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        </td>
                          </tr>
                          `
        });
        tableBody.innerHTML = tableRowsHtml;
        messageDiv.textContent = '';

    } catch (error) {
        console.error('Error al cargar/filtrar productos:', error);
        messageDiv.textContent = 'Error al cargar los productos. Por favor, intenta de nuevo.';
        messageDiv.classList.remove('text-gray-500', 'dark:text-gray-400');
        messageDiv.classList.add('text-red-600');
    }
}





/**
 * Muestra la vista de Existencias (Stock) con la tabla de productos,
 * obteniendo los datos desde la API.
 */
async function renderStockPage() {
    let tableRowsHtml = ''; 
    
    mainContentDiv.innerHTML = `
<div class="mb-6">
    <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Existencias</h1>
        <p class="text-gray-600 dark:text-gray-400">Control y gestión de inventario.</p>
        </div>

<div class="flex items-center gap-3 mb-6"> <div class="relative w-full max-w-md"> <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <input
            id="productSearchInput"
            type="text"
            placeholder="Buscar productos..."
            class="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
        >
    </div>

    <button onclick="openFiltersModal()" class="min-w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors">
        Filtros
    </button>
</div>

    
<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
    <div class="p-5 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Inventario Actual</h2>
    </div>

    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full divide-y divide-gray-200 dark:divide-gray-700"> 
                <thead class="bg-gray-50 dark:bg-gray-900">
                    <tr class="bg-gray-50 dark:bg-gray-900/50">
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Marca</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categoría</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Color</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Precio Bruto (C/U)</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Costo (C/U)</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estado</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fecha de Compra</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Disponibilidad</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody id="products-table-body" class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                </tbody>
            </table>
        </div>
        <div id="stock-message" class="p-4 text-center text-gray-500 dark:text-gray-400">
            Cargando productos...
        </div>
    </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Resumen</h3>
        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Total de Productos Registrados</span>
                <span id="totalProducts" class="font-medium text-gray-900 dark:text-white">0</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Productos Disponibles</span>
                <span id="activeProducts" class="font-medium text-gray-900 dark:text-white">0</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Stock Total</span>
                <span id="totalQuantity" class="font-medium text-gray-900 dark:text-white">0</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Stock Normal</span>
                <span id="stockNormal" class="font-medium text-green-600 dark:text-green-400">0</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Stock Medio</span>
                <span id="stockMedium" class="font-medium text-yellow-600 dark:text-yellow-400">0</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Bajo Stock</span>
                <span id="stockLow" class="font-medium text-orange-600 dark:text-orange-400">0</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Stock Crítico</span>
                <span id="stockCritical" class="font-medium text-red-600 dark:text-red-400">0</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Sin Stock</span>
                <span id="stockOut" class="font-medium text-red-600 dark:text-red-400">0</span>
            </div>
        </div>
    </div>

<div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Alertas de Stock</h3>
    <div class="space-y-4">
        <div id="noStockAlert" class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hidden">
            <h4 class="font-medium text-red-800 dark:text-red-400">Productos sin Stock</h4>
            <p id="noStockMessage" class="text-sm text-red-600 dark:text-red-300">0 productos requieren reposición inmediata</p>
        </div>
        <div id="lowStockAlert" class="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hidden">
            <h4 class="font-medium text-orange-800 dark:text-orange-400">Stock Bajo</h4>
            <p id="lowStockMessage" class="text-sm text-orange-600 dark:text-orange-300">0 productos están por debajo del mínimo</p>
        </div>
        <div id="criticalStockAlert" class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hidden">
            <h4 class="font-medium text-red-800 dark:text-red-400">Stock Crítico</h4>
            <p id="criticalStockMessage" class="text-sm text-red-600 dark:text-red-300">0 productos están en nivel crítico</p>
        </div>
        <div id="allGoodStockAlert" class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <h4 class="font-medium text-green-800 dark:text-green-400">¡Stock Óptimo!</h4>
            <p class="text-sm text-green-600 dark:text-green-300">Todos los productos tienen niveles de stock saludables.</p>
        </div>
    </div>
</div>

    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Acciones Rápidas</h3>
        <div class="space-y-3">
            <button id="addProductBtn" class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors">
                Nuevo Producto
            </button>
            <button id="adjustStockBtn" class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors">
                Ajustar Stock
            </button>
            <button id="generateReportBtn" class="w-full px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-lg transition-colors">
                Generar Reporte
            </button>
            </button>
            <button id="productSoldBtn" class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors">
                Registrar Venta
            </button>
        </div>
    </div>
</div>
    `;

    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', renderAddProductForm);
    }

    const adjustStockBtn = document.getElementById('adjustStockBtn'); // <-- El botón que genera el formulario de ajuste
    if (adjustStockBtn) {
        adjustStockBtn.addEventListener('click', renderAdjustStockForm); // <-- Aquí se adjunta el listener
    }

    const productSoldBtn = document.getElementById('productSoldBtn'); // <-- El botón que genera el formulario de ajuste de venta
    if (productSoldBtn) {
        productSoldBtn.addEventListener('click', renderProductSoldForm); // <-- Aquí se adjunta el listener para ventas
    }

    const searchInput = document.getElementById('productSearchInput');

    // Cargar productos al inicio (sin término de búsqueda)
    fetchAndRenderProducts();

    // Event Listener para la barra de búsqueda
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim(); // .trim() para quitar espacios al inicio/final
        fetchAndRenderProducts(searchTerm); // Llamar a la función con el término de búsqueda
    });

    

    try {
        const response = await fetch('http://localhost:8080/obtener-productos'); 

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Error desconocido del servidor.' }));
            throw new Error(errorData.message || `Error HTTP: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.products)) {
            if (data.products.length > 0) {
                tableRowsHtml = data.products.map(product =>     `
                          <tr>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.id}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.name}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.brand}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.category}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.color}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.price_venta ? product.price_venta.toFixed(0) : 'N/A'}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.price_compra ? product.price_compra.toFixed(0) : 'N/A'}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.quantity}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    ${product.status === 'Stock normal'
                                        ? '<span class="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30 rounded-full block mx-auto w-fit">Stock Normal</span>'
                                        : product.status === 'Stock medio'
                                            ? '<span class="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30 rounded-full block mx-auto w-fit">Stock Medio</span>'
                                            : product.status === 'Stock bajo'
                                                ? '<span class="px-2 py-1 text-xs font-medium text-orange-700 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30 rounded-full block mx-auto w-fit">Stock Bajo</span>'
                                                : (product.status === 'Stock crítico' || product.status === 'Stock critico') // LÓGICA CORREGIDA AQUÍ
                                                    ? '<span class="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30 rounded-full block mx-auto w-fit">Stock Crítico</span>'
                                                    : '<span class="px-2 py-1 text-xs font-medium text-red-800 bg-red-200 dark:text-red-500 dark:bg-red-900/50 rounded-full block mx-auto w-fit">Sin Stock</span>'
                                    }
                                </td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.purchase_date ? new Date(product.purchase_date).toLocaleDateString() : 'N/A'}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    ${product.availability === 'Disponible'
                                        ? '<span class="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30 rounded-full">Disponible</span>'
                                        :'<span class="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30 rounded-full">No Disponible</span>'
                                    }
                                </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                        <button onclick="editProduct('${product.id}')" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        </td>
                          </tr>
                          `).join("");
            } else {
                tableRowsHtml = `
                    <tr>
                        <td colspan="9" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                            No hay productos disponibles en el inventario.
                        </td>
                    </tr>
                `;
            }
        } else {
            tableRowsHtml = `
                <tr>
                    <td colspan="9" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                        Error: La respuesta de la API no contiene productos válidos.
                    </td>
                </tr>
            `;
            console.warn("API response was not successful or products array is missing/invalid:", data);
        }

    } catch (error) {
        console.error('Error al obtener productos:', error);
        tableRowsHtml = `
            <tr>
                <td colspan="9" class="px-6 py-4 text-center text-red-500 dark:text-red-400">
                    Error al cargar productos: ${error.message}. Por favor, verifica tu servidor backend y asegúrate de que el CORS esté configurado correctamente.
                </td>
            </tr>
        `;
    }

    const tableBody = mainContentDiv.querySelector('#products-table-body');
    if (tableBody) {
        tableBody.innerHTML = tableRowsHtml;
    } else {
        console.error("No se encontró el tbody (#products-table-body) en el HTML cargado por renderStockPage().");
    }
}

function openFiltersModal() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Configurar Filtros</h3>
      </div>
      <form id="filtersForm" class="p-6">

        <div class="mb-4">
                <div>
                <label for="product_availability" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoría</label>
                <select id="product_availability" name="product_availability" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" required>
                    <option value="" disabled selected>Selecciona una categoría...</option>
                    <option value="Todas">Todas</option>
                    <option value="Computacion">Computación</option>
                    <option value="Libreria">Librería</option>
                    <option value="Tintas">Tintas</option>
                    <option value="Otros_productos">Otros</option>
                </select>
            </div>
        </div>

        <div class="mb-4">
                <div>
                <label for="product_availability" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Disponibilidad</label>
                <select id="product_availability" name="product_availability" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" required>
                    <option value="" disabled selected>Selecciona una disponibilidad...</option>
                    <option value="Todas">Todas</option>
                    <option value="Disponible">Disponible</option>
                    <option value="No Disponible">No Disponible</option>
                </select>
            </div>
        </div>

      </form>
      <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
        <button id="cancelFilters" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
          Cancelar
        </button>
        <button id="saveFilters" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md">
          Filtrar
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const closeModal = () => modal.remove();
  modal.querySelector('#cancelFilters').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  modal.querySelector('#saveFilters').addEventListener('click', () => {

    closeModal();
  });
}


async function editProduct(id) {
  
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Editar Producto</h3>
      </div>
      <form id="editProductForm" class="p-6 grid grid-cols-2 gap-4">
      
        <div class="col-span-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
          <input type="text" name="name"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marca </label>
          <input type="text" name="brand"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
           <select id="category" name="category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" required>
                    <option value="" disabled selected>Selecciona una categoría</option>
                    <option value="Computación">Computación</option>
                    <option value="Libreria">Librería</option>
                    <option value="Tintas">Tintas</option>
                    <option value="Otros_productos">Otros</option>
                </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
          <input type="text" name="color"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Costo</label>
          <input type="number" name="cost"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Disponibilidad</label>
          <select id="availability" name="availability" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" required>
                    <option value="" disabled selected>Selecciona una disponibilidad</option>
                    <option value="Disponible">Disponible</option>
                    <option value="No Disponible">No Disponible</option> 
                </select>
        </div>
      </form>
      <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
        <button id="cancelEdit" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
          Cancelar
        </button>
        <button id="saveEdit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md">
          Guardar
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // 2. Obtener los datos del producto y rellenar el formulario
  try {
    // Asume que tu API para obtener un producto es /api/productos/:id
    const response = await fetch(`/api/productos/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const product = await response.json();

    // Rellenar el formulario con los datos del producto
    const form = modal.querySelector('#editProductForm');
  //  form.querySelector('input[name="id"]').value = product.id_producto || ''; // Asumo que el ID es 'id_producto'
    form.querySelector('input[name="name"]').value = product.nombre_producto || ''; // Ajustar según tu DB
    form.querySelector('input[name="brand"]').value = product.marca_producto || '';
    //form.querySelector('input[name="type"]').value = product.marca_producto || ''; // Mapeado a 'marca_producto'
    form.querySelector('select[name="category"]').value = product.categoria_producto || '';
    form.querySelector('input[name="color"]').value = product.color_producto || '';
    form.querySelector('input[name="cost"]').value = product.precio_compra_producto || '';
    form.querySelector('select[name="availability"]').value = product.disponibilidad_producto || '';

  } catch (error) {
    console.error('Error al obtener los datos del producto:', error);
    alert('Error al cargar los datos del producto para edición.');
    modal.remove(); // Cerrar el modal si hay un error al cargar los datos
    return; // Salir de la función si no se pueden cargar los datos
  }


  // 3. Configurar los eventos del modal (cerrar)
  const closeModal = () => modal.remove();
  modal.querySelector('#cancelEdit').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // 4. Manejar el envío del formulario (guardar)
  modal.querySelector('#saveEdit').addEventListener('click', async () => {
    const form = modal.querySelector('#editProductForm');
    const formData = new FormData(form); // Obtiene todos los campos del formulario

let formMessageElement = modal.querySelector('#formMessage');
  if (!formMessageElement) {
      // Si no existe, lo creamos y lo añadimos al formulario (o donde sea adecuado)
      formMessageElement = document.createElement('p');
      formMessageElement.id = 'formMessage';
      formMessageElement.className = 'mt-4 text-center text-sm font-medium';
      form.appendChild(formMessageElement); // O modal.querySelector('form').after(formMessageElement);
  }
  formMessageElement.textContent = ''; // Limpiar mensajes anteriores al intentar guardar

  // Obtener los valores del formulario para las validaciones
  const nombre_producto = formData.get('name');
  const marca_producto = formData.get('brand'); // 'type' en el modal es 'brand' en el backend
  const categoria_producto = formData.get('category');
  const color_producto = formData.get('color');
  const precio_compra_producto = parseFloat(formData.get('cost')); // 'cost' en el modal es 'price_compra'
  const disponibilidad_producto = formData.get('availability'); // 


  // 1. Validaciones de campos vacíos o números inválidos
  if (!nombre_producto || !marca_producto || !categoria_producto || !color_producto ||
      !disponibilidad_producto || isNaN(precio_compra_producto) || categoria_producto === "" || marca_producto === "" || nombre_producto === "" || color_producto === "" || disponibilidad_producto === "") { // Añadí verificación de cadena vacía
      formMessageElement.textContent = 'Por favor, completa todos los campos de texto y asegura que los números sean válidos.';
      formMessageElement.className = 'mt-4 text-center text-sm font-medium text-red-600 dark:text-red-400';
      return; // Detiene la ejecución si hay un error
  }

  // 3. Validación de precio de compra
  if (precio_compra_producto < 0) {
      formMessageElement.textContent = 'El precio de compra no puede ser negativo.';
      formMessageElement.className = 'mt-4 text-center text-sm font-medium text-red-600 dark:text-red-400';
      return; // Detiene la ejecución si hay un error
  }


    // Crea un objeto con los datos del formulario, mapeando a los nombres esperados por el backend
    const productData = {
      name: formData.get('name'),
      // type en el modal es brand en el backend
      brand: formData.get('brand'),
      category: formData.get('category'),
      color: formData.get('color'),
      // cost en el modal es price_compra en el backend
      price_compra: parseFloat(formData.get('cost')), // Convertir a número
      // price en el modal es price_venta en el backend
      availability: formData.get('availability'), 
      // Asumo que availability se gestiona en el backend o tiene un valor por defecto.
      // Si necesitas actualizarlo desde el modal, añade un campo.
      // availability: ...
    };


    try {
      // Envía los datos al endpoint de edición (tu app.put('/editar-producto/:id'))
      const response = await fetch(`/editar-producto/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Si la respuesta no es 2xx, hubo un error del servidor
        console.error('Error al guardar el producto:', result.error || result.message);
        alert(`Error al guardar: ${result.message || 'Error desconocido'}`);
      } else {
        console.log('Producto editado correctamente:', result.message);
                Swal.fire({ // Reemplazo de alert()
                    icon: 'success',
                    title: '¡Éxito!',
                    text: result.message || 'Producto editado correctamente.',
                    timer: 2000, // Se cierra automáticamente después de 2 segundos
                    timerProgressBar: true,
                    showConfirmButton: false // No muestra botón de confirmación si hay timer
                }).then(() => {
                    closeModal(); // Cerrar el modal al éxito
                    // Actualizar la interfaz de usuario
                    const currentPage = document.querySelector('.nav-item.active').dataset.page;
                    if (currentPage === 'productos') {
                        renderProductsPage(); // Asegúrate de que esta función recargue la tabla
                        updateStockSummaryCards();
                        updateDashboardVisualAlerts();
                    } else if (currentPage === 'existencias') {
                        renderStockPage(); // Asegúrate de que esta función recargue la página de existencias
                        updateDashboardVisualAlerts();
                        updateStockSummaryCards();
                    }
                });

      }
    } catch (error) {
      console.error('Error en la solicitud de edición:', error);
      alert('Hubo un problema de conexión al intentar guardar.');
    }
  });
}


window.editProduct = editProduct;







const API_BASE_URL = 'http://localhost:8080';

// NUEVA FUNCIÓN AUXILIAR: Espera a que un elemento esté presente en el DOM
function waitForElement(selector, callback) {
    // Intenta encontrar el elemento inmediatamente
    const element = document.querySelector(selector);
    if (element) {
        callback(element); // Si ya está, ejecuta el callback
        return;
    }

    // Si no está, crea un observador
    const observer = new MutationObserver(mutations => {
        const foundElement = document.querySelector(selector);
        if (foundElement) {
            observer.disconnect(); // Desconecta el observador una vez que el elemento es encontrado
            callback(foundElement); // Ejecuta el callback con el elemento encontrado
        }
    });

    // Configura el observador para mirar cambios en el cuerpo del documento y sus subárboles
    observer.observe(document.body, { childList: true, subtree: true });
    console.log(`[WAIT] Esperando elemento: ${selector}`); // Debug
}


// Función para obtener datos de una URL específica con callbacks
function fetchData(url, callback) {
    console.log(`[FETCH] INICIADO: Solicitando a ${url}`);
    fetch(url)
        .then(response => {
            if (response.status === 304) {
                console.warn(`[FETCH] Recurso en ${url} no modificado (304). No hay datos nuevos.`);
                return null;
            }
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`[FETCH] Error HTTP! Status: ${response.status}. Body: ${text.substring(0, 200)}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log(`[FETCH] EXITOSO para ${url}:`, data);
            callback(null, data);
        })
        .catch(error => {
            console.error(`[FETCH] ERROR para ${url}:`, error);
            callback(error, null);
        });
}



// Función para actualizar las tarjetas con los datos
function updateStockSummaryCards() {
    console.log('[DASHBOARD] Iniciando actualización de cards de resumen.');


    // --- ACTUALIZACIÓN DE "SIN STOCK" ---
    // 1. Intentar restaurar desde sessionStorage
    const cachedStockOut = sessionStorage.getItem('stockOutValue');
    if (cachedStockOut !== null) {
        waitForElement('#stockOut', (stockOutElement) => {
            stockOutElement.textContent = cachedStockOut;
            console.log(`[DASHBOARD] Elemento 'stockOut' restaurado desde sessionStorage: ${cachedStockOut}`);
        });
    }

    // --- ACTUALIZACIÓN DE "SIN STOCK" ---
    // 2. Luego, obtener datos frescos de la API
    fetchData(`${API_BASE_URL}/out-of-stock`, function (err, stockOutData) {
        if (err) {
            console.error('[DASHBOARD] Error obteniendo productos sin stock:', err);
            waitForElement('#stockOut', (stockOutElement) => {
                stockOutElement.textContent = 'Error';
                console.error("[DASHBOARD] Elemento 'stockOut' actualizado a 'Error' debido a fallo de API.");
            });
            return;
        }

        waitForElement('#stockOut', (stockOutElement) => {
            if (stockOutData && typeof stockOutData.stockOut !== 'undefined') {
                stockOutElement.textContent = stockOutData.stockOut;
                sessionStorage.setItem('stockOutValue', stockOutData.stockOut); // <-- GUARDAR EN SESSIONSTORAGE
                console.log(`[DASHBOARD] ¡ÉXITO! Elemento 'stockOut' actualizado a: ${stockOutData.stockOut} (usando MutationObserver y guardado en sessionStorage).`);
            } else {
                console.warn("[DASHBOARD] Dato 'stockOut' no encontrado o nulo en la respuesta. Data:", stockOutData);
                stockOutElement.textContent = 'N/A';
            }
        });
    });

        // Total de Productos
    const cachedTotalProducts = sessionStorage.getItem('totalProductsValue');
    if (cachedTotalProducts !== null) {
        waitForElement('#totalProducts', (element) => {
            element.textContent = cachedTotalProducts;
            console.log(`[DASHBOARD] Elemento 'totalProducts' restaurado desde sessionStorage: ${cachedTotalProducts}`);
        });
    }
    fetchData(`${API_BASE_URL}/total-products`, (err, data) => {
    // ... (manejo de errores) ...
    waitForElement('#totalProducts', (element) => {
        // ===> LA LÍNEA QUE DEBES REVISAR/MODIFICAR ESTÁ AQUÍ ABAJO <===
        // Anteriormente podría haber sido:
        // if (data && typeof data.count !== 'undefined') { // <-- ESTO ES LO QUE ESTÁ CAUSANDO EL ERROR
        if (data && typeof data.totalProducts !== 'undefined') { // ¡CAMBIA A totalProducts!
            element.textContent = data.totalProducts; // Y aquí también
            sessionStorage.setItem('totalProductsValue', data.totalProducts); // Y aquí también
            console.log(`[DASHBOARD] 'totalProducts' actualizado a: ${data.totalProducts}`);
        } else {
            console.warn("[DASHBOARD] Dato 'totalProducts' no encontrado o nulo. Data:", data); // Mensaje de advertencia actualizado
            element.textContent = 'N/A';
        }
    });
});




     // ==========================================================
    // 3. Productos Activos (Disponibles) (/active-products)
    // ==========================================================
    const cachedActiveProducts = sessionStorage.getItem('activeProductsValue');
    if (cachedActiveProducts !== null) {
        waitForElement('#activeProducts', (element) => {
            element.textContent = cachedActiveProducts;
            console.log(`[DASHBOARD] 'activeProducts' restaurado desde sessionStorage: ${cachedActiveProducts}`);
        });
    }
    fetchData(`${API_BASE_URL}/active-products`, (err, data) => {
        if (err) {
            console.error('[DASHBOARD] Error obteniendo productos activos:', err);
            waitForElement('#activeProducts', (element) => element.textContent = 'Error');
            return;
        }
        waitForElement('#activeProducts', (element) => {
            if (data && typeof data.activeProducts !== 'undefined') {
                element.textContent = data.activeProducts;
                sessionStorage.setItem('activeProductsValue', data.activeProducts);
                console.log(`[DASHBOARD] 'activeProducts' actualizado a: ${data.activeProducts}`);
            } else {
                console.warn("[DASHBOARD] Dato 'activeProducts' no encontrado o nulo. Data:", data);
                element.textContent = 'N/A';
            }
        });
    });

    // ==========================================================
    // 4. Existencias Totales (suma de todas las cantidades) (/total-quantity)
    // ==========================================================
    const cachedTotalQuantity = sessionStorage.getItem('totalQuantityValue');
    if (cachedTotalQuantity !== null) {
        waitForElement('#totalQuantity', (element) => {
            element.textContent = cachedTotalQuantity;
            console.log(`[DASHBOARD] 'totalQuantity' restaurado desde sessionStorage: ${cachedTotalQuantity}`);
        });
    }
    fetchData(`${API_BASE_URL}/total-quantity`, (err, data) => {
        if (err) {
            console.error('[DASHBOARD] Error obteniendo existencias totales:', err);
            waitForElement('#totalQuantity', (element) => element.textContent = 'Error');
            return;
        }
        waitForElement('#totalQuantity', (element) => {
            if (data && typeof data.totalQuantity !== 'undefined') {
                element.textContent = data.totalQuantity;
                sessionStorage.setItem('totalQuantityValue', data.totalQuantity);
                console.log(`[DASHBOARD] 'totalQuantity' actualizado a: ${data.totalQuantity}`);
            } else {
                console.warn("[DASHBOARD] Dato 'totalQuantity' no encontrado o nulo. Data:", data);
                element.textContent = 'N/A';
            }
        });
    });

    // ==========================================================
    // 5. Cantidad de productos con Stock Normal (> 50) (/normal)
    // ==========================================================
    const cachedStockNormal = sessionStorage.getItem('stockNormalValue');
    if (cachedStockNormal !== null) {
        waitForElement('#stockNormal', (element) => {
            element.textContent = cachedStockNormal;
            console.log(`[DASHBOARD] 'stockNormal' restaurado desde sessionStorage: ${cachedStockNormal}`);
        });
    }
    fetchData(`${API_BASE_URL}/normal`, (err, data) => {
        if (err) {
            console.error('[DASHBOARD] Error obteniendo stock normal:', err);
            waitForElement('#stockNormal', (element) => element.textContent = 'Error');
            return;
        }
        waitForElement('#stockNormal', (element) => {
            if (data && typeof data.stockNormal !== 'undefined') {
                element.textContent = data.stockNormal;
                sessionStorage.setItem('stockNormalValue', data.stockNormal);
                console.log(`[DASHBOARD] 'stockNormal' actualizado a: ${data.stockNormal}`);
            } else {
                console.warn("[DASHBOARD] Dato 'stockNormal' no encontrado o nulo. Data:", data);
                element.textContent = 'N/A';
            }
        });
    });

    // ==========================================================
    // 6. Cantidad de productos con Stock Medio (> 20 y <= 50) (/medium)
    // ==========================================================
    const cachedStockMedium = sessionStorage.getItem('stockMediumValue');
    if (cachedStockMedium !== null) {
        waitForElement('#stockMedium', (element) => {
            element.textContent = cachedStockMedium;
            console.log(`[DASHBOARD] 'stockMedium' restaurado desde sessionStorage: ${cachedStockMedium}`);
        });
    }
    fetchData(`${API_BASE_URL}/medium`, (err, data) => {
        if (err) {
            console.error('[DASHBOARD] Error obteniendo stock medio:', err);
            waitForElement('#stockMedium', (element) => element.textContent = 'Error');
            return;
        }
        waitForElement('#stockMedium', (element) => {
            if (data && typeof data.stockMedium !== 'undefined') {
                element.textContent = data.stockMedium;
                sessionStorage.setItem('stockMediumValue', data.stockMedium);
                console.log(`[DASHBOARD] 'stockMedium' actualizado a: ${data.stockMedium}`);
            } else {
                console.warn("[DASHBOARD] Dato 'stockMedium' no encontrado o nulo. Data:", data);
                element.textContent = 'N/A';
            }
        });
    });

    // ==========================================================
    // 7. Cantidad de productos con Bajo Stock (>= 5 y <= 20) (/low)
    // ==========================================================
    const cachedStockLow = sessionStorage.getItem('stockLowValue');
    if (cachedStockLow !== null) {
        waitForElement('#stockLow', (element) => {
            element.textContent = cachedStockLow;
            console.log(`[DASHBOARD] 'stockLow' restaurado desde sessionStorage: ${cachedStockLow}`);
        });
    }
    fetchData(`${API_BASE_URL}/low`, (err, data) => {
        if (err) {
            console.error('[DASHBOARD] Error obteniendo bajo stock:', err);
            waitForElement('#stockLow', (element) => element.textContent = 'Error');
            return;
        }
        waitForElement('#stockLow', (element) => {
            if (data && typeof data.stockLow !== 'undefined') {
                element.textContent = data.stockLow;
                sessionStorage.setItem('stockLowValue', data.stockLow);
                console.log(`[DASHBOARD] 'stockLow' actualizado a: ${data.stockLow}`);
            } else {
                console.warn("[DASHBOARD] Dato 'stockLow' no encontrado o nulo. Data:", data);
                element.textContent = 'N/A';
            }
        });
    });

    // ==========================================================
    // 8. Cantidad de productos con Stock Crítico (1 a 4) (/critical)
    // ==========================================================
    const cachedStockCritical = sessionStorage.getItem('stockCriticalValue');
    if (cachedStockCritical !== null) {
        waitForElement('#stockCritical', (element) => {
            element.textContent = cachedStockCritical;
            console.log(`[DASHBOARD] 'stockCritical' restaurado desde sessionStorage: ${cachedStockCritical}`);
        });
    }
    fetchData(`${API_BASE_URL}/critical`, (err, data) => {
        if (err) {
            console.error('[DASHBOARD] Error obteniendo stock crítico:', err);
            waitForElement('#stockCritical', (element) => element.textContent = 'Error');
            return;
        }
        waitForElement('#stockCritical', (element) => {
            if (data && typeof data.stockCritical !== 'undefined') {
                element.textContent = data.stockCritical;
                sessionStorage.setItem('stockCriticalValue', data.stockCritical);
                console.log(`[DASHBOARD] 'stockCritical' actualizado a: ${data.stockCritical}`);
            } else {
                console.warn("[DASHBOARD] Dato 'stockCritical' no encontrado o nulo. Data:", data);
                element.textContent = 'N/A';
            }
        });
    });


    setTimeout(() => {
    updateDashboardVisualAlerts(); // Para las alertas visuales en el panel
}, 700); // Un pequeño retardo (ej. 700ms) para asegurar que sessionStorage tenga los últimos datos
    console.log('[DASHBOARD] Solicitudes de actualización de cards enviadas.');
    
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('[APP] DOMContentLoaded disparado - Iniciando dashboard completo.');
    updateStockSummaryCards();
    updateDashboardVisualAlerts();
    // Aquí puedes añadir la llamada a tu función fetchAndRenderProducts() si la tienes
    // y quieres que la tabla de productos también se cargue al inicio.
});


function updateDashboardVisualAlerts() {
    console.log('[DASHBOARD_ALERTS] Actualizando alertas visuales del dashboard.');

    // Obtener los valores de stock (asegúrate de que estén actualizados en sessionStorage)
    const stockOut = parseInt(sessionStorage.getItem('stockOutValue') || '0', 10);
    const stockCritical = parseInt(sessionStorage.getItem('stockCriticalValue') || '0', 10);
    const stockLow = parseInt(sessionStorage.getItem('stockLowValue') || '0', 10);

    console.log(`[DASHBOARD_ALERTS DEBUG] Valores leídos: stockOut=${stockOut}, stockCritical=${stockCritical}, stockLow=${stockLow}`); // AÑADE ESTO

    // Selectores para los contenedores de alerta y sus mensajes
    const noStockAlertDiv = document.getElementById('noStockAlert');
    const noStockMessageP = document.getElementById('noStockMessage');
    const lowStockAlertDiv = document.getElementById('lowStockAlert');
    const lowStockMessageP = document.getElementById('lowStockMessage');
    const criticalStockAlertDiv = document.getElementById('criticalStockAlert');
    const criticalStockMessageP = document.getElementById('criticalStockMessage');
    const allGoodStockAlertDiv = document.getElementById('allGoodStockAlert');


    let anyProblemAlertShown = false;

    // Ocultar todas las alertas al inicio para evitar mostrar múltiples
    [noStockAlertDiv, lowStockAlertDiv, criticalStockAlertDiv, allGoodStockAlertDiv].forEach(div => {
        if (div) div.classList.add('hidden');
    });

    // Priorizar y mostrar la alerta más relevante
    if (stockOut > 0) {
        anyProblemAlertShown = true;
        if (noStockAlertDiv && noStockMessageP) {
            noStockMessageP.textContent = `${stockOut} producto(s) requieren reposición inmediata.`;
            noStockAlertDiv.classList.remove('hidden');
            console.log(`[DASHBOARD_ALERTS] Mostrando alerta: ${stockOut} sin stock.`);
            let anyProblemAlertShown = true;
        }
    }
    if (stockCritical > 0) {
        anyProblemAlertShown = true;
        if (criticalStockAlertDiv && criticalStockMessageP) {
            criticalStockMessageP.textContent = `${stockCritical} producto(s) están en nivel crítico.`;
            criticalStockAlertDiv.classList.remove('hidden');
            console.log(`[DASHBOARD_ALERTS] Mostrando alerta: ${stockCritical} en stock crítico.`);
            
        }
    } 
    if (stockLow > 0) {
        anyProblemAlertShown = true;
        if (lowStockAlertDiv && lowStockMessageP) {
            lowStockMessageP.textContent = `${stockLow} producto(s) están por debajo del mínimo.`;
            lowStockAlertDiv.classList.remove('hidden');
            console.log(`[DASHBOARD_ALERTS] Mostrando alerta: ${stockLow} en bajo stock.`);
            
        }
    } 
    if (!anyProblemAlertShown) {
        if (allGoodStockAlertDiv) {
            allGoodStockAlertDiv.classList.remove('hidden');
            console.log('[DASHBOARD_ALERTS] Mostrando mensaje: Stock Óptimo.');
        }
    }
}

/**
 * Verifica los niveles de stock y muestra una ÚNICA alerta SweetAlert2 al inicio
 * si hay CUALQUIER alerta de stock pendiente (sin stock, crítico, o bajo).
 * Utiliza sessionStorage para evitar alertas repetitivas en la misma sesión
 * y para limpiar el flag cuando no hay alertas pendientes.
 */
function checkAndDisplayStockAlerts() {
    console.log('[ALERT] Verificando condiciones de stock para alerta de resumen...');

    // Obtener los valores de stock actuales desde sessionStorage
    const stockOut = parseInt(sessionStorage.getItem('stockOutValue') || '0', 10);
    const stockCritical = parseInt(sessionStorage.getItem('stockCriticalValue') || '0', 10);
    const stockLow = parseInt(sessionStorage.getItem('stockLowValue') || '0', 10);

    console.log(`[ALERT DEBUG] Valores leídos para resumen: stockOut=${stockOut}, stockCritical=${stockCritical}, stockLow=${stockLow}`);

    // Determinar si hay alguna alerta de stock pendiente
    const hasAnyPendingAlert = stockOut > 0 || stockCritical > 0 || stockLow > 0;

    // Flag para controlar si la alerta de resumen ya fue mostrada en esta sesión
    let summaryAlertShown = sessionStorage.getItem('summary_alert_shown') === 'true';

    // =================================================================
    // Lógica para limpiar el flag si ya no hay alertas pendientes
    // =================================================================
    if (!hasAnyPendingAlert && summaryAlertShown) {
        sessionStorage.removeItem('summary_alert_shown');
        summaryAlertShown = false; // Resetear el flag para la comprobación actual
        console.log('[ALERT] No hay alertas de stock pendientes. Flag de alerta de resumen eliminado.');
    }

    // =================================================================
    // Mostrar la alerta de resumen si hay pendientes y no se ha mostrado
    // =================================================================
    if (hasAnyPendingAlert && !summaryAlertShown) {
        let alertTitle = 'Tienes alertas de stock pendientes';
        let alertHtml = '';
        let alertIcon = 'warning'; // Icono por defecto

        if (stockOut > 0) {
            alertHtml += `<li><b>${stockOut}</b> producto(s) sin stock.</li>`;
            alertIcon = 'error'; // Si hay sin stock, el icono es de error
        }
        if (stockCritical > 0) {
            alertHtml += `<li><b>${stockCritical}</b> producto(s) en stock crítico.</li>`;
            // Si ya es error por stockOut, lo mantiene. Si no, lo cambia a warning
            if (alertIcon !== 'error') alertIcon = 'warning';
        }
        if (stockLow > 0) {
            alertHtml += `<li><b>${stockLow}</b> producto(s) con bajo stock.</li>`;
            // Si ya es error o warning, lo mantiene. Si no, lo cambia a info
            if (alertIcon !== 'error' && alertIcon !== 'warning') alertIcon = 'info';
        }

        // Formato final del HTML
        alertHtml = `<ul class="list-disc list-inside text-left mx-auto max-w-xs">${alertHtml}</ul><p class="mt-4">Revisa el panel de "Alertas de Stock" para más detalles.</p>`;


        Swal.fire({
            icon: alertIcon,
            title: alertTitle,
            html: alertHtml,
            confirmButtonText: 'Entendido',
            customClass: {
                confirmButton: 'bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded',
            },
            buttonsStyling: false,
        });
        sessionStorage.setItem('summary_alert_shown', 'true');
        console.log('[ALERT] Mostrando alerta de resumen de stock.');
    }
}

    /*
    Muestra la vista de Configuración.
    */
function renderSettingsPage() {
  mainContentDiv.innerHTML = `
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Configuración</h1>
      <p class="text-gray-600 dark:text-gray-400">Administra la configuración del sistema.</p>
    </div>

    <div class="grid gap-6">
      <!-- IVA -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">IVA</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Tasa de IVA aplicada por defecto</p>
          </div>
          <button onclick="openIvaModal()" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md">
            Editar
          </button>
        </div>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">${ivaRate}%</p>
      </div>

      <!-- Profit Margins by Category -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-lg font-semibold text-gray-800 dark:text-white">% de Ganancia por Categoría</h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">Porcentaje de ganancia por categoría de producto</p>
          </div>
          <button onclick="openProfitMarginsModal()" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md">
            Editar
          </button>
        </div>
        <div class="grid gap-4">
          ${Object.entries(profitMargins).map(([category, rate]) => `
            <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
              <span class="text-gray-700 dark:text-gray-300">${category}</span>
              <span class="font-medium text-gray-900 dark:text-white">${rate}%</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}




function renderAdjustStockForm() {

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const maxDate = `${year}-${month}-${day}`;

    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(today.getFullYear() - 10);
    const minYear = tenYearsAgo.getFullYear();
    const minMonth = String(tenYearsAgo.getMonth() + 1).padStart(2, '0');
    const minDay = String(tenYearsAgo.getDate()).padStart(2, '0');
    const minDate = `${minYear}-${minMonth}-${minDay}`;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-auto p-6 relative">
            <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Ajustar Stock de Producto</h2>
            <form id="adjustStockForm" class="space-y-4" novalidate>
                <div class="relative">
                    <label for="product_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Producto</label>
                    <input type="text" id="product_name" name="product_name"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                        required autocomplete="off">
                    <div id="sugerenciasContainer"
                        class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden overflow-y-auto max-h-48
                        dark:bg-gray-800 dark:border-gray-700 dark:shadow-xl top-full mt-1"></div>
                </div>
                <div>
                    <label for="adjust_quantity" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Cantidad a Ajustar</label>
                    <input type="number" id="adjust_quantity" name="adjust_quantity"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                        required>
                    <p class="text-sm text-gray-500 mt-1 dark:text-gray-400">Usa números negativos para reducir stock, positivos para aumentarlo.</p>
                </div>
                <div>
                    <label for="adjust_cost" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Precio de compra</label>
                    <input type="number" id="adjust_cost" name="adjust_cost"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                        required>
                    <p class="text-sm text-gray-500 mt-1 dark:text-gray-400">Coloca el precio del nuevo stock.</p>
                </div>
                <div>
                    <label for="product_purchase_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de Compra</label>
                    <input type="date" id="product_purchase_date" name="product_purchase_date"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                        max="${maxDate}"
                        min="${minDate}" required>
                </div>
                <div>
                    <p id="formMessage" class="mt-4 text-center text-sm font-medium"></p>
                </div>
                <div class="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                    <button type="button" id="cancelAdjustStock"
                        class="w-full sm:w-auto bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700">
                        Cancelar
                    </button>
                    <button type="submit" id="submitAdjustStock"
                        class="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600">
                        Ajustar Stock
                    </button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    const adjustStockForm = modal.querySelector('#adjustStockForm');
    const cancelAdjustStockBtn = modal.querySelector('#cancelAdjustStock');

    const closeModal = () => {
        document.body.removeChild(modal);
        updateDashboardVisualAlerts();
        updateStockSummaryCards();
        renderStockPage();
    };

    const product_name = document.getElementById('product_name');
    const sugerenciasContainer = document.getElementById('sugerenciasContainer');
    let timeoutId;

    product_name.addEventListener('input', function() {
        clearTimeout(timeoutId);
        const searchText = this.value.trim();

        if (searchText.length > 0) {
            timeoutId = setTimeout(() => {
                fetch(`/api/buscarProductos?q=${encodeURIComponent(searchText)}`)
                    .then(response => response.json())
                    .then(productos => {
                        sugerenciasContainer.innerHTML = '';
                        if (productos.length > 0) {
                            productos.forEach(producto => {
                                const suggestionItem = document.createElement('div');
                                suggestionItem.classList.add('p-2', 'cursor-pointer','hover:bg-blue-100','border-b', 'border-gray-200', 'text-gray-900', 'dark:text-gray-200','dark:hover:bg-gray-700','last:border-b-0');
                                suggestionItem.textContent = producto.nombre_producto;
                                suggestionItem.addEventListener('click', () => {
                                    product_name.value = producto.nombre_producto;
                                    product_name.dataset.productId = producto.id_producto;
                                    sugerenciasContainer.classList.add('hidden');
                                    product_name.focus();
                                });
                                sugerenciasContainer.appendChild(suggestionItem);
                            });
                            sugerenciasContainer.classList.remove('hidden');
                            sugerenciasContainer.classList.add('block');
                        } else {
                            sugerenciasContainer.classList.add('hidden');
                            sugerenciasContainer.classList.remove('block');
                        }
                    })
                    .catch(() => {
                        sugerenciasContainer.classList.add('hidden');
                        sugerenciasContainer.classList.remove('block');
                    });
            }, 300);
        } else {
            sugerenciasContainer.classList.add('hidden');
            sugerenciasContainer.classList.remove('block');
        }
    });

    document.addEventListener('click', function(event) {
        if (!product_name.contains(event.target) && !sugerenciasContainer.contains(event.target)) {
            sugerenciasContainer.classList.add('hidden');
            sugerenciasContainer.classList.remove('block');
        }
    });

    if (adjustStockForm) {
        adjustStockForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const productName = document.getElementById('product_name').value.trim();
            const productNameElement = document.getElementById('product_name');
            const productId = productNameElement.dataset.productId;
            const adjustQuantity = parseInt(document.getElementById('adjust_quantity').value, 10);
            const adjustCost = parseFloat(document.getElementById('adjust_cost').value);
            const productPurchaseDate = document.getElementById('product_purchase_date').value;

            if (!productName || isNaN(adjustQuantity)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos Incompletos',
                    text: 'Por favor, completa todos los campos correctamente.',
                    confirmButtonText: 'Entendido'
                });
                return;
            }

            let finalProductId = productId;
            if (!productId || productId === 'undefined') {
                try {
                    const searchResponse = await fetch(`/api/buscarProductos?q=${encodeURIComponent(productName)}`);
                    const productos = await searchResponse.json();
                    const productoEncontrado = productos.find(p => p.nombre_producto === productName);
                    if (productoEncontrado) {
                        finalProductId = productoEncontrado.id_producto;
                    } else {
                        const productoSimilar = productos.find(p =>
                            p.nombre_producto.toLowerCase().includes(productName.toLowerCase()) ||
                            productName.toLowerCase().includes(p.nombre_producto.toLowerCase())
                        );
                        if (productoSimilar) {
                            finalProductId = productoSimilar.id_producto;
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Producto No Encontrado',
                                text: `El producto "${productName}" no existe. Por favor, verifica el nombre del producto.`,
                                confirmButtonText: 'Entendido'
                            });
                            return;
                        }
                    }
                } catch {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de Búsqueda',
                        text: 'No se pudo verificar el producto. Intenta de nuevo.',
                        confirmButtonText: 'Entendido'
                    });
                    return;
                }
            }

            if (!finalProductId) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Error de Producto',
                    text: 'No se pudo obtener el ID del producto. Intenta seleccionar de la lista de sugerencias.',
                    confirmButtonText: 'Entendido'
                });
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/ajustar-stock', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: productName,
                        quantity: adjustQuantity,
                        cost: adjustCost,
                        purchase_date: productPurchaseDate
                    })
                });

                const result = await response.json();

                if (response.ok) {
                    try {
                        const historialData = {
                            id_producto: finalProductId,
                            precio_compra: adjustCost,
                            cantidad_afectada: adjustQuantity,
                            tipo_movimiento: "Entrada",
                            fecha_movimiento: productPurchaseDate
                        };
                        await fetch('/api/HistorialCosto', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(historialData)
                        });
                    } catch {}
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: result.message || 'Stock ajustado exitosamente.',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    }).then(() => {
                        adjustStockForm.reset();
                        closeModal();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: result.message || 'Hubo un error al ajustar el stock.',
                        confirmButtonText: 'Cerrar'
                    });
                }
            } catch {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Conexión',
                    text: 'No se pudo conectar con el servidor. Intenta de nuevo más tarde.',
                    confirmButtonText: 'Cerrar'
                });
            }
        });
    }

    if (cancelAdjustStockBtn) {
        cancelAdjustStockBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const ajustarStockBtn = document.getElementById('ajustarStockBtn');
    if (ajustarStockBtn) {
        ajustarStockBtn.addEventListener('click', renderAdjustStockForm);
    }
    const cancelAdjustStockBtn = document.getElementById('cancelAdjustStock');
    if (cancelAdjustStockBtn) {
        cancelAdjustStockBtn.addEventListener('click', renderAdjustStockForm, updateDashboardVisualAlerts, updateStockSummaryCards);
    }
});


function renderProductSoldForm() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const maxDate = `${year}-${month}-${day}`;

    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(today.getFullYear() - 10);
    const minYear = tenYearsAgo.getFullYear();
    const minMonth = String(tenYearsAgo.getMonth() + 1).padStart(2, '0');
    const minDay = String(tenYearsAgo.getDate()).padStart(2, '0');
    const minDate = `${minYear}-${minMonth}-${minDay}`;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-auto p-6 relative">
            <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Registrar venta</h2>
            <form id="productSendForm" class="space-y-4" novalidate>
                <div class="relative">
                    <label for="product_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Producto</label>
                    <input type="text" id="product_name" name="product_name"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                        required autocomplete="off">
                    <div id="sugerenciasContainer"
                        class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg hidden overflow-y-auto max-h-48
                        dark:bg-gray-800 dark:border-gray-700 dark:shadow-xl top-full mt-1"></div>
                </div>
                <div>
                    <label for="adjust_quantity" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Cantidad a Ajustar</label>
                    <input type="number" id="adjust_quantity" name="adjust_quantity"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                        required>
                    <p class="text-sm text-gray-500 mt-1 dark:text-gray-400">Usa números negativos para reducir stock, positivos para aumentarlo.</p>
                </div>
                <div>
                    <label for="product_purchase_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de Compra</label>
                    <input type="date" id="product_purchase_date" name="product_purchase_date"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                        max="${maxDate}"
                        min="${minDate}" required>
                </div>
                <div>
                    <p id="formMessage" class="mt-4 text-center text-sm font-medium"></p>
                </div>
                <div class="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                    <button type="button" id="cancelproductSend"
                        class="w-full sm:w-auto bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700">
                        Cancelar
                    </button>
                    <button type="submit" id="submitproductSend"
                        class="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600">
                        Registrar venta
                    </button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    const productSendForm = modal.querySelector('#productSendForm');
    const cancelproductSendkBtn = modal.querySelector('#cancelproductSend');

    const closeModal = () => {
        document.body.removeChild(modal);
        updateDashboardVisualAlerts();
        updateStockSummaryCards();
        renderStockPage();
    };

    const product_name = document.getElementById('product_name');
    const sugerenciasContainer = document.getElementById('sugerenciasContainer');
    let timeoutId;

    product_name.addEventListener('input', function() {
        clearTimeout(timeoutId);
        const searchText = this.value.trim();

        if (searchText.length > 0) {
            timeoutId = setTimeout(() => {
                fetch(`/api/buscarProductos?q=${encodeURIComponent(searchText)}`)
                    .then(response => response.json())
                    .then(productos => {
                        sugerenciasContainer.innerHTML = '';
                        if (productos.length > 0) {
                            productos.forEach(producto => {
                                const suggestionItem = document.createElement('div');
                                suggestionItem.classList.add('p-2', 'cursor-pointer','hover:bg-blue-100','border-b', 'border-gray-200', 'text-gray-900', 'dark:text-gray-200','dark:hover:bg-gray-700','last:border-b-0');
                                suggestionItem.textContent = producto.nombre_producto;
                                suggestionItem.addEventListener('click', () => {
                                    product_name.value = producto.nombre_producto;
                                    product_name.dataset.productId = producto.id_producto;
                                    sugerenciasContainer.classList.add('hidden');
                                    product_name.focus();
                                });
                                sugerenciasContainer.appendChild(suggestionItem);
                            });
                            sugerenciasContainer.classList.remove('hidden');
                            sugerenciasContainer.classList.add('block');
                        } else {
                            sugerenciasContainer.classList.add('hidden');
                            sugerenciasContainer.classList.remove('block');
                        }
                    })
                    .catch(() => {
                        sugerenciasContainer.classList.add('hidden');
                        sugerenciasContainer.classList.remove('block');
                    });
            }, 300);
        } else {
            sugerenciasContainer.classList.add('hidden');
            sugerenciasContainer.classList.remove('block');
        }
    });

    document.addEventListener('click', function(event) {
        if (!product_name.contains(event.target) && !sugerenciasContainer.contains(event.target)) {
            sugerenciasContainer.classList.add('hidden');
            sugerenciasContainer.classList.remove('block');
        }
    });

    if (productSendForm) {
        productSendForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const productName = document.getElementById('product_name').value.trim();
            const productNameElement = document.getElementById('product_name');
            const productId = productNameElement.dataset.productId;
            const adjustQuantity = parseInt(document.getElementById('adjust_quantity').value, 10);
            const productPurchaseDate = document.getElementById('product_purchase_date').value;

            if (!productName || isNaN(adjustQuantity)) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campos Incompletos',
                    text: 'Por favor, completa todos los campos correctamente.',
                    confirmButtonText: 'Entendido'
                });
                return;
            }

            let finalProductId = productId;
            if (!productId || productId === 'undefined') {
                try {
                    const searchResponse = await fetch(`/api/buscarProductos?q=${encodeURIComponent(productName)}`);
                    const productos = await searchResponse.json();
                    const productoEncontrado = productos.find(p => p.nombre_producto === productName);
                    if (productoEncontrado) {
                        finalProductId = productoEncontrado.id_producto;
                    } else {
                        const productoSimilar = productos.find(p =>
                            p.nombre_producto.toLowerCase().includes(productName.toLowerCase()) ||
                            productName.toLowerCase().includes(p.nombre_producto.toLowerCase())
                        );
                        if (productoSimilar) {
                            finalProductId = productoSimilar.id_producto;
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Producto No Encontrado',
                                text: `El producto "${productName}" no existe. Por favor, verifica el nombre del producto.`,
                                confirmButtonText: 'Entendido'
                            });
                            return;
                        }
                    }
                } catch {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de Búsqueda',
                        text: 'No se pudo verificar el producto. Intenta de nuevo.',
                        confirmButtonText: 'Entendido'
                    });
                    return;
                }
            }

            if (!finalProductId) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Error de Producto',
                    text: 'No se pudo obtener el ID del producto. Intenta seleccionar de la lista de sugerencias.',
                    confirmButtonText: 'Entendido'
                });
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/Registrar-venta', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: productName,
                        quantity: adjustQuantity,
                        purchase_date: productPurchaseDate
                    })
                });

                const result = await response.json();

                if (response.ok) {
                    try {
                        const historialData = {
                            id_producto: finalProductId,
                            cantidad_afectada: adjustQuantity,
                            tipo_movimiento: "Salida",
                            fecha_movimiento: productPurchaseDate
                        };
                        await fetch('/api/HistorialVenta', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(historialData)
                        });
                    } catch {}
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: result.message || 'Stock ajustado exitosamente.',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    }).then(() => {
                        productSendForm.reset();
                        closeModal();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: result.message || 'Hubo un error al ajustar el stock.',
                        confirmButtonText: 'Cerrar'
                    });
                }
            } catch {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Conexión',
                    text: 'No se pudo conectar con el servidor. Intenta de nuevo más tarde.',
                    confirmButtonText: 'Cerrar'
                });
            }
        });
    }

    if (cancelproductSendkBtn) {
        cancelproductSendkBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const ajustarStockBtn = document.getElementById('Btn');
    if (ajustarStockBtn) {
        ajustarStockBtn.addEventListener('click', renderAdjustStockForm);
    }
    const cancelAdjustStockBtn = document.getElementById('cancelAdjustStock');
    if (cancelAdjustStockBtn) {
        cancelAdjustStockBtn.addEventListener('click', renderAdjustStockForm, updateDashboardVisualAlerts, updateStockSummaryCards);
    }
});




//IVA Y ASIGNACIÓN DE COSTOS

//RENDERIZADO DE PÁGINA AL COMIENZO

// ==========================================================
// NUEVO: Función para cargar las configuraciones y luego renderizar la página
// ==========================================================
async function fetchAndRenderSettings() {

    try {
        const response = await fetch(`http://localhost:8080/settings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('jwt_token')}`
            }
        });

        const result = await response.json();

        if (response.ok) {
            ivaRate = result.ivaRate;
            profitMargins = result.profitMargins;
            renderSettingsPage(); // Renderiza la página con los datos cargados
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar',
                text: result.message || 'No se pudieron cargar las configuraciones. Intenta de nuevo.',
                confirmButtonText: 'Cerrar',
                customClass: { confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' },
                buttonsStyling: false,
            }).then(() => {
                // Si falla la carga inicial, podemos redirigir al dashboard o mostrar un error
                renderDashboardPage();
            });
        }
    } catch (error) {
        console.error('Error de conexión al cargar configuraciones:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error de Conexión',
            text: 'No se pudo conectar con el servidor para cargar las configuraciones. Verifica tu conexión.',
            confirmButtonText: 'Cerrar',
            customClass: { confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' },
            buttonsStyling: false,
        }).then(() => {
            renderDashboardPage();
        });
    }
}

// Add modal functions

function openIvaModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Configurar IVA</h3>
            </div>
            <form id="ivaForm" class="p-6">
                <div class="mb-4">
                    <label for="ivaInput" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Porcentaje de IVA</label>
                    <input type="number" id="ivaInput" name="iva" value="${ivaRate}" min="0" max="100" step="0.1"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                </div>
            </form>
            <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                <button id="cancelIva" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                    Cancelar
                </button>
                <button id="saveIva" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md">
                    Guardar y Recalcular
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => modal.remove();
    modal.querySelector('#cancelIva').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    modal.querySelector('#saveIva').addEventListener('click', async () => {
        const newRate = parseFloat(modal.querySelector('#ivaInput').value); // Usar ID para mayor fiabilidad

        if (isNaN(newRate) || newRate < 0 || newRate > 100) {
            Swal.fire({
                icon: 'error',
                title: 'Error de Validación',
                text: 'El porcentaje de IVA debe ser un número entre 0 y 100.',
                confirmButtonText: 'Corregir',
                customClass: { confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' },
                buttonsStyling: false,
            });
            return;
        }

        Swal.fire({
            title: 'Recalculando precios...',
            html: 'Por favor, espera mientras se actualizan los precios de todos los productos.',
            didOpen: () => { Swal.showLoading(); },
            allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false
        });

        try {
            const response = await fetch(`http://localhost:8080/settings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt_token')}`
                },
                body: JSON.stringify({
                    ivaRate: newRate,
                    profitMargins: profitMargins // Enviamos los profitMargins actuales también
                })
            });

            const result = await response.json();

            if (response.ok) {
                ivaRate = newRate; // Actualiza la variable global SOLO si el backend tuvo éxito
                Swal.fire({
                    icon: 'success',
                    title: '¡Precios Recalculados!',
                    text: result.message || 'El IVA y los precios de los productos se han actualizado exitosamente.',
                    confirmButtonText: 'Entendido',
                    customClass: { confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' },
                    buttonsStyling: false,
                }).then(() => {
                    renderSettingsPage(); // Re-renderiza la página de configuración para mostrar el nuevo IVA
                    closeModal();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al Recalcular',
                    text: result.message || 'Hubo un problema al recalcular los precios. Intenta de nuevo.',
                    confirmButtonText: 'Cerrar',
                    customClass: { confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' },
                    buttonsStyling: false,
                });
            }
        } catch (error) {
            console.error('Error al enviar la solicitud de recalculación de IVA:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de Conexión',
                text: 'No se pudo conectar con el servidor para recalcular los precios. Verifica tu conexión.',
                confirmButtonText: 'Cerrar',
                customClass: { confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' },
                buttonsStyling: false,
            });
        }
    });
}

function openProfitMarginsModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">% de Ganancia por Categoría</h3>
            </div>
            <form id="profitMarginsForm" class="p-6 space-y-4">
                ${Object.entries(profitMargins).map(([category, rate]) => `
                    <div>
                        <label for="${category.replace(/\s+/g, '')}Input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">${category}</label>
                        <input type="number" id="${category.replace(/\s+/g, '')}Input" name="${category}" value="${rate}" min="0" max="100" step="0.1"
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                    </div>
                `).join('')}
            </form>
            <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                <button id="cancelProfitMargins" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                    Cancelar
                </button>
                <button id="saveProfitMargins" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md">
                    Guardar y Recalcular
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => modal.remove();
    modal.querySelector('#cancelProfitMargins').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    modal.querySelector('#saveProfitMargins').addEventListener('click', async () => { // Convertir a async
        const newProfitMargins = {};
        let validationError = false;

        Object.keys(profitMargins).forEach(category => {
            // Asegúrate de que el ID del input sea consistente con cómo se genera en el HTML
            const inputElement = modal.querySelector(`#${category.replace(/\s+/g, '')}Input`);
            const newRate = parseFloat(inputElement.value);

            if (isNaN(newRate) || newRate < 0 || newRate > 100) {
                validationError = true;
                return; // Sale del forEach si hay un error
            }
            newProfitMargins[category] = newRate;
        });

        if (validationError) {
            Swal.fire({
                icon: 'error',
                title: 'Error de Validación',
                text: 'Todos los porcentajes de ganancia deben ser números entre 0 y 100.',
                confirmButtonText: 'Corregir',
                customClass: { confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' },
                buttonsStyling: false,
            });
            return;
        }

        Swal.fire({
            title: 'Recalculando precios...',
            html: 'Por favor, espera mientras se actualizan los precios de todos los productos.',
            didOpen: () => { Swal.showLoading(); },
            allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false
        });

        try {
            // Envía los nuevos profitMargins y el ivaRate actual al backend
            const response = await fetch(`http://localhost:8080/settings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt_token')}`
                },
                body: JSON.stringify({
                    ivaRate: ivaRate, // Enviamos el ivaRate actual también
                    profitMargins: newProfitMargins
                })
            });

            const result = await response.json();

            if (response.ok) {
                // Actualiza la variable global SOLO si el backend tuvo éxito
                profitMargins = newProfitMargins;
                Swal.fire({
                    icon: 'success',
                    title: '¡Precios Recalculados!',
                    text: result.message || 'Los porcentajes de ganancia y los precios de los productos se han actualizado exitosamente.',
                    confirmButtonText: 'Entendido',
                    customClass: { confirmButton: 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' },
                    buttonsStyling: false,
                }).then(() => {
                    renderSettingsPage(); // Re-renderiza la página de configuración para mostrar los nuevos porcentajes
                    closeModal(); // Cierra el modal
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al Recalcular',
                    text: result.message || 'Hubo un problema al recalcular los precios. Intenta de nuevo.',
                    confirmButtonText: 'Cerrar',
                    customClass: { confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' },
                    buttonsStyling: false,
                });
            }
        } catch (error) {
            console.error('Error al enviar la solicitud de recalculación de ganancias:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de Conexión',
                text: 'No se pudo conectar con el servidor para recalcular los precios. Verifica tu conexión.',
                confirmButtonText: 'Cerrar',
                customClass: { confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' },
                buttonsStyling: false,
            });
        }
    });
}

// Make the modal functions available globally
window.openIvaModal = openIvaModal;
window.openProfitMarginsModal = openProfitMarginsModal;

async function renderGestionUsuarios() {
    let tableRowsHtml = '';
    const mainContentDiv = document.getElementById('main-content');
    if (!mainContentDiv) {
        console.error("Error: El elemento 'main-content' no se encontró en el DOM.");
        Swal.fire({
            icon: 'error',
            title: 'Error de Inicialización',
            text: 'No se pudo encontrar el contenedor principal para la gestión de usuarios.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    // --- Renderizado del HTML principal ---

        mainContentDiv.innerHTML = `
            
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Gestión de usuarios</h1>
                <p class="text-gray-600 dark:text-gray-400">Control y gestión de usuarios.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">Usuarios Registrados</h3>
                        <div class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                            <svg class="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="flex items-baseline justify-between">
                        <p id="totalUsers" class="text-2xl font-bold text-gray-900 dark:text-white">-</p>
                        <div class="flex items-center text-green-600 dark:text-green-400">
                            <svg class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M13 17L13 7L17 11M11 7L7 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">Usuarios Activos</h3>
                        <div class="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                            <svg class="h-6 w-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                    </div>
                    <div class="flex items-baseline justify-between">
                        <p id="activeUsers" class="text-2xl font-bold text-gray-900 dark:text-white">-</p>
                        <div class="flex items-center text-orange-600 dark:text-orange-400">
                            <svg class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M13 17L13 7L17 11M11 7L7 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">Administradores</h3>
                        <div class="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                            <svg class="h-6 w-6 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="flex items-baseline justify-between">
                        <p id="adminUsers" class="text-2xl font-bold text-gray-900 dark:text-white">-</p>
                        <div class="flex items-center text-orange-600 dark:text-orange-400">
                            <svg class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M13 17L13 7L17 11M11 7L7 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="p-5 border-b border-gray-200 dark:border-gray-700">
                    <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Resumen de usuarios</h2>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-50 dark:bg-gray-900/50">
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre de usuario</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Correo electrónico</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rol</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fecha de registro</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fecha último acceso</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estado de cuenta</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="users-table-body" class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="user-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 p-6 relative">
                    <button type="button" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" id="close-user-modal-btn">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                    <h3 id="modal-title" class="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Editar usuario</h3>
                    <form id="user-form" class="grid grid-cols-1 gap-4">


                        <div id="user-status-group" class="hidden">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado</label>
                            <select id="user-status" name="status" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" required>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                        <div class="flex justify-end space-x-3 mt-6">
                            <button type="button" id="cancel-user-btn" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                Cancelar
                            </button>
                            <button type="submit" id="save-user-btn" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    

    try {
        const response = await fetch('http://localhost:8080/obtener-usuarios'); 

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Error desconocido del servidor.' }));
            throw new Error(errorData.message || `Error HTTP: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        
        if (data.success && Array.isArray(data.users)) {
            if (data.users.length > 0) {
                tableRowsHtml = data.users.map(user =>     `
                          <tr>
                              <td class="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500 dark:text-gray-400">${user.id_user}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500 dark:text-gray-400">${user.name_user}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500 dark:text-gray-400">${user.mail_user}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    ${(user.role_user === 'usuario' || user.role_user ==='Usuario') // Usamos user.userType para consistencia con tu JS
                                        ? '<span class="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700 rounded-full ">Usuario</span>'
                                        : user.role_user === 'Administrador'
                                            ? '<span class="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30 rounded-full">Administrador</span>'
                                            : user.role_user === 'Super Administrador' // Corregido a user.userType y 'Superadmin'
                                                ? '<span class="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 dark:text-gray-100 dark:bg-blue-900 rounded-full">Super Administrador</span>'
                                                : '' // Añade un valor por defecto si el rol no coincide con ninguno
                                    }
                                </td>

                              <td class="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500 dark:text-gray-400">${user.creation_date_user ? new Date(user.creation_date_user).toLocaleDateString() : 'N/A'}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500 dark:text-gray-400">${user.last_access_user ? new Date(user.last_access_user).toLocaleDateString() : 'N/A'}</td>
                              <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    ${user.status_user === 'Activo'
                                        ? '<span class="px-2 py-1 text-left text-xs font-medium text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30 rounded-full">Activo</span>'
                                        : '<span class="px-2 py-1 text-left text-xs font-medium text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30 rounded-full">Inactivo</span>'
                                    }
                                </td>
                              
                              
                        <td class="px-6 py-4 whitespace-nowrap text-sm">

                        <button onclick="editUser('${user.id_user}')" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        </td>
                          </tr>
                          `).join("");
            } else {
                tableRowsHtml = `
                    <tr>
                        <td colspan="9" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                            No hay productos disponibles en el inventario.
                        </td>
                    </tr>
                `;
            }
        } else {
            tableRowsHtml = `
                <tr>
                    <td colspan="9" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                        Error: La respuesta de la API no contiene productos válidos.
                    </td>
                </tr>
            `;
            console.warn("API response was not successful or products array is missing/invalid:", data);
        }

    } catch (error) {
        console.error('Error al obtener productos:', error);
        tableRowsHtml = `
            <tr>
                <td colspan="9" class="px-6 py-4 text-center text-red-500 dark:text-red-400">
                    Error al cargar productos: ${error.message}. Por favor, verifica tu servidor backend y asegúrate de que el CORS esté configurado correctamente.
                </td>
            </tr>
        `;
    }

    const tableBody = mainContentDiv.querySelector('#users-table-body');
    if (tableBody) {
        tableBody.innerHTML = tableRowsHtml;
    } else {
        console.error("No se encontró el tbody (#users-table-body) en el HTML cargado por renderGestionUsuarios().");
    }

}

async function editUser(id) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Editar Usuario</h3>
        </div>
        <form id="editUserForm" class="p-6 grid grid-cols-2 gap-4">
        
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre de usuario</label>
            <input type="text" name="username" autocomplete="username"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <p id="usernameErrorMessage" class="text-red-600 text-sm mt-1 hidden"></p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo electrónico </label>
            <input type="email" name="email" autocomplete="email"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <p id="emailErrorMessage" class="text-red-600 text-sm mt-1 hidden"></p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rol</label>
             <select id="user_category" name="user_category" autocomplete="user_category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" required>
                      <option value="" disabled selected>Selecciona un rol</option>
                      <option value="Usuario">Usuario</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Super Administrador">Super Administrador</option>
                  </select>
          </div>
          <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado de cuenta</label>
          <select id="account_status" name="account_status" autocomplete="account_status" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2" required>
                      <option value="" disabled selected>Selecciona un estado</option>
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option> 
          </select>
          </div>
          <p id="formMessage" class="col-span-2 mt-4 text-center text-sm font-medium text-red-600 dark:text-red-400 hidden"></p>
        </form>
        <div class="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button id="cancelEditUser" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
            Cancelar
          </button>
          <button id="saveEditUser" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md">
            Editar
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Seleccionar elementos de mensaje de error al inicio
    const usernameErrorMessage = modal.querySelector('#usernameErrorMessage');
    const emailErrorMessage = modal.querySelector('#emailErrorMessage');
    const formMessageElement = modal.querySelector('#formMessage');

    // Función para mostrar un error específico en un campo
    const showFieldError = (element, message) => {
        element.textContent = message;
        element.classList.remove('hidden');
    };

    // Función para limpiar todos los errores
    const clearErrors = () => {
        usernameErrorMessage.textContent = '';
        usernameErrorMessage.classList.add('hidden');
        emailErrorMessage.textContent = '';
        emailErrorMessage.classList.add('hidden');
        formMessageElement.textContent = '';
        formMessageElement.classList.add('hidden');
    };

    // 2. Obtener los datos del usuario y rellenar el formulario
    try {
        const response = await fetch(`/usuarios/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const user = await response.json();

        const form = modal.querySelector('#editUserForm');
        form.querySelector('input[name="username"]').value = user.Usuario || '';
        form.querySelector('input[name="email"]').value = user.Correo || '';
        form.querySelector('select[name="user_category"]').value = user.Rol || '';
        form.querySelector('select[name="account_status"]').value = user.Estado || '';

    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        // Reemplazar alert con SweetAlert2 para errores de carga
        Swal.fire({
            icon: 'error',
            title: 'Error al cargar usuario',
            text: 'No se pudieron cargar los datos del usuario para edición. Por favor, inténtalo de nuevo.',
            timer: 3000,
            timerProgressBar: true
        });
        modal.remove(); // Cerrar el modal si hay un error al cargar los datos
        return; // Salir de la función si no se pueden cargar los datos
    }

    // 3. Configurar los eventos del modal (cerrar)
    const closeModal = () => modal.remove();
    modal.querySelector('#cancelEditUser').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // 4. Manejar el envío del formulario (guardar)
    modal.querySelector('#saveEditUser').addEventListener('click', async () => {
        const form = modal.querySelector('#editUserForm');
        const formData = new FormData(form);

        clearErrors(); // Limpiar mensajes de error previos al nuevo intento de guardar

        const username = formData.get('username');
        const email = formData.get('email');
        const user_category = formData.get('user_category');
        const account_status = formData.get('account_status');

        // Validaciones de campos vacíos
        if (!username || !email || !user_category || !account_status) {
            showFieldError(formMessageElement, 'Por favor, completa todos los campos.');
            formMessageElement.classList.remove('hidden'); // Asegurarse de que esté visible
            return;
        }

        const userData = {
            username: username,
            email: email,
            user_category: user_category,
            account_status: account_status,
        };

        try {
            const response = await fetch(`/editar-usuario/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error('Error al guardar el usuario:', result.error || result.message);

                // Manejo específico de errores de validación del backend (ej. usuario/correo existente)
                if (response.status === 400 || response.status === 409) { // 400 Bad Request, 409 Conflict son comunes para validación
                    // Idealmente, el backend devolvería un objeto de errores como:
                    // { message: "Error de validación", errors: { username: "ya existe", email: "ya registrado" } }
                    // Si solo devuelve un mensaje general:
                    const errorMessage = result.message || 'Error de validación. Revisa los datos ingresados.';
                    
                    // Si el backend te puede dar un mensaje específico para cada campo, puedes hacer esto:
                    if (errorMessage.includes('usuario ya existe') || errorMessage.includes('nombre de usuario duplicado')) {
                        showFieldError(usernameErrorMessage, errorMessage);
                    } else if (errorMessage.includes('correo ya existe') || errorMessage.includes('correo duplicado')) {
                        showFieldError(emailErrorMessage, errorMessage);
                    } else {
                        // Para otros errores de validación no específicos de campo
                        showFieldError(formMessageElement, errorMessage);
                    }
                } else {
                    // Para otros errores generales del servidor (ej. 500 Internal Server Error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al editar usuario',
                        text: result.message || 'Error desconocido al intentar guardar el usuario.',
                        timer: 3000,
                        timerProgressBar: true
                    });
                }
            } else {
                console.log('Usuario editado correctamente:', result.message);
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: result.message || 'Usuario editado correctamente.',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                }).then(() => {
                    closeModal();
                    // Actualizar la interfaz de usuario dependiendo de la página activa
                    const currentPage = document.querySelector('.nav-item.active').dataset.page;
                    if (currentPage === 'gestion-usuarios') {
                        renderGestionUsuarios(); // Asegúrate de que esta función recargue la lista de usuarios
                    } else if (currentPage === 'existencias') {
                        // Funciones relacionadas con la página de existencias si aplica
                        renderStockPage();
                        updateDashboardVisualAlerts();
                        updateStockSummaryCards();
                    }
                });
            }
        } catch (error) {
            console.error('Error en la solicitud de edición:', error);
            // Reemplazar alert con SweetAlert2 para errores de conexión
            Swal.fire({
                icon: 'error',
                title: 'Error de Conexión',
                text: 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet o inténtalo de nuevo.',
                timer: 3000,
                timerProgressBar: true
            });
        }
    });
}

window.editUser = editUser;



// ==========================================================
// 7. NAVEGACIÓN DE LA BARRA LATERAL
// ==========================================================

if (sidebarNav) {
    sidebarNav.addEventListener("click", (event) => {
        const navItem = event.target.closest(".nav-item"); 
        
        if (!navItem) {
            return;
        }

        event.preventDefault(); 

        document.querySelectorAll(".nav-item").forEach(item => {
            item.classList.remove("active");
        });

        navItem.classList.add("active");

        localStorage.setItem('lastActivePage', navItem.dataset.page);

        switch (navItem.dataset.page) {
            case "dashboard": // "Inicio"
                renderDashboardPage();
                updateStockSummaryCards();
                // AÑADE ESTA LÍNEA AQUÍ
                break;
            case "existencias": // "Existencias"
                renderStockPage();
                updateStockSummaryCards();
                break;
            case "configuracion": // "Configuración"
                renderSettingsPage();
                updateStockSummaryCards();
                fetchAndRenderSettings();
                break;

            case "gestion-usuarios":
                renderGestionUsuarios();
                updateDashboardVisualAlerts();
                updateStockSummaryCards();
                break;
            




            default:
                console.warn("Página no reconocida en la navegación:", navItem.dataset.page);
                renderDashboardPage();
                updateStockSummaryCards();
                fetchAndRenderSettings();
                // También podrías añadirla aquí si quieres que se ejecute en el caso por defecto
                // updateStockSummaryCards();
        }
    });
}

// ==========================================================
// 8. INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================================

document.addEventListener('DOMContentLoaded', async () => { // Convertir a async
    if (mainContentDiv) {
        loadUserData();

        // Obtener la última página activa desde localStorage
        const lastActivePage = localStorage.getItem('lastActivePage') || 'dashboard';

        // Intentar simular un clic en el elemento de la barra lateral correspondiente
        // Esto asegura que se active la lógica de carga y renderizado correcta (incluyendo fetchAndRenderSettings)
        const navItemToActivate = document.querySelector(`.nav-item[data-page="${lastActivePage}"]`);
        if (navItemToActivate) {
            // Usa .click() para disparar el listener de la barra lateral, lo que gestionará la carga.
            navItemToActivate.click();
        } else {
            // Si no se encuentra un elemento de navegación válido, o si es la primera carga sin datos guardados,
            // ir al dashboard por defecto.
            document.querySelector('.nav-item[data-page="dashboard"]').click();
        }

    } else {
        console.error("Error: El elemento 'main-content' no se encontró en el DOM.");
    }
});