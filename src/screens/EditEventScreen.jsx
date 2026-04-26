import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import EventForm from '../components/EventForm';
import { getEventById, editEvent } from '../services/appwrite';
import Toast from 'react-native-toast-message';

const EditEventScreen = ({ route, navigation }) => {
  const { event } = route.params; // Get the event object or ID
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    if (!event) {
      Toast.show({
        type: 'info',
        text1: 'Event data missing !!',
      });
      navigation.goBack();
      return;
    }

    const loadEventData = async () => {
      // If event is already an object (passed from AdminPanel), use it directly
      if (typeof event === 'object' && event !== null) {
        setEventData(event);
      } 
      // If event is a string (ID), fetch the data
      else if (typeof event === 'string') {
        try {
          const data = await getEventById(event);
          setEventData(data);
        } catch (error) {
          console.error('Fetch event error:', error);
          Toast.show({
            type: 'error',
            text1: 'Failed to fetch Event data!!',
          });
        }
      }
    };

    loadEventData();
  }, [event]);

  const handleUpdateEvent = async (updatedData) => {
    try {
      const id = eventData?.$id || (typeof event === 'string' ? event : event.$id);
      
      if (!id) {
         throw new Error("Event ID not found");
      }

      await editEvent(id, updatedData); // Update the event with new data
      Toast.show({
        type:'success',
        text1:'✅ Updation Done !!',
        text2:'Event Updated Successfully !!',
        text1Style:{
          fontSize:14,
        },
        text2Style:{
          fontSize:13
        }
        
      })
      // Alert.alert('Success', 'Event updated successfully');
      navigation.goBack(); // Navigate back to the previous screen
    } 
    catch (error) {

      Toast.show({
        type:'error',
        text1:'Failed to Update Event ', 
        text1Style:{
            fontSize:14
        }   
    })
      // Alert.alert('Error', 'Failed to update event');
    }
  };

  if (!eventData) {
    return (
      <View className="flex-1 justify-center items-center bg-primary pb-20">
        <Text className="text-textPrimary text-lg">Loading event data...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-primary pb-20">
      <EventForm
        initialData={eventData}
        onSubmit={handleUpdateEvent}
        submitButtonText="Update Event"
      />
    </View>
  );
};

export default EditEventScreen;