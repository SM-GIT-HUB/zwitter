import Post from "./Post"

function Posts({ posts }) {
  return (
    <div>
      {
        posts?.map((p) => (
          <Post key={p?._id} post={p} />
        ))
      }
    </div>
  )
}

export default Posts