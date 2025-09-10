import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../other/Header";
import { getTasks } from "../../utils/localStorage";

const AdminDashboard = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    try {
      const allTasks = getTasks();
      setTasks(allTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTaskCount = (status) => {
    return tasks.filter(task => task.status === status).length;
  };

  const StatCard = ({ title, value, color }) => (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all">
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Total Tasks" 
            value={tasks.length} 
            color="text-blue-400"
          />
          <StatCard 
            title="In Progress" 
            value={getTaskCount('in-progress')} 
            color="text-yellow-400"
          />
          <StatCard 
            title="Completed" 
            value={getTaskCount('completed')} 
            color="text-green-400"
          />
        </div>

        {/* Recent Tasks */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold">Recent Tasks</h2>
            <button
              onClick={() => navigate('/tasks/new')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Task
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : tasks.length > 0 ? (
            <div className="space-y-4">
              {tasks.slice(0, 5).map((task) => (
                <div 
                  key={task.id}
                  className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer group"
                  onClick={() => navigate(`/tasks/${task.id}`)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-100 group-hover:text-white truncate">{task.title}</h3>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">{task.description}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="text-xs text-gray-500">
                          Due: <span className="text-gray-300">{new Date(task.dueDate).toLocaleDateString()}</span>
                        </span>
                        <span className={`px-2.5 py-0.5 text-xs rounded-full ${
                          task.status === 'completed' ? 'bg-green-900/50 text-green-400' :
                          task.status === 'in-progress' ? 'bg-blue-900/50 text-blue-400' : 
                          'bg-yellow-900/50 text-yellow-400'
                        }`}>
                          {task.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <button 
                      className="text-gray-500 hover:text-gray-300 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/tasks/edit/${task.id}`);
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-400">No tasks found</p>
              <p className="text-sm text-gray-500 mt-1">Get started by creating a new task</p>
              <button
                onClick={() => navigate('/tasks/new')}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Create Task
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
