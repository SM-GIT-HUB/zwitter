import CreatePost from "@/components/posts/CreatePost"
import Posts from "@/components/posts/Posts"
import SetPosts from "@/components/posts/SetPosts"

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