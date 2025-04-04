import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const EventDetailsScreen = ({ route }) => {

  const { event } = route.params;

  return (
    <LinearGradient colors={['#1c1b29', '#060318']} style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.clubName}>
          <Ionicons name="people-outline" size={18} color="#fff" /> Organised By: {event.clubName}
        </Text>

        <View style={styles.row}>
          <MaterialIcons name="event" size={18} color="#fff" />
          <Text style={styles.date}> {event.date}</Text>
          
        </View>

        
  {/* Event Time */}
  <View style={styles.row}>
    <Ionicons name="time-outline" size={18} color="#fff" />
    <Text style={styles.date}> {event.time || 'Time not set'}</Text>
  </View>

  {/* Event Location */}
  <View style={styles.row}>
    <Ionicons name="location-outline" size={18} color="#fff" />
    <Text style={styles.date}> {event.location || 'Location TBD'}</Text>
  </View>

  {/* Registration Deadline */}
  <View style={styles.row}>
    <MaterialIcons name="schedule" size={18} color="#fff" />
    <Text style={styles.date}> Reg Deadline: {event.deadline || 'N/A'}</Text>
  </View>

        <View style={styles.feeContainer}>
          {event.fee === 0 ? (
            <Text style={styles.freeText}>🎉 Free Entry! Don't miss out! 🚀</Text>
          ) : (
            <Text style={styles.feeText}>Entry Fee: ₹ {event.fee}</Text>
          )}
        </View>
      </View>

      <View style={styles.descriptionContainer}>

        <View style={styles.descTitleContainer}>
        <Text style={styles.descriptionTitle}> <Ionicons name="clipboard" size={20} color="#fff" />  Know Before You Go !</Text>
        </View>

        <View style={styles.descCard}>
        <Text style={styles.description}>{event.description}</Text>
        </View>

      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    gap:10,

  },
  card: {
    backgroundColor: '#1e1c2e',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#e4e3f0',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  clubName: {
    fontSize: 18,
    color: '#d4d3dd',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#bbb',
    marginLeft: 5,
  },
 
  feeContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  freeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#32cd32',
  },
  feeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F3B431',
  },

 

  //description

  descriptionContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    // borderWidth:2,
    // borderColor:'white',
    // padding:5
    margin:5,
    borderRadius:10,
    backgroundColor: '#1e1c2e',
    borderRadius: 12,
    // padding: 10,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  descTitleContainer:{
    
    justifyContent:'center',
    alignItems:'center',
    // borderWidth:2,
    // borderColor:'white',
    padding:6,
  },

  descCard:{
    flex:1,
    // borderWidth:2,
    // borderColor:'white',
    padding:15,
  
  },

  descriptionTitle:{
    color:'#f9eed0',
    fontSize:22,
    fontWeight:'bold',
  },
 description: {
  // flex:1,
    fontSize: 18,
    color: '#e4e3f0',
    marginVertical: 10,
  },

});

export default EventDetailsScreen;



