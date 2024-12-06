'use client'

import CreatePost from "@/components/Posts/CreatePost"
import Posts from "@/components/Posts/Posts"
import SetPosts from "@/components/Posts/SetPosts"

function Home() {
  return (
    <div>
      <SetPosts />

      <CreatePost />
      
      <Posts />
    </div>
  )
}

export default Home