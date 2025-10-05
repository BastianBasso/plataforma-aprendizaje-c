import React from 'react';
import { Package, ArrowUp, ArrowDown, DollarSign, Boxes } from 'lucide-react';
import StatCard from './StatCard';

interface Product {
  code: string;
  name: string;
  type: string;
  color: string;
  price: number;
  quantity: number;
}

const products: Product[] = [
  { code: 'P001', name: 'Camiseta Clásica', type: 'Ropa', color: 'Blanco', price: 29.99, quantity: 150 },
  { code: 'P002', name: 'Jeans', type: 'Ropa', color: 'Azul', price: 79.99, quantity: 85 },
  { code: 'P003', name: 'Zapatillas Deportivas', type: 'Calzado', color: 'Negro', price: 119.99, quantity: 45 },
  { code: 'P004', name: 'Billetera de Cuero', type: 'Accesorios', color: 'Marrón', price: 49.99, quantity: 200 },
  { code: 'P005', name: 'Mochila', type: 'Accesorios', color: 'BLANCO', price: 89.99, quantity: 60 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Productos</h1>
        <p className="text-gray-600 dark:text-gray-400">Gestiona tu inventario y controla los niveles de stock.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard 
          title="Total Productos" 
          value="523" 
          change="+30.5%" 
          trend="up"
          icon={<Package className="h-6 w-6 text-blue-600" />}
          color="bg-blue-100 dark:bg-blue-900/30"
          textColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard 
          title="Bajo Stock" 
          value="24" 
          change="+3.2%" 
          trend="up"
          icon={<Boxes className="h-6 w-6 text-orange-600" />}
          color="bg-orange-100 dark:bg-orange-900/30"
          textColor="text-orange-600 dark:text-orange-400"
        />
        <StatCard 
          title="Sin Stock" 
          value="12" 
          change="-2.8%" 
          trend="down"
          icon={<ArrowDown className="h-6 w-6 text-red-600" />}
          color="bg-red-100 dark:bg-red-900/30"
          textColor="text-red-600 dark:text-red-400"
        />
        <StatCard 
          title="Valor Total" 
          value="$45,245" 
          change="+8.3%" 
          trend="up"
          icon={<DollarSign className="h-6 w-6 text-green-600" />}
          color="bg-green-100 dark:bg-green-900/30"
          textColor="text-green-600 dark:text-green-400"
        />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Lista de Productos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Código</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Color</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cantidad</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {products.map((product) => (
                <tr key={product.code} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{product.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.color}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;