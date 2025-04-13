import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { regEvent } from '../services/appwrite';

const RegisterScreen = ({route,navigation}) => {
    const {clubName,title} = route.params;
   
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone]  = useState('');

const handleSubmit = async()=> {
    const eventData ={
        title,
        clubName,
        email,
        phone,
        name
    }
    try{
        await regEvent(eventData);
        Alert.alert('Success !!!','Regisration success');
        navigation.goBack();
    }catch(error){
        console.log('registation error :', error);
        
        Alert.alert('Error', 'Registraion failed to submit')
    }
}

   
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#060318'}}>
    <SafeAreaView style={styles.safeArea}>

    <View style={styles.container}>
        <View style={styles.headCont}>
            <Text style={styles.headTxt}>Registration</Text>
        </View>

      <Text style={styles.label}>Club Name:</Text>
      <TextInput 
      style={styles.input}
      value={clubName}

      />
      <Text style={styles.label}>Title: </Text>
      <TextInput 
      style={styles.input}
      value={title}
      />
      <Text style={styles.label}>Name: </Text>
      <TextInput 
      style={styles.input}
      value={name}
      onChangeText={setName}
      />
      <Text style={styles.label}>Email: </Text>
      <TextInput 
      style={styles.input}
      value={email}
      onChangeText={setEmail}
      />
      <Text style={styles.label}>Phone: </Text>
      <TextInput 
      style={styles.input}
      value={phone}
      onChangeText={setPhone}
      keyboardType='numeric'
      />

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnTxt}>Submit</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
    </ScrollView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        // backgroundColor: "#060318"
      },
    
      container: {
      flex: 1,
        padding: 20,
     
      },

      headCont:{
        padding:10,
        justifyContent:'center',
        alignItems:'center'
      },
      headTxt:{
        color:'#ffffff',
        fontSize:20,
        fontWeight:'bold',
        fontStyle:'italic',
        // fontFamily:'roboto'
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
  submitBtn: {
    backgroundColor: '#f9eed0',
    padding: 10,
    borderRadius: 9,
    alignItems: 'center',
  },
  submitBtnTxt: {
    fontWeight: 'bold',
  },

})