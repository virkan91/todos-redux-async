import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getData, postTodo } from "../api/async";

export type TTEdit = {
  title: string;
  complete: boolean;
};
export type TTodo = {
  id: number;
  title: string;
  complete: boolean;
};

interface IInitialState {
  list: TTodo[];
  loading: boolean;
  title: string;
  modal: boolean;
  titleEdit: string;
  idx: number;
  completeX: boolean;
}

const initialState: IInitialState = {
  list: [],
  loading: false,
  title: "",
  modal: false,
  titleEdit: "",
  idx: 0,
  completeX: false,
};

const setLoadlin = (state: IInitialState) => {
  state.loading = true;
};
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    changeString(
      state: IInitialState,
      action: PayloadAction<{ type: "title" | "titleEdit"; value: string }>
    ) {
      state[action.payload.type] = action.payload.value;
    },
    changeBoolean(
      state: IInitialState,
      action: PayloadAction<{ type: "modal" | "completeX"; value: boolean }>
    ) {
      state[action.payload.type] = action.payload.value;
    },
    changeNumber(
      state: IInitialState,
      action: PayloadAction<{ type: "idx"; value: number }>
    ) {
      state[action.payload.type] = action.payload.value;
    },
  },
  extraReducers(builder) {
    builder.addCase(getData.pending, setLoadlin);
    builder.addCase(
      getData.fulfilled,
      (state: IInitialState, action: PayloadAction<TTodo[]>) => {
        state.list = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(getData.rejected, (state: IInitialState) => {
      state.loading = false;
    });

    
  },
});

export const { changeString, changeBoolean, changeNumber } =
  counterSlice.actions;
export default counterSlice.reducer;
