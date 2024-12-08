import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    text: {
        type: String,
        required: true
    }
},  { timestamps: true })


const commentModel = mongoose.models.Comment || mongoose.model("Comment", commentSchema);


export default commentModel