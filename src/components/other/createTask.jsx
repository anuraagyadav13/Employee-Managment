import React from 'react'

const CreateTask = () => {
  return (
         <div className="mt-8   bg-transparent p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Create New Task</h2>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block font-medium mb-1">Task Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              className="w-full border bg-transparent border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              cols="30"
              rows="5"
              placeholder="Enter task details"
              className="w-full border bg-transparent border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              className="w-full border bg-transparent border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Assign To</label>
            <input
              type="text"
              placeholder="Employee Name"
              className="w-full border bg-transparent border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Category</label>
            <input
              type="text"
              placeholder="Design, Dev, etc."
              className="w-full border bg-transparent border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-600  font-bold py-2 px-4 rounded-md hover:bg-emerald-700   tr ansition"
          >
            Create Task
          </button>
        </form>
      </div>
  )
}

export default  CreateTask;