import React from 'react';

interface AnnouncementBarProps {
  isWireframe: boolean;
  message: string;
}

const AnnouncementBar = ({ isWireframe, message }: AnnouncementBarProps) => {
  return (
    <div className={`w-full py-3 text-center text-white ${isWireframe ? 'bg-gray-300' : 'bg-[#7E69AB]'}`}>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default AnnouncementBar;