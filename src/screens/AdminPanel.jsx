import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getEvents, deleteEvent} from '../services/appwrite';
import EventCard from '../components/EventCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';

// EmptyList component moved outside to prevent recreation on each render
const EmptyEventsList = () => (
  <View style={styles.emptyContainer}>
    <LottieView
      source={require('../assests/animations/empty.json')}
      autoPlay
      loop
      style={styles.emptyAnimation}
    />
    <Text style={styles.emptyText}>😕 No Events Scheduled</Text>
  </View>
);

const AdminPanel = ({route}) => {
  const {club} = route.params; // Get the club name from navigation params
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  //fetching events of specified club only, from database -- using filter()
  const fetchEvents = useCallback(async () => {
    setRefreshing(true);

    try {
      const fetchedEvents = await getEvents(); // Fetch all events
      const clubEvents = fetchedEvents.filter(event => event.clubName === club); // Filter by club
      setEvents(clubEvents);
    } catch (error) {
      // Handle error silently - could be logged to an analytics service
    } finally {
      setRefreshing(false);
    }
  }, [club]);

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [fetchEvents])
  );

  //refresh loading function
  const handleRefreshAdmin = useCallback(async () => {
    await fetchEvents();
  }, [fetchEvents]);

  const handleDeleteEvent = useCallback(async eventId => {
    try {
      await deleteEvent(eventId); // Delete event from Appwrite
      fetchEvents(); // Refresh the event list
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '❌ Error deleting the event. !!',
        text1Style: {
          fontSize: 14,
        },
      });
    }
  }, [fetchEvents]);

  const handleAddEvent = useCallback(() => {
    navigation.navigate('AddEvent', {club}); // Navigate to Add Event screen
  }, [navigation, club]);

  const handleEditEvent = useCallback(event => {
    navigation.navigate('EditEvent', {event}); // Navigate to Edit Event screen with event data
  }, [navigation]);

  // Memoized renderItem to prevent recreation on each render
  const renderEventItem = useCallback(({item}) => (
    <EventCard
      event={item}
      onEdit={() => handleEditEvent(item.$id)}
      onDelete={() => handleDeleteEvent(item.$id)}
      isAdmin={true}
    />
  ), [handleEditEvent, handleDeleteEvent]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headLineContainer}>
          <View style={styles.headLineDesign}>
            <Text style={styles.headLine}> {club}'s Admin Panel</Text>
          </View>
        </View>

        {/* //add event button */}
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={handleAddEvent}>
          <Text style={styles.btnTxt}>Add Event</Text>
        </TouchableOpacity>

        <View style={styles.cards}>
          <FlatList
            data={events}
            keyExtractor={item => item.$id}
            renderItem={renderEventItem}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={handleRefreshAdmin}
            contentContainerStyle={styles.listContent}
            //when no events for that club then show this :
            ListEmptyComponent={EmptyEventsList}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#060318',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#060318',
    padding: 20,
    gap: 70,
  },
  headLineContainer: {
    justifyContent: 'center',
  },

  headLineDesign: {
    margin: 10,
    shadowColor: '#ffffff',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowRadius: 5,
    elevation: 35,
    borderRadius: 20, // Add border radius for smoother shadow edges
  },

  headLine: {
    fontSize: 22,
    color: '#f9eed0',
    fontWeight: 'bold',
    fontFamily: 'times new roman',
  },
  //button desing -- add event button

  btnStyle: {
    backgroundColor: '#f9eed0',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  cards: {
    flex: 1,
    width: '90%',
    minHeight: 150,
    alignSelf: 'center',
    backgroundColor: '#1e1e1e',
    padding: 10,
    borderRadius: 35,
    shadowColor: '#ffffff',
    shadowOffset: {width: 4, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },

  //listemptycomponent for no data
  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f9eed0',
    marginTop: 10,
  },

  emptyAnimation: {
    width: 200,
    height: 200,
  },

  listContent: {
    paddingBottom: 60,
  },
});

export default AdminPanel;
