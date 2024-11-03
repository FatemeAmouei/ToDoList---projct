import React, { useState } from "react";
import { Todo } from "./Todos.type";
import "../styles.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onToggleComplete,
  onEdit,
}) => {
  const [editText, setEditText] = useState(todo.todo);

  const handleEdit = () => {
    Swal.fire({
      title: "Edit your todo",
      input: "text",
      inputValue: editText,
      inputPlaceholder: "Enter new text",
      showCancelButton: true,
      confirmButtonText: "Save",
      preConfirm: (newText) => {
        if (!newText) {
          Swal.showValidationMessage("You need to write something!");
        } else {
          onEdit(todo.id, newText);
          setEditText(newText);
        }
      },
    });
  };
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(todo.id);
        Swal.fire("Deleted!", "Your todo has been deleted.", "success");
      }
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <p className="todo-text" onClick={() => onToggleComplete(todo.id)}>
        {todo.todo}
      </p>

      <div>
        <FontAwesomeIcon
          className="btn-icon"
          icon={faTrash}
          onClick={handleDelete}
        />
        <FontAwesomeIcon
          className="btn-icon"
          icon={faEdit}
          onClick={handleEdit}
        />
        <FontAwesomeIcon
          className="btn-icon"
          icon={faCheck}
          onClick={() => onToggleComplete(todo.id)}
        />
      </div>
    </div>
  );
};

export default TodoItem;
