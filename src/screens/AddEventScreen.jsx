import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView} from 'react-native';
import {addEvent, createEvent} from '../services/appwrite'; // Import the function to create an event
import {SafeAreaView} from 'react-native-safe-area-context';

const AddEventScreen = ({navigation, route}) => {
  const {club} = route.params; //getting clubName from adminPanel with help of route

  const [clubName, setClubName] = useState(club);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [date, setDate] = useState('');
  const [location, setlocation] = useState('ABES');
  const [fee, setFee] = useState();



  const handleAddEvent = async () => {
    if ( !title || !description || !registrationLink || !date || !fee) {
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
      fee: parseInt(fee),
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
         <View style={styles.container}>
        <Text style={styles.label}>Club Name (Already Fetched)</Text>
        <TextInput style={styles.input} value={clubName} />

        <Text style={styles.label}>🔥 Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>📝 Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>🔗 Registration/Form Link</Text>
        <TextInput
          style={styles.input}
          value={registrationLink}
          onChangeText={setRegistrationLink}
        />

        <Text style={styles.label}>📅 Date</Text>
        <TextInput style={styles.input} value={date} onChangeText={setDate} />

        <Text style={styles.label}>📌 Location </Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setlocation}
        />

        <Text style={styles.label}>💲 Fee (If Free, Enter 0)</Text>
        <TextInput 
        style={styles.input} 
        value={fee} 
        onChangeText={setFee} // Allows only numbers
        keyboardType='numeric'
         />
        <TouchableOpacity style={styles.btnStyle} onPress={handleAddEvent}>
        <Text style={styles.btnTxt}>Add Event</Text>
        </TouchableOpacity>
       
      </View>
      </ScrollView>
     
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
  
    btnStyle:{
      backgroundColor: '#f9eed0',
      padding: 12,
      borderRadius: 12,
      alignItems: 'center',
    },
    btnTxt:{
      fontSize:16,
      fontWeight:'bold'
    },
  
});

export default AddEventScreen;
