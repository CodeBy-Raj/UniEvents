import { addEvent } from './src/services/appwrite';

const testEvent = {
    id: 'event1',
    title: 'Sample Event',
    description: 'This is a test event.',
    date: '2025-04-10T10:00:00.000Z',
    location: 'Online',
};

addEvent(testEvent)
    .then((response) => console.log('Event added:', response))
    .catch((error) => console.error('Error:', error));