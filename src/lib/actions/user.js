import {User} from '../models/user.model'
import {connect} from '../mongodb/mongoose'

export const createOrUpdateUser=async(id,first_name,last_name,img_url,email_addresses,username)=>{
    try {
        await connect()
        const user=await User.findOneAndUpdate(
            {clerkId:id},
            {
                $set:{
                  firstName:first_name,
                  lastName:last_name,
                  profilePicture:img_url,
                  email:email_addresses[0].email_address,
                  username:username,
                }
            },{new:true,upsert:true}
        )
        return user;
    } catch (error) {
        console.log("Error Creating or Updating User",error);      
    }
}

export const deleteUser=async(id)=>{
    try {
        await connect();
        await User.findOneAndDelete({clerkId:id})
    } catch (error) {
        console.log("Error in Deleting the User",error)
    }
}