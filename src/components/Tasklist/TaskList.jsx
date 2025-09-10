import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { getTasks, deleteTask } from '../../utils/localStorage';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        deleteTask(taskId);
        loadTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'todo': 'bg-yellow-900/50 text-yellow-400',
      'in-progress': 'bg-blue-900/50 text-blue-400',
      'completed': 'bg-green-900/50 text-green-400',
      'overdue': 'bg-red-900/50 text-red-400'
    };
    
    const statusText = status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return (
      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusMap[status] || 'bg-gray-700 text-gray-300'}`}>
        {statusText}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-100">All Tasks</h2>
      </div>

      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div 
              key={task.id} 
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-100 group-hover:text-white">{task.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{task.description}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                    {getStatusBadge(task.status)}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {}}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-400">No tasks found</p>
            <p className="text-sm text-gray-500 mt-1">Create a new task to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;