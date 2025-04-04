import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../components/EventCard';
import { getEvents } from '../services/appwrite';
import { useNavigation } from '@react-navigation/native';
import EventDetailsScreen from './EventDetailsScreen';
import LottieView from 'lottie-react-native';



const HomeScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const fetchEvents = async () => {
    try {
      const eventList = await getEvents();
      setEvents(eventList);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  //handling register button

  const handleRegister = (event)=>{

    if (!event.registrationLink) {
      Alert.alert("Wait", "Registration Not Started");
      return;
    }
    Linking.openURL(event.registrationLink)
    .catch(() => Alert.alert("Oops !","Failed to open "))
  }

  //handling detail button on homescreen

  const handleDetails =(event) =>{
      navigation.navigate('EventDetails',{event})
  }

  
//Main screen header
  const Header = ()=>{
    return(
      <View style={styles.headerContainer}>
        <View style={styles.shadowWrapper}>
          <Text style={styles.headerTxt}>Upcoming Events</Text>
        </View>
      </View>
    );
  }

  //handling refresh on load button slider
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#f9eed0" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={events}
          keyExtractor={item => item.$id}
          renderItem={({ item }) => (

            <EventCard event={item}
            onRegister={() => handleRegister(item)}
            onDetails={() => handleDetails(item)}
            />
          )}
          ListHeaderComponent={Header}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}

          //when no events in database then this animations ....

          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <LottieView
                source={require('../assests/animations/empty.json')}
                autoPlay
                loop
                style={{ width: 200, height: 200 }}
              />
              <Text style={styles.emptyText}>😕 No Upcoming Events</Text>
              <Text style={styles.emptySubText}>Stay tuned, something exciting is coming!</Text>
            </View>
          )}

        />
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
    padding: 10,
    backgroundColor: '#060318',

  },

 headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  shadowWrapper: {
    shadowColor: '#ffffff',
    shadowOpacity: 0.25,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowRadius: 4,
    elevation: 10, // For Android shadow
  },

  headerTxt:{

    fontSize:18,
    fontWeight:'bold',
    color:'#f9eed0',
    
  },
  //empty list component handling style...no data found

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
  
  emptySubText: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },

 });

export default HomeScreen;