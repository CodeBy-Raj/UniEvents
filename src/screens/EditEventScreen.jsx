import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import EventForm from '../components/EventForm';
import { getEventById, editEvent } from '../services/appwrite';

const EditEventScreen = ({ route, navigation }) => {
  const { event:eventId } = route.params ; // Get the event ID from the route parameters
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    // console.log('Route params :', route.params);
    
    if (!eventId) {
      Toast.show({
        type:'info',
        text1:'EventId missing !!', 
        text1Style:{
            fontSize:14
        }   
    })
        // Alert.alert('Error', 'Event ID is missing');
        navigation.goBack(); // Navigate back if eventId is not provided
        return;
    }

    const fetchEventData = async () => {
        try {
            const data = await getEventById(eventId); // Fetch event data by ID
            // console.log('fetched event data:', data);
            
            setEventData(data);
        } catch (error) {
          // console.log('fetche event error', error);
          Toast.show({
            type:'error',
            text1:'Failed to fetch Event data!!', 
            text1Style:{
                fontSize:14
            }   
        })
            // Alert.alert('Error', 'Failed to fetch event data');
        }
    };

    fetchEventData();
}, [eventId]);

  const handleUpdateEvent = async (updatedData) => {
    try {
      // console.log('updating event with data: ', updatedData);
      
      await editEvent(eventId, updatedData); // Update the event with new data
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
    } catch (error) {
      // console.log('update event errro', error);
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
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading event data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <EventForm
        initialData={eventData}
        onSubmit={handleUpdateEvent}
        submitButtonText="Update Event"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#060318',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default EditEventScreen;