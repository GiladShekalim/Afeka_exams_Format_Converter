import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Download, Calendar, FileText, Info, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { parseExamTable, generateICSFile, parseExcelData } from '@/utils/calendarUtils';
import * as XLSX from 'xlsx';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvert = async () => {
    if (!inputText.trim()) {
      toast.error('אנא הכנס את נתוני הבחינות');
      return;
    }

    setIsProcessing(true);
    console.log('Converting text to calendar events...');

    try {
      // Parse the table data
      const events = parseExamTable(inputText);
      console.log('Parsed events:', events);

      if (events.length === 0) {
        toast.error('לא נמצאו בחינות תקינות בטקסט');
        return;
      }

      // Generate ICS file
      const icsContent = generateICSFile(events);
      
      // Create and download the file
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'exams-schedule.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`נוצרו ${events.length} אירועי בחינות ביומן`);
    } catch (error) {
      console.error('Error processing calendar data:', error);
      toast.error(`שגיאה בעיבוד הנתונים: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast.error('אנא בחר קובץ Excel (.xlsx או .xls)');
      return;
    }

    setIsProcessing(true);
    console.log('Processing Excel file...');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      // Parse the Excel data
      const events = parseExcelData(data);
      console.log('Parsed events from Excel:', events);

      if (events.length === 0) {
        toast.error('לא נמצאו בחינות תקינות בקובץ');
        return;
      }

      // Generate ICS file
      const icsContent = generateICSFile(events);
      
      // Create and download the file
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'exams-schedule.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`נוצרו ${events.length} אירועי בחינות ביומן מקובץ Excel`);
    } catch (error) {
      console.error('Error processing Excel file:', error);
      toast.error(`שגיאה בעיבוד קובץ Excel: ${error.message}`);
    } finally {
      setIsProcessing(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const sampleData = `מועד	קוד קורס	שם קורס	שם המרצה	מחלקה	סוג מקצוע	תאריך	שעת התחלה	משך	חדר הבחינה
1	10145	ארגון המחשב ושפת סף	ד"ר בוסני רם	תוכנה	בוחן אמצע-צ.ביניים	12/05/2025	09:00	01:10	טרם נקבע
1	10013	תקשורת מחשבים לתוכנה	ד"ר אנדלמן ניר	תוכנה	בחינה	30/06/2025	13:00	02:00	בניין הפיקוס`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
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
                  <FileText className="h-6 w-6 text-green-600" />
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
                  <Download className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">3. יבא ליומן</h3>
                <p className="text-sm text-gray-600">פתח ביומן גוגל ויבא את הקובץ</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Column Requirements Card */}
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
                    {['קוד קורס', 'שם קורס', 'תאריך', 'שעת התחלה', 'משך'].map((col) => (
                      <span key={col} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-amber-700 mb-2">עמודות אופציונליות (ניתן לכלול או להשמיט):</h4>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {['מועד', 'שם המרצה', 'מחלקה', 'סוג מקצוע', 'חדר הבחינה', 'מספר נבחן', 'תאריך אחרון לפתיחת מחברות', 'תאריך אחרון להגשת ערעור', 'סטטוס רישום'].map((col) => (
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

          {/* Excel Upload Card */}
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
                  onChange={handleFileUpload}
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
                  onClick={handleConvert}
                  disabled={isProcessing}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="h-4 w-4" />
                  {isProcessing ? 'מעבד...' : 'הורד קובץ ICS'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
