import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CvState {
  userCV: any | null;
}

const getInitialCV = () => {
  try {
    const saved = localStorage.getItem("userCV");
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
};

const initialState: CvState = {
  userCV: getInitialCV(),
};

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    setUserCV: (state, action: PayloadAction<any>) => {
      state.userCV = action.payload;
      if (action.payload) {
        localStorage.setItem("userCV", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("userCV");
      }
    },
  },
});

export const { setUserCV } = cvSlice.actions;
export default cvSlice.reducer;
