
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Download, FileText } from 'lucide-react';

interface TextInputCardProps {
  inputText: string;
  setInputText: (text: string) => void;
  onConvert: () => void;
  isProcessing: boolean;
  sampleData: string;
}

const TextInputCard = ({ inputText, setInputText, onConvert, isProcessing, sampleData }: TextInputCardProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right">
          <FileText className="h-5 w-5" />
          הכנס את נתוני הבחינות (טקסט)
        </CardTitle>
        <CardDescription className="text-right">
          העתק והדבק את טבלת הבחינות (כולל כותרות). הטבלה יכולה להכיל עמודות נוספות או חלק מהעמודות הרשומות למעלה.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="exam-data" className="text-right block mb-2">
            נתוני בחינות
          </Label>
          <Textarea
            id="exam-data"
            placeholder="הדבק כאן את טבלת הבחינות..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[300px] font-mono text-sm text-right"
            dir="rtl"
          />
        </div>
        
        <div className="flex gap-3 justify-end">
          <Button
            onClick={() => setInputText(sampleData)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            טען דוגמה
          </Button>
          <Button
            onClick={onConvert}
            disabled={isProcessing}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            {isProcessing ? 'מעבד...' : 'הורד קובץ ICS'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextInputCard;
