import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../components/EventCard';
import { getEvents } from '../services/appwrite';

const HomeScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  

  const Header = ()=>{
    return(
      <View style={styles.headerContainer}>
        <Text style={styles.headerTxt}>Upcoming Events</Text>
      </View>
    );
  }

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
            onRegister={() => console.log('Register for:', item.title)}
            onDetails={() => console.log('Details for:', item.title)}
            />
          )}
          ListHeaderComponent={Header}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
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

  headerContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    height:30,
    
  },
  headerTxt:{

    fontSize:18,
    fontWeight:'bold',
    color:'#f9eed0',
    
  },

 });

export default HomeScreen;