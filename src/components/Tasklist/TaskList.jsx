import React, { useState, useEffect } from 'react';
import { getTasks, updateTask, deleteTask } from '../../utils/localStorage';
import { format } from 'date-fns';

const TaskList = ({ assignedTo, onStatusChange }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [taskStats, setTaskStats] = useState({
    all: 0,
    todo: 0,
    'in-progress': 0,
    completed: 0,
    'on-hold': 0
  });

  useEffect(() => {
    loadTasks();
  }, [filter, assignedTo]);

  const loadTasks = () => {
    let allTasks = getTasks();
    
    if (assignedTo) {
      allTasks = allTasks.filter(task => task.assignedTo?.toString() === assignedTo.toString());
    }
    
    const stats = {
      all: allTasks.length,
      todo: allTasks.filter(t => t.status === 'todo').length,
      'in-progress': allTasks.filter(t => t.status === 'in-progress').length,
      completed: allTasks.filter(t => t.status === 'completed').length,
      'on-hold': allTasks.filter(t => t.status === 'on-hold').length
    };
    
    setTaskStats(stats);
    
    let filteredTasks = [...allTasks];
    if (filter !== 'all') {
      filteredTasks = allTasks.filter(task => task.status === filter);
    }
    
    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    setTasks(filteredTasks);
    setLoading(false);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      loadTasks();
      if (typeof onStatusChange === 'function') {
        onStatusChange();
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'todo': { text: 'To Do', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      'in-progress': { text: 'In Progress', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      'completed': { text: 'Completed', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      'on-hold': { text: 'On Hold', color: 'bg-red-500/20 text-red-400 border-red-500/30' }
    };
    return statusMap[status] || { text: status, color: 'bg-gray-100 text-gray-800' };
  };

  const FilterButton = ({ status, count }) => {
    const isActive = filter === status;
    const badge = getStatusBadge(status);
    
    return (
      <button
        onClick={() => setFilter(status)}
        className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
          isActive 
            ? 'bg-gray-700 text-white' 
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        <span className={`w-2 h-2 rounded-full ${badge.color.split(' ')[0]}`}></span>
        <span>{badge.text}</span>
        <span className="bg-gray-700 text-xs px-2 py-0.5 rounded-full">
          {count}
        </span>
      </button>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 p-1 bg-gray-800/50 rounded-xl">
        <FilterButton status="all" count={taskStats.all} />
        <FilterButton status="todo" count={taskStats.todo} />
        <FilterButton status="in-progress" count={taskStats['in-progress']} />
        <FilterButton status="completed" count={taskStats.completed} />
        <FilterButton status="on-hold" count={taskStats['on-hold']} />
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No tasks found. Create a new task to get started.
          </div>
        ) : (
          tasks.map((task) => {
            const statusBadge = getStatusBadge(task.status);
            
            return (
              <div 
                key={task.id} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-gray-600 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white">{task.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{task.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusBadge.color} border`}>
                        {statusBadge.text}
                      </span>
                      <span className="text-xs text-gray-400">
                        Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="on-hold">On Hold</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TaskList;