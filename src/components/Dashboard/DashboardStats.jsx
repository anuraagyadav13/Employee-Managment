import React from 'react';
import { FaTasks, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { getTasks } from '../../utils/localStorage';

const DashboardStats = () => {
  const tasks = getTasks();
  
  const stats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.status === 'completed').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    pending: tasks.filter(task => task.status === 'todo').length,
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className={`bg-gray-800 p-6 rounded-xl ${color} bg-opacity-20`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-30`}>
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Total Tasks" 
        value={stats.totalTasks} 
        icon={FaTasks} 
        color="text-blue-500"
      />
      <StatCard 
        title="Completed" 
        value={stats.completedTasks} 
        icon={FaCheckCircle} 
        color="text-green-500"
      />
      <StatCard 
        title="In Progress" 
        value={stats.inProgress} 
        icon={FaClock} 
        color="text-yellow-500"
      />
      <StatCard 
        title="Pending" 
        value={stats.pending} 
        icon={FaExclamationTriangle} 
        color="text-red-500"
      />
    </div>
  );
};

export default DashboardStats;
