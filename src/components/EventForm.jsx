import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const EventForm = ({onSubmit, initialData}) => {
  // const [id, setId] = useState(initialData ? initialData.id : '');
  const [clubName, setClubName] = useState(
    initialData ? initialData.clubName : '',
  );
  const [title, setTitle] = useState(initialData ? initialData.title : '');
  const [description, setDescription] = useState(
    initialData ? initialData.description : '',
  );
  const [registrationLink, setRegistrationLink] = useState(
    initialData ? initialData.registrationLink : '',
  );
  const [date, setDate] = useState(initialData ? initialData.date : '');
  const [time, setTime] = useState(initialData ? initialData.time : '');
  const [regDeadline, setRegDeadline] = useState(
    initialData ? initialData.regDeadline : '',
  );
  const [location, setLocation] = useState(
    initialData ? initialData.location : '',
  );
  const [fee, setFee] = useState(initialData ? initialData.fee : 0);

  const handleSubmit = () => {
    const eventData = {
      clubName,
      title,
      description,
      registrationLink,
      fee,
      date,
      time,
      location,
      regDeadline,
    };
    onSubmit(eventData);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.label}>Club Name:</Text>
          <TextInput style={styles.input} value={clubName} />
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.input, {height: 200}]}
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />
          <Text style={styles.label}>Registration Link:</Text>
          <TextInput
            style={styles.input}
            value={registrationLink}
            onChangeText={setRegistrationLink}
          />
          <Text style={styles.label}>Registration Fee:</Text>
          <TextInput
            style={styles.input}
            value={fee}
            onChangeText={val => setFee(parseInt(val) || 0)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Date:</Text>
          <TextInput style={styles.input} value={date} onChangeText={setDate} />
          <Text style={styles.label}>Time:</Text>
          <TextInput style={styles.input} value={time} onChangeText={setTime} />
          <Text style={styles.label}>Registration Deadline:</Text>
          <TextInput
            style={styles.input}
            value={regDeadline}
            onChangeText={setRegDeadline}
          />
          <Text style={styles.label}>Location:</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
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
    width: '100%',
  },
  container: {
    // flex:1,
    padding: 20,
    backgroundColor: '#060318',
  },
  label: {
    color: '#ffffff',
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: 'white',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#ffffff',
    fontSize: 15,
    borderRadius: 12,
  },
  submitButton: {
    backgroundColor: '#f9eed0',
    padding: 10,
    borderRadius: 9,
    alignItems: 'center',
  },
  submitButtonText: {
    fontWeight: 'bold',
  },
});

export default EventForm;
