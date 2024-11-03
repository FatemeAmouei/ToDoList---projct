import React, { useState } from "react";

type TodoFormProps = {
  addTodo: (text: string) => void; // تغییر نوع تابع به void
};

function TodoForm({ addTodo }: TodoFormProps) {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim()) {
      addTodo(value);
      setValue("");
    }
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        className="todo-input"
        placeholder="What is the task today?"
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;
