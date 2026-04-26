import { simplifi_username, simplifi_password } from '@env';

export const loginToSimplifi = async ()=>{
    try{
        const response = await fetch('https://abes.platform.simplifii.com/api/v1/admin/authenticate',
            {
            method:'post',
            headers:{
                'content-type':'application/json',
                'origin': "https://abes.web.simplifii.com"
            },

            body: JSON.stringify({
                username: simplifi_username,
                password: simplifi_password
            })
        })

        if(!response.ok){
            console.log('Login Failed',  response.status);
            return null;
        }

        const data= await response.json();
        return data.token;

    }catch(error){
        console.log('Error fetching token in auth.js', error);
        
    }
}