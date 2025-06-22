
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const HelpSection = () => {
  return (
    <Card className="shadow-lg bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right text-blue-800">
          <HelpCircle className="h-5 w-5" />
          איך לחלץ קובץ Excel מהמערכת?
        </CardTitle>
        <CardDescription className="text-right">
          הדרכה להוצאת נתוני הבחינות מאפקנט
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-right">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">שלבים לחילוץ הקובץ:</h4>
            <ol className="list-decimal list-inside space-y-2 text-blue-700">
              <li>היכנס למערכת אפקנט</li>
              <li>עבור לעמוד לוח הזמנים/בחינות</li>
              <li>לחץ על כפתור הייצוא לאקסל (כפי שמוצג בתמונה למטה)</li>
              <li>שמור את הקובץ במחשב שלך</li>
              <li>העלה את הקובץ כאן באתר</li>
            </ol>
          </div>
          
          <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3 text-center">דוגמה למיקום כפתור הייצוא:</h4>
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/9e6fe974-3a65-42ac-b0e5-7439e0f2b684.png" 
                alt="מיקום כפתור ייצוא לאקסל במערכת אפקנט"
                className="max-w-full h-auto rounded-lg shadow-md border"
              />
            </div>
            <p className="text-sm text-blue-600 text-center mt-2">
              חפש את כפתור הייצוא לאקסל בממשק המערכת
            </p>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>שים לב:</strong> ודא שהקובץ המיוצא מכיל את כל העמודות החובה: קוד קורס, שם קורס, תאריך, שעת התחלה, ומשך.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HelpSection;
