import React from 'react';
import { BarChart2, ArrowRight } from 'lucide-react';

const ChartCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Analytics Overview</h3>
        <div className="flex space-x-3">
          <button className="py-1 px-3 text-sm font-medium text-blue-700 bg-blue-100 rounded-md dark:text-blue-400 dark:bg-blue-900/30">Weekly</button>
          <button className="py-1 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-700/60">Monthly</button>
          <button className="py-1 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md dark:text-gray-300 dark:hover:bg-gray-700/60">Yearly</button>
        </div>
      </div>
      
      <div className="flex items-center justify-center h-64 mb-4">
        <div className="flex h-full w-full items-end justify-between gap-2 px-4">
          {[60, 45, 80, 50, 75, 90, 65].map((height, index) => (
            <div key={index} className="group relative h-full w-full">
              <div
                className="absolute bottom-0 w-full rounded-t-md bg-blue-500 dark:bg-blue-600 transition-all duration-300 hover:bg-blue-600 dark:hover:bg-blue-500"
                style={{ height: `${height}%` }}
              >
                <div className="invisible group-hover:visible absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  {height}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
      
      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
        <a href="#" className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
          <span>View detailed report</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default ChartCard;