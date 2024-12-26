import React from 'react';
import { Users, ShoppingBag } from 'lucide-react';
import BalanceDisplay from '../BalanceDisplay';

interface MainNavigationProps {
  isWireframe: boolean;
  onLogoClick: () => void;
  setShowBuyback: (show: boolean) => void;
}

const MainNavigation = ({ isWireframe, onLogoClick, setShowBuyback }: MainNavigationProps) => {
  const navItems = [
    { title: "SHOP", url: "#" },
    { title: "OUR STORY", url: "#" },
    { title: "CONTACT", url: "#" },
    { title: "SUSTAINABILITY", url: "#" },
    { 
      title: "OUR BUYBACK PROGRAM", 
      url: "#",
      isHighlighted: true,
      onClick: () => setShowBuyback(false)
    }
  ];

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
          <BalanceDisplay isWireframe={isWireframe} />
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

export default MainNavigation;