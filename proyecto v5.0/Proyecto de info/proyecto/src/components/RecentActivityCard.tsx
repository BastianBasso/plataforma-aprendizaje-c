import React from 'react';
import { User, MessageSquare, FileText, ShoppingBag } from 'lucide-react';

interface ActivityItem {
  id: number;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  time: string;
  description: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    icon: <User className="h-4 w-4 text-blue-600" />,
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    title: 'New user registered',
    time: '2 min ago',
    description: 'Jane Cooper has signed up',
  },
  {
    id: 2,
    icon: <MessageSquare className="h-4 w-4 text-green-600" />,
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    title: 'New message received',
    time: '1 hour ago',
    description: 'You have 3 unread messages',
  },
  {
    id: 3,
    icon: <FileText className="h-4 w-4 text-purple-600" />,
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    title: 'New report available',
    time: '2 hours ago',
    description: 'Monthly sales report generated',
  },
  {
    id: 4,
    icon: <ShoppingBag className="h-4 w-4 text-orange-600" />,
    iconBg: 'bg-orange-100 dark:bg-orange-900/30',
    title: 'New order placed',
    time: '5 hours ago',
    description: 'Order #38295 is ready for shipping',
  },
];

const RecentActivityCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-5">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <div className={`flex-shrink-0 h-8 w-8 rounded-full ${activity.iconBg} flex items-center justify-center`}>
              {activity.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.title}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-5 w-full py-2 text-sm text-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
        View All Activity
      </button>
    </div>
  );
};

export default RecentActivityCard;