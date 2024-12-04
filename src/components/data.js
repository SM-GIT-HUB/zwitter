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
  
  async function fetchUserData()
  {
    const res = await getMe();

    localStorage.setItem("user", JSON.stringify(res.user));
    await fetchPosts(res.user._id);
  }

  async function fetchPosts(id)
  {
    const [resP, resFp] = await Promise.all([
      getAllPosts(),
      getFollowingPosts(id)
    ])

    setPosts(resP?.posts);
    setFollowPosts(resFp?.posts);
  }

  useEffect(() => {
    const storedData = localStorage.getItem("user");

    if (storedData)
    {
      const data = JSON.parse(storedData);
      setUser(data);
      fetchPosts(data._id);
    }
    else {
      fetchUserData();
    }
  }, [setUser]);

  return null;
}

export default ClientSideUser