import React, { useState } from 'react';
import { UserCheck, UserPlus, ArrowRight, CheckCircle, Phone, MapPin, User, FileText } from 'lucide-react';
import { ViewState } from '../types';

interface OrderFlowProps {
  onBack: () => void;
}

type OrderStep = 'SELECTION' | 'EXISTING_FORM' | 'NEW_FORM' | 'SUCCESS_EXISTING' | 'SUCCESS_NEW';

export const OrderFlow: React.FC<OrderFlowProps> = ({ onBack }) => {
  const [step, setStep] = useState<OrderStep>('SELECTION');
  const [phone, setPhone] = useState('');
  
  // New Customer State
  const [newCustomerData, setNewCustomerData] = useState({
    fullName: '',
    address: '',
    phone: '',
    notes: ''
  });

  const handleExistingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 9) return;
    // Simulate API call
    setTimeout(() => setStep('SUCCESS_EXISTING'), 500);
  };

  const handleNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setStep('SUCCESS_NEW'), 500);
  };

  // 1. Selection Screen
  if (step === 'SELECTION') {
    return (
      <div className="flex-1 flex flex-col p-4 max-w-2xl mx-auto w-full">
        <button onClick={onBack} className="flex items-center text-gray-600 mb-6 self-start">
          <ArrowRight className="w-5 h-5 ml-2" />
          חזרה
        </button>
        
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">איזה סוג לקוח את/ה?</h2>
        
        <div className="grid grid-cols-1 gap-6">
          <button 
            onClick={() => setStep('EXISTING_FORM')}
            className="flex items-center p-6 bg-white rounded-xl shadow-md border-r-4 border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="bg-blue-100 p-4 rounded-full ml-4">
              <UserCheck className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold text-gray-800">לקוח קיים</h3>
              <p className="text-gray-500">הזמנה סופר-מהירה עם מספר טלפון בלבד</p>
            </div>
          </button>

          <button 
             onClick={() => setStep('NEW_FORM')}
             className="flex items-center p-6 bg-white rounded-xl shadow-md border-r-4 border-teal-500 hover:bg-teal-50 transition-colors"
          >
            <div className="bg-teal-100 p-4 rounded-full ml-4">
              <UserPlus className="w-8 h-8 text-teal-600" />
            </div>
            <div className="text-right">
              <h3 className="text-xl font-bold text-gray-800">לקוח חדש</h3>
              <p className="text-gray-500">פעם ראשונה? נמלא פרטים קצרים ונתחיל</p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // 2. Existing Customer Form
  if (step === 'EXISTING_FORM') {
    return (
      <div className="flex-1 flex flex-col p-4 max-w-md mx-auto w-full">
         <button onClick={() => setStep('SELECTION')} className="flex items-center text-gray-600 mb-6 self-start">
          <ArrowRight className="w-5 h-5 ml-2" />
          חזרה לבחירה
        </button>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-2 text-center">זיהוי מהיר</h2>
          <p className="text-center text-gray-500 mb-6">הזן את מספר הטלפון שלך והשליח בדרך</p>
          
          <form onSubmit={handleExistingSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                מספר טלפון
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="050-0000000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                />
                <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              הזמן איסוף
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. New Customer Form
  if (step === 'NEW_FORM') {
    return (
      <div className="flex-1 flex flex-col p-4 max-w-md mx-auto w-full">
        <button onClick={() => setStep('SELECTION')} className="flex items-center text-gray-600 mb-6 self-start">
          <ArrowRight className="w-5 h-5 ml-2" />
          חזרה לבחירה
        </button>
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-center">פרטים להזמנה ראשונה</h2>
          
          <form onSubmit={handleNewSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">שם מלא</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={newCustomerData.fullName}
                  onChange={e => setNewCustomerData({...newCustomerData, fullName: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">מספר טלפון</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={newCustomerData.phone}
                  onChange={e => setNewCustomerData({...newCustomerData, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">כתובת לאיסוף</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={newCustomerData.address}
                  onChange={e => setNewCustomerData({...newCustomerData, address: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">הערות לשליח (קוד לדלת / קומה)</label>
              <div className="relative">
                <textarea
                  value={newCustomerData.notes}
                  onChange={e => setNewCustomerData({...newCustomerData, notes: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={2}
                />
                <FileText className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors shadow-md mt-4"
            >
              שמור והזמן איסוף
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 4. Success Existing
  if (step === 'SUCCESS_EXISTING') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-md mx-auto w-full text-center">
        <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">הזמנתך התקבלה! 😊</h2>
        <p className="text-xl text-gray-600 mb-8">השליח שלנו בדרך אלייך.</p>
        <button 
          onClick={onBack}
          className="bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
        >
          חזרה לדף הבית
        </button>
      </div>
    );
  }

  // 5. Success New
  if (step === 'SUCCESS_NEW') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-md mx-auto w-full text-center">
        <CheckCircle className="w-24 h-24 text-teal-500 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">תודה רבה!</h2>
        <p className="text-lg text-gray-600 mb-4">
          הזמנתך התקבלה ופרטיך נשמרו בהצלחה במערכת.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-8">
           <p className="text-yellow-800 text-sm">
             בהזמנה הבאה – פשוט לוחצים על <strong>'לקוח קיים'</strong> ומזינים טלפון בלבד 😊
           </p>
        </div>
        <button 
          onClick={onBack}
          className="bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
        >
          חזרה לדף הבית
        </button>
      </div>
    );
  }

  return null;
};
