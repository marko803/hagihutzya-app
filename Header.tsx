import React from 'react';
import { Shirt } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="bg-white shadow-sm py-6 px-4 flex flex-col items-center justify-center sticky top-0 z-10">
      <div className="bg-blue-100 p-3 rounded-full mb-3">
        <Shirt className="w-8 h-8 text-blue-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800">הגיהוציה</h1>
      <p className="text-gray-500 mt-1 text-sm md:text-base">שירותי כביסה וגיהוץ עד הבית</p>
    </div>
  );
};
