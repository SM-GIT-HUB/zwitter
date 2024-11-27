'use server'

import dbConnect from "@/backend/db"
import userModel from "@/backend/db/models/user.model"

async function getUserProfile(username)
{
    await dbConnect();

    let response = {};

    try {
        const user = await userModel.findOne({ username }).select("-password");

        if (!user)
        {
            response = { success: false, message: "User not found" };
            return;
        }
        
        response = { success: true, user: JSON.parse(JSON.stringify(user)) };
    }
    catch(err) {
        console.log("error in user-profile.server: ", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default getUserProfile