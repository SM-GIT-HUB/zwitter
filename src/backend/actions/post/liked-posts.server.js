'use server'

import dbConnect from "@/backend/db"
import userModel from "@/backend/db/models/user.model"

async function getLikedPosts(userId)
{
    await dbConnect();

    let response = {};

    try {
        const user = await userModel.findById(userId).select("likedPosts").populate({
            path: "likedPosts",
            populate: { path: 'user', select: "-password" }
        });

        if (!user)
        {
            response = { success: false, message: "User not found" };
            return;
        }

        response = { success: true, posts: JSON.parse(JSON.stringify(user.likedPosts)) };
    }
    catch(err) {
        console.log("error in liked-posts.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default getLikedPosts