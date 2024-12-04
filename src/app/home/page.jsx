'use client'

import CreatePost from "@/components/CreatePost"
import Posts from "@/components/Posts/Posts"
import useFollowPosts from "@/store/useFollowPosts"
import usePosts from "@/store/usePosts"
import useUser from "@/store/useUser"
import { useState } from "react"

function Home() {
  const { user } = useUser();
  const { posts } = usePosts();
  const { followPosts } = useFollowPosts();
  const [postsToShow, setToShow] = useState("for you");

  const postsContent = (postsToShow == "for you")? posts : followPosts;

  function handleChange()
  {
    if (postsToShow == "for you") {
      setToShow("following");
    }
    else
      setToShow("for you");
  }

  return (
    <div>
      <div className="flex items-center justify-around h-[53px] bg-white border-b-[1px] sticky top-0">
        <button className={`flex flex-col items-center justify-center w-full h-full font-semibold text-gray-500 hover:bg-[rgba(107,114,128,0.17)] transition-all`} onClick={handleChange}>
          <h1 className={`${postsToShow == "for you"? "text-black" : ""}`}>For you</h1>
          <div className={`text-blue-500 w-[60px] border-[2px] rounded-full border-blue-500 absolute top-[48.5px] ${postsToShow == "for you"? "" : "hidden"}`}></div>
        </button>

        <button className={`flex flex-col items-center justify-center w-full h-full font-semibold text-gray-500 hover:bg-[rgba(107,114,128,0.17)] transition-all`} onClick={handleChange}>
          <h1 className={`${postsToShow == "following"? "text-black" : ""}`}>Following</h1>
          <div className={`text-blue-500 w-[75px] border-[2px] rounded-full border-blue-500 absolute top-[48.5px] ${postsToShow == "following"? "" : "hidden"}`}></div>
        </button>
      </div>

      <CreatePost userId={user?._id}/>
      
      <Posts posts={postsContent}/>
    </div>
  )
}

export default Home