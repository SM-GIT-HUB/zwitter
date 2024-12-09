'use client'

import likeOrUnlike from "@/backend/actions/post/like-unlike.server";
import usePosts from "@/store/usePosts"
import useUser from "@/store/useUser"
import toast from "react-hot-toast"
import { FaRegHeart } from "react-icons/fa"

function LikePostButton({ post }) {
    const { user } = useUser();
    const { posts, setPosts } = usePosts();

    const isLiked = post?.likes.includes(user?._id);

    async function handleSubmit()
    {
        toast.dismiss();

        try {
            const res = await likeOrUnlike(user?._id, post?._id);

            if (!res.success) {
                throw new Error(res.message);
            }

            const newPosts = posts.map((p) => {
                if (p._id == post._id)
                {
                    if (isLiked) {
                        p.likes = p.likes.filter((pId) => {
                            return (pId != user._id);
                        })
                    }
                    else
                        p.likes.push(user._id);

                    return p;
                }
                else
                    return p;
            })

            setPosts(newPosts);
        }
        catch(err) {
            toast.error(err.message);
        }
    }

  return (
    <div className='flex gap-1 items-center group cursor-pointer' onClick={handleSubmit} >
        <FaRegHeart className={`w-4 h-4 cursor-pointer ${isLiked? "text-pink-500" : "text-slate-500 group-hover:text-pink-500"}`}/>

        <span className={`text-sm group-hover:text-pink-500 ${isLiked ? "text-pink-500" : "text-slate-500"}`} >
            {post?.likes.length}
        </span>
    </div>
)
}

export default LikePostButton