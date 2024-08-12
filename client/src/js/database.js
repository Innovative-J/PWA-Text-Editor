import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// method that accepts some content and adds it to the database
export const putDb = async (content) =>{
  console.log('PUT to the database');
  try {
    const db = await initdb(); 
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log('Data saved to the database', result.value);
  } catch (error) {
    console.error('Failed to add/update content:', error);
  }
};

// method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  try {
    const db = await initdb(); 
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1);
    const result = await request;
    if (result) {
      console.log('Data retrieved from the database', result.value);
      return result.value;
    } else {
      console.log('Data not found in the database');
      return null;
    }
  } catch (error) {
    console.error('Failed to get content:', error);
    throw error; 
  }
};

initdb();
