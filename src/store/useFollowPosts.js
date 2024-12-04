import { create } from "zustand"

const useFollowPosts = create((set) => ({
    followPosts: [],
    setFollowPosts: (followPosts) => set({ followPosts })
}))


export default useFollowPosts