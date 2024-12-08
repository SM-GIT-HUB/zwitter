'use server'

import dbConnect from "@/backend/db"
import commentModel from "@/backend/db/models/comment.model";
import postModel from "@/backend/db/models/post.model";

async function deleteComment(userId, commentId)
{
    await dbConnect();

    let response = {};

    try {
        const comment = await commentModel.findById(commentId);

        if (!comment || comment.user.toString() != userId)
        {
            response = { success: false, message: "Invalid request" };
            return;
        }

        const [c, p] = await Promise.all([
            commentModel.findByIdAndDelete(commentId),
            postModel.findByIdAndUpdate(comment.post, {
                $pull: { comments: commentId }
            })
        ])

        response = { success: true, message: "Comment deleted" };
    }
    catch(err) {
        console.log("error in delete-comment.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default deleteComment