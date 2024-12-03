'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/home');
    }, 2000)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-screen h-[90vh] font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-[18px] relative top-4 text-gray-700">Welcome To</h1>
      <h1 className="text-[60px] font-semibold tracking-[5px] text-[#104066]">Zwitter</h1>
    </div>
  )
}