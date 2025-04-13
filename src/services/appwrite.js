import { Client, Databases, Query } from 'appwrite';
import { ID } from 'appwrite';
// import { Alert } from 'react-native';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') //  Appwrite endpoint
    .setProject('67ed7ef30016220d4d3c'); // project ID

const databases = new Databases(client);

// Database and collection details
const databaseId = '67ed81c5001ae04ea89c'; // Replace with your database ID
const eventsCollectionId = '67ed81e2002747f6fe6a'; // Replace with your events collection ID
const regCollectionId = '67fc0c2200043020d710'; //registration collection id of appwrite

//function to add registrations to databases ...
export const regEvent = async (eventData) => {
    try{
        //checking for duplicate entries 
        const existing = await databases.listDocuments(
            databaseId,
            regCollectionId,
            [Query.equal('email', eventData.email), 
                Query.equal('title', eventData.title)
            ]
        );
        if(existing.total > 0){
           throw new Error("Duplicate_Registration");
        };

        //if not duplicate, add to db
        const response = await databases.createDocument(
            databaseId,
            regCollectionId,
            ID.unique(),
            eventData
        );
        return response;
    } catch(error){
        console.log('Error in registring', error); //debugging
        throw error;
        
    }
};
//function to add event to database
export const addEvent = async (eventData) => {
    try {
        const response = await databases.createDocument(
            databaseId,
            eventsCollectionId,
            
            ID.unique(), // Generates a unique ID
            eventData
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