import create from 'zustand';

const useStore = create((set) => ({
    likedIndices: [], 
    data: [],
    toggleLikedIndex: (index) => {
        set((state) => ({
            likedIndices: state.likedIndices.includes(index) ?
            state.likedIndices.filter((likedAnime) => likedAnime !== index) 
            :
            [...state.likedIndices, index]
        }))
    },
}))

export default useStore