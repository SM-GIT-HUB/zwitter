'use server'

import dbConnect from "@/backend/db"
import postModel from "@/backend/db/models/post.model"

async function getPost(postId)
{
    await dbConnect();

    let response = {};

    try {
        const post = await postModel.findByIdAndUpdate(postId,
            { $inc: { impression: 1 } },
            { new: true }
        ).populate({ path: "user", select: "username dp" })

        
        if (!post)
        {
            response = { success: false, message: "Post not found" };
            return;
        }
            
        await postModel.populate(post, [
            { path: "comments", populate: { path: "user", select: "username dp" } }
        ])

        response = { success: true, post: JSON.parse(JSON.stringify(post)) };
    }
    catch(err) {
        console.log("error in get-post.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default getPost