import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getEvents, deleteEvent} from '../services/appwrite'; // Import functions to interact with Appwrite
import { COLORS } from '../constants/theme';
import EventCard from '../components/EventCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const AdminPanel = ({route, navigation}) => {
  const {club} = route.params;
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch events for the current club
  const fetchEvents = useCallback(async () => {
    setRefreshing(true);
    setLoading(true);
    try {
      const fetchedEvents = await getEvents();
      const clubEvents = fetchedEvents.filter(event => event.clubName === club);
      setEvents(clubEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      Toast.show({
        type: 'error',
        text1: '❌ Error fetching events!',
        text1Style: {fontSize: 14}
      });
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [club]);

  // Refetch events every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchEvents();
      // Optionally, reset state on blur/unmount to avoid stale/blank state
      return () => {
        setEvents([]);
        setLoading(true);
        setRefreshing(false);
      };
    }, [fetchEvents])
  );

  // Manual refresh
  const handleRefreshAdmin = async () => {
    await fetchEvents();
  };

  const handleDeleteEvent = async eventId => {
    try {
      await deleteEvent(eventId);
      fetchEvents();
    } catch (error) {
      Toast.show({
        type:'error',
        text1:'❌ Error deleting the event. !!', 
        text1Style:{
            fontSize:14
        }   
      });
    }
  };

  const handleAddEvent = () => {
    // Navigate to AddEvent
    navigation.navigate('AddEvent', {
      club,
    });
  };

  // FIX: Pass the full event object, not just the id, to EditEvent
  // This prevents EditEvent from having to fetch the event again (which can fail if the event is not found or network is slow)
  const handleEditEvent = event => {
    navigation.navigate('EditEvent', {
      event, // pass the full event object
    });
  };

  // Optionally, listen for navigation param to trigger refresh (if using navigation.goBack with params)
  useEffect(() => {
    if (route.params?.refresh) {
      fetchEvents();
      navigation.setParams({refresh: undefined});
    }
  }, [route.params?.refresh, fetchEvents, navigation]);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 justify-center items-center bg-primary p-5 gap-16">
        <View className="justify-center w-full">
          <View className="m-2 shadow-card rounded-2xl">
            <Text className="text-secondary text-2xl font-bold font-serif"> {club}'s Admin Panel</Text>
          </View>
        </View>
        {/* add event button */}
        <TouchableOpacity className="bg-buttonPrimary py-3 px-6 rounded-xl items-center w-full max-w-xs active:opacity-80" onPress={handleAddEvent}>
          <Text className="font-bold text-base text-textOnAccent">Add Event</Text>
        </TouchableOpacity>
        <View className="flex-1 w-[90%] min-h-[150px] self-center bg-surface p-3 rounded-3xl shadow-card">
          {loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color={COLORS.textMuted} />
            </View>
          ) : (
            <FlatList
              data={events}
              keyExtractor={item => item.$id}
              renderItem={({item}) => (
                <EventCard
                  event={item}
                  onEdit={() => handleEditEvent(item)} // Pass the full event object
                  onDelete={() => handleDeleteEvent(item.$id)}
                  isAdmin={true}
                />
              )}
              showsVerticalScrollIndicator={false}
              refreshing={refreshing}
              onRefresh={handleRefreshAdmin}
              contentContainerStyle={{paddingBottom: 60}}
              ListEmptyComponent={() => (
                <View className="mt-12 items-center justify-center">
                  <LottieView
                    source={require('../assets/animations/empty.json')}
                    autoPlay
                    loop
                    style={{width: 200, height: 200}}
                  />
                  <Text className="text-secondary text-lg font-bold mt-2"> No Events Scheduled</Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AdminPanel;
