import { loginToSimplifi } from "./simplifiAuth.js";


export const getStudentData = async (token) => {
  try {
    // Token is now passed as an argument
    // const token = await loginToSimplifi(); 
    console.log('✅ Using provided token:', token ? 'Token exists' : 'No token');

    if (!token) {
      console.log("failed to get token");
      return null;
    }

    const response = await fetch(
      'https://abes.platform.simplifii.com/api/v1/custom/getCFMappedWithStudentID?embed_attendance_summary=1',
      {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
 console.log('🔁 Fetch status:', response.status);
 const textRes= await response.text();
 console.log("Respnse body :",textRes);
 

    if (!response.ok) {
     console.log('❌ Fetch failed. Response:', textRes);
      return null;
    }

    const data = JSON.parse(textRes);
    // const data= JSON.parse(textRes);
    console.log('📦 Received data Successfully '); 
    
    return data;

  }catch(err) {
    console.error('❌ Error in getStudentData():', err);
    return null;
  }
};
