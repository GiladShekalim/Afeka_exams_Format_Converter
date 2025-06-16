
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
}

export const parseExamTable = (text: string): ExamEvent[] => {
  const lines = text.trim().split('\n');
  const events: ExamEvent[] = [];
  
  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Split by tab or multiple spaces
    const columns = line.split(/\t+|\s{2,}/);
    
    if (columns.length >= 10) {
      const event: ExamEvent = {
        session: columns[0]?.trim() || '',
        courseCode: columns[1]?.trim() || '',
        courseName: columns[2]?.trim() || '',
        lecturer: columns[3]?.trim() || '',
        department: columns[4]?.trim() || '',
        examType: columns[5]?.trim() || '',
        date: columns[6]?.trim() || '',
        startTime: columns[7]?.trim() || '',
        duration: columns[8]?.trim() || '',
        location: columns[9]?.trim() || 'טרם נקבע'
      };
      
      // Validate required fields
      if (event.courseName && event.date && event.startTime) {
        events.push(event);
      }
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
    const description = [
      `קוד קורס: ${event.courseCode}`,
      `מרצה: ${event.lecturer}`,
      `מחלקה: ${event.department}`,
      `סוג: ${event.examType}`,
      `מועד: ${event.session}`,
      `משך: ${event.duration}`
    ].filter(line => line.split(': ')[1].trim()).join('\\n');
    
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
