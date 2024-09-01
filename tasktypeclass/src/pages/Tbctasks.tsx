import React, { useState, useEffect, FC } from "react";
import Cards from "../components/Home/Cards";

interface Task {
  id: string;  // Changed from number to string
  title: string;  // Added title property
  status: "Incomplete" | "Complete";  // Restricting status to specific values
  isImportant?: boolean;
}

const Tbctasks: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data: Task[]) => {
        const incompleteTasks = data.filter((task) => task.status === "Incomplete");
        setTasks(incompleteTasks);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const deleteTask = (id: string): void => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleEdit = (task: Task): void => {
    // Handle edit logic here
  };

  const toggleStatus = (task: Task): void => {
    const updatedTask: Task = {
      ...task,
      status: task.status === "Incomplete" ? "Complete" : "Incomplete",
    };

    fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((updatedTask: Task) => {
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
      })
      .catch((error) => console.error("Error updating task status:", error));
  };

  const toggleImportant = (id: string): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isImportant: !task.isImportant } : task
      )
    );
  };

  return (
    <div className="text-2xl font-bold mb-4">
      <h2>Tasks to be Completed</h2>
      <div className="mt-4">
        <Cards
          tasks={tasks}
          deleteTask={deleteTask}
          handleEdit={handleEdit}
          toggleStatus={toggleStatus}
        />
      </div>
    </div>
  );
};

export default Tbctasks;
