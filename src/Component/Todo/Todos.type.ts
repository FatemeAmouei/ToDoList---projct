export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

export interface TodosWrapperProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (text: string) => void;
  updateTodo: (id: number, newText: string) => void;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
  onLogout: () => void;
}

export interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}