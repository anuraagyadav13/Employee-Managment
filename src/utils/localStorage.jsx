// Initialize default data
const defaultEmployees = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: "123",
    role: "employee"
  }
];

const defaultAdmin = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@me.com",
    password: "123",
    role: "admin"
  }
];

const defaultTasks = [
  {
    id: 1,
    title: "Complete Project Proposal",
    description: "Draft and finalize the project proposal document.",
    assignedTo: 1, // employee id
    dueDate: "2025-09-15",
    priority: "high",
    status: "in-progress",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Team Meeting",
    description: "Weekly team sync up meeting.",
    assignedTo: 1,
    dueDate: "2025-09-12",
    priority: "medium",
    status: "todo",
    createdAt: new Date().toISOString()
  }
];

// Initialize localStorage with default data if it doesn't exist
const initializeLocalStorage = () => {
  if (!localStorage.getItem('employees')) {
    localStorage.setItem('employees', JSON.stringify(defaultEmployees));
  }
  if (!localStorage.getItem('admin')) {
    localStorage.setItem('admin', JSON.stringify(defaultAdmin));
  }
  if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify(defaultTasks));
  }
};

// Initialize on import
initializeLocalStorage();

// Task related functions
export const getTasks = () => {
  try {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  } catch (error) {
    console.error('Error getting tasks:', error);
    return [];
  }
};

export const addTask = (task) => {
  try {
    const tasks = getTasks();
    const newTask = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: task.status || 'todo'
    };
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return newTask;
  } catch (error) {
    console.error('Error adding task:', error);
    return null;
  }
};

export const updateTask = (taskId, updates) => {
  try {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return null;
    
    const updatedTask = { ...tasks[taskIndex], ...updates };
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return updatedTask;
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
};

export const deleteTask = (taskId) => {
  try {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};

// Employee related functions
export const getEmployees = () => {
  try {
    return JSON.parse(localStorage.getItem('employees') || '[]');
  } catch (error) {
    console.error('Error getting employees:', error);
    return [];
  }
};

// Get all data
export const getLocalStorage = () => {
  return {
    employees: getEmployees(),
    admin: JSON.parse(localStorage.getItem('admin') || '[]'),
    tasks: getTasks()
  };
};

export default {
  getLocalStorage,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getEmployees
};
