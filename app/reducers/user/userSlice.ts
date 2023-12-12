import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface iUser {
  name: string
  email: string
}

const initialState = {
  name: '',
  email: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    createUser: (state, action:PayloadAction<iUser>)=>{
      state.email = action.payload.email
      state.name = action.payload.name
    }
  }
})

export const { createUser } = userSlice.actions

export default userSlice.reducer
