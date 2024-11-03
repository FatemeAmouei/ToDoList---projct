import React, { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./utils/api";
import TodosWrapper from "./Component/Todo/TodosWrapper";
import { Todo } from "./Component/Todo/Todos.type";
import Login from "./Component/Login/Login";
import axios, { AxiosError } from "axios";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const limit = 10;
  const skip = 0;

  useEffect(() => {
    const fetchTodos = async () => {
      if (token) {
        try {
          const fetchedTodos = await getTodos(token, limit, skip);
          setTodos(fetchedTodos.todos);
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      }
    };

    fetchTodos();
  }, [token]);

  const handleAddTodo = async (newText: string) => {
    if (token && newText) {
      try {
        const newTodo = await addTodo(token, newText);
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        console.error(
          "Error adding todo:",
          axiosError.response ? axiosError.response.data : axiosError.message
        );
      }
    }
  };

  const handleUpdateTodo = async (id: number, newText: string) => {
    if (token) {
      try {
        const updatedTodo = await updateTodo(token, id, newText);
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (token) {
      try {
        await deleteTodo(token, id);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    }
  };

  const toggleComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const onLogin = (token: string) => {
    setToken(token);
  };

  const onLogout = () => {
    setToken(null);
    setTodos([]);
  };

  return (
    <div>
      {token ? (
        <TodosWrapper
          todos={todos}
          setTodos={setTodos}
          addTodo={handleAddTodo}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          toggleComplete={toggleComplete}
          onLogout={onLogout}
        />
      ) : (
        <Login onLogin={onLogin} />
      )}
    </div>
  );
};

export default App;
