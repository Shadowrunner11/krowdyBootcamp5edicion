import Dexie from 'dexie';
import profileSchema from '../models/profile';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  urlsCandidate: '++id, urls',
});

// crear schema en lugar de hard codear

db.version(1).stores({
  profiles: '++id, '+Object.keys(profileSchema.params).join(', ')
});