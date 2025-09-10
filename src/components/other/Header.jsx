import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <div className="flex items-end justify-between pr-3">
      <h1>
        Hello <br /><span className='text-3xl font-semibold'> Anurag 👋</span> 
      </h1>
      <button 
        onClick={onLogout}
        className='bg-red-500 mb-2 text-white px-5 py-2 rounded-md hover:bg-red-600 transition-colors'
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
