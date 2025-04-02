import { Client, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://YOUR_APPWRITE_ENDPOINT') // Your Appwrite endpoint
    .setProject('YOUR_PROJECT_ID'); // Your project ID

const databases = new Databases(client);

// Database and collection details
const databaseId = 'YOUR_DATABASE_ID'; // Replace with your database ID
const eventsCollectionId = 'YOUR_EVENTS_COLLECTION_ID'; // Replace with your events collection ID

// Function to add a new event
export const addEvent = async (eventData) => {
    try {
        const response = await databases.createDocument(databaseId, eventsCollectionId, eventData.id, eventData);
        return response;
    } catch (error) {
        console.error('Error adding event:', error);
        throw error;
    }
};

// Function to edit an existing event
export const editEvent = async (eventId, updatedData) => {
    try {
        const response = await databases.updateDocument(databaseId, eventsCollectionId, eventId, updatedData);
        return response;
    } catch (error) {
        console.error('Error editing event:', error);
        throw error;
    }
};

// Function to delete an event
export const deleteEvent = async (eventId) => {
    try {
        const response = await databases.deleteDocument(databaseId, eventsCollectionId, eventId);
        return response;
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
};

// Function to get all events
export const getEvents = async () => {
    try {
        const response = await databases.listDocuments(databaseId, eventsCollectionId);
        return response.documents;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

// Function to get a specific event by ID
export const getEventById = async (eventId) => {
    try {
        const response = await databases.getDocument(databaseId, eventsCollectionId, eventId);
        return response;
    } catch (error) {
        console.error('Error fetching event:', error);
        throw error;
    }
};