import axios from 'axios';
import { Todo } from "../Component/Todo/Todos.type";

const API_URL = 'https://dummyjson.com';

const api = axios.create({
  baseURL: API_URL,
});

export const getTodos = async (token: string, limit: number, skip: number): Promise<{ todos: Todo[]; total: number }> => {
  const response = await api.get(`/todos?limit=${limit}&skip=${skip}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addTodo = async (token: string, newText: string) => {
  const response = await api.post('/todos/add', {
    userId: 1,
    todo: newText
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const updateTodo = async (token: string, id: number, newText: string): Promise<Todo> => {
  const response = await api.put(
    `/todos/${id}`,
    { text: newText },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteTodo = async (token: string, id: number): Promise<void> => {
  await api.delete(`/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
