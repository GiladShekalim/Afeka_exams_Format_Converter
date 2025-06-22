
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

interface ExcelUploadCardProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isProcessing: boolean;
}

const ExcelUploadCard = ({ onFileUpload, isProcessing }: ExcelUploadCardProps) => {
  return (
    <Card className="shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right text-green-800">
          <Upload className="h-5 w-5" />
          העלאת קובץ Excel
        </CardTitle>
        <CardDescription className="text-right">
          העלה קובץ Excel (.xlsx או .xls) המכיל את נתוני הבחינות
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="excel-upload" className="text-right block mb-2">
            בחר קובץ Excel
          </Label>
          <Input
            id="excel-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={onFileUpload}
            disabled={isProcessing}
            className="text-right"
            dir="rtl"
          />
        </div>
        <div className="bg-green-100 p-3 rounded-lg">
          <p className="text-sm text-green-800 text-right">
            <strong>טיפ:</strong> ודא שהקובץ מכיל את העמודות החובה ושהשורה השנייה מכילה את כותרות העמודות.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExcelUploadCard;
