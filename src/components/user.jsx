'use client'

import { useEffect } from "react"
import useUser from "@/store/useUser"
import getMe from "@/backend/actions/user/get-me.server"

function ClientSideUser() {
  const { setUser } = useUser();
  
  async function fetchUserData()
  {
    const res = await getMe();
    setUser(res.user);
  }

  useEffect(() => {
    const storedData = localStorage.getItem("user");

    if (!storedData)
    {
      const data = JSON.parse(storedData);
      setUser(data);
    }
    else {
      fetchUserData();
    }
  }, [setUser]);

  return null;
}

export default ClientSideUser