
import { useState } from 'react';
import { toast } from 'sonner';
import { parseExamTable, generateICSFile, parseExcelData } from '@/utils/calendarUtils';
import * as XLSX from 'xlsx';

export const useExamConverter = () => {
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
      const events = parseExamTable(inputText);
      console.log('Parsed events:', events);

      if (events.length === 0) {
        toast.error('לא נמצאו בחינות תקינות בטקסט');
        return;
      }

      const icsContent = generateICSFile(events);
      
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

      const events = parseExcelData(data);
      console.log('Parsed events from Excel:', events);

      if (events.length === 0) {
        toast.error('לא נמצאו בחינות תקינות בקובץ');
        return;
      }

      const icsContent = generateICSFile(events);
      
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
      event.target.value = '';
    }
  };

  return {
    inputText,
    setInputText,
    isProcessing,
    handleConvert,
    handleFileUpload
  };
};
