import User from "../models/user.model";
import { connect } from "../mongodb/mongoose";

export const createOrUpdateUser = async(
    id: string,
  first_name: string,
  last_name: string,
  image_url: string,
  email_addresses: { email_address: string }[]
    
)=>{
    
    try{

        await connect();
        const user = await User.findOneAndUpdate(
            { clerkId: id },
            { $set:{
                firstName:first_name,
                lastName:last_name,
                profilePicture:image_url,
                email:email_addresses[0].email_address,
            }
            },
            { upsert: true, new: true }
        );
         return user;
    }catch{
        console.error("Error creating or updating user");
        throw new Error("Failed to create or update user");
    }
}
export const deleteUser = async(id:string) => {
    try{
        await connect();
        await User.findOneAndDelete({ clerkId: id });
    }catch(error){
       console.log('Failed to delete user',error);
    }


 }