import React from 'react';
import { Wallet, Users, ShoppingBag } from 'lucide-react';

interface NavigationProps {
  isWireframe: boolean;
  navItems: Array<{
    title: string;
    url: string;
    isHighlighted?: boolean;
    onClick?: () => void;
  }>;
  onLogoClick: () => void;
}

const Navigation = ({ isWireframe, navItems, onLogoClick }: NavigationProps) => {
  return (
    <nav className={`${isWireframe ? 'bg-gray-100 border-2 border-dashed border-gray-300' : 'bg-white shadow-sm'} py-6 px-6`}>
      <div className="container mx-auto flex items-center justify-between">
        <button 
          onClick={onLogoClick}
          className={`text-2xl font-bold ${isWireframe ? 'font-mono' : ''} text-[#9b87f5]`}
        >
          BabyCycle
        </button>

        <div className="flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.title}
              onClick={item.onClick}
              className={`${isWireframe ? 'font-mono text-gray-600 hover:text-gray-800' : 
                item.isHighlighted ? 'text-[#9b87f5] font-medium hover:text-[#7E69AB]' : 
                'text-gray-700 hover:text-[#9b87f5]'} 
                text-sm tracking-wide transition-colors`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <div className={`flex items-center space-x-2 ${
            isWireframe ? 'bg-gray-200 border-2 border-dashed border-gray-400' : 'bg-[#F8F2FF]'
          } px-4 py-2 rounded-full`}>
            <Wallet className="h-4 w-4 text-[#9b87f5]" />
            <span className="text-sm font-medium text-[#1A1F2C]">Store Credit: $120</span>
          </div>
          <button className={`${isWireframe ? 'font-mono text-gray-600 hover:text-gray-800' : 'text-gray-700 hover:text-[#9b87f5]'} transition-colors`}>
            <Users className="h-5 w-5" />
          </button>
          <button className={`${isWireframe ? 'font-mono text-gray-600 hover:text-gray-800' : 'text-gray-700 hover:text-[#9b87f5]'} transition-colors`}>
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;