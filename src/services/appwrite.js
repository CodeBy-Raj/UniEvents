import {Client, Databases, Query} from 'appwrite';
import {ID} from 'appwrite';
import {DATABASE_ENDPOINT, DATABASE_PROJECT,DATABASE_ID,EVENTS_COLLECTION_ID,REG_COLLECTION_ID} from "@env";
// import { Alert } from 'react-native';
console.log('ENV:', DATABASE_ENDPOINT, DATABASE_PROJECT, DATABASE_ID, EVENTS_COLLECTION_ID, REG_COLLECTION_ID);
const client = new Client();

client
  .setEndpoint(DATABASE_ENDPOINT)
  .setProject(DATABASE_PROJECT);

const databases = new Databases(client);

// Database and collection details
const databaseId = DATABASE_ID; 
const eventsCollectionId = EVENTS_COLLECTION_ID; 
const regCollectionId =REG_COLLECTION_ID;

//function to add registrations to databases ...
export const regEvent = async eventData => {
  try {
    //checking for duplicate entries
    const existing = await databases.listDocuments(
      databaseId,
      regCollectionId,
      [
        Query.equal('email', eventData.email),
        Query.equal('title', eventData.title),
      ],
    );
    if (existing.total > 0) {
      throw new Error('Duplicate_Registration');
    }

    //if not duplicate, add to db
    const response = await databases.createDocument(
      databaseId,
      regCollectionId,
      ID.unique(),
      eventData,
    );
    return response;
  } catch (error) {
    // console.log('Error in registring', error); //debugging
    throw error;
  }
};
//function to add event to database
export const addEvent = async eventData => {
  try {
    const response = await databases.createDocument(
      databaseId,
      eventsCollectionId,

      ID.unique(), // Generates a unique ID
      eventData,
    );
    return response;
  } catch (error) {
    // console.error('Error adding event:', error); //debugging
    throw error;
  }
};

// Function to edit an existing event
export const editEvent = async (eventId, updatedData) => {
  try {
    const response = await databases.updateDocument(
      databaseId,
      eventsCollectionId,
      eventId,
      updatedData,
    );
    return response;
  } catch (error) {
    console.error('Error editing event:', error);
    throw error;
  }
};

// Function to delete an event
export const deleteEvent = async eventId => {
  try {
    const response = await databases.deleteDocument(
      databaseId,
      eventsCollectionId,
      eventId,
    );
    return response;
  } catch (error) {
    // console.error('Error deleting event:', error);
    throw error;
  }
};

// Function to get all events
export const getEvents = async () => {
  try {
    const response = await databases.listDocuments(
      databaseId,
      eventsCollectionId,
    );
    return response.documents;
  } catch (error) {
    // console.error('Error fetching events:', error);
    throw error;
  }
};

// Function to get a specific event by ID
export const getEventById = async eventId => {
  try {
    const response = await databases.getDocument(
      databaseId,
      eventsCollectionId,
      eventId,
    );
    return response;
  } catch (error) {
    // console.error('Error fetching event:', error);
    throw error;
  }
};
