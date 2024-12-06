import { create } from "zustand"

const useShowPosts = create((set) => ({
    postsToShow: "for you",
    setToShow: (postsToShow) => set({ postsToShow })
}))


export default useShowPosts