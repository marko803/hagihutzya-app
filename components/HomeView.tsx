import React from 'react';
import { Truck, MessageCircle, ScrollText, ArrowLeft } from 'lucide-react';
import { ViewState } from '../types';

interface HomeViewProps {
  onChangeView: (view: ViewState) => void;
}

interface CardProps {
  title: string;
  icon: React.ReactNode;
  colorClass: string;
  onClick: () => void;
}

const HomeCard: React.FC<CardProps> = ({ title, icon, colorClass, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center 
      w-full h-48 md:h-64 
      bg-white rounded-2xl shadow-md 
      transition-transform transform active:scale-95 hover:shadow-lg
      border-b-4 ${colorClass}
    `}
  >
    <div className="mb-4 transform transition-transform group-hover:scale-110">
      {icon}
    </div>
    <span className="text-xl md:text-2xl font-bold text-gray-800">{title}</span>
  </button>
);

export const HomeView: React.FC<HomeViewProps> = ({ onChangeView }) => {
  return (
    <div className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        
        {/* Card 1: Quick Pickup */}
        <HomeCard 
          title="הזמנת איסוף מהיר" 
          icon={<Truck className="w-16 h-16 text-blue-500" />}
          colorClass="border-blue-500"
          onClick={() => onChangeView('ORDER_FLOW')}
        />

        {/* Card 2: Agent Chat */}
        <HomeCard 
          title="צ׳אט עם נציג" 
          icon={<MessageCircle className="w-16 h-16 text-green-500" />}
          colorClass="border-green-500"
          onClick={() => onChangeView('CHAT')}
        />

        {/* Card 3: Price List */}
        <HomeCard 
          title="מחירון ותקנון" 
          icon={<ScrollText className="w-16 h-16 text-purple-500" />}
          colorClass="border-purple-500"
          onClick={() => onChangeView('PRICES')}
        />

      </div>
      
      <div className="mt-8 text-center text-gray-400 text-sm">
        <p>שירות אמין • איכות מובטחת • עד פתח הדלת</p>
      </div>
    </div>
  );
};
