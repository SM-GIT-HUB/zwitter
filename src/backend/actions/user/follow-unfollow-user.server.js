'use server'

import dbConnect from "@/backend/db"
import notificationModel from "@/backend/db/models/notification.model";
import userModel from "@/backend/db/models/user.model"

async function followOrUnfollowUser(currUserId, userId)
{
    await dbConnect();

    let response = {};

    try {
        if (currUserId == userId)
        {
            response = { success: false, message: "Can't follow or unfollow yourself" };
            return;
        }

        const currUser = await userModel.findById(currUserId).select("-password");
        const user = await userModel.findById(userId).select("-password");

        if (!currUser || !user)
        {
            response = { success: false, message: "User not found" };
            return;
        }

        const isFollowed = currUser.following.includes(userId);
        let message = "";

        if (isFollowed)
        {
            await currUser.updateOne({ $pull: { following: userId } });
            await user.updateOne({ $pull: { followers: currUserId } });

            message = `Unfollowed ${user.username}`;
        }
        else
        {
            await currUser.updateOne({ $push: { following: userId } });
            await user.updateOne({ $push: { followers: currUserId } });

            const notification = await notificationModel.create({
                type: "follow",
                from: currUserId,
                to: userId
            })

            await user.updateOne({ $push: { notifications: notification._id } });
            message = `Following ${user.username}`;
        }

        response = { success: true, message };
    }
    catch(err) {
        console.log("error in follow-unfollow.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default followOrUnfollowUser