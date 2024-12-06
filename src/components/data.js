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
    try {
      const res = await getMe();

      if (!res.success) {
        throw new Error();
      }

      localStorage.setItem("user", JSON.stringify(res?.user));
      await fetchPosts(res?.user?._id);
    }
    catch(err) {
      console.log("no user");
    }
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

    if (!(storedData == "undefined"))
    {
      const data = JSON.parse(storedData);
      setUser(data);
      fetchPosts(data?._id);
    }
    else {
      fetchUserData();
    }
  }, [setUser]);

  return null;
}

export default ClientSideUser