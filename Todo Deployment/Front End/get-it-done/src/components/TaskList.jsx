import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTask, setNewTask] = useState("");

  const addNewTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/tasks", {
        title: newTask,
      });
      setTaskList([...taskList, { ...data }]);
      setNewTask("");
      setIsAddingNew(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getTasks = async () => {
    try {
      const { data } = await axios.get("/tasks/userTasks");
      setTaskList(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTaskList(taskList.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const addNewButtonClick = () => {
    setIsAddingNew(!isAddingNew);
  };

  return (
    <div>
      {taskList.length > 0 ? (
        <table>
          <tbody>
            {taskList.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                deleteTask={deleteTask}
              ></TaskItem>
            ))}
          </tbody>
        </table>
      ) : (
        "No Tasks found. Create New"
      )}
      {isAddingNew && (
        <form onSubmit={addNewTask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task Title"
          />
          <button className="add-button" type="submit">
            Add
          </button>
        </form>
      )}
      <button className="form-button" onClick={addNewButtonClick}>
        CREATE NEW
      </button>
    </div>
  );
}

export default TaskList;
