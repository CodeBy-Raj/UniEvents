import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EventCard = ({ event, onRegister, onDetails ,  onEdit, onDelete, isAdmin = false }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.clubName}>by {event.clubName}</Text>
      <Text style={styles.date}>Date: {event.date}</Text>
      <Text style={styles.description}>{event.description}</Text>

      <View style={styles.buttonContainer}>
        {isAdmin ? (
          <>
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailsButton} onPress={onDetails}>
              <Text style={styles.buttonText}>Details</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailsButton} onPress={onDetails}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#3a3546',
    borderRadius: 16,
    marginBottom: 19,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fdfcfb',
  },
  clubName: {
    color: '#9e9ea7',
    fontSize: 17,
    fontWeight: 'bold',
  },
  date: {
    color: '#cccccc',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 19,
    fontWeight: '600',
    color: '#ecebf0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: '#f9eed0',
    padding: 10,
    borderRadius: 12,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  detailsButton: {
    backgroundColor: '#f9eed0',
    padding: 10,
    borderRadius: 12,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },

  editButton: {
    backgroundColor: '#ffa726', // Orange for edit
    padding: 10,
    borderRadius: 12,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#e53935', // Red for delete
    padding: 10,
    borderRadius: 12,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default EventCard;