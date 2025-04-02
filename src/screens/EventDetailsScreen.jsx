import React from 'react';
import { View, Text, StyleSheet, Linking, Button } from 'react-native';

const EventDetailsScreen = ({ route }) => {
  const { event } = route.params;

  const handleRegistrationLink = () => {
    Linking.openURL(event.registrationLink);
  };

  const handleDetailsLink = () => {
    Linking.openURL(event.detailsLink);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.clubName}>Club: {event.clubName}</Text>
      <Text style={styles.date}>Date: {event.date}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegistrationLink} />
        <Button title="Details" onPress={handleDetailsLink} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#060318',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fdfcfb',
  },
  clubName: {
    fontSize: 18,
    color: '#9e9ea7',
    marginVertical: 5,
  },
  date: {
    fontSize: 16,
    color: '#cccccc',
  },
  description: {
    fontSize: 16,
    color: '#ecebf0',
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EventDetailsScreen;