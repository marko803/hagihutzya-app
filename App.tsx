import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { OrderFlow } from './components/OrderFlow';
import { ChatView } from './components/ChatView';
import { PriceListView } from './components/PriceListView';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');

  const renderContent = () => {
    switch (currentView) {
      case 'HOME':
        return <HomeView onChangeView={setCurrentView} />;
      case 'ORDER_FLOW':
        return <OrderFlow onBack={() => setCurrentView('HOME')} />;
      case 'CHAT':
        return <ChatView onBack={() => setCurrentView('HOME')} />;
      case 'PRICES':
        return <PriceListView onBack={() => setCurrentView('HOME')} />;
      default:
        return <HomeView onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full">
        {renderContent()}
      </main>
      
      {/* Sticky footer for very small screens or aesthetic balance */}
      {currentView === 'HOME' && (
        <footer className="w-full py-4 text-center text-gray-400 text-xs border-t border-gray-200 mt-auto bg-white">
          © 2024 הגיהוציה. כל הזכויות שמורות.
        </footer>
      )}
    </div>
  );
}

export default App;
