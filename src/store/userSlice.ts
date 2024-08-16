import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  isAuthenticated: boolean;
  Uid: string | null;
  token: string | null;
}

const initialState: UserState = {
  email: typeof window !== "undefined" ? localStorage.getItem("email") || "" : "",
  isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("token") : false,
  Uid: typeof window !== "undefined" ? localStorage.getItem("Uid") || null : null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") || null : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; Uid: string; token: string }>
    ) => {
      state.email = action.payload.email;
      state.Uid = action.payload.Uid;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        // Save to local storage
        localStorage.setItem("email", action.payload.email);
        localStorage.setItem("Uid", action.payload.Uid);
        localStorage.setItem("token", action.payload.token);
      }
    },
    logout: (state) => {
      state.email = "";
      state.Uid = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        // Clear local storage
        localStorage.removeItem("email");
        localStorage.removeItem("Uid");
        localStorage.removeItem("token");
      }
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
