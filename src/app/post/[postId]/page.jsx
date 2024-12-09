import getPost from "@/backend/actions/post/get-post.server"
import CommentSection from "@/components/comments/CommentSection"
import Post from "@/components/posts/Post"
import toast from "react-hot-toast"

async function PostPage({ params }) {
  const { postId } = await params;
  const res = await getPost(postId);

  if (!res.success)
  {
    toast.error(res.message);
    return <></>;
  }

  const post = res.post;
  
  return (
    <>
      <Post post={post} navigateTo={'javascript:void(0)'} />
      <CommentSection post={post} postId={postId}/>
    </>
  )
}

export default PostPage;
