import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const EventForm = ({ onSubmit, initialData }) => {
  const [id, setId] = useState(initialData ? initialData.id : '');
  const [clubName, setClubName] = useState(initialData ? initialData.clubName : '');
  const [title, setTitle] = useState(initialData ? initialData.title : '');
  const [description, setDescription] = useState(initialData ? initialData.description : '');
  const [registrationLink, setRegistrationLink] = useState(initialData ? initialData.registrationLink : '');
  const [date, setDate] = useState(initialData ? initialData.date : '');

  const handleSubmit = () => {
    const eventData = {
      id,
      clubName,
      title,
      description,
      registrationLink,
      date,
    };
    onSubmit(eventData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Event ID:</Text>
      <TextInput
        style={styles.input}
        value={id}
        onChangeText={setId}
      />
      <Text style={styles.label}>Club Name:</Text>
      <TextInput
        style={styles.input}
        value={clubName}
        onChangeText={setClubName}
      />
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Registration Link:</Text>
      <TextInput
        style={styles.input}
        value={registrationLink}
        onChangeText={setRegistrationLink}
      />
      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#060318',
  },
  label: {
    color: '#ffffff',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#f9eed0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    fontWeight: 'bold',
  },
});

export default EventForm;