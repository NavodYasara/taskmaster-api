import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import copyIcon from "../assets/copy.svg";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

export default function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDuedate] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);

  useEffect(() => {
    // 1. Get the token we saved during login
    const token = localStorage.getItem("jwt");

    // 2. If they aren't logged in, kick them out!
    if (!token) {
      navigate("/login");
      return;
    }

    // 3. Fetch the tasks SECURELY
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
        setTasks(data); // Save the tasks into our React state
      } else {
        // If the token is expired or invalid, clear it and kick them out
        localStorage.removeItem("jwt");
        navigate("/login");
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop the page from refreshing!

    const token = localStorage.getItem("jwt"); // Get our "VIP pass"

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/tasks/addTask`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          dueDate: dueDate,
        }),
      },
    );
    if ((await response).ok) {
      const newTask = await response.json();
      setTasks([newTask, ...tasks]); // Add the new task to the list
      setTitle(""); // Clear form
      setDescription("");
      setDuedate("");
      setIsModelOpen(false);
    } else {
      alert("Failed to create task");
    }
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
          onClick={() => setIsModelOpen(true)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto flex-1 pr-2 pb-4 pt-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 border-t-4 border-t-indigo-500 transition-all duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start mb-2 ">
                <h3
                  className="text-lg font-bold text-gray-800 line-clamp-1 pr-4"
                  title={task.title}
                >
                  {task.title}
                </h3>
                {/* Icons only show when hovering over the card for a cleaner look */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -mt-1 -mr-2 shrink-0">
                  <button
                    aria-label="Copy item"
                    className="p-2 text-gray-400 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <img
                      src={copyIcon}
                      alt="copy"
                      className="w-4 h-4 opacity-70"
                    />
                  </button>
                  <button
                    aria-label="Edit item"
                    className="p-2 text-gray-400 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <img
                      src={editIcon}
                      alt="edit"
                      className="w-4 h-4 opacity-70"
                    />
                  </button>
                  <button
                    aria-label="Delete item"
                    className="p-2 text-gray-400 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <img
                      src={deleteIcon}
                      alt="delete"
                      className="w-4 h-4 opacity-70"
                    />
                  </button>
                </div>
              </div>

              <p
                className="text-gray-500 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed"
                title={task.description}
              >
                {task.description}
              </p>

              {/* Status and Due Date footer */}
              <div className="flex flex-wrap gap-2 items-center mt-auto pt-4 border-t border-gray-50">
                <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100 uppercase tracking-wide">
                  {task.status}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5 border border-gray-200">
                  <svg
                    className="w-3.5 h-3.5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  {task.dueDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModelOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create New Task</h2>

            <form onSubmit={handleCreateTask} className="flex flex-col gap-4">
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
                  onClick={() => setIsModelOpen(false)}
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
