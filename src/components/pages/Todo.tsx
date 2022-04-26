import { FC, useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Paper } from "@mui/material";
import { Box } from "@mui/system";

type ToDo = {
  id: number;
  name: string;
  status: "Done" | "To Do";
};

const list: Array<ToDo> = [
  {
    id: 1,
    name: "Eat Breakfast",
    status: "Done",
  },
  {
    id: 2,
    name: "Pay Bills",
    status: "To Do",
  },
  {
    id: 3,
    name: "Work Out",
    status: "To Do",
  },
];

const Todo: FC = () => {
  const [todoList, setTodoList] = useState<Record<string, ToDo>>({});

  useEffect(() => {
    setTodoList(list.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {}));
  }, []);

  const handleCompleteToDo = (id: number) => {
    setTodoList({ ...todoList, [id]: { ...todoList[id], status: "Done" } });
  };

  return (
    <Paper
      variant="outlined"
      className="rounded-none my-4 mx-auto p-4 max-w-xl self-center flex justify-between sticky top-0"
    >
      {Object.values(todoList).length ? (
        <>
          <Box>
            <Box>To Do</Box>
            {Object.values(todoList)
              .filter((todo: ToDo) => todo.status === "To Do")
              .map((todo: ToDo) => (
                <Box>
                  <FormControlLabel
                    control={<Checkbox />}
                    key={todo.id}
                    id={`${todo.id}`}
                    label={todo.name}
                    onClick={() => handleCompleteToDo(todo.id)}
                  />
                </Box>
              ))}
          </Box>
          <Box>
            <Box>Done</Box>
            {Object.values(todoList)
              .filter((todo: ToDo) => todo.status === "Done")
              .map((todo: ToDo) => (
                <Box key={todo.id}>{todo.name}</Box>
              ))}
          </Box>
        </>
      ) : (
        <Box></Box>
      )}
    </Paper>
  );
};

export default Todo;
