
export interface ExamEvent {
  courseCode: string;
  courseName: string;
  lecturer: string;
  department: string;
  examType: string;
  date: string;
  startTime: string;
  duration: string;
  location: string;
  session: string;
  examNumber?: string;
  lastOpenDate?: string;
  lastAppealDate?: string;
  registrationStatus?: string;
}

// Define the column mapping for flexible parsing
const COLUMN_MAPPINGS = {
  'מועד': 'session',
  'קוד קורס': 'courseCode',
  'שם קורס': 'courseName',
  'שם המרצה': 'lecturer',
  'מחלקה': 'department',
  'סוג מקצוע': 'examType',
  'תאריך': 'date',
  'שעת התחלה': 'startTime',
  'משך': 'duration',
  'חדר הבחינה': 'location',
  'מספר נבחן': 'examNumber',
  'תאריך אחרון לפתיחת מחברות': 'lastOpenDate',
  'תאריך אחרון להגשת ערעור': 'lastAppealDate',
  'סטטוס רישום': 'registrationStatus'
};

// Updated required columns for calendar event creation
const REQUIRED_COLUMNS = ['קוד קורס', 'שם קורס', 'תאריך', 'שעת התחלה', 'משך'];

export const parseExamTable = (text: string): ExamEvent[] => {
  const lines = text.trim().split('\n');
  const events: ExamEvent[] = [];
  
  if (lines.length < 2) {
    throw new Error('הטבלה חייבת לכלול לפחות שורת כותרת ושורת נתונים אחת');
  }

  // Parse header to identify column positions
  const headerLine = lines[0].trim();
  const headers = headerLine.split(/\t+|\s{2,}/);
  
  // Create column mapping
  const columnIndexMap: { [key: string]: number } = {};
  headers.forEach((header, index) => {
    const trimmedHeader = header.trim();
    if (COLUMN_MAPPINGS[trimmedHeader]) {
      columnIndexMap[COLUMN_MAPPINGS[trimmedHeader]] = index;
    }
  });

  // Check if required columns are present
  const missingColumns = REQUIRED_COLUMNS.filter(col => 
    !Object.keys(columnIndexMap).includes(COLUMN_MAPPINGS[col])
  );
  
  if (missingColumns.length > 0) {
    throw new Error(`עמודות חובה חסרות: ${missingColumns.join(', ')}`);
  }
  
  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const columns = line.split(/\t+|\s{2,}/);
    
    // Create event object with available data
    const event: ExamEvent = {
      session: columns[columnIndexMap.session]?.trim() || '',
      courseCode: columns[columnIndexMap.courseCode]?.trim() || '',
      courseName: columns[columnIndexMap.courseName]?.trim() || '',
      lecturer: columns[columnIndexMap.lecturer]?.trim() || '',
      department: columns[columnIndexMap.department]?.trim() || '',
      examType: columns[columnIndexMap.examType]?.trim() || '',
      date: columns[columnIndexMap.date]?.trim() || '',
      startTime: columns[columnIndexMap.startTime]?.trim() || '',
      duration: columns[columnIndexMap.duration]?.trim() || '',
      location: columns[columnIndexMap.location]?.trim() || 'טרם נקבע'
    };

    // Add optional fields if they exist
    if (columnIndexMap.examNumber !== undefined) {
      event.examNumber = columns[columnIndexMap.examNumber]?.trim() || '';
    }
    if (columnIndexMap.lastOpenDate !== undefined) {
      event.lastOpenDate = columns[columnIndexMap.lastOpenDate]?.trim() || '';
    }
    if (columnIndexMap.lastAppealDate !== undefined) {
      event.lastAppealDate = columns[columnIndexMap.lastAppealDate]?.trim() || '';
    }
    if (columnIndexMap.registrationStatus !== undefined) {
      event.registrationStatus = columns[columnIndexMap.registrationStatus]?.trim() || '';
    }
    
    // Validate required fields only
    if (event.courseName && event.date && event.startTime && event.courseCode && event.duration) {
      events.push(event);
    }
  }
  
  return events;
};

