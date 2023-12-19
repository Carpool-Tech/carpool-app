import { configureStore } from "@reduxjs/toolkit";
import userReducers from "@/reducers/user";

const userStore = configureStore({
  reducer: { userReducer: userReducers.userSlice },
});

export default userStore;
