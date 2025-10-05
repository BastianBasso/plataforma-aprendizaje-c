import React from 'react';
import { Plus, FileText, Upload, Users, Settings } from 'lucide-react';

interface ActionButton {
  icon: React.ReactNode;
  label: string;
  color: string;
}

const actions: ActionButton[] = [
  {
    icon: <FileText className="h-5 w-5" />,
    label: 'Create Report',
    color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50',
  },
  {
    icon: <Upload className="h-5 w-5" />,
    label: 'Upload Files',
    color: 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-800/50',
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: 'Add Team Member',
    color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-800/50',
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: 'Update Settings',
    color: 'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-800/50',
  },
];

const QuickActionCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-5">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 ${action.color}`}
          >
            {action.icon}
            <span className="mt-2 text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionCard;