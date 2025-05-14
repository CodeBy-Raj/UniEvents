import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, Linking, TouchableOpacity, Button, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../components/EventCard';
import { getEvents } from '../services/appwrite';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import unified from '../Colors/Colors';
import { Divider, Menu } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
const [selectedClub, setSelectedClub] = useState(null); // State for the selected club

const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
const clubs = ['ACM', 'ABESEC', 'KALAKRIT', 'GDSC','SAMVAAD']; // Example club names
  
  const navigation = useNavigation();

   const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleSortByClubName = () => {
    closeMenu();
    setModalVisible(true);
    fetchEvents()
  };
useEffect(()=>{
  fetchEvents();
},[selectedClub]);

const handleSelectClub = (clubName)=>{
  setSelectedClub(clubName);
  setModalVisible(false);
  fetchEvents();
}

  const handleResetSorting = () => {
    closeMenu();
    setSelectedClub(null);
    
  fetchEvents();
  };

  const fetchEvents = async () => {
    try {
      const eventList = await getEvents();
      if(selectedClub) {
        const filteredEvents = eventList.filter(event=>event.clubName === selectedClub);
        setEvents(filteredEvents);
      }
      else setEvents(eventList);
    } 
    catch (error) {

      if(error.message=='Network request failed'){
      Toast.show({
        type:'error',
        text1:'No Internet Connection',
        text2:'Connect And Refresh',
        visibilityTime:5000
      })
    }
      // console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };



  //handling registration screen......

  const handleRegister = (event) => {
    const link = event.registrationLink;

    if(link){
      Toast.show({
        type:'success',
        text1:'Opening',
        text2:'Redirecting to Browser.....',
        visibilityTime:3000
      });
      setTimeout(() => {
        Linking.openURL(link);
      }, 1500);
    }
    else{
      navigation.navigate('RegisterScreen', {clubName: event.clubName , title:event.title});
    }
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

<Modal
  visible={modalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10 }}>
      {clubs.map((club) => (
        <TouchableOpacity key={club} onPress={() => handleSelectClub(club)}>
          <Text style={{ fontSize: 18, marginVertical: 10 }}>{club}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Cancel" onPress={() => setModalVisible(false)} />
    </View>
  </View>
</Modal>

      <View style={styles.container}>

         <View style={styles.menuContainer}>
       <Menu
  visible={menuVisible}
  onDismiss={closeMenu}
  anchor={
    <TouchableOpacity onPress={openMenu}>
      <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
    </TouchableOpacity>
  }
>
  <Menu.Item onPress={handleSortByClubName} title="Sort by Club Name" />
  <Divider />
  <Menu.Item onPress={handleResetSorting} title="Reset Sorting" />
</Menu>
      </View>
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
    backgroundColor: unified.primary
  },

  container: {

    flex: 1,
    padding: 10,
    backgroundColor: unified.primary,

  },
  menuContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },

 headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  shadowWrapper: {
    shadowColor: unified.accent,
    shadowOpacity: 0.25,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowRadius: 4,
    elevation: 10,
  },

  headerTxt:{

    fontSize:18,
    fontWeight:'bold',
    color: unified.secondary,
    
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
    color: unified.secondary,
    marginTop: 10,
  },
  
  emptySubText: {
    fontSize: 14,
    color: unified.placeholder,
    marginTop: 4,
  },

 });

export default HomeScreen;