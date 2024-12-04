'use server'

import dbConnect from "@/backend/db"
import postModel from "@/backend/db/models/post.model"

async function getAllPosts()
{
    await dbConnect();

    let response = {};

    try {
        const posts = await postModel.find().sort({ createdAt: -1 }).limit(100);

        await postModel.populate(posts, [
            { path: 'user', select: "-password" }
        ])

        response = { success: true, posts: JSON.parse(JSON.stringify(posts)) };
    }
    catch(err) {
        console.log("error in all-posts.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default getAllPosts