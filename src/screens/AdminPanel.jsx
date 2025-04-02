import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getEvents, deleteEvent } from '../services/appwrite'; // Import functions to interact with Appwrite
import EventCard from '../components/EventCard';


const AdminPanel = ({ route }) => {
  const { club } = route.params; // Get the club name from navigation params
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
      fetchEvents();
  }, []);

  const fetchEvents = async () => {
      try {
          const fetchedEvents = await getEvents(); // Fetch all events
          const clubEvents = fetchedEvents.filter(event => event.clubName === club); // Filter by club
          setEvents(clubEvents);
      } catch (error) {
          console.error("Error fetching events:", error);
      }
  };

  // const [events, setEvents] = useState([]);
  // const navigation = useNavigation();

  // useEffect(() => {
  //   fetchEvents();
  // }, []);

  // const fetchEvents = async () => {
  //   try {
  //     const fetchedEvents = await getEvents(); // Fetch events from Appwrite
  //     setEvents(fetchedEvents);
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //   }
  // };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId); // Delete event from Appwrite
      fetchEvents(); // Refresh the event list
    } catch (error) {
      Alert.alert("Error", "Could not delete the event.");
    }
  };

  const handleAddEvent = () => {
    navigation.navigate('AddEvent'); // Navigate to Add Event screen
  };

  const handleEditEvent = (event) => {
    navigation.navigate('EditEvent', { event }); // Navigate to Edit Event screen with event data
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headLine}> {club}'s Admin Panel</Text>
      <Button title="Add Event" onPress={handleAddEvent} />
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onEdit={() => handleEditEvent(item)}
            onDelete={() => handleDeleteEvent(item.id)}
          />
        )}
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
    padding: 20,
  },
  headLine: {
    fontSize: 22,
    color: '#ffffff',
    marginBottom: 20,
  },
});

export default AdminPanel;