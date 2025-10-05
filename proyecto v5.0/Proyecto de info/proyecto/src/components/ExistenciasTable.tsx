import React, { useState, useEffect } from 'react';

const ExistenciasTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null); // Limpiar errores anteriores

        // --- ¡IMPORTANTE! ---
        // Asegúrate de que esta URL coincida con la URL y el puerto de tu servidor backend Express.
        // Si tu React Dev Server está en http://localhost:5173 y tu Express en http://localhost:3000,
        // esta URL debe ser la del Express.
        const response = await fetch('http://localhost:8080/obtener-productos'); 
        
        if (!response.ok) {
          // Si la respuesta HTTP no es 2xx, lanza un error
          const errorData = await response.json(); // Intenta leer el mensaje de error del backend
          throw new Error(errorData.message || `Error HTTP: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.products);
        } else {
          // Si la respuesta no es success: true, pero es HTTP 2xx
          setError(data.message || 'No se pudieron cargar los productos por un problema en los datos.');
        }
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError('Error al conectar con el servidor o al obtener los datos: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // El array vacío [] asegura que este efecto se ejecute solo una vez al montar el componente

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      // Opciones de formato, puedes ajustarlas según tu preferencia
      return date.toLocaleDateString('es-CL', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
      });
    } catch (e) {
      console.error("Error al formatear fecha:", dateString, e);
      return 'Fecha inválida';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 dark:text-gray-300">
        Cargando existencias...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48 text-red-500 dark:text-red-400">
        Error al cargar los datos: {error}
        <br/>
        Por favor, asegúrate de que tu servidor backend esté corriendo y la URL de la API sea correcta.
      </div>
    );
  }

  return (
    <div className="flex-1"> {/* Este div es el que contuviste en tu código */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Existencias</h1>
        <p className="text-gray-600 dark:text-gray-400">Control y gestión de inventario.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Nuevos productos ingresados</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Color</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cantidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fecha de compra</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{product.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.color}</td>
                    {/* Asegúrate de que el precio se muestre correctamente y tenga 2 decimales */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.price ? product.price.toFixed(2) : 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(product.purchase_date)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No hay productos disponibles en el inventario.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExistenciasTable;