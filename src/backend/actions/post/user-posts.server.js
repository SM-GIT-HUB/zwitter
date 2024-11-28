'use server'

import dbConnect from "@/backend/db"
import userModel from "@/backend/db/models/user.model"

async function getUserPosts(userId)
{
    await dbConnect();

    let response = {};

    try {
        const user = await userModel.findById(userId).select("posts").populate({
            path: "posts",
            options: { sort: { createdAt: -1 }, limit: 100 }
        })

        if (!user)
        {
            response = { success: false, message: "User not found" };
            return;
        }

        response = { success: true, posts: JSON.parse(JSON.stringify(user.posts)) };
    }
    catch(err) {
        console.log("error in user-posts.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default getUserPosts