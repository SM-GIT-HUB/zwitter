'use server'

import dbConnect from "@/backend/db"
import postModel from "@/backend/db/models/post.model"
import userModel from "@/backend/db/models/user.model"

async function createPost(userId, form)
{
    await dbConnect();

    let response = {};

    try {
        const { text, img } = form;
        
        const user = await userModel.findById(userId);

        if (!user)
        {
            response = { success: false, message: "User not found" };
            return;
        }

        if (!text && !img)
        {
            response = { success: false, message: "Post must have text or image" };
            return;
        }

        const newPost = await postModel.create({
            user: userId,
            text,
            img
        })

        user.totalPosts += 1;
        user.posts.push(newPost._id);
        await user.save();

        const post = await newPost.populate('user', "-password");

        response = { success: true, post: JSON.parse(JSON.stringify(post)) };
    }
    catch(err) {
        console.log("error in create-post.server:", err.message);
        response = { success: false, message: 'Something went wrong' };
    }
    finally {
        return response;
    }
}


export default createPost