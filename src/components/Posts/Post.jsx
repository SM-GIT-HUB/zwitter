'use client'

import deletePost from "@/backend/actions/post/delete-post.server"
import usePosts from "@/store/usePosts"
import useUser from "@/store/useUser"
import { formatPostDate } from "@/utils/formatDates"
import Image from "next/image"
import Link from "next/link"
import toast, { Toaster } from "react-hot-toast"
import { FaRegBookmark, FaRegHeart, FaTrash } from "react-icons/fa"

function Post({ post }) {
  const { user } = useUser();
  const { posts, setPosts } = usePosts();

  const postOwner = post?.user;
	const isLiked = post?.likes.includes(user?._id);
	const isMyPost = user?._id == post?.user?._id;
	const formattedDate = formatPostDate(post?.createdAt);

  async function handleDelete()
  {
    toast.dismiss();

    try {
      const response = await deletePost(user?._id, post?._id);

      if (!response.success) {
        throw new Error(response.message);
      }

      const newPosts = posts?.filter((p) => {
        return (p._id != post?._id);
      })

      setPosts(newPosts);
      toast.success("Post deleted");
    }
    catch(err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className='flex gap-2 items-start justify-center p-4 border-b border-gray-300'>
				<div>
					<div className="w-10 rounded-full">
						<Link href={`/profile/${postOwner.username}`}>
							<Image src={postOwner.dp} width={900} height={40} alt="" className="rounded-full"/>
						</Link>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-2 items-center'>
						<Link href={`/profile/${postOwner.username}`} className='font-bold'>
							{postOwner.fullName}
						</Link>

						<span className='text-gray-700 flex gap-1 text-sm'>
							<Link href={`/profile/${postOwner.username}`}>@{postOwner.username}</Link>
							<span>·</span>
							<span>{formattedDate}</span>
						</span>

						{isMyPost && (
							<span className='flex justify-end flex-1'>
								<FaTrash className='cursor-pointer hover:text-red-500' onClick={handleDelete} />
							</span>
						)}
					</div>

					<div className='flex flex-col gap-3 overflow-hidden'>
						<span>{post.text}</span>
						{post?.img && (
              <Image src={post.img} height={2000} width={2000} alt="post" className="rounded-[10px] w-full max-w-[600px]"/>
						)}
					</div>
					<div className='flex justify-between mt-3'>
						<div className='flex gap-4 items-center w-2/3 justify-between'>
							<div className='flex gap-1 items-center group cursor-pointer' >
                <FaRegHeart className={`w-4 h-4 cursor-pointer ${isLiked? "text-pink-500" : "text-slate-500 group-hover:text-pink-500"}`} />

								<span className={`text-sm group-hover:text-pink-500 ${isLiked ? "text-pink-500" : "text-slate-500"}`} >
									{post.likes.length}
								</span>
							</div>
							<div className='flex gap-1 items-center group cursor-pointer' >
                <FaRegHeart className={`w-4 h-4 cursor-pointer ${isLiked? "text-pink-500" : "text-slate-500 group-hover:text-pink-500"}`} />

								<span className={`text-sm group-hover:text-pink-500 ${isLiked ? "text-pink-500" : "text-slate-500"}`} >
									{post.likes.length}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
    </div>
  )
}

export default Post