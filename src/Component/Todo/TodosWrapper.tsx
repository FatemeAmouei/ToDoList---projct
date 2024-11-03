import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import TodoItem from "./Todoitem";
import { Todo } from "./Todos.type";
import { todoWrapper, newtodowrapper } from "../styles";
import "../styles.css";

interface TodosWrapperProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (text: string) => void;
  updateTodo: (id: number, newText: string) => void;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
  onLogout: () => void;
}

const TodosWrapper: React.FC<TodosWrapperProps> = ({
  todos,
  setTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
  onLogout,
}) => {
  const [newText, setNewText] = useState("");

  const handleAddClick = () => {
    addTodo(newText);
    setNewText("");
  };

  const handleEditTodo = (id: number, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, todo: newText } : todo
      )
    );
  };

  return (
    <Container maxWidth="md">
      <Box sx={todoWrapper}>
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>

        <Box sx={newtodowrapper}>
          <TextField
            label="New Todo"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            fullWidth
          />
          <Button
            className="newtodo_btn"
            onClick={handleAddClick}
            variant="contained"
            color="primary"
          >
            Add Todo
          </Button>
        </Box>

        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggleComplete={toggleComplete}
              onEdit={handleEditTodo}
            />
          ))
        ) : (
          <Typography>No todos available</Typography>
        )}

        <Button onClick={onLogout} variant="contained" color="primary">
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default TodosWrapper;
