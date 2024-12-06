'use client'

import deletePost from "@/backend/actions/post/delete-post.server"
import usePosts from "@/store/usePosts"
import useUser from "@/store/useUser"
import { usePathname, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { GoTrash } from "react-icons/go"

function DeletePostButton({ post }) {
    const router = useRouter();
    const pathName = usePathname();

    const { user } = useUser();
    const { posts, setPosts } = usePosts();
    
    const isMyPost = (user?._id == post?.user?._id);

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
            
            if (pathName == `/post/${post?._id}`) {
                router.back();
            }
        }
        catch(err) {
            toast.error(err.message);
        }
    }

  return (
    <>
        {
            isMyPost &&
            <span className='flex justify-end flex-1'>
				<GoTrash className='cursor-pointer hover:text-red-500' onClick={handleDelete} />
			</span>
        }
    </>
  )
}

export default DeletePostButton