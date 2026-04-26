import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Client, Databases} from 'react-native-appwrite';
import Toast from 'react-native-toast-message';
import { COLORS } from '../constants/theme';


const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('67ed7ef30016220d4d3c'); // Your project ID

const databases = new Databases(client);
const databaseId = '67ed81c5001ae04ea89c'; // Replace with your database ID
const clubsCollectionId = '67ed89ff002561ee763d'; // Replace with your collection ID

import { useFocusEffect } from '@react-navigation/native';

const AdminAuthScreen = ({onAuthSuccess}) => {
  const [code, setCode] = useState('');
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Fix: Reset loading and code state when screen is focused/unfocused to prevent blank/white screen
  useFocusEffect(
    React.useCallback(() => {
      setLoading(false);
      setCode('');
      return () => {
        setLoading(false);
        setCode('');
      };
    }, [])
  );

  useEffect(() => {
    let isMounted = true;
    const fetchClubs = async () => {
      try {
        setLoading(true);
        const response = await databases.listDocuments(
          databaseId,
          clubsCollectionId,
        );
        if (isMounted) {
          setClubs(response.documents); // Store the list of clubs
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Network Issue !!',
          text2: 'Please check Network Connection',
        });
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchClubs();
    return () => {
      isMounted = false;
    };
  }, []);

  const checkCode = async () => {
    if (!code.trim()) {
      Toast.show({
        type: 'error',
        text1: '❌ Incorrect Admin Code !!',
        text1Style: {
          fontSize: 14,
        },
      });
      return;
    }

    setLoading(true);
    try {
      const club = clubs.find(club => club.secretCode === code);

      if (club) {
        onAuthSuccess(true);
        setTimeout(() => {
          navigation.navigate('AdminPanel', {club: club.clubName});
        }, 100); // slight delay to ensure navigation stack is ready
        Toast.show({
          type: 'success',
          text1: `✅ ${club.clubName}'s Panel !!`,
          text1Style: {
            fontSize: 14,
          },
        });
      } else {
        Toast.show({
          type: 'error',
          text1: '❌ Incorrect Admin Code !!',
          text1Style: {
            fontSize: 14,
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const creditMsg = () => {
    Toast.show({
      type: 'success',
      text1: 'Hey 🙋‍♂️!! Wait....',
      visibilityTime: 3000,
      text1Style: {
        fontSize: 16,
      },
    });
    setTimeout(() => {
      Linking.openURL('https://linktr.ee/codebyRaj');
    }, 1000);
    Vibration.vibrate(200);
  };

  return (
    <View className="flex-1 justify-center items-center w-full bg-primary">
      <View className="flex-1 justify-center items-center gap-5">
        <Text className="text-textPrimary text-lg font-bold mb-2">Enter Admin Code:</Text>
        <TextInput
          className="w-72 h-14 border-2 border-textPrimary rounded-xl px-4 text-textPrimary mb-3"
          placeholder="Enter Code"
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry
          value={code}
          onChangeText={setCode}
        />
        <TouchableOpacity
          className={`bg-buttonPrimary py-3 rounded-xl items-center w-32 ${loading ? 'opacity-50' : 'active:opacity-80'}`}
          onPress={checkCode}
          disabled={loading}
        >
          <Text className="font-bold text-base text-textOnAccent">{loading ? 'Checking...' : 'Submit'}</Text>
        </TouchableOpacity>
      </View>
      {/* credit section */}
      <View className="flex-1 justify-end items-center">
        <TouchableOpacity className="absolute bottom-12 items-center" onPress={creditMsg}>
          <View className="items-center">
            <Text className="text-textPrimary text-sm font-bold border border-textPrimary rounded-2xl px-6 py-1.5">Made with ❤️ By RAJ</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminAuthScreen;
