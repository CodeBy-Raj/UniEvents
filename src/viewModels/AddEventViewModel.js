import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { addEvent } from '../services/appwrite';
import { uploadFile } from '../services/storageService';

const useAddEventViewModel = (initialClubName, navigation) => {
  const [clubName, setClubName] = useState(initialClubName);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [location, setLocation] = useState('ABES');
  const [fee, setFee] = useState();
  const [time, setTime] = useState(new Date());
  const [openTime, setOpenTime] = useState(false);
  const [regDeadline, setRegDeadline] = useState(new Date());
  const [openRegDeadline, setOpenRegDeadline] = useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  const handleAddEvent = async () => {
    if (!title || !description || !fee || !image) {
      Toast.show({
        type: 'error',
        text1: 'Fill Required Fields',
        text2: 'Title, Description, Fee, and Image are required',
      });
      return;
    }

    setUploading(true);
    try {
      let imageId = null;
      if (image) {
        imageId = await uploadFile(image.uri, image.fileName, image.type);
      }

      const eventData = {
        clubName,
        title,
        description,
        registrationLink,
        date: date.toDateString(),
        location,
        fee: parseInt(fee),
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        regDeadline: regDeadline.toDateString(),
        imageId,
      };

      await addEvent(eventData);
      Toast.show({
        type: 'success',
        text1: '✅ Success !!',
        text2: 'Event Added Successfully !!',
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
      
      Toast.show({
        type: 'error',
        text1: 'Failed to add event !!',
        text2: 'Please try again.',
      });
    } finally {
      setUploading(false);
    }
  };

  return {
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
  };
};

export default useAddEventViewModel;
