'use server'

import dbConnect from "@/backend/db"
import userModel from "@/backend/db/models/user.model"

async function getFollowingPosts(userId)
{
    await dbConnect();

    let response = {};

    try {
        const user = await userModel.findById(userId).select("following").populate({
            path: "following",
            populate: {
                path: "posts",
                options: { sort: { createdAt: -1 }, limit: 50 },
                populate: { path: 'user', select: "-password" }
            }
        })

        if (!user)
        {
            response = { success: false, message: "User not found" };
            return;
        }

        const allPosts = user.following.flatMap(followingUser => followingUser.posts);

        const posts = allPosts.slice(0, 100);

        response = { success: true, posts: JSON.parse(JSON.stringify(posts)) };
    }
    catch(err) {
        console.log("error in following-posts.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default getFollowingPosts