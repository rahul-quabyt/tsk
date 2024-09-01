import React, { useState, useEffect, FC } from "react";
import Cards from "../components/Home/Cards";

interface Task {
  id: number;
  status: string;
}

const Comptasks: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data: Task[]) => {
        const completedTasks = data.filter(
          (task) => task.status === "Completed"
        );
        setTasks(completedTasks);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const deleteTask = (id: number): void => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleEdit = (task: Task): void => {
  };

  const toggleStatus = (task: Task): void => {
    const updatedTask: Task = {
      ...task,
      status: task.status === "Completed" ? "Incomplete" : "Completed",
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

  return (
    <div className="text-2xl font-bold mb">
      Completed Tasks
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

export default Comptasks;