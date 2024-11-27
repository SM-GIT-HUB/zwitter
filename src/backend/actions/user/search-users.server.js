'use server'

import dbConnect from "@/backend/db"
import userModel from "@/backend/db/models/user.model"

async function searchUsers(userId, query)
{
    await dbConnect();

    let response = {};

    try {
        let { text } = query;
        text = text.toLowerCase();

        const users = await userModel.aggregate([
            { $match: { _id: { $ne: userId } } },
            {
                $match: { $or: [
                    { username: { $regex: text, $options: 'i' } },
                    { fullName: { $regex: text, $options: 'i' } }
                ] }
            },
            { $sample: { size: 10 } },
            { $project: { password: 0 } }
        ])

        response = { success: true, users };
    }
    catch(err) {
        console.log("error in search-users.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default searchUsers