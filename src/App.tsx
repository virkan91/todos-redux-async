import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import {
  TTodo,
  changeBoolean,
  changeNumber,
  changeString,
} from "./reducers/todosSlice";
import { deleteTodo, getData, postTodo, putTodo } from "./api/async";

// import icons
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const dispatch = useAppDispatch();
  const list = useAppSelector(({ todos }) => todos.list);
  const title = useAppSelector(({ todos }) => todos.title);
  const modal = useAppSelector(({ todos }) => todos.modal);
  const titleEdit = useAppSelector(({ todos }) => todos.titleEdit);
  const idx = useAppSelector(({ todos }) => todos.idx);
  const completeX = useAppSelector(({ todos }) => todos.completeX);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  return (
    <div className="max-w-[400px] m-auto bg-white p-[20px] drop-shadow-lg ">
      <h1 className="text-[30px] font-medium text-[blue] text-center"> TodoList-Async </h1>
      {/* form add */}
      <form className="py-[30px]"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          dispatch(postTodo(title));
          dispatch(changeString({ type: "title", value: "" }));
        }}
      >
        <div className="flex gap-3 justify-between">
          <input
            className=" p-[2px] outline"
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(
                changeString({ type: "title", value: event.target.value })
              );
            }}
            type="text"
            placeholder="Name:"
          />
          <button type="submit" className="bg-blue-600 text-[#fff] px-[10px] rounded-md">Добавить</button>
        </div>
      </form>
      {/* map */}
      <div>
        {list.map((todo: TTodo) => {
          return (
            <div key={todo.id} className="">
              <div className="grid grid-cols-[auto_30px_30px_30px] items-center ">
                <span>{todo.complete ? <s style={{color:"red"} }>{todo.title}</s> : todo.title}</span>
                
                <input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const newTodo: TTodo = {
                      id: todo.id,
                      title: todo.title,
                      complete: event.target.checked,
                    };
                    dispatch(putTodo(newTodo));
                  }}
                  type="checkbox"
                  checked={todo.complete}
                />

                <IconButton onClick={() => dispatch(deleteTodo(todo.id))}>
                  <DeleteIcon color="error" />
                </IconButton>

                <IconButton
                  onClick={() => {
                    dispatch(changeBoolean({ type: "modal", value: true }));
                    dispatch(
                      changeString({ type: "titleEdit", value: todo.title })
                    );
                    dispatch(
                      changeBoolean({ type: "completeX", value: todo.complete })
                    );
                    dispatch(changeNumber({ type: "idx", value: todo.id }));
                  }}
                >
                  <EditIcon color="primary" />
                </IconButton>
              </div>
            </div>
          );
        })}
        {/* modal edit */}
        {modal && (
          <div className="absolute top-0 left-0 flex justify-center items-center h-screen w-full bg-black/50">
            <form
              className="bg-white text-black p-[20px] rounded-[10px]"
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const newTodo: TTodo = {
                  id: idx,
                  title: titleEdit,
                  complete: completeX,
                };
                dispatch(putTodo(newTodo));
                dispatch(changeBoolean({ type: "modal", value: false }));
              }}
            >
              <div>
                <span
                  className="top-0 left-0 flex justify-end"
                  onClick={() =>
                    dispatch(changeBoolean({ type: "modal", value: false }))
                  }
                  style={{ cursor: "pointer" }}
                >
                  X
                </span>
              </div>
              <div className="flex gap-4">
                <input
                  className="outline"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(
                      changeString({
                        type: "titleEdit",
                        value: event.target.value,
                      })
                    );
                  }}
                  value={titleEdit}
                  type="text"
                  placeholder="title for change:"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-[#fff] p-[3px] px-[10px] rounded-[10px]"
                >
                  Edit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
