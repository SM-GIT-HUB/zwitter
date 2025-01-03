import CreatePost from "@/components/posts/CreatePost"
import Posts from "@/components/posts/Posts"
import SetPosts from "@/components/posts/SetPosts"
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs"
import { auth, currentUser } from "@clerk/nextjs/server"

async function Home() {
  const user = await currentUser();
  // console.log(await auth(), "auth");
  // console.log(user);

  return (
    <div>
      <SignedOut>
        <SignInButton/>
      </SignedOut>

      <SignedIn>
        <UserButton/>
      </SignedIn>
      
      {/* <UserButton/> */}

      <SetPosts />

      <CreatePost />
      
      <Posts />
    </div>
  )
}

export default Home