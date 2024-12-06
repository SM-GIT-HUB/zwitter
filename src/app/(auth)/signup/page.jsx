'use client'

import { MdOutlineDriveFileRenameOutline, MdPassword } from "react-icons/md"
import { FaUserAlt, FaEnvelope, FaBalanceScaleRight } from "react-icons/fa"
import Link from "next/link"
import toast from "react-hot-toast"
import { useState } from "react"
import signUp from "@/backend/actions/auth/signup.server"
import { useRouter } from "next/navigation"
import useUser from "@/store/useUser"

function Signup() {
  const router = useRouter();
  let classU = "flex items-center justify-start border border-gray-800 rounded-[4px] px-[15px] py-[10px] gap-[8px]";
  
  const initialForm = {
    fullName: "",
    username: "",
    email: "",
    password: ""
  }

  const [confirmPassword, setCP] = useState("");

  const [form, setForm] = useState(initialForm);
  const { setUser } = useUser();

  async function handleSubmit(e)
  {
    e.preventDefault();
    toast.dismiss();
    
    try {
      if (!checkValid(form, confirmPassword)) {
        return;
      }

      const response = await signUp(form);

      if (!response.success)
      {
        toast.error(response.message);
        return;
      }

      localStorage.setItem("user", JSON.stringify(response.user));
      setUser(response.user);

      router.push('/home');
      toast.success("Signup successful");

      setForm(initialForm);
    }
    catch(err) {
      toast.error(err.message);
    }
  }

  return (
    <div className='flex flex-col gap-[10px] items-center justify-center h-screen w-screen'>
      <form className='flex flex-col text-[18px] w-[390px] sm:w-[500px] gap-[5px]' onSubmit={handleSubmit}>
          <div className={classU}>
            <MdOutlineDriveFileRenameOutline/>
            <input type="text" placeholder='Full Name' name="fullName" className="outline-none w-full" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          </div>

          <div className="flex flex-col gap-[5px] sm:flex-row sm:justify-between">
            <div className={classU}>
              <FaUserAlt/>
              <input type="text" placeholder="Username" name="username" className="outline-none sm:w-[190px]" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            </div>
            
            <div className={classU}>
              <FaEnvelope/>
              <input type="text" placeholder="Email (optional)" name="email" className="outline-none sm:w-[190px]" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>

          <div className={classU}>
            <MdPassword/>
            <input type="password" placeholder="Password" name="password" className="outline-none" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>

          <div className={classU}>
            <FaBalanceScaleRight/>
            <input type="password" placeholder="Confirm password" name="confirmPassword" className="outline-none" value={confirmPassword} onChange={(e) => setCP(e.target.value)} />
          </div>

          <button type="submit" className="bg-[rgb(29,155,240)] rounded-full p-[6px] text-white text-[18px] hover:bg-[rgb(26,139,213)]">
            Signup
          </button>
      </form>

      <div className="flex flex-col gap-[5px]">
        <h1>Already have an account?</h1>

        <Link href={'/login'}>
            <button className="border-[1px] border-black rounded-full p-[5px] text-[rgb(31,123,184)] text-[18px] hover:bg-[rgba(29,156,240,0.22)] w-full">
            Login
            </button>
        </Link>
      </div>
    </div>
  )
}

export default Signup


function checkValid(form, cp)
{
  let hey = "hey";
  if (!form.fullName || !form.username || !form.password || !cp)
  {
    toast.error("Please fill in all the details");
    return false;
  }

  if (form.password.length < 4)
  {
    toast.error("Password must be at least 4 chars");
    return false;
  }

  if (form.password != cp)
  {
    toast.error("Passwords do not match");
    return false;
  }

  return true;
}