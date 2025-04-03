import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getEvents, deleteEvent } from '../services/appwrite'; // Import functions to interact with Appwrite
import EventCard from '../components/EventCard';
import { SafeAreaView } from 'react-native-safe-area-context';


const AdminPanel = ({ route }) => {
  const { club } = route.params; // Get the club name from navigation params
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
      fetchEvents();
  }, []);

  //fetching events of specified club only, from database -- using filter() 

  const fetchEvents = async () => {

    setRefreshing(true)

      try {
          const fetchedEvents = await getEvents(); // Fetch all events
          
          const clubEvents = fetchedEvents.filter(event => event.clubName === club); // Filter by club
          setEvents(clubEvents);

      } catch (error) {
          console.error("Error fetching events:", error);
      } finally {
        setRefreshing(false)
      }
  };

  //refresh loading function
  const handleRefreshAdmin = async () => {
    
   await fetchEvents()
   
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId); // Delete event from Appwrite
      fetchEvents(); // Refresh the event list
    } catch (error) {
      Alert.alert("Error", "Could not delete the event.");
    }
  };

  const handleAddEvent = () => {
    navigation.navigate('AddEvent' , {club}); // Navigate to Add Event screen
  };

  const handleEditEvent = (event) => {
    navigation.navigate('EditEvent', { event }); // Navigate to Edit Event screen with event data
  };

  return (
<SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>

      <View style={styles.headLineContainer}>
    <View style={styles.headLineDesign}>

      <Text style={styles.headLine}> {club}'s Admin Panel</Text>
      </View>
    </View>
      

      <Button  title="Add Event" onPress={handleAddEvent} />
      
      <View style={styles.cards}>

      <FlatList
        data={events}
        keyExtractor={item => item.$id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onEdit={() => handleEditEvent(item)}
            onDelete={() => handleDeleteEvent(item.$id)}
            isAdmin={true}
          />
          
        )}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefreshAdmin}

      />
      </View>

    </View>

</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#060318"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#060318',
    padding: 20,
    gap:70,

  },
  headLineContainer:{
    justifyContent:'center',
    
  },

  headLineDesign: {
    // padding: 5, // Add padding to give space for the shadow
    margin: 10, // Add margin to separate it from other elements
    shadowColor: '#ffffff',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowRadius: 5,
    elevation: 35, // For Android shadow
    // backgroundColor: '#1e1e1e', // Add a subtle background color for better visibility
    borderRadius: 20, // Add border radius for smoother shadow edges
  },

  headLine: {
    fontSize: 22,
    color: '#ffffff',
   
  },

  cards:{

    flex:1,
    width:'90%',
    minHeight:150,
    alignSelf:'center',
    backgroundColor:'#1e1e1e',
    padding:10,
    borderRadius: 15,
    
    shadowColor: '#ffffff',
    shadowOffset: { width: 4, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8, 

  },

  
});

export default AdminPanel;