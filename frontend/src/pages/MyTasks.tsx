import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { TaskCard } from "../components/Matrix-Components";
import type { Task } from "../components/Matrix-Components";

export default function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDuedate] = useState("");
  const [status, setStatus] = useState<Task["status"]>("TODO");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const isEditMode = editingTaskId !== null;
  const { token, logout } = useAuth();

  useEffect(() => {
    if (!token) {
      logout();
      return;
    }

    const fetchTasks = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        logout();
      }
    };

    fetchTasks();
  }, [navigate]);

  const openCreateModal = () => {
    setTitle("");
    setDescription("");
    setDuedate("");
    setStatus("TODO");
    setEditingTaskId(null);
    setIsModelOpen(true);
  };

  const openEditModal = (task: Task) => {
    setTitle(task.title);
    setDescription(task.description);
    setDuedate(task.dueDate);
    setStatus(task.status);
    setEditingTaskId(task.id);
    setIsModelOpen(true);
  };

  const closeModal = () => {
    setIsModelOpen(false);
    setEditingTaskId(null);
  };

  const handleSubmitTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode
      ? `${import.meta.env.VITE_API_URL}/api/tasks/updateTasks/${editingTaskId}`
      : `${import.meta.env.VITE_API_URL}/api/tasks/addTask`;

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        dueDate: dueDate,
        status: status,
      }),
    });

    if (response.ok) {
      if (isEditMode) {
        setTasks(
          tasks.map((task) => {
            if (task.id === editingTaskId) {
              return { ...task, title, description, dueDate, status };
            }
            return task;
          }),
        );
      } else {
        const newTask = await response.json();
        setTasks([newTask, ...tasks]);
      }
      closeModal();
    } else {
      alert(isEditMode ? "Failed to update task" : "Failed to create task");
    }
  };

  const handleDeleteTask = async (id: number) => {
    const token = localStorage.getItem("jwt");
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/tasks/deleteTask/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      setTasks(tasks.filter((task) => task.id !== id));
    } else {
      alert("Failed to delete task");
    }
  };

  const handleStatusChange = async (id: number) => {
    // pass para that the id of going to be clicked
    !token && logout();
    const previousStatus = tasks.filter((task) => task.id === id)[0].status;
    const newStatus = previousStatus === "TODO" ? "DONE" : "TODO";
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/tasks/updateTasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...tasks.filter((task) => task.id === id)[0],
          status: newStatus,
        }),
      },
    );
    if (!res.ok) return alert("Failed to update task");
    const data = await res.json();
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: data.status };
        }
        return task;
      }),
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      {/* Header section */}
      <div className="mb-8 flex justify-between items-end">
        <div className="card-head-container">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            My Tasks
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Manage your daily goals and objectives.
          </p>
        </div>
        <button
          className="bg-green-600 text-white font-bold mb-2 py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={openCreateModal}
        >
          CREATE NEW TASK
        </button>
      </div>

      {/* Task section*/}
      {tasks.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex-1">
          <p className="text-gray-500 font-medium">
            No tasks found. Time to create one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto flex-1 p-1">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              draggable={false}
              onStatusChange={handleStatusChange}
              onEdit={openEditModal}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {isModelOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {isEditMode ? "Edit Task" : "Create New Task"}
            </h2>

            <form onSubmit={handleSubmitTask} className="flex flex-col gap-4">
              <input
                className="border p-2 rounded"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                className="border p-2 rounded"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="date"
                className="border p-2 rounded w-full text-gray-700"
                value={dueDate}
                onChange={(e) => setDuedate(e.target.value)}
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
