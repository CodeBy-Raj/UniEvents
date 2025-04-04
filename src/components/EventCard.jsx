import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EventCard = ({ event, onRegister, onDetails ,  onEdit, onDelete, isAdmin = false }) => {


  return (
    <View style={styles.card}>

      <View style={styles.titleContainer}>
      <Text style={styles.title}>{event.title}</Text>
      </View>

      <View style={styles.miniContent}>

      <Text style={styles.clubName}>by {event.clubName}</Text>
      <Text style={styles.feeTxt}>₹ {event.fee}/-</Text>

      </View>
      <Text style={styles.date}>Date: {event.date}</Text>
      
      <Text style={styles.description}>Location: {event.location}</Text>

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
  titleContainer:{
    alignItems:'center',
    marginBottom:10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fdfcfb',
  },
  miniContent:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  clubName: {
    color: '#9e9ea7',
    fontSize: 17,
    fontWeight: 'bold',
  },
  feeTxt:{
    color:'#000000',
    fontSize:16,
    fontWeight:'bold',
    // backgroundColor: price == 0 ? 'green' : 'white' ,
    backgroundColor: '#FBD28B',
    borderRadius:20,
    padding:10,
  },
  date: {
    color: '#cccccc',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
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