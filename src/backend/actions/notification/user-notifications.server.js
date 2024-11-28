'use server'

import dbConnect from "@/backend/db"
import userModel from "@/backend/db/models/user.model"

async function getNotifications(userId)
{
    await dbConnect();

    let response = {};

    try {
        const user = await userModel.findById(userId).select("notifications").populate({
            path: "notifications",
            options: { sort: { createdAt: -1 }, limit: 30 },
            populate: { path: "from", select: "username dp" }
        })

        if (!user)
        {
            response = { success: false, message: "User not found" };
            return;
        }

        response = { success: true, notifications: JSON.parse(JSON.stringify(user.notifications)) };
    }
    catch(err) {
        console.log("error in user-notifications.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default getNotifications