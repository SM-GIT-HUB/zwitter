'use server'

import dbConnect from "@/backend/db"
import notificationModel from "@/backend/db/models/notification.model"
import userModel from "@/backend/db/models/user.model"

async function deleteNotification(userId, nId)
{
    await dbConnect();

    let response = {};

    try {
        const [user, noti] = await Promise.all([
            userModel.findById(userId),
            notificationModel.findById(nId)
        ])

        if (!user)
        {
            response = { success: false, message: "User not found" };
            return;
        }

        if (!noti || noti.to.toString() != userId)
        {
            response = { success: false, message: "Inavlid request" };
            return;
        }

        await Promise.all([
            user.updateOne({ $pull: { notifications: nId } }),
            notificationModel.findByIdAndDelete(noti._id)
        ])

        response = { success: true, message: "Notification deleted" };
    }
    catch(err) {
        console.log("error in delete-notification.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default deleteNotification