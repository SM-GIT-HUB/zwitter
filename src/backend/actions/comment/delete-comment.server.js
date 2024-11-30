'use server'

import dbConnect from "@/backend/db"
import commentModel from "@/backend/db/models/comment.model";

async function deleteComment(userId, commentId)
{
    await dbConnect();

    let response = {};

    try {
        const comment = await commentModel.findByIdAndDelete(commentId);

        if (!comment || comment.user.toString() != userId)
        {
            response = { success: false, message: "Invalid request" };
            return;
        }

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