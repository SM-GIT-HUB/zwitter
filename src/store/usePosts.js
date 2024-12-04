import { create } from "zustand"

const usePosts = create((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts })
}))


export default usePosts