import { getEvents } from "./appwrite"

export const handleModalEvents= async(clubName = null)=>{
    const getAllEvents= await getEvents();

    if(clubName){
        return getAllEvents.filter(event=> event.clubName === clubName);
    }

    return getAllEvents;
}