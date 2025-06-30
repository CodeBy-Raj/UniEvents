import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  Linking,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import EventCard from '../components/EventCard';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import unified from '../Colors/Colors';
import {Divider, Menu} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useHomeViewModel} from '../viewModels/HomeViewModels';

const HomeScreen = () => {
  const {
    events,
    loading,
    refreshing,
    selectedClub,
    setSelectedClub,
    onRefresh,
    fetchEvents,
    isConnected,
    setRefreshing
  } = useHomeViewModel();
  const [modalVisible, setModalVisible] = useState(false);
  const clubs = ['ACM', 'ABESEC', 'KALAKRIT', 'GDSC', 'SAMVAAD'];
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleSortByClubName = () => {
    closeMenu();
    setModalVisible(true);
    fetchEvents();
  };
  useEffect(() => {
    fetchEvents();
  }, [selectedClub]);

  const handleSelectClub = clubName => {
    setSelectedClub(clubName);
    setModalVisible(false);
    fetchEvents();
  };

  const handleResetSorting = () => {
    closeMenu();
    setSelectedClub(null);

    fetchEvents();
  };

  //handling registration screen......

  const handleRegister = event => {
    const link = event.registrationLink;

    if (link) {
      Toast.show({
        type: 'success',
        text1: 'Opening',
        text2: 'Redirecting to Browser.....',
        visibilityTime: 2000,
      });
      setTimeout(() => {
        Linking.openURL(link);
      }, 1500);
    } else {
      navigation.navigate('RegisterScreen', {
        clubName: event.clubName,
        title: event.title,
      });
    }
  };

  //handling detail button on homescreen
  const handleDetails = event => {
    navigation.navigate('EventDetails', {event});
  };

  //Main screen header
  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.shadowWrapper}>
          <Text style={styles.headerTxt}>Upcoming Events</Text>
        </View>
      </View>
    );
  };

  //handling refresh on load button slider
  const handleRefresh = async () => {
    onRefresh();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <LottieView
        source={require('../assests/animations/loading-ripple.json')}
        autoPlay
        loop
        />
        <Text style={{ marginTop: 10, color: '#aaa' }}>Loading Events...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Modal view for sorting club by names */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View
            style={{backgroundColor: '#f9eed0', padding: 20, width:200,borderRadius: 30}}>
            {clubs.map(club => (
              <TouchableOpacity
                key={club}
                onPress={() => handleSelectClub(club)}>
                <Text style={{fontSize: 18, marginVertical: 10}}>{club}</Text>
              </TouchableOpacity>
            ))}
            <Text style={{fontSize: 16, color: 'gray', marginVertical: 10}}>
              Selected Club: {selectedClub || 'None'}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.cancelButton}>
              <Text style={styles.cancelButtonTxt}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Main screen event View */}
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
              </TouchableOpacity>
            }
            style={{width: 200}}
            >
            <Menu.Item onPress={handleSortByClubName} title="Sort by Clubs"/>
            <Divider />
            <Menu.Item onPress={handleResetSorting} title="Show All" />
            <Divider />
            <Menu.Item
              onPress={() =>
                Linking.openURL(
                  'https://www.termsfeed.com/live/9b715be2-0370-4b12-b76a-450871a5c977',
                )
              }
              title="Privacy Policy"
            />
            <Divider />
            <Menu.Item
              onPress={() => Linking.openURL('https://linktr.ee/codebyraj')}
              title="Developer" 
              
              />
            
          </Menu>
        </View>
        {!isConnected ? (
          <View style={styles.noInternetContainer}>
            <LottieView
              source={require('../assests/animations/no-internet.json')}
              autoPlay
              loop
              speed={0.9}
              style={{width: 300, height: 300}}
            />
            <Text style={styles.emptyText}>😕 No Internet Connection</Text>
            <Text style={styles.emptySubText}>
              Connect to the internet and refresh
            </Text>
          </View>
        ) : (
          <FlatList
            data={events}
            keyExtractor={item => item.$id}
            renderItem={({item}) => (
              <EventCard
                event={item}
                onRegister={() => handleRegister(item)}
                onDetails={() => handleDetails(item)}
              />
            )}
            ListHeaderComponent={Header}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            contentContainerStyle={{paddingBottom: 60}}
            //when no events in database then this animations ....

            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <LottieView
                  source={require('../assests/animations/empty.json')}
                  autoPlay
                  loop
                  style={{width: 300, height: 300}}
                />
                <Text style={styles.emptyText}>😕 No Upcoming Events</Text>
                <Text style={styles.emptySubText}>
                  Stay tuned, something exciting is coming!
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: unified.primary,
  },

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: unified.primary,
  },
  menuContainer: {
    alignItems: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  cancelButtonTxt: {color: 'white', fontWeight: 'bold'},
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

  headerTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: unified.secondary,
  },
  //empty list component handling style...no data found

  emptyContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
noInternetContainer:{
    marginTop: 100,
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
