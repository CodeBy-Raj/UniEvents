import React from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import { COLORS } from '../constants/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAddEventViewModel from '../viewModels/AddEventViewModel';

const AddEventScreen = ({navigation, route}) => {
  const {club} = route.params;
  
  const {
    clubName,
    title, setTitle,
    description, setDescription,
    registrationLink, setRegistrationLink,
    date, setDate,
    openDate, setOpenDate,
    location, setLocation,
    fee, setFee,
    time, setTime,
    openTime, setOpenTime,
    regDeadline, setRegDeadline,
    openRegDeadline, setOpenRegDeadline,
    image,
    uploading,
    handleImagePick,
    handleAddEvent,
  } = useAddEventViewModel(club, navigation);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 p-5 pb-20">
          <Text className="text-textPrimary font-bold mb-1">Club Name (Already Fetched)</Text>
          <TextInput className="h-11 border-2 border-textPrimary mb-4 px-3 text-textPrimary rounded-xl" value={clubName} editable={false} />
          
          <Text className="text-textPrimary font-bold mb-1">🔥 Title</Text>
          <TextInput className="h-11 border-2 border-textPrimary mb-4 px-3 text-textPrimary rounded-xl" value={title} onChangeText={setTitle} />
          
          <Text className="text-textPrimary font-bold mb-1">📝 Description</Text>
          <TextInput className="h-36 border-2 border-textPrimary mb-4 px-3 text-textPrimary rounded-xl" value={description} onChangeText={setDescription} multiline={true} />
          
          <Text className="text-textPrimary font-bold mb-1">🔗 Registration/Form Link (If want in-App Registration then No Need, else will redirect to Your Given Link)</Text>
          <TextInput className="h-11 border-2 border-textPrimary mb-4 px-3 text-textPrimary rounded-xl" value={registrationLink} onChangeText={setRegistrationLink} />
          
          <Text className="text-textPrimary font-bold mb-1">📅 Event Date</Text>
          <TouchableOpacity onPress={() => setOpenDate(true)} className="h-11 border-2 border-textPrimary mb-4 px-3 justify-center rounded-xl">
            <Text className="text-textPrimary">{date.toDateString()}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={openDate}
            date={date}
            mode="date"
            onConfirm={(date) => {
              setOpenDate(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
          />

          <Text className="text-textPrimary font-bold mb-1">⏳ Time</Text>
          <TouchableOpacity onPress={() => setOpenTime(true)} className="h-11 border-2 border-textPrimary mb-4 px-3 justify-center rounded-xl">
            <Text className="text-textPrimary">{time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={openTime}
            date={time}
            mode="time"
            onConfirm={(date) => {
              setOpenTime(false);
              setTime(date);
            }}
            onCancel={() => {
              setOpenTime(false);
            }}
          />

          <Text className="text-textPrimary font-bold mb-1">🙀 Registration Deadline</Text>
          <TouchableOpacity onPress={() => setOpenRegDeadline(true)} className="h-11 border-2 border-textPrimary mb-4 px-3 justify-center rounded-xl">
            <Text className="text-textPrimary">{regDeadline.toDateString()}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={openRegDeadline}
            date={regDeadline}
            mode="date"
            onConfirm={(date) => {
              setOpenRegDeadline(false);
              setRegDeadline(date);
            }}
            onCancel={() => {
              setOpenRegDeadline(false);
            }}
          />
          
          <Text className="text-textPrimary font-bold mb-1">📌 Location</Text>
          <TextInput className="h-11 border-2 border-textPrimary mb-4 px-3 text-textPrimary rounded-xl" value={location} onChangeText={setLocation} />
          
          <Text className="text-textPrimary font-bold mb-1">💲 Fee (If Free, Enter 0)</Text>
          <TextInput className="h-11 border-2 border-textPrimary mb-4 px-3 text-textPrimary rounded-xl" value={fee} onChangeText={setFee} keyboardType='numeric' />
          
          <Text className="text-textPrimary font-bold mb-1">🖼️ Event Banner</Text>
          <TouchableOpacity onPress={handleImagePick} className="h-40 border-2 border-dashed border-textPrimary mb-4 justify-center items-center rounded-xl overflow-hidden">
            {image ? (
              <Image source={{uri: image.uri}} className="w-full h-full" resizeMode="cover" />
            ) : (
              <View className="items-center">
                <Ionicons name="image-outline" size={40} color={COLORS.textMuted} />
                <Text className="text-textMuted mt-2">Select Image</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity className={`bg-buttonPrimary py-3 rounded-xl items-center mt-2 ${uploading ? 'opacity-50' : 'active:opacity-80'}`} onPress={handleAddEvent} disabled={uploading}>
            <Text className="font-bold text-base text-textOnAccent">{uploading ? 'Uploading...' : 'Add Event'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddEventScreen;
