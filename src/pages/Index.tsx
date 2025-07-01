
import React from 'react';
import PageHeader from '@/components/PageHeader';
import ColumnRequirementsCard from '@/components/ColumnRequirementsCard';
import ExcelUploadCard from '@/components/ExcelUploadCard';
import TextInputCard from '@/components/TextInputCard';
import ResultsPreviewCard from '@/components/ResultsPreviewCard';
import HelpSection from '@/components/HelpSection';
import CreatorSignature from '@/components/CreatorSignature';
import { useExamConverter } from '@/hooks/useExamConverter';

const Index = () => {
  const { inputText, setInputText, isProcessing, handleConvert, handleFileUpload } = useExamConverter();

  const sampleData = `מועד	קוד קורס	שם קורס	שם המרצה	מחלקה	סוג מקצוע	תאריך	שעת התחלה	משך	חדר הבחינה
1	10145	ארגון המחשב ושפת סף	ד"ר בוסני רם	תוכנה	בוחן אמצע-צ.ביניים	12/05/2025	09:00	01:10	טרם נקבע
1	10013	תקשורת מחשבים לתוכנה	ד"ר אנדלמן ניר	תוכנה	בחינה	30/06/2025	13:00	02:00	בניין הפיקוס`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <PageHeader />

        <div className="grid gap-6">
          <ColumnRequirementsCard />
          <ExcelUploadCard onFileUpload={handleFileUpload} isProcessing={isProcessing} />
          <TextInputCard 
            inputText={inputText}
            setInputText={setInputText}
            onConvert={handleConvert}
            isProcessing={isProcessing}
            sampleData={sampleData}
          />
          <ResultsPreviewCard />
        </div>

        <HelpSection />
        <CreatorSignature />
      </div>
    </div>
  );
};

export default Index;
