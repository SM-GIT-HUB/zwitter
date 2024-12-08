'use server'

import dbConnect from "@/backend/db"
import commentModel from "@/backend/db/models/comment.model"
import notificationModel from "@/backend/db/models/notification.model"
import postModel from "@/backend/db/models/post.model"
import userModel from "@/backend/db/models/user.model"

async function commentPost(userId, postId, text)
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

        if (!text)
        {
            response = { success: false, message: "Comment cannot be empty" };
            return;
        }

        const newComment = await commentModel.create({ user: userId, post: postId, text });
        post.comments.push(newComment._id);

        if (userId.toString() != post.user.toString())
        {
            const noti = await notificationModel.create({
                from: userId,
                to: post.user,
                type: "comment"
            })

            user.notifications.push(noti._id);
        }

        await Promise.all([post.save(), user.save()]);

        const comment = await newComment.populate("user", "-password");

        response = { success: true, comment: JSON.parse(JSON.stringify(comment)) };
    }
    catch(err) {
        console.log("error in comment-post.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default commentPost