'use server'

import dbConnect from "@/backend/db"
import notificationModel from "@/backend/db/models/notification.model"
import postModel from "@/backend/db/models/post.model"
import userModel from "@/backend/db/models/user.model"

async function likeOrUnlike(userId, postId)
{
    await dbConnect();

    let response = {};

    try {
        const [user, post] = await Promise.all([
            userModel.findById(userId),
            postModel.findById(postId)
        ])

        if (!post)
        {
            response = { success: false, message: "Post not found" };
            return;
        }

        const likedByUser = post.likes.includes(userId);

        if (likedByUser)
        {            
            await Promise.all([
                user.updateOne({ $pull: { likesPosts: postId } }),
                post.updateOne({ $pull: { likes: userId } })
            ])

            const updatedPost = await postModel.findById(postId).select("likes");

            response = { success: true, likes: JSON.parse(JSON.stringify(updatedPost.likes)) };
        }
        else
        {
            post.likes.push(userId);

            await Promise.all([
                user.updateOne({ $push: { likedPosts: postId } }),
                post.updateOne({ $push: { likes: userId } })
            ])

            if (userId.toString() != post.user.toString())
            {
                const noti = await notificationModel.create({
                    from: userId,
                    to: post.user,
                    type: "like"
                })
    
                user.notifications.push(noti._id);
                await user.save();
            }

            response = { success: true, likes: JSON.parse(JSON.stringify(post.likes)) };
        }
    }
    catch(err) {
        console.log("error in like-unlike.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default likeOrUnlike