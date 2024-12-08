'use client'

import createPost from "@/backend/actions/post/create-post.server"
import usePosts from "@/store/usePosts"
import useUser from "@/store/useUser"

function CreatePost() {
  const { user } = useUser();
  const { posts, setPosts } = usePosts();

  const userId = user?._id;

  async function create()
  {
    const form = {
      text: "Hey this is a post you know?",
      img: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
    const res = await createPost(userId, form);
    const post = res.post;
    setPosts([ post, ...posts ]);
  }

  return (
    <div>
      <button className="border border-black" onClick={create}>Create post</button>
    </div>
  )
}

export default CreatePost