'use client'

import { useState } from "react"
import CommentForm from "./CommentForm"
import Comment from "./Comment"

function CommentSection({ post, postId }) {
  const [comments, setComments] = useState(post.comments);

  return (
    <div className="px-[15px]">
      <CommentForm postId={postId} comments={comments} setComments={setComments}/>
      {
        comments?.map((c) => (
          <Comment key={c?._id} comment={c} comments={comments} setComments={setComments} />
        ))
      }
    </div>
  )
}

export default CommentSection