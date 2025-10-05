import React from 'react';
import { Package, Boxes, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, onClick }) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center w-full gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
          active
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/60'
        }`}
      >
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </button>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState('Productos');
  const { theme, toggleTheme } = useTheme();

  const handleNavClick = (label: string) => {
    setActiveItem(label);
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-500 flex items-center gap-2">
          <Package size={24} />
          <span>Inventario</span>
        </h1>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          <NavItem 
            icon={<Package />} 
            label="Productos" 
            active={activeItem === 'Productos'} 
            onClick={() => handleNavClick('Productos')}
          />
          <NavItem 
            icon={<Boxes />} 
            label="Existencias" 
            active={activeItem === 'Existencias'} 
            onClick={() => handleNavClick('Existencias')}
          />
          <NavItem 
            icon={<Settings />} 
            label="Configuración" 
            active={activeItem === 'Configuración'} 
            onClick={() => handleNavClick('Configuración')}
          />
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button 
          onClick={toggleTheme}
          className="flex items-center w-full gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/60 transition-all duration-200"
        >
          <span className="text-lg">
            {theme === 'dark' ? <Sun /> : <Moon />}
          </span>
          <span className="text-sm font-medium">
            {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
          </span>
        </button>
        
        <button className="flex items-center w-full gap-3 px-3 py-2 mt-2 rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-all duration-200">
          <span className="text-lg"><LogOut /></span>
          <span className="text-sm font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;