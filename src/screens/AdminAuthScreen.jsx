import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Client,Databases } from 'appwrite';



const client = new Client();
client
    .setEndpoint('https://YOUR_APPWRITE_ENDPOINT') // Your Appwrite endpoint
    .setProject('YOUR_PROJECT_ID'); // Your project ID

const databases = new Databases(client);
const databaseId = 'YOUR_DATABASE_ID'; // Replace with your database ID
const clubsCollectionId = 'YOUR_CLUBS_COLLECTION_ID'; // Replace with your collection ID


const AdminAuthScreen = ({ onAuthSuccess }) => {
    const [code, setCode] = useState('');

    const [clubs, setClubs] = useState([]);

    const navigation = useNavigation();

    // const checkCode = () => {
    //     if (Object.values(SECRET_CODES).includes(code)) {
    //         onAuthSuccess(true); // Notify parent about successful authentication
    //         navigation.navigate('AdminPanel'); // Navigate to Admin Panel
    //     } else {
    //         Alert.alert("Access Denied", "Incorrect code. Don't guess randomly");
    //     }
    // };

    // const checkCode = () => {
    //     const club = Object.keys(SECRET_CODES).find(
    //         key => SECRET_CODES[key] === code
    //     );
    
    //     if (club) {
    //         onAuthSuccess(true); // Notify parent about successful authentication
    //         navigation.navigate('AdminPanel', { club }); // Pass the club name to AdminPanel
    //     } else {
    //         Alert.alert("Access Denied", "Incorrect code. Don't guess randomly");
    //     }
    // };

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await databases.listDocuments(databaseId, clubsCollectionId);
                setClubs(response.documents); // Store the list of clubs
            } catch (error) {
                console.error('Error fetching clubs:', error);
                Alert.alert('Error', 'Failed to fetch club data.');
            }
        };

        fetchClubs();
    }, []);

    const checkCode = () => {
        if (!code.trim()) {
            Alert.alert('Error', 'Please enter a code');
            return;
        }

        const club = clubs.find(club => club.secretCode === code);

        if (club) {
            onAuthSuccess(true); // Notify parent about successful authentication
            navigation.navigate('AdminPanel', { club: club.clubName }); // Pass the club name to AdminPanel
        } else {
            Alert.alert('Access Denied', "Incorrect code. Don't guess randomly");
        }
    };

    const creditMsg = () => {
        Vibration.vibrate(100);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter Admin Code:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Code"
                secureTextEntry
                value={code}
                onChangeText={setCode}
            />
            <TouchableOpacity 
                style={styles.submitBtn}
                onPress={checkCode}
            >
                <Text style={styles.submitTxt}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.credit}
                onPress={creditMsg} 
            >
                <View style={styles.credit}>
                    <Text style={styles.creditTxt}>Made with ❤️ By RAJ</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#060318',
        color:'white',
        gap:33
    },
    label: {
        fontSize: 18,
        fontWeight:'bold',
        color:'white',
    },
    input: {
        width: 300,
        height:60,
        borderWidth: 2,
        padding: 10,
        color: "white",
        borderColor:'white',
        borderRadius:12,
    },
    submitBtn:{
        backgroundColor: '#f9eed0',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
        width: '120',
    },
    submitTxt:{
        fontWeight:'bold',
        fontSize:15,
    },
    credit:{
        position:'absolute',
        bottom:20,
        alignItems:"center"
    },
    creditTxt:{
        color:'#ffffff',
        fontSize:14,
        fontWeight:"bold",
        borderWidth:0.59,
        borderColor:'white',
        borderRadius:20,
        paddingHorizontal:22,
        paddingVertical:6
    },
});

export default AdminAuthScreen;