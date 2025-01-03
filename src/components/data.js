'use client'

import { useEffect } from "react"
import useUser from "@/store/useUser"
import getMe from "@/backend/actions/user/get-me.server"
import usePosts from "@/store/usePosts"
import useFollowPosts from "@/store/useFollowPosts"
import getAllPosts from "@/backend/actions/post/all-posts.server"
import getFollowingPosts from "@/backend/actions/post/following-posts.server"

function ClientSideUser() {
  const { setUser } = useUser();
  const { setPosts } = usePosts();
  const { setFollowPosts } = useFollowPosts();
  
  

  useEffect(() => {
    
  }, [setUser]);

  return null;
}

export default ClientSideUser