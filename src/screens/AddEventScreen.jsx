import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addEvent, createEvent } from '../services/appwrite'; // Import the function to create an event
import { ID } from 'appwrite';


const AddEventScreen = ({ navigation }) => {

  const [clubName, setClubName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [date, setDate] = useState('');
  const [location, setlocation] = useState('ABES');
  // const [id, setid] = useState('')

  const handleAddEvent = async () => {

    if (!clubName || !title || !description || !registrationLink || !date) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const eventData = {

      // id: ID.unique(),
      clubName,
      title,
      description,
      registrationLink,
      date,
      location,

    };

    try {
      await addEvent(eventData); // Call the function to create an event
      Alert.alert('Success', 'Event added successfully');
      navigation.goBack(); // Navigate back to the Admin Panel
    } catch (error) {
      
      Alert.alert('Error', 'Failed to add event. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Club Name</Text>
      <TextInput
        style={styles.input}
        value={clubName}
        onChangeText={setClubName}
      />

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Registration Link</Text>
      <TextInput
        style={styles.input}
        value={registrationLink}
        onChangeText={setRegistrationLink}
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />

<Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setlocation}
      />


      <Button title="Add Event" onPress={handleAddEvent} />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#060318',
  },

  label: {
    color: '#ffffff',
    marginBottom: 5,
  },

  input: {
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#ffffff',
  },
  
});

export default AddEventScreen;