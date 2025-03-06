import {createSlice} from '@reduxjs/toolkit'

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        value: 0,
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        increment: (state) => {
     
            state.value += 1
          },
    }
})

export const {setPosts,increment} = postsSlice.actions
