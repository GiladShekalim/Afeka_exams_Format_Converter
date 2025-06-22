
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

const ColumnRequirementsCard = () => {
  const requiredColumns = ['קוד קורס', 'שם קורס', 'תאריך', 'שעת התחלה', 'משך'];
  const optionalColumns = [
    'מועד', 'שם המרצה', 'מחלקה', 'סוג מקצוע', 'חדר הבחינה', 
    'מספר נבחן', 'תאריך אחרון לפתיחת מחברות', 'תאריך אחרון להגשת ערעור', 'סטטוס רישום'
  ];

  return (
    <Card className="shadow-lg bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right text-amber-800">
          <Info className="h-5 w-5" />
          דרישות עמודות
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 text-right">
          <div>
            <h4 className="font-semibold text-amber-800 mb-2">עמודות חובה (חייבות להיות כלולות):</h4>
            <div className="flex flex-wrap gap-2 justify-end">
              {requiredColumns.map((col) => (
                <span key={col} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  {col}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-amber-700 mb-2">עמודות אופציונליות (ניתן לכלול או להשמיט):</h4>
            <div className="flex flex-wrap gap-2 justify-end">
              {optionalColumns.map((col) => (
                <span key={col} className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm border border-amber-200">
                  {col}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-amber-100 p-3 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>הערה:</strong> הטבלה יכולה לכלול עמודות נוספות או חלק מהעמודות הרשומות כאן, אך העמודות החובה חייבות להיות כלולות ליצירת אירועי יומן תקינים.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColumnRequirementsCard;
