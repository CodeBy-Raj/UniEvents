import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Client, Databases} from 'appwrite';
import Toast from 'react-native-toast-message';


const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('67ed7ef30016220d4d3c'); // Your project ID

const databases = new Databases(client);
const databaseId = '67ed81c5001ae04ea89c'; // Replace with your database ID
const clubsCollectionId = '67ed89ff002561ee763d'; // Replace with your collection ID

const AdminAuthScreen = ({onAuthSuccess}) => {
  const [code, setCode] = useState('');

  const [clubs, setClubs] = useState([]);
const [loading, setLoading] = useState(false);
 // State to manage loading state
  const navigation = useNavigation();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await databases.listDocuments(
          databaseId,
          clubsCollectionId,
        );
        setClubs(response.documents); // Store the list of clubs
      } catch (error) {
        // console.error('Error fetching clubs:', error);
        Toast.show({
          type: 'error',
          text1: 'Network Issue !!',
          text2: 'Please check Network Connection',
        });
        // Alert.alert('Error', 'Failed to fetch club data.');
      }
    };

    fetchClubs();
  }, []);

  const checkCode = () => {
    if (!code.trim()) {
      Toast.show({
        type: 'error',
        text1: '❌ Incorrect Admin Code !!',
        text1Style: {
          fontSize: 14,
        },
      });
      // Alert.alert('Error', 'Please enter a code');
      return;
    }

    const club = clubs.find(club => club.secretCode === code);

    if (club) {
      onAuthSuccess(true);
      navigation.navigate('AdminPanel', {club: club.clubName});
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
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}>
        <Text style={styles.label}>Enter Admin Code:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Code"
          secureTextEntry
          value={code}
          onChangeText={setCode}
        />
        <TouchableOpacity style={[styles.submitBtn,  loading && { opacity: 0.5 }]} 
        onPress={checkCode}
        disabled={loading} // Disable button while loading
        >
        <Text style={styles.submitTxt}>{loading ? 'Checking...': 'Submit'}</Text>
        </TouchableOpacity>
      </View>
      {/* credit section */}
      <View style={styles.CreditContainer}>
        <TouchableOpacity style={styles.credit} onPress={creditMsg}>
          <View style={styles.credit}>
            <Text style={styles.creditTxt}>Made with ❤️ By RAJ</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#060318',
    color: 'white',
  },
  CreditContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    width: 300,
    height: 60,
    borderWidth: 2,
    padding: 10,
    color: 'white',
    borderColor: 'white',
    borderRadius: 12,
  },
  submitBtn: {
    backgroundColor: '#f9eed0',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    width: '120',
  },
  submitTxt: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  credit: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  creditTxt: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    borderWidth: 0.59,
    borderColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 6,
  },
});

export default AdminAuthScreen;
