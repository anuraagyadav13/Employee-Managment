import React from 'react';
import { useAuth } from '../../Context/AuthProvider';

const Header = ({ onLogout }) => {
  const { user } = useAuth();
  // Get the name from the user object directly or from user.data if it exists
  const userName = user?.name || user?.data?.name || 'User';

  return (
    <div className="flex items-end justify-between pr-3">
      <h1>
        Hello <br /><span className='text-3xl font-semibold'>{userName} 👋</span> 
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
