// IndexedDB utility for local persistence
const DB_NAME = 'COM_PSU_RIZAL';
const DB_VERSION = 1;
const STORES = {
  CLASSES: 'classes',
  MEETINGS: 'meetings',
  ATTENDANCE: 'attendance',
  GRADES: 'grades',
  FILES: 'files',
  USERS: 'users'
};

let dbInstance = null;

// Open database connection
export function openDB() {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create object stores
      if (!db.objectStoreNames.contains(STORES.CLASSES)) {
        const classStore = db.createObjectStore(STORES.CLASSES, { keyPath: 'id', autoIncrement: true });
        classStore.createIndex('code', 'code', { unique: true });
        classStore.createIndex('name', 'name', { unique: false });
      }

      if (!db.objectStoreNames.contains(STORES.MEETINGS)) {
        const meetingStore = db.createObjectStore(STORES.MEETINGS, { keyPath: 'id', autoIncrement: true });
        meetingStore.createIndex('classId', 'classId', { unique: false });
        meetingStore.createIndex('status', 'status', { unique: false });
        meetingStore.createIndex('date', 'date', { unique: false });
      }

      if (!db.objectStoreNames.contains(STORES.ATTENDANCE)) {
        const attendanceStore = db.createObjectStore(STORES.ATTENDANCE, { keyPath: 'id', autoIncrement: true });
        attendanceStore.createIndex('studentId', 'studentId', { unique: false });
        attendanceStore.createIndex('classId', 'classId', { unique: false });
        attendanceStore.createIndex('date', 'date', { unique: false });
      }

      if (!db.objectStoreNames.contains(STORES.GRADES)) {
        const gradeStore = db.createObjectStore(STORES.GRADES, { keyPath: 'id', autoIncrement: true });
        gradeStore.createIndex('studentId', 'studentId', { unique: false });
        gradeStore.createIndex('classId', 'classId', { unique: false });
        gradeStore.createIndex('itemId', 'itemId', { unique: false });
      }

      if (!db.objectStoreNames.contains(STORES.FILES)) {
        const fileStore = db.createObjectStore(STORES.FILES, { keyPath: 'id', autoIncrement: true });
        fileStore.createIndex('name', 'name', { unique: false });
        fileStore.createIndex('type', 'type', { unique: false });
        fileStore.createIndex('classId', 'classId', { unique: false });
      }

      if (!db.objectStoreNames.contains(STORES.USERS)) {
        const userStore = db.createObjectStore(STORES.USERS, { keyPath: 'id', autoIncrement: true });
        userStore.createIndex('email', 'email', { unique: true });
        userStore.createIndex('role', 'role', { unique: false });
      }
    };
  });
}

// Generic CRUD operations
export async function create(storeName, data) {
  const db = await openDB();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  
  // Add timestamps
  const item = {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const request = store.add(item);
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve({ ...item, id: request.result });
    request.onerror = () => reject(request.error);
  });
}

export async function read(storeName, id) {
  const db = await openDB();
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);
  const request = store.get(id);
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function readAll(storeName) {
  const db = await openDB();
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);
  const request = store.getAll();
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function readByIndex(storeName, indexName, value) {
  const db = await openDB();
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);
  const index = store.index(indexName);
  const request = index.getAll(value);
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function update(storeName, id, data) {
  const db = await openDB();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  
  // Get existing item
  const getRequest = store.get(id);
  
  return new Promise((resolve, reject) => {
    getRequest.onsuccess = () => {
      const existing = getRequest.result;
      if (!existing) {
        reject(new Error(`Item with id ${id} not found`));
        return;
      }
      
      // Merge with updated data and timestamp
      const updated = {
        ...existing,
        ...data,
        id: existing.id, // Ensure ID is preserved
        updatedAt: new Date().toISOString()
      };
      
      const putRequest = store.put(updated);
      putRequest.onsuccess = () => resolve(updated);
      putRequest.onerror = () => reject(putRequest.error);
    };
    
    getRequest.onerror = () => reject(getRequest.error);
  });
}

export async function remove(storeName, id) {
  const db = await openDB();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  const request = store.delete(id);
  
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Initialize with mock data if empty
export async function initializeMockData() {
  const classes = await readAll(STORES.CLASSES);
  if (classes.length === 0) {
    // Add mock classes
    await create(STORES.CLASSES, {
      code: 'CIS101',
      name: 'Introduction to Computing',
      instructor: 'Prof. Reyes',
      students: 32
    });
    
    await create(STORES.CLASSES, {
      code: 'MTH201',
      name: 'Calculus II',
      instructor: 'Dr. Santos',
      students: 28
    });
  }
  
  const meetings = await readAll(STORES.MEETINGS);
  if (meetings.length === 0) {
    // Add mock meetings
    await create(STORES.MEETINGS, {
      title: 'CIS101 Week 5',
      classId: 1,
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      status: 'Scheduled'
    });
    
    await create(STORES.MEETINGS, {
      title: 'MTH201 Review',
      classId: 2,
      date: new Date().toISOString().split('T')[0],
      time: '13:30',
      status: 'Live'
    });
  }
  
  const attendance = await readAll(STORES.ATTENDANCE);
  if (attendance.length === 0) {
    // Add mock attendance records
    await create(STORES.ATTENDANCE, {
      studentId: 1,
      studentName: 'Ana D.',
      classId: 1,
      className: 'CIS101',
      date: new Date().toISOString().split('T')[0],
      status: 'Present'
    });
    
    await create(STORES.ATTENDANCE, {
      studentId: 2,
      studentName: 'Mark S.',
      classId: 1,
      className: 'CIS101',
      date: new Date().toISOString().split('T')[0],
      status: 'Late'
    });
    
    await create(STORES.ATTENDANCE, {
      studentId: 3,
      studentName: 'Lia P.',
      classId: 2,
      className: 'MTH201',
      date: new Date().toISOString().split('T')[0],
      status: 'Absent'
    });
  }
  
  const grades = await readAll(STORES.GRADES);
  if (grades.length === 0) {
    // Add mock grades
    await create(STORES.GRADES, {
      studentId: 1,
      studentName: 'Ana D.',
      classId: 1,
      className: 'CIS101',
      itemId: 'Quiz 1',
      score: 18,
      total: 20
    });
    
    await create(STORES.GRADES, {
      studentId: 2,
      studentName: 'Mark S.',
      classId: 2,
      className: 'MTH201',
      itemId: 'Exam 1',
      score: 76,
      total: 100
    });
  }
  
  const files = await readAll(STORES.FILES);
  if (files.length === 0) {
    // Add mock files
    await create(STORES.FILES, {
      name: 'Syllabus.pdf',
      size: '120 KB',
      type: 'pdf',
      classId: 1
    });
    
    await create(STORES.FILES, {
      name: 'Week1-Notes.docx',
      size: '48 KB',
      type: 'doc',
      classId: 1
    });
    
    await create(STORES.FILES, {
      name: 'Assignment1.zip',
      size: '3.2 MB',
      type: 'zip',
      classId: 2
    });
  }
}