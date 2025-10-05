// ==========================================================
// 1. SELECTORES DE ELEMENTOS DEL DOM (Variables Globales)
// ==========================================================
const mainContentDiv = document.getElementById('main-content');
const sidebarNav = document.getElementById('sidebar-nav');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');
const userMenuBtn = document.getElementById('user-menu');
const userDropdown = document.getElementById('user-dropdown');

// ==========================================================
// 2. LÓGICA DE TEMA (Modo Oscuro/Claro)
// ==========================================================

// Obtener el tema guardado en localStorage o usar 'light' por defecto
const currentTheme = localStorage.getItem("theme") || "light";

// Aplicar la clase 'dark' al <html> si el tema es 'dark'
document.documentElement.classList.toggle("dark", currentTheme === "dark");

/**
 * Actualiza el icono y el texto del botón de tema.
 * @param {boolean} isDarkTheme - true si el tema actual es oscuro, false si es claro.
 */
function updateThemeToggleUI(isDarkTheme) {
    // Icono del sol (Modo Claro) o luna (Modo Oscuro)
    themeIcon.innerHTML = isDarkTheme
        ? '<path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
        : '<path d="M21.752 15.002C20.5633 15.4975 19.2879 15.7517 18 15.75C13.4436 15.75 9.75 12.0563 9.75 7.5C9.75 6.21213 10.0042 4.93666 10.4997 3.748C6.24001 4.84673 3.15004 8.72049 3.15004 13.2495C3.15004 18.6308 7.61877 22.9995 13 22.9995C17.5289 22.9995 21.4027 19.9095 22.5014 15.6498C22.2583 15.4527 22.0137 15.2569 21.752 15.002Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    
    // Texto del modo
    themeText.textContent = isDarkTheme ? "Modo Claro" : "Modo Oscuro";
}

// Inicializar la UI del toggle de tema al cargar la página
updateThemeToggleUI(currentTheme === "dark");

// Event Listener para el botón de cambio de tema
if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        const isDarkNow = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isDarkNow ? "dark" : "light");
        updateThemeToggleUI(isDarkNow);
    });
}


// ==========================================================
// 3. LÓGICA DEL MENÚ DE USUARIO
// ==========================================================

// Event Listener para abrir/cerrar el menú de usuario
if (userMenuBtn && userDropdown) {
    userMenuBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // Evita que el click se propague al document y cierre inmediatamente
        userDropdown.classList.toggle("hidden");
    });
}

// Event Listener para cerrar el menú de usuario si se hace clic fuera
document.addEventListener("click", (event) => {
    if (userMenuBtn && userDropdown && !userMenuBtn.contains(event.target) && !userDropdown.contains(event.target)) {
        userDropdown.classList.add("hidden");
    }
});


// ==========================================================
// 4. DATOS DE EJEMPLO (¡Idealmente esto viene de una API!)
// ==========================================================
const PRODUCTS_DUMMY_DATA = [
    { id: "P001", name: "Camiseta Clásica", brand: "Marca A", category: "Ropa", color: "Blanco", price: 29.99, quantity: 150, purchase_date: "2023-01-15" },
    { id: "P002", name: "Jeans", brand: "Marca B", category: "Ropa", color: "Azul", price: 79.99, quantity: 85, purchase_date: "2023-02-20" },
    { id: "P003", name: "Zapatillas Deportivas", brand: "Marca C", category: "Calzado", color: "Negro", price: 119.99, quantity: 45, purchase_date: "2023-03-01" },
    { id: "P004", name: "Billetera de Cuero", brand: "Marca D", category: "Accesorios", color: "Marrón", price: 49.99, quantity: 200, purchase_date: "2023-04-10" },
    { id: "P005", name: "Mochila", brand: "Marca E", category: "Accesorios", color: "Gris", price: 89.99, quantity: 60, purchase_date: "2023-05-05" }
];


// ==========================================================
// 5. FUNCIONES AUXILIARES
// ==========================================================

/**
 * Formatea una cadena de fecha a DD/MM/YYYY.
 * @param {string} dateString - La fecha en formato ISO (YYYY-MM-DD).
 * @returns {string} La fecha formateada o 'N/A'/'Fecha inválida'.
 */
function formatProductDate(dateString) {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son de 0-11
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } catch (e) {
        console.error("Error al formatear fecha:", dateString, e);
        return 'Fecha inválida';
    }
}


// ==========================================================
// 6. FUNCIONES DE VISTAS (PÁGINAS)
// ==========================================================

/**
 * Muestra la vista de Inicio/Dashboard.
 */
