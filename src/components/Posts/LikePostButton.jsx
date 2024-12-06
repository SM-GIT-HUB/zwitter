'use client'

import usePosts from "@/store/usePosts"
import useUser from "@/store/useUser"
import { FaRegHeart } from "react-icons/fa"

function LikePostButton({ post }) {
    const { user } = useUser();
    const { posts, setPosts } = usePosts();

    const isLiked = post?.likes.includes(user?._id);
  return (
    <div className='flex gap-1 items-center group cursor-pointer' >
        <FaRegHeart className={`w-4 h-4 cursor-pointer ${isLiked? "text-pink-500" : "text-slate-500 group-hover:text-pink-500"}`} />

        <span className={`text-sm group-hover:text-pink-500 ${isLiked ? "text-pink-500" : "text-slate-500"}`} >
            {post.likes.length}
        </span>
    </div>
)
}

export default LikePostButton