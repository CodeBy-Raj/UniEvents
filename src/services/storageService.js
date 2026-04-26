import { Storage, ID } from 'react-native-appwrite';
import { client } from './appwrite';
import { STORAGE_BUCKET_ID, DATABASE_ENDPOINT, DATABASE_PROJECT } from "@env";

const storage = new Storage(client);
const storageBucketId = STORAGE_BUCKET_ID;

// Function to upload file
export const uploadFile = async (fileUri, fileName, fileType) => {
  if (!storageBucketId) {
    console.error('Error: Storage Bucket ID is missing');
    return null;
  }

  try {
    const formData = new FormData();
    formData.append('fileId', ID.unique());
    formData.append('file', {
      name: fileName,
      type: fileType,
      uri: fileUri,
    });

    // Using manual fetch because SDK's createFile is returning undefined
    const response = await fetch(`${DATABASE_ENDPOINT}/storage/buckets/${storageBucketId}/files`, {
      method: 'POST',
      headers: {
        'X-Appwrite-Project': DATABASE_PROJECT,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Upload failed with status ${response.status}: ${text}`);
    }

    const json = await response.json();
    return json.$id;

  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Function to get file preview
export const getFilePreview = (fileId) => {
  if (!storageBucketId || !fileId) return null;
  try {
    const result = storage.getFilePreview(
      storageBucketId,
      fileId,
      2000, // width
      2000, // height
      'center', // gravity
      100 // quality
    );
    return result.href;
  } catch (error) {
    console.error('Error getting file preview:', error);
    return null;
  }
};
