import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaCheck, FaClock, FaListUl } from 'react-icons/fa';
import { deleteTask } from '../../utils/localStorage';

const TaskList = ({ tasks, onTaskUpdate }) => {
  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
      onTaskUpdate(); // Refresh the task list
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'todo': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: <FaListUl className="mr-1" /> },
      'in-progress': { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: <FaClock className="mr-1" /> },
      'completed': { bg: 'bg-green-500/20', text: 'text-green-400', icon: <FaCheck className="mr-1" /> }
    };

    const config = statusConfig[status] || statusConfig['todo'];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.icon}
        {status.replace('-', ' ')}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded ${priorityConfig[priority] || priorityConfig['medium']}`}>
        {priority}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Assigned To
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Due Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Priority
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-700/50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-100">{task.title}</div>
                <div className="text-sm text-gray-400 line-clamp-1">{task.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {task.assignedToName || 'Unassigned'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getPriorityBadge(task.priority)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(task.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-2 justify-end">
                  <Link
                    to={`/admin/tasks/edit/${task.id}`}
                    className="text-blue-400 hover:text-blue-300"
                    title="Edit"
                  >
                    <FaEdit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-400 hover:text-red-300"
                    title="Delete"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {tasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-400">No tasks found</p>
          <p className="text-sm text-gray-500 mt-1">Get started by creating a new task</p>
          <Link
            to="/admin/tasks/new"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Task
          </Link>
        </div>
      )}
    </div>
  );
};

export default TaskList;
