import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EventForm from '../components/EventForm';
import { getEventById, editEvent } from '../services/appwrite';
import Toast from 'react-native-toast-message';

const EditEventScreen = ({ route, navigation }) => {
  const { event: eventId } = route.params; // Get the event ID from the route parameters
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    if (!eventId) {
      Toast.show({
        type: 'info',
        text1: 'EventId missing !!',
        text1Style: {
          fontSize: 14,
        },
      });
      navigation.goBack();
      return;
    }

    const fetchEventData = async () => {
      try {
        const data = await getEventById(eventId); // Fetch event data by ID
        setEventData(data);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Failed to fetch Event data!!',
          text1Style: {
            fontSize: 14,
          },
        });
      }
    };

    fetchEventData();
  }, [eventId, navigation]);

  const handleUpdateEvent = useCallback(async (updatedData) => {
    try {
      await editEvent(eventId, updatedData); // Update the event with new data
      Toast.show({
        type: 'success',
        text1: '✅ Updation Done !!',
        text2: 'Event Updated Successfully !!',
        text1Style: {
          fontSize: 14,
        },
        text2Style: {
          fontSize: 13,
        },
      });
      navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to Update Event ',
        text1Style: {
          fontSize: 14,
        },
      });
    }
  }, [eventId, navigation]);

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
    paddingBottom: 80,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default EditEventScreen;