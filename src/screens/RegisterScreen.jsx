import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { regEvent } from '../services/appwrite';
import Toast from 'react-native-toast-message';

const RegisterScreen = ({route,navigation}) => {
    const {clubName,title} = route.params;
   
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone]  = useState('');

    const handleSubmit = async()=> {
        if(!email || !phone || !name){
          Toast.show({
            type:'error',
            text1:'😒 Please fill required details !!', 
            text1Style:{
                fontSize:16
            },   
            visibilityTime:3000
        })
            return;
        }
        const eventData ={
            title,
            clubName,
            email,
            phone,
            name
        }
        try{
     
            await regEvent(eventData);
             Toast.show({
                    type:'success',
                    text1:'✅ Success !!',
                    text2:'Registration Done !!',
                    text1Style:{
                      fontSize:15,
                    },
                    text2Style:{
                      fontSize:14
                    }
                  })
                  setTimeout(() => {
                    Toast.show({
                      type:'success',
                      text1:'Thank You For Registring !! 🙌',
                      text1Style:{
                        fontSize:14
                      }
                    })
                  }, 2500);
            navigation.goBack();
        }
        catch(error){
            
            if(error.message === "Duplicate_Registration"){
               Toast.show({
                              type:'error',
                              text1:'❌ Duplicate Entries Not Allowed, Already Registered !!', 
                              text1Style:{
                                  fontSize:14
                              },
                              visibilityTime:2000  
                               
                          })
            }
            else if(error.message.includes('Attribute "email" has invalid format')){
               Toast.show({
                              type:'error',
                              text1:'❌ Invalid Email Format !!', 
                              text1Style:{
                                  fontSize:14
                              },
                              visibilityTime:1500  
                          })
            }
            else if(error.message.includes('phone')){
               Toast.show({
                              type:'error',
                              text1:'❌ Invalid Phone Number !!', 
                              text2:'Kripya, Enter correct Phone number',
                              text1Style:{
                                  fontSize:14
                              },
                              visibilityTime:1500   
                          })
            }
            else{
              Toast.show({
                type:'info',
                text1:'Oops !! Registraion failed to submit', 
                text1Style:{
                    fontSize:14
                }   
            })
            }
        }
    }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-primary">
    <SafeAreaView className="flex-1">

    <View className="flex-1 p-5">
        <View className="items-center mb-5">
            <Text className="text-textPrimary text-xl font-bold italic">Registration</Text>
        </View>

      <Text className="text-textPrimary font-bold mb-1">Club Name:</Text>
      <TextInput 
        className="h-11 border-2 border-textPrimary mb-4 px-3 text-textPrimary rounded-xl"
        value={clubName}
        editable={false}
      />
      <Text className="text-textPrimary font-bold mb-1">Title:</Text>
      <TextInput 
      className="h-11 border-2 border-textPrimary mb-4 px-3 text-textPrimary rounded-xl"
      value={title}
      editable={false}
      />
      <Text className="text-textPrimary font-bold mb-1">Name:</Text>
      <TextInput 
      className="h-11 border-2 border-textPrimary mb-4 px-3 text-textPrimary rounded-xl"
      value={name}
      onChangeText={setName}
      />
      <Text className="text-textPrimary font-bold mb-1">Email:</Text>
      <TextInput 
      className="h-11 border-2 border-textPrimary mb-4 px-3 text-textPrimary rounded-xl"
      value={email}
      onChangeText={setEmail}
      />
      <Text className="text-textPrimary font-bold mb-1">Phone:</Text>
      <TextInput 
      className="h-11 border-2 border-textPrimary mb-4 px-3 text-textPrimary rounded-xl"
      value={phone}
      onChangeText={setPhone}
      keyboardType='numeric'
      />

      <TouchableOpacity className="bg-buttonPrimary py-3 rounded-button items-center mt-2 active:opacity-80" onPress={handleSubmit}>
        <Text className="font-bold text-textOnAccent text-base">Submit</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
    </ScrollView>
  )
}

export default RegisterScreen