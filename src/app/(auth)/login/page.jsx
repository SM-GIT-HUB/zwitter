'use client'

import { MdPassword } from "react-icons/md"
import { FaUserAlt } from "react-icons/fa"
import Link from "next/link"
import toast, { Toaster } from "react-hot-toast"
import { useState } from "react"
import { useRouter } from "next/navigation"
import useUser from "@/store/useUser"
import login from "@/backend/actions/auth/login.server"

function Login() {
  const router = useRouter();
  let classU = "flex items-center justify-start border border-gray-800 rounded-[4px] px-[15px] py-[10px] gap-[8px]";
  
  const initialForm = {
    username: "",
    password: ""
  }

  const [form, setForm] = useState(initialForm);
  const { setUser } = useUser();

  async function handleSubmit(e)
  {
    e.preventDefault();
    toast.dismiss();
    
    try {
      if (!checkValid(form)) {
        return;
      }

      const response = await login(form);

      if (!response.success)
      {
        toast.error(response.message);
        return;
      }

      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);

      router.push('/home');
      toast.success("Login successful");

      setForm(initialForm);
    }
    catch(err) {
      toast.error(err.message);
    }
  }

  return (
    <div className='flex flex-col gap-[10px] items-center justify-center h-screen w-screen'>
      <form className='flex flex-col text-[18px] w-[390px] sm:w-[400px] gap-[5px]' onSubmit={handleSubmit}>
          <div className={classU}>
            <FaUserAlt/>
            <input type="text" placeholder="Username" name="username" className="outline-none w-full" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          </div>

          <div className={classU}>
            <MdPassword/>
            <input type="password" placeholder="Password" name="password" className="outline-none w-full" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>

          <button type="submit" className="bg-[rgb(29,155,240)] rounded-full p-[6px] text-white text-[18px] hover:bg-[rgb(26,139,213)]">
            Login
          </button>
      </form>

      <div className="flex flex-col gap-[5px]">
        <h1>Don't have an account?</h1>

        <Link href={'/signup'}>
            <button className="border-[1px] border-black rounded-full p-[5px] text-[rgb(31,123,184)] text-[18px] hover:bg-[rgba(29,156,240,0.22)] w-full">
              Signup
            </button>
        </Link>
      </div>
    </div>
  )
}

export default Login


function checkValid(form)
{
  if (!form.username || !form.password)
  {
    toast.error("Please fill in all the details");
    return false;
  }

  if (form.password.length < 4)
  {
    toast.error("Password must be at least 4 chars");
    return false;
  }

  return true;
}