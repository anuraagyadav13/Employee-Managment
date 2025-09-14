import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthProvider';
import { getTasks } from '../../utils/localStorage';
import Header from '../other/Header';
import TaskList from '../Tasklist/TaskList';

const TaskStatCard = ({ title, count, icon, color }) => (
  <div className={`p-6 rounded-xl ${color} bg-opacity-20 backdrop-blur-sm border border-opacity-20 ${color.replace('bg-', 'border-')} transition-all hover:scale-[1.02]`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-300">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{count}</p>
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-30`}>
        {icon}
      </div>
    </div>
  </div>
);

const EmployeeDashboard = ({ onLogout }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [taskCounts, setTaskCounts] = useState({
    total: 0,
    todo: 0,
    inProgress: 0,
    completed: 0,
    onHold: 0,
  });

  useEffect(() => {
    if (user) {
      updateTaskCounts();
    }
  }, [user]);

  const updateTaskCounts = () => {
    try {
      const tasks = getTasks();
      const userId = user?.id || user?.data?.id;
      const userTasks = tasks.filter(task => task.assignedTo?.toString() === userId?.toString());
      
      setTaskCounts({
        total: userTasks.length,
        todo: userTasks.filter(task => task.status === 'todo').length,
        inProgress: userTasks.filter(task => task.status === 'in-progress').length,
        completed: userTasks.filter(task => task.status === 'completed').length,
        onHold: userTasks.filter(task => task.status === 'on-hold').length,
      });
    } catch (error) {
      console.error('Error updating task counts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <Header onLogout={onLogout} />
        
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <TaskStatCard 
              title="Total Tasks" 
              count={taskCounts.total}
              color="bg-blue-500"
              icon={
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
            />
            
            <TaskStatCard 
              title="To Do" 
              count={taskCounts.todo}
              color="bg-yellow-500"
              icon={
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            
            <TaskStatCard 
              title="In Progress" 
              count={taskCounts.inProgress}
              color="bg-indigo-500"
              icon={
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
            />
            
            <TaskStatCard 
              title="Completed" 
              count={taskCounts.completed}
              color="bg-green-500"
              icon={
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Tasks</h2>
            </div>
            <TaskList 
              assignedTo={user?.id || user?.data?.id} 
              onStatusChange={updateTaskCounts} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
