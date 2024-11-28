'use server'

import dbConnect from "@/backend/db"
import notificationModel from "@/backend/db/models/notification.model";
import userModel from "@/backend/db/models/user.model"

async function deleteNotifications(userId)
{
    await dbConnect();

    let response = {};

    try {
        const user = await userModel.findById(userId).select("notifications");

        if (!user)
        {
            response = { success: false, message: "User not found" };
            return;
        }

        await notificationModel.deleteMany({ _id: { $in: user.notifications } });

        await user.updateOne({ notifications: [] });

        response = { success: true, message: "All notifications deleted" };
    }
    catch(err) {
        console.log("error in delete-notifications.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default deleteNotifications