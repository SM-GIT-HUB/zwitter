import deleteComment from "@/backend/actions/comment/delete-comment.server"
import useUser from "@/store/useUser"
import { formatPostDate } from "@/utils/formatDates"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"
import { GoTrash } from "react-icons/go"

function Comment({ comment, comments, setComments }) {
    const { user } = useUser();
    const commentOwner = comment?.user;
    const myComment = commentOwner?._id == user?._id;
    const formattedDate = formatPostDate(comment?.createdAt);

    async function handleDelete()
    {
        toast.dismiss();

        try {
            const res = await deleteComment(user?._id, comment?._id);

            if (!res.success) {
                throw new Error(res.message);
            }
            
            const newComments = comments.filter((c) => {
                return (c._id != comment._id);
            })

            toast.success("Comment deleted");
            setComments(newComments);
        }
        catch(err) {
            toast.error(err.message);
        }
    }

  return (
    <div className="flex items-center justify-center w-full ">
      	<div className='flex w-full gap-2 items-start justify-center p-4 border-b border-gray-300'>
			<div>
				<div className="w-10 rounded-full">
					<Link href={`/profile/${commentOwner?.username || null}`}>
						<Image src={commentOwner?.dp || null} width={900} height={40} alt="" className="rounded-full"/>
					</Link>
				</div>
			</div>

			<div className='flex flex-col flex-1'>
				<div className='flex gap-2 items-center justify-between'>
					<div className="flex gap-2 items-center">
                        <Link href={`/profile/${commentOwner?.username}`} className='font-bold'>
                            {commentOwner.fullName}
                        </Link>

                        <span className='text-gray-700 flex gap-1 text-sm'>
                            <Link href={`/profile/${commentOwner?.username}`}>@{commentOwner.username}</Link>
                            <span>·</span>
                            <span>{formattedDate}</span>
                        </span>
                    </div>

					{
                        myComment &&
                        <span className='flex justify-end flex-1'>
                            <GoTrash className='cursor-pointer hover:text-red-500' onClick={handleDelete}/>
                        </span>
                    }
				</div>
                <div>
                    {comment?.text}
                </div>
			</div>
		</div>
    </div>
  )
}

export default Comment