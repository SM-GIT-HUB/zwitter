'use client'

import createPost from "@/backend/actions/post/create-post.server"
import usePosts from "@/store/usePosts"

function CreatePost({ userId }) {
  const { posts, setPosts } = usePosts();

  async function create()
  {
    const form = {
      text: "Hey this is a post you know?",
      img: "https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=1796&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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