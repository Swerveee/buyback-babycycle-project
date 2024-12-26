import React from 'react';
import { Link } from 'react-router-dom';

interface WixMenuProps {
  currentPath: string;
}

const WixMenu: React.FC<WixMenuProps> = ({ currentPath }) => {
  const menuItems = [
    { path: '/', label: 'Sustainable Fashion' },
    { path: '/buyback', label: 'Buyback Program' },
  ];

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`py-4 px-3 inline-flex items-center text-sm font-medium ${
                currentPath === 'buyback' && item.path === '/buyback'
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WixMenu;