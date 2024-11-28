import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String
    },
    img: {
        type: String
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Comment",
        default: []
    },
    impressions: {
        type: Number,
        default: 0
    }
},  { timestamps: true })


const postModel = mongoose.models.postModel || mongoose.model("Post", postSchema);


export default postModel