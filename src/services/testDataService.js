// Test file for data service
import { ClassService, MeetingService, AttendanceService, GradeService, FileService, initializeData } from './dataService';

// Test the data service
async function testDataService() {
  console.log('Testing data service...');
  
  try {
    // Initialize the database
    await initializeData();
    console.log('Database initialized');
    
    // Test creating a class
    const newClass = await ClassService.createLocal({
      code: 'TEST101',
      name: 'Test Class',
      instructor: 'Test Instructor',
      students: 0
    });
    console.log('Created class:', newClass);
    
    // Test reading all classes
    const classes = await ClassService.readAllLocal();
    console.log('All classes:', classes);
    
    // Test creating a meeting
    const newMeeting = await MeetingService.createLocal({
      title: 'Test Meeting',
      classId: newClass.id,
      className: newClass.name,
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      status: 'Scheduled'
    });
    console.log('Created meeting:', newMeeting);
    
    // Test reading all meetings
    const meetings = await MeetingService.readAllLocal();
    console.log('All meetings:', meetings);
    
    console.log('Data service test completed successfully!');
  } catch (error) {
    console.error('Data service test failed:', error);
  }
}

// Run the test
testDataService();