export const parseExcelData = (data: any[][]): ExamEvent[] => {
  if (data.length < 2) {
    throw new Error('הקובץ חייב לכלול לפחות שורת כותרת ושורת נתונים אחת');
  }

  const headers = data[0];
  const events: ExamEvent[] = [];

  // Create column mapping
  const columnIndexMap: { [key: string]: number } = {};
  headers.forEach((header: string, index: number) => {
    const trimmedHeader = header?.toString().trim();
    if (COLUMN_MAPPINGS[trimmedHeader]) {
      columnIndexMap[COLUMN_MAPPINGS[trimmedHeader]] = index;
    }
  });

  // Check if required columns are present
  const missingColumns = REQUIRED_COLUMNS.filter(col => 
    !Object.keys(columnIndexMap).includes(COLUMN_MAPPINGS[col])
  );
  
  if (missingColumns.length > 0) {
    throw new Error(`עמודות חובה חסרות: ${missingColumns.join(', ')}`);
  }

  // Parse data rows
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row || row.length === 0) continue;

    // Create event object with available data
    const event: ExamEvent = {
      session: row[columnIndexMap.session]?.toString().trim() || '',
      courseCode: row[columnIndexMap.courseCode]?.toString().trim() || '',
      courseName: row[columnIndexMap.courseName]?.toString().trim() || '',
      lecturer: row[columnIndexMap.lecturer]?.toString().trim() || '',
      department: row[columnIndexMap.department]?.toString().trim() || '',
      examType: row[columnIndexMap.examType]?.toString().trim() || '',
      date: row[columnIndexMap.date]?.toString().trim() || '',
      startTime: row[columnIndexMap.startTime]?.toString().trim() || '',
      duration: row[columnIndexMap.duration]?.toString().trim() || '',
      location: row[columnIndexMap.location]?.toString().trim() || 'טרם נקבע'
    };

    // Add optional fields if they exist
    if (columnIndexMap.examNumber !== undefined) {
      event.examNumber = row[columnIndexMap.examNumber]?.toString().trim() || '';
    }
    if (columnIndexMap.lastOpenDate !== undefined) {
      event.lastOpenDate = row[columnIndexMap.lastOpenDate]?.toString().trim() || '';
    }
    if (columnIndexMap.lastAppealDate !== undefined) {
      event.lastAppealDate = row[columnIndexMap.lastAppealDate]?.toString().trim() || '';
    }
    if (columnIndexMap.registrationStatus !== undefined) {
      event.registrationStatus = row[columnIndexMap.registrationStatus]?.toString().trim() || '';
    }

    // Validate required fields only
    if (event.courseName && event.date && event.startTime && event.courseCode && event.duration) {
      events.push(event);
    }
  }

  return events;
};

export const generateICSFile = (events: ExamEvent[]): string => {
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Text to Calendar//Hebrew Exam Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];

  events.forEach((event, index) => {
    const eventId = `exam-${Date.now()}-${index}`;
    const startDateTime = parseDateTime(event.date, event.startTime);
    const endDateTime = calculateEndTime(startDateTime, event.duration);
    
    const title = `${event.examType}: ${event.courseName}`;
    const descriptionLines = [
      `קוד קורס: ${event.courseCode}`,
      `מרצה: ${event.lecturer}`,
      `מחלקה: ${event.department}`,
      `סוג: ${event.examType}`,
      `מועד: ${event.session}`,
      `משך: ${event.duration}`
    ];

    // Add optional fields to description if they exist
    if (event.examNumber) {
      descriptionLines.push(`מספר נבחן: ${event.examNumber}`);
    }
    if (event.registrationStatus) {
      descriptionLines.push(`סטטוס רישום: ${event.registrationStatus}`);
    }
    if (event.lastOpenDate) {
      descriptionLines.push(`תאריך אחרון לפתיחת מחברות: ${event.lastOpenDate}`);
    }
    if (event.lastAppealDate) {
      descriptionLines.push(`תאריך אחרון להגשת ערעור: ${event.lastAppealDate}`);
    }

    const description = descriptionLines.filter(line => line.split(': ')[1].trim()).join('\\n');
    
    const location = event.location !== 'טרם נקבע' ? event.location : '';
    
    icsLines.push(
      'BEGIN:VEVENT',
      `UID:${eventId}@exam-scheduler`,
      `DTSTART:${formatDateTimeForICS(startDateTime)}`,
      `DTEND:${formatDateTimeForICS(endDateTime)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      location ? `LOCATION:${location}` : '',
      `CREATED:${formatDateTimeForICS(new Date())}`,
      `LAST-MODIFIED:${formatDateTimeForICS(new Date())}`,
      'STATUS:CONFIRMED',
      'END:VEVENT'
    );
  });

  icsLines.push('END:VCALENDAR');
  
  return icsLines.filter(line => line).join('\r\n');
};

const parseDateTime = (dateStr: string, timeStr: string): Date => {
  // Parse DD/MM/YYYY format
  const [day, month, year] = dateStr.split('/').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  return new Date(year, month - 1, day, hours, minutes);
};

const calculateEndTime = (startTime: Date, duration: string): Date => {
  const [hours, minutes] = duration.split(':').map(Number);
  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + hours);
  endTime.setMinutes(endTime.getMinutes() + minutes);
  return endTime;
};

const formatDateTimeForICS = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
};
