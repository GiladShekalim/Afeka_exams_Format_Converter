
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Eye } from 'lucide-react';

const ResultsPreviewCard = () => {
  return (
    <Card className="shadow-lg bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right text-purple-800">
          <Eye className="h-5 w-5" />
          תצוגה מקדימה של התוצאה
        </CardTitle>
        <CardDescription className="text-right">
          כך ייראו אירועי הבחינות ביומן גוגל שלך
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-3 text-center">דוגמה לאירוע ביומן:</h4>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/4a022032-e95b-4b72-a584-d1a83c2e89d6.png" 
              alt="דוגמה לאירוע בחינה ביומן גוגל"
              className="max-w-full h-auto rounded-lg shadow-md border"
            />
          </div>
          <div className="mt-4 bg-purple-50 p-3 rounded-lg">
            <p className="text-sm text-purple-800 text-right">
              <strong>מה תראה ביומן:</strong> שם הקורס, תאריך ושעה, פרטי המרצה, מיקום הבחינה ועוד פרטים רלוונטיים.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsPreviewCard;
