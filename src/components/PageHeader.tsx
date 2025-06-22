
import React from 'react';
import { Calendar } from 'lucide-react';

const PageHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center items-center gap-3 mb-4">
        <Calendar className="h-10 w-10 text-blue-600" />
        <h1 className="text-4xl font-bold text-gray-900">Format Converter: Afekanet Exams to Google Calendar</h1>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">איך זה עובד?</h2>
        <div className="grid md:grid-cols-3 gap-4 text-right">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-3 rounded-full mb-3">
              <div className="h-6 w-6 text-green-600">📄</div>
            </div>
            <h3 className="font-semibold mb-2">1. העלה נתונים</h3>
            <p className="text-sm text-gray-600">העלה קובץ Excel או העתק טבלה</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-3">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">2. המר ליומן</h3>
            <p className="text-sm text-gray-600">הורד קובץ ICS תואם גוגל קלנדר</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-purple-100 p-3 rounded-full mb-3">
              <div className="h-6 w-6 text-purple-600">⬇️</div>
            </div>
            <h3 className="font-semibold mb-2">3. יבא ליומן</h3>
            <p className="text-sm text-gray-600">פתח ביומן גוגל ויבא את הקובץ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
