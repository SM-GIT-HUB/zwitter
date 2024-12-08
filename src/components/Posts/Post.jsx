import { formatPostDate } from "@/utils/formatDates"
import Image from "next/image"
import Link from "next/link"
import { FaRegComment } from "react-icons/fa"
import { IoStatsChartSharp } from "react-icons/io5"
import DeletePostButton from "./DeletePostButton"
import LikePostButton from "./LikePostButton"

function Post({ post, navigateTo }) {
	const postOwner = post?.user;
	const formattedDate = formatPostDate(post?.createdAt);

  return (
    <div className="flex items-center justify-center">
      	<div className='flex gap-2 items-start justify-center p-4 border-b border-gray-300'>
			<div>
				<div className="w-10 rounded-full">
					<Link href={`/profile/${postOwner?.username}`}>
						<Image src={postOwner?.dp} width={900} height={40} alt="" className="rounded-full"/>
					</Link>
				</div>
			</div>

			<div className='flex flex-col flex-1'>
				<div className='flex gap-2 items-center'>
					<Link href={`/profile/${postOwner?.username}`} className='font-bold'>
						{postOwner?.fullName}
					</Link>

					<span className='text-gray-700 flex gap-1 text-sm'>
						<Link href={`/profile/${postOwner?.username}`}>@{postOwner?.username}</Link>
						<span>·</span>
						<span>{formattedDate}</span>
					</span>

					<DeletePostButton post={post} />
				</div>

				<div className='flex flex-col gap-3 overflow-hidden'>
					<span>{post?.text}</span>
					{post?.img && (
						<Link href={navigateTo}>
							<Image src={post?.img} height={2000} width={2000} alt="post" className="rounded-[10px] w-full max-w-[600px]"/>
						</Link>
					)}
				</div>

				<div className='flex justify-between mt-3'>
					<div className='flex gap-4 items-center w-full justify-around'>
						<Link href={navigateTo}>
							<div className='flex gap-1 items-center group cursor-pointer' >
								<FaRegComment className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-green-500" />

								<span className="text-sm text-slate-500 group-hover:text-green-500" >
									{post?.comments.length}
								</span>
							</div>
						</Link>

						<LikePostButton post={post} />

						<Link href={navigateTo}>
							<div className='flex gap-1 items-center group cursor-pointer' >
								<IoStatsChartSharp className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-sky-500" />

								<span className="text-sm text-slate-500 group-hover:text-sky-500" >
									{post?.impressions}
								</span>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
    </div>
  )
}

export default Post