function renderDashboardPage() {
    mainContentDiv.innerHTML = `
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Inicio</h1>
            <p class="text-gray-600 dark:text-gray-400">Gestiona tu inventario y controla los niveles de stock.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Productos</h3>
                    <div class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <svg class="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.5 7.27783L12 12.0001M12 12.0001L3.49997 7.27783M12 12.0001L12 21.5001" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="flex items-baseline justify-between">
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">523</p>
                    <div class="flex items-center text-green-600 dark:text-green-400">
                        <svg class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M13 17L13 7L17 11M11 7L7 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="text-sm font-medium">+12.5%</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">Categorías Únicas</h3>
                    <div class="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                        <svg class="h-6 w-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="7" height="9" rx="1" stroke-linecap="round" stroke-linejoin="round"></rect>
                            <rect x="14" y="3" width="7" height="5" rx="1" stroke-linecap="round" stroke-linejoin="round"></rect>
                            <rect x="14" y="12" width="7" height="9" rx="1" stroke-linecap="round" stroke-linejoin="round"></rect>
                            <rect x="3" y="16" width="7" height="5" rx="1" stroke-linecap="round" stroke-linejoin="round"></rect>
                        </svg>
                    </div>
                </div>
                <div class="flex items-baseline justify-between">
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">15</p>
                    <div class="flex items-center text-green-600 dark:text-green-400">
                        <svg class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M13 17L13 7L17 11M11 7L7 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="text-sm font-medium">+3</span>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                <div class="flex justify-between items-start mb-3">
                    <h3 class="text-gray-500 dark:text-gray-400 text-sm font-medium">Bajo Stock</h3>
                    <div class="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                        <svg class="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            <line x1="12" y1="9" x2="12" y2="13"></line>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                    </div>
                </div>
                <div class="flex items-baseline justify-between">
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">7</p>
                    <div class="flex items-center text-red-600 dark:text-red-400">
                        <svg class="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M13 7L13 17L17 13M11 17L7 13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="text-sm font-medium">-2%</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-5 border-b border-gray-200 dark:border-gray-700">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Últimos Productos Ingresados</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="bg-gray-50 dark:bg-gray-900/50">
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tipo</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Color</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Precio</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cantidad</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fecha de Compra</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        ${PRODUCTS_DUMMY_DATA.slice(0, 5).map(product => `
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">${product.id}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.name}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.category}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.color}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">$${product.price.toFixed(2)}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.quantity}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${formatProductDate(product.purchase_date)}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

/**
 * Muestra el formulario para agregar un nuevo producto.
 */
function renderAddProductForm() {
    mainContentDiv.innerHTML = `
        <div class="mb-6">
            
            <p class="text-gray-600 dark:text-gray-400">Rellena los campos para añadir un nuevo producto al inventario.</p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <form id="addProductForm">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label for="product_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Producto</label>
                        <input type="text" id="product_name" name="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                    </div>
                    <div>
                        <label for="product_brand" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Marca</label>
                        <input type="text" id="product_brand" name="brand" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                    </div>
                    <div>
                        <label for="product_category" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoría</label>
                        <input type="text" id="product_category" name="category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                    </div>
                    <div>
                        <label for="product_color" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
                        <input type="text" id="product_color" name="color" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                    </div>
                    <div>
                        <label for="product_price" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Precio</label>
                        <input type="number" step="0.01" id="product_price" name="price" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                    </div>
                    <div>
                        <label for="product_quantity" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Cantidad</label>
                        <input type="number" id="product_quantity" name="quantity" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                    </div>
                     <div>
                        <label for="product_purchase_date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha de Compra</label>
                        <input type="date" id="product_purchase_date" name="purchase_date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                    </div>
                </div>
                <div class="flex justify-end space-x-3 mt-6">
                    <button type="button" id="cancelAddProduct" class="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">Cancelar</button>
                    <button type="submit" class="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">Agregar Producto</button>
                </div>
            </form>
            <div id="formMessage" class="mt-4 text-center text-sm font-medium"></div>
        </div>
    `;

    // Adjuntar event listeners después de que el HTML se haya cargado
    document.getElementById('addProductForm').addEventListener('submit', submitAddProductForm);
    document.getElementById('cancelAddProduct').addEventListener('click', renderStockPage); // Vuelve a la vista de stock
}

/**
 * Muestra la vista de Existencias (Stock) con la tabla de productos.
 */
