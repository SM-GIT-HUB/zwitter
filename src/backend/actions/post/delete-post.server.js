'use server'

import dbConnect from "@/backend/db"
import postModel from "@/backend/db/models/post.model"
import userModel from "@/backend/db/models/user.model"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

async function deletePost(userId, postId)
{
    await dbConnect();

    let response = {};

    try {
        const post = await postModel.findOneAndDelete({ _id: postId, user: userId });

        if (!post)
        {
            response = { success: false, message: "Post not found or no access" };
            return;
        }

        if (post.img)
        {
            const imageId = post.img.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(imageId);
        }


        await userModel.findByIdAndUpdate(userId, {
            $inc: { totalPosts: -1 },
            $pull: { posts: postId }
        });

        response = { success: true, message: "Post deleted successfully" };
    }
    catch(err) {
        console.log("error in delete-post.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default deletePost