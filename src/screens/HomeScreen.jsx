import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  FlatList,
  Text,
  Linking,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import EventCard from '../components/EventCard';
import PrimaryButton from '../components/PrimaryButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import {Divider, Menu} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useHomeViewModel} from '../viewModels/HomeViewModels';
import { CLUBS, LINKS } from '../constants';
import { COLORS } from '../constants/theme';

// Extract static components and styles outside
const Header = () => (
  <View className="items-center justify-center h-10 mb-4">
    <View className="shadow-md">
      <Text className="text-secondary text-lg font-bold">
        Upcoming Events
      </Text>
    </View>
  </View>
);

const EmptyList = () => (
  <View className="mt-12 items-center justify-center">
    <LottieView
      source={require('../assets/animations/empty.json')}
      autoPlay
      loop
      style={styles.lottie}
    />
    <Text className="text-secondary text-lg font-bold mt-2">
      😕 No Upcoming Events
    </Text>
    <Text className="text-textMuted text-sm mt-1">
      Stay tuned, something exciting is coming!
    </Text>
  </View>
);

const NoInternet = () => (
  <View className="mt-24 items-center justify-center">
    <LottieView
      source={require('../assets/animations/no-internet.json')}
      autoPlay
      loop
      speed={0.9}
      style={styles.lottie}
    />
    <Text className="text-secondary text-lg font-bold mt-2">
      😕 No Internet Connection
    </Text>
    <Text className="text-textMuted text-sm mt-1">
      Connect to the internet and refresh
    </Text>
  </View>
);

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
  const clubs = CLUBS;
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const openMenu = useCallback(() => setMenuVisible(true), []);
  const closeMenu = useCallback(() => setMenuVisible(false), []);

  const handleSortByClubName = useCallback(() => {
    closeMenu();
    setModalVisible(true);
    fetchEvents();
  }, [closeMenu, fetchEvents]);

  // Removed redundant useEffects. The ViewModel handles fetching on mount and when selectedClub changes.

  useFocusEffect(
    useCallback(() => {
      return () => {
        setModalVisible(false);
        setMenuVisible(false);
      };
    }, [])
  );

  const handleSelectClub = useCallback((clubName) => {
    setSelectedClub(clubName);
    setModalVisible(false);
    // fetchEvents(); // Redundant: setSelectedClub triggers useEffect in ViewModel
  }, [setSelectedClub]);

  const handleResetSorting = useCallback(() => {
    closeMenu();
    setSelectedClub(null);
    // fetchEvents(); // Redundant: setSelectedClub triggers useEffect in ViewModel
  }, [closeMenu, setSelectedClub]);

  const handleRegister = useCallback((event) => {
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
  }, [navigation]);

  const handleDetails = useCallback((event) => {
    navigation.navigate('EventDetails', {event});
  }, [navigation]);

  const handleRefresh = useCallback(async () => {
    onRefresh();
  }, [onRefresh]);

  const renderEventCard = useCallback(({item}) => (
    <EventCard
      event={item}
      onRegister={() => handleRegister(item)}
      onDetails={() => handleDetails(item)}
    />
  ), [handleRegister, handleDetails]);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-secondary p-5 w-52 rounded-[30px]">
            {clubs.map(club => (
              <PrimaryButton
                key={club}
                title={club}
                onPress={() => handleSelectClub(club)}
                variant="outline"
                size="small"
                className="mb-2"
              />
            ))}
            <Text className="text-base text-gray-600 my-2">
              Selected Club: {selectedClub || 'None'}
            </Text>
            <PrimaryButton
              title="Cancel"
              onPress={() => setModalVisible(false)}
              variant="danger"
              size="small"
              className="mt-2"
            />
          </View>
        </View>
      </Modal>
      
      <View className="flex-1 p-2 bg-primary">
        <View className="items-end">
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <Ionicons name="ellipsis-vertical" size={20} color={COLORS.textPrimary} />
              </TouchableOpacity>
            }
            style={styles.menu}
            >
            <Menu.Item onPress={handleSortByClubName} title="Sort by Clubs"/>
            <Divider />
            <Menu.Item onPress={handleResetSorting} title="Show All" />
            <Divider />
            <Menu.Item
              onPress={() => Linking.openURL(LINKS.PRIVACY_POLICY)}
              title="Privacy Policy"
            />
            <Divider />
            <Menu.Item
              onPress={() => Linking.openURL(LINKS.DEVELOPER)}
              title="Developer" 
              />
          </Menu>
        </View>
        {!isConnected ? (
          <NoInternet />
        ) : (
          <FlatList
            data={events}
            keyExtractor={item => item.$id}
            renderItem={renderEventCard}
            ListHeaderComponent={Header}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={EmptyList}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 300,
  },
  menu: {
    width: 200,
  },
  listContent: {
    paddingBottom: 60,
  },
});

export default HomeScreen;
