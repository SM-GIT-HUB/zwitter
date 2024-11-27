'use server'

import dbConnect from "@/backend/db"
import userModel from "@/backend/db/models/user.model"

async function getSuggestedUsers(userId)
{
    await dbConnect();

    let response = {};

    try {
        const myFollowing = await userModel.findById(userId).select("following");

        const users = await userModel.aggregate([
            { $match: { _id: { $ne: userId} } },
            { $sample: { size: 10 } },
            { $project: { password: 0 } }
        ])

        const filteredUsers = users.filter((user) => !myFollowing.following.includes(user._id));
        const suggestedUsers = filteredUsers.slice(0, 4);

        response = { success: true, users: suggestedUsers };
    }
    catch(err) {
        console.log("error in suggested-users.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default getSuggestedUsers