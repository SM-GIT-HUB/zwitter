'use client'

import Post from "./Post"
import useFollowPosts from "@/store/useFollowPosts"
import usePosts from "@/store/usePosts"
import useShowPosts from "@/store/useShowPosts"

function Posts() {
  const { posts } = usePosts();
  const { followPosts } = useFollowPosts();
  const { postsToShow } = useShowPosts();
  
  const postsContent = (postsToShow == "for you")? posts : followPosts;

  return (
    <div>
      {
        postsContent?.map((p) => (
          <Post key={p?._id} post={p} navigateTo={`/post/${p?._id}`} />
        ))
      }
    </div>
  )
}

export default Posts