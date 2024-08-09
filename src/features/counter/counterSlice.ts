import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserInfoo {
  id: string | undefined;
  affiname: string | undefined;
  email: string | undefined;
  interest: string[]; // Assuming interests are strings
  picture: string | undefined; // Assuming picture is a string
}
export interface CounterState {
  value: number;
  value2: number;
  ReRender: boolean;
  ReRenderOfSignup: boolean;
  canResetpwd: boolean;
  userEmail: {
    affinameList?: [];
    emailOrUsername: string | undefined;
  };
  interest: boolean;
  userInfo: UserInfoo;
}

const initialState: CounterState = {
  value: 0,
  value2: 10,
  ReRender: false,
  ReRenderOfSignup: false,
  canResetpwd: false,
  userEmail: {
    affinameList: [],
    emailOrUsername: undefined
  },
  interest: false,
  userInfo: {
    affiname: undefined,
    email: undefined,
    id: undefined,
    interest: [],
    picture: undefined,
  },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    ReRender: (state) => {
      state.ReRender = !state.ReRender;
      // state.reRender = action.payload;
    },
    ReRenderOfSignup: (state) => {
      state.ReRenderOfSignup = !state.ReRenderOfSignup;
    },
    canResetpwd: (state) => {
      state.canResetpwd = !state.canResetpwd;
    },
    userEmail: (state, action: PayloadAction<{emailOrUsername:string; affinameList?:[]}>) => {
      state.userEmail = action.payload;
    },
    interest: (state) => {
      state.interest = !state.interest;
    },
    userInfo: (state, action: PayloadAction<UserInfoo>) => {
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  ReRender,
  ReRenderOfSignup,
  canResetpwd,
  userEmail,
  interest,
  userInfo,
} = counterSlice.actions;

export default counterSlice.reducer;
