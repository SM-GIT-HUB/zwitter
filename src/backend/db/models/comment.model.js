import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    text: {
        type: String,
        required: true
    }
},  { timestamps: true })


const commentModel = mongoose.models.commentModel || mongoose.model("Comment", commentSchema);


export default commentModel