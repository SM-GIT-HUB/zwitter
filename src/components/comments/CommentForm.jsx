import commentPost from "@/backend/actions/comment/comment-post.server";
import useUser from "@/store/useUser"
import Image from "next/image"
import { useState } from "react"
import toast from "react-hot-toast";

function CommentForm({ postId, comments, setComments }) {
    const { user } = useUser();
    const [text, setText] = useState("");

    async function handleSubmit(e)
    {
		e.preventDefault();
		toast.dismiss();

		try {
			const res = await commentPost(user?._id, postId, text);

			if (!res.success) {
				throw new Error(res.message);
			}

			setComments([res.comment, ...comments]);
			toast.success("Comment added");
			setText("");
		}
		catch(err) {
			toast.error(err.message);
		}
    }

  return (
    <div className='flex p-4 items-start gap-4 border-b border-gray-300 justify-center'>
		<div>
			<div className='w-8 rounded-full'>
				{
					user?.dp? <Image src={user?.dp} height={100} width={400} alt="dp" className="rounded-full"/> :
					""
				}
			</div>
		</div>

		<form action="" className="w-full flex flex-col gap-2 items-start" onSubmit={handleSubmit}>
			<textarea type="text" placeholder="Add a comment" className="w-full outline-none resize-none" value={text} onChange={(e) => setText(e.target.value)} />
			<button type="submit" className="bg-[rgb(29,155,240)] rounded-full px-[20px] py-[5px] text-white hover:bg-[rgb(26,139,213)]">
				Post
          	</button>
		</form>
	</div>
  )
}

export default CommentForm