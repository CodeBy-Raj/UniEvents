import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView} from 'react-native';
import {addEvent, createEvent} from '../services/appwrite'; // Import the function to create an event
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const AddEventScreen = ({navigation, route}) => {
  const {club} = route.params; //getting clubName from adminPanel with help of route

  const [clubName, setClubName] = useState(club);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [date, setDate] = useState('');
  const [location, setlocation] = useState('ABES');
  const [fee, setFee] = useState();
  const [time, setTime] = useState('');
  const [regDeadline, setRegDeadline] = useState('');



  const handleAddEvent = async () => {

    if ( !title || !description || !date || !fee ||!time ||!regDeadline) {
      Toast.show({
        type:'error',
        text1:'Fill Required Fields',
        text2:'It cannot be empty',
        text1Style:{
          fontSize:14,
        }, 
        text2Style:{
          fontSize:12,
    
        }    
      })
      // Alert.alert('Error', 'Please fill in all fields');
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
      time,
      regDeadline
    };

    try {
      await addEvent(eventData); // Call the function to create an event
      Alert.alert('Success', 'Event added successfully');
      Toast.show({
        type:'success',
        text1:'✅ Success !!',
        text2:'Event Added Successfully !!',
        text1Style:{
          fontSize:14,
        },
        text2Style:{
          fontSize:13
        }
        
      })
      navigation.goBack(); // Navigate back to the Admin Panel
    } catch (error) {
      Toast.show({
        type:'error',
        text1:'Failed to add event !!',
        text2:'Please try again.',
        text1Style:{
          fontSize:14,
        },
        text2Style:{
          fontSize:12
        }
      })
      // Alert.alert('Error', 'Please try again');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
         <View style={[styles.container, {paddingBottom: 80}]}>
        <Text style={styles.label}>Club Name (Already Fetched)</Text>
        <TextInput style={styles.input} value={clubName} />

        <Text style={styles.label}>🔥 Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>📝 Description</Text>
        <TextInput
          style={[styles.input, {height:150}]}
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />

        <Text style={styles.label}>🔗 Registration/Form Link (If want in-App Registration then No Need, else will redirect to Your Given Link)</Text>
        <TextInput
          style={styles.input}
          value={registrationLink}
          onChangeText={setRegistrationLink}
        />

        <Text style={styles.label}>📅Event Date</Text>
        <TextInput style={styles.input} value={date} onChangeText={setDate} />

        <Text style={styles.label}>⌛ Time</Text>
        <TextInput style={styles.input} value={time} onChangeText={setTime} />

        <Text style={styles.label}>🙀 Registration Deadline</Text>
        <TextInput style={styles.input} value={regDeadline} onChangeText={setRegDeadline} />


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
    fontSize:15,
    fontWeight:'bold'
  },

  input: {
    height: 45,
    borderColor: '#ffffff',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#ffffff',
    borderRadius:12,
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