async function renderStockPage() {
    let tableRowsHtml = ''; 
    
    // Muestra el estado de carga inicial inmediatamente
    mainContentDiv.innerHTML = `
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Existencias</h1>
            <p class="text-gray-600 dark:text-gray-400">Control y gestión de inventario.</p>
        </div>

        <div class="flex justify-end gap-3 mb-6">
            <button id="addProductBtn" class="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                Agregar Producto
            </button>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-5 border-b border-gray-200 dark:border-gray-700">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-white">Inventario Actual</h2>
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
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Precio</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cantidad</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fecha de compra</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                            <td colspan="9" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">Cargando productos...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // !!! IMPORTANTE: Adjuntar event listener al botón "Agregar Producto"
    // Esto se hace *después* de que mainContentDiv.innerHTML se haya actualizado.
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', renderAddProductForm);
    }

    try {
        // Ajustada la URL para que coincida con tu backend si está en 8080 y usa /obtener-productos
        const response = await fetch('http://localhost:8080/obtener-productos'); 

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
            throw new Error(errorData.message || `Error HTTP: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.products)) {
            if (data.products.length > 0) {
                tableRowsHtml = data.products.map(product => `
                    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">${product.id}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.name}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.brand}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.category}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.color}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">$${product.price ? product.price.toFixed(2) : 'N/A'}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.quantity}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${formatProductDate(product.purchase_date)}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm">
                            <button onclick="handleDeleteClick(${product.id})" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                Eliminar
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
                    Error al cargar productos: ${error.message}. Por favor, verifica tu servidor backend.
                </td>
            </tr>
        `;
    }

    // Finalmente, actualiza el tbody con los datos o mensajes de error
    const tableBody = mainContentDiv.querySelector('tbody');
    if (tableBody) {
        tableBody.innerHTML = tableRowsHtml;
    } else {
        console.error("No se encontró el tbody en el HTML cargado por renderStockPage().");
    }
}

/**
 * Muestra la vista de Configuración.
 */
function renderSettingsPage() {
    mainContentDiv.innerHTML = `
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Configuración</h1>
            <p class="text-gray-600 dark:text-gray-400">Administra la configuración del sistema.</p>
        </div>
        `;
}

// ==========================================================
// 7. LÓGICA DE FORMULARIOS Y ACCIONES (API CALLS)
// ==========================================================

/**
 * Maneja el envío del formulario de agregar producto.
 * @param {Event} event - El evento de envío del formulario.
 */
async function submitAddProductForm(event) {
    event.preventDefault(); // Evita el envío por defecto del formulario

    const form = event.target;
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = ''; // Limpiar mensajes anteriores
    formMessage.className = 'mt-4 text-center text-sm font-medium'; // Resetear clases

    const productData = {
        name: form.product_name.value,
        brand: form.product_brand.value,
        category: form.product_category.value,
        color: form.product_color.value,
        price: parseFloat(form.product_price.value), // Convertir a número
        quantity: parseInt(form.product_quantity.value, 10), // Convertir a entero
        purchase_date: form.product_purchase_date.value // El input type="date" ya lo da en YYYY-MM-DD
    };

    try {
        const response = await fetch('http://localhost:8080/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        const result = await response.json();

        if (response.ok) {
            formMessage.textContent = result.message || 'Producto agregado exitosamente.';
            formMessage.classList.add('text-green-600');
            // Retrasar el retorno a la tabla para que el usuario vea el mensaje de éxito
            setTimeout(() => {
                renderStockPage(); // Vuelve a la vista de stock y recarga la tabla
            }, 1500); 
        } else {
            formMessage.textContent = result.message || 'Error al agregar el producto.';
            formMessage.classList.add('text-red-600');
        }
    } catch (error) {
        console.error('Error de red al agregar producto:', error);
        formMessage.textContent = 'Error de conexión al servidor.';
        formMessage.classList.add('text-red-600');
    }
}

/**
 * Maneja la eliminación de un producto por su ID.
 * @param {string} productId - El ID del producto a eliminar.
 */
async function handleDeleteClick(productId) {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.')) {
        return; // El usuario canceló la eliminación
    }

    try {
        const response = await fetch(`http://localhost:8080/api/productos/${productId}`, {
            method: 'DELETE',
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || 'Producto eliminado exitosamente.');
            renderStockPage(); // Recarga la tabla de productos después de la eliminación
        } else {
            alert(result.message || 'Error al eliminar el producto.');
        }
    } catch (error) {
        console.error('Error de red al eliminar producto:', error);
        alert('Error de conexión al servidor al intentar eliminar el producto.');
    }
}

// ==========================================================
// 8. NAVEGACIÓN DE LA BARRA LATERAL
// ==========================================================

if (sidebarNav) {
    sidebarNav.addEventListener("click", (event) => {
        const navItem = event.target.closest(".nav-item"); // Encuentra el ancestro más cercano con la clase .nav-item
        
        if (!navItem) {
            return; // No se hizo clic en un elemento de navegación
        }

        // Remover la clase 'active' de todos los elementos de navegación
        document.querySelectorAll(".nav-item").forEach(item => {
            item.classList.remove("active");
        });

        // Añadir la clase 'active' al elemento clickeado
        navItem.classList.add("active");

        // Determinar qué página cargar según el dataset 'page'
        switch (navItem.dataset.page) {
            case "dashboard":
                renderDashboardPage();
                break;
            case "stock": // Usando "stock" en lugar de "existencias" para consistencia con la función
                renderStockPage();
                break;
            case "settings": // Usando "settings" en lugar de "configuracion"
                renderSettingsPage();
                break;
            // Agrega más casos para otras secciones si las tienes
            default:
                console.warn("Página no reconocida:", navItem.dataset.page);
                renderDashboardPage(); // O una página de error/por defecto
        }
    });
}

// ==========================================================
// 9. INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================================

// Carga la página de inicio/dashboard por defecto al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    if (mainContentDiv) {
        renderDashboardPage(); // O la página que quieras que sea la inicial
    } else {
        console.error("El elemento 'main-content' no se encontró en el DOM. Asegúrate de que tu HTML esté cargado antes que tu script.");
    }
});