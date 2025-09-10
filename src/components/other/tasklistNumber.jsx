import React from 'react';

const TasklistNumber = () => {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-2 ">
      <div className="rounded-xl px-6 py-6 bg-red-400 text-white shadow-md">
        <h2 className="text-3xl bg-red-400 font-semibold">0</h2>
        <h3 className="text-xl  bg-red-400 font-medium">New Task</h3>
      </div>
      <div className="rounded-xl px-6 py-6 bg-blue-400 text-white shadow-md">
        <h2 className="text-3xl font-semibold bg-transparent">0</h2>
        <h3 className="text-xl font-medium bg-transparent">In Progress</h3>
      </div>
      <div className="rounded-xl px-6 py-6 bg-green-400 text-white shadow-md">
        <h2 className="text-3xl font-semibold bg-transparent">0</h2>
        <h3 className="text-xl font-medium bg-transparent">Completed</h3>
      </div>
      <div className="rounded-xl px-6 py-6 bg-yellow-400 text-white shadow-md">
        <h2 className="text-3xl font-semibold bg-transparent">0</h2>
        <h3 className="text-xl font-medium bg-transparent">On Hold</h3>
      </div>
    </div>
  );
};

export default TasklistNumber;

