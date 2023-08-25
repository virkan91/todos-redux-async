import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TTEdit, TTodo } from "../reducers/todosSlice";

const api = "http://localhost:3000/data";

// GET
export const getData = createAsyncThunk("todos/getData", async () => {
  try {
    const { data } = await axios.get(api);
    return data;
  } catch (error) {
    return error;
  }
});
// DELETE
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number, { dispatch }) => {
    try {
      const { data } = await axios.delete(`${api}/${id}`);
      dispatch(getData());
      return data;
    } catch (error) {
      return error;
    }
  }
);
// POST
export const postTodo = createAsyncThunk(
  "todos/postTodo",
  async (title: string, { dispatch }) => {
    const newTodo: TTodo = {
      id: Date.now(),
      title: title,
      complete: false,
    };
    try {
      const { data } = await axios.post(api, newTodo);
      dispatch(getData());
      return data;
    } catch (error) {
      return error;
    }
  }
);
// put - complete
export const putTodo = createAsyncThunk(
  "todos/putTodo",
  async (newTodo: TTodo, { dispatch }) => {
    const newT: TTEdit = {
      title: newTodo.title,
      complete: newTodo.complete,
    };
    try {
      const { data } = await axios.put(`${api}/${newTodo.id}`, newT);
      dispatch(getData());
      return data;
    } catch (error) {
      return error;
    }
  }
);
