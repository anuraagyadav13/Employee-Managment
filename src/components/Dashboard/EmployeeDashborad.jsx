import React from 'react';
import Header from '../other/Header';
import TasklistNumber from '../other/tasklistNumber';
import TaskList from '../Tasklist/TaskList';

const EmployeeDashboard = ({ onLogout }) => {
  return (
    <div className='p-10 bg-[#1C1C1C] h-screen w-screen'>
      <Header onLogout={onLogout} />
      <TasklistNumber />
      <TaskList />
    </div>
  );
};

export default EmployeeDashboard;
