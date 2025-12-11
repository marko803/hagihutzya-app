import React from 'react';
import { ArrowRight, Shirt, HelpCircle, AlertCircle } from 'lucide-react';

interface PriceListViewProps {
  onBack: () => void;
}

export const PriceListView: React.FC<PriceListViewProps> = ({ onBack }) => {
  return (
    <div className="flex-1 flex flex-col p-4 max-w-3xl mx-auto w-full">
      <button onClick={onBack} className="flex items-center text-gray-600 mb-6 self-start sticky top-24 bg-gray-50/90 py-2 px-3 rounded-lg z-10">
        <ArrowRight className="w-5 h-5 ml-2" />
        חזרה לדף הבית
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
        <div className="bg-purple-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold">מחירון שירותים</h2>
          <p className="opacity-90 mt-1">איכות ללא פשרות, מחירים הוגנים</p>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Ironing */}
          <div>
            <div className="flex items-center mb-4">
              <Shirt className="w-6 h-6 text-purple-600 ml-2" />
              <h3 className="text-xl font-bold text-gray-800">גיהוץ</h3>
            </div>
            <ul className="space-y-3 pr-8 text-gray-700">
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>חולצות / מכנסיים</span>
                <span className="font-bold">7 ₪ לפריט</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>בגדי נשים ארוכים / שמלות</span>
                <span className="font-bold">10 ₪ לפריט</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>מפות / ציפות</span>
                <span className="font-bold">החל מ-15 ₪</span>
              </li>
            </ul>
          </div>

          {/* Laundry */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 rounded-full border-2 border-purple-600 flex items-center justify-center ml-2">
                 <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800">כביסה</h3>
            </div>
             <ul className="space-y-3 pr-8 text-gray-700">
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>מכונה מלאה (מינימום)</span>
                <span className="font-bold">70 ₪</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>כל ק״ג נוסף</span>
                <span className="font-bold">10 ₪</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>כביסה + גיהוץ (פר פריט)</span>
                <span className="font-bold">17 ₪</span>
              </li>
            </ul>
          </div>

          {/* Extras */}
          <div>
             <div className="flex items-center mb-4">
              <HelpCircle className="w-6 h-6 text-purple-600 ml-2" />
              <h3 className="text-xl font-bold text-gray-800">שירותים נוספים</h3>
            </div>
            <ul className="space-y-3 pr-8 text-gray-700">
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>קיפול צלופן מגוהץ</span>
                <span className="font-bold">12 ₪ לפריט</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>ניקוי יבש</span>
                <span className="font-bold">לפי סוג פריט</span>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Footer Notes */}
        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-gray-600 font-medium">מינימום הזמנה: 70 ₪</p>
          <p className="text-green-600 font-bold mt-1">כולל איסוף והחזרה עד הבית!</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="flex items-start">
           <AlertCircle className="w-6 h-6 text-gray-400 ml-3 flex-shrink-0 mt-1" />
           <div>
             <h3 className="font-bold text-gray-800 mb-2">תקנון ומדיניות</h3>
             <p className="text-gray-600 text-sm leading-relaxed">
               זמן האספקה המשוער הוא עד 48 שעות ממועד האיסוף. 
               הגיהוציה אינה אחראית לנזק כתוצאה מבלאי טבעי של הבגד או הוראות יצרן שגויות.
               במקרה של אובדן או נזק באחריות החברה, הפיצוי לא יעלה על פי 10 מעלות הניקוי של אותו פריט.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};
