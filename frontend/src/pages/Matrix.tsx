import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate: String;
  quadrant: String;
}

export default function Matrix() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data: Task[] = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    if (!token) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updates),
        },
      );

      if (!res.ok) throw new Error("Failed to update task");

      // Refresh the list
      await fetchTasks();

      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Error updating task", error);
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Eisenhower Matrix
        </h1>
        <p className="text-gray-500 mt-2">
          Drag tasks from the Unassigned pool into your matrix to prioritize
          them.
        </p>
      </div>

      {/* Main Layout: Left Sidebar + Right Matrix */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* LEFT COLUMN: Unassigned Tasks (TODO_POOL) */}
        <div className="w-full lg:w-1/5 bg-gray-50 border-2 border-gray-200 rounded-xl p-4 flex flex-col h-full">
          <h2 className="font-bold text-gray-700 mb-4">Unassigned Tasks</h2>

          {isLoading ? (
            <p className="text-gray-500 text-sm">Loading tasks...</p>
          ) : (
            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {tasks
                .filter((t) => !t.quadrant || t.quadrant === "TODO_POOL") // TODO_POOL is the default value for quadrant 
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-gray-400"
                  >
                    <h3 className="font-bold text-sm text-gray-800">
                      {task.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  </div>
                ))}

              {tasks.filter((t) => !t.quadrant || t.quadrant === "TODO_POOL")
                .length === 0 &&
                !isLoading && (
                  <p className="text-gray-400 text-sm text-center mt-10 border-2 border-dashed border-gray-300 rounded p-4">
                    All tasks assigned! 🎉
                  </p>
                )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: The 2x2 Matrix Grid */}
        <div className="w-full lg:w-4/5 grid grid-cols-2 gap-4 h-full">
          {/* URGENT & IMPORTANT */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex flex-col">
            <h2 className="font-bold text-red-700 mb-4">Urgent & Important</h2>
            <div className="flex-1 overflow-y-auto space-y-3">
              {tasks
                .filter((t) => t.quadrant === "URGENT_IMPORTANT")
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-3 rounded shadow-sm border-l-4 border-l-red-500"
                  >
                    <h3 className="font-bold text-sm">{task.title}</h3>
                  </div>
                ))}
            </div>
          </div>

          {/* NOT URGENT & IMPORTANT */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex flex-col">
            <h2 className="font-bold text-blue-700 mb-4">
              Not Urgent & Important
            </h2>
            <div className="flex-1 overflow-y-auto space-y-3">
              {tasks
                .filter((t) => t.quadrant === "NOT_URGENT_IMPORTANT")
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-3 rounded shadow-sm border-l-4 border-l-blue-500"
                  >
                    <h3 className="font-bold text-sm">{task.title}</h3>
                  </div>
                ))}
            </div>
          </div>

          {/* URGENT & NOT IMPORTANT */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 flex flex-col">
            <h2 className="font-bold text-yellow-700 mb-4">
              Urgent & Not Important
            </h2>
            <div className="flex-1 overflow-y-auto space-y-3">
              {tasks
                .filter((t) => t.quadrant === "URGENT_NOT_IMPORTANT")
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-3 rounded shadow-sm border-l-4 border-l-yellow-500"
                  >
                    <h3 className="font-bold text-sm">{task.title}</h3>
                  </div>
                ))}
            </div>
          </div>

          {/* NOT URGENT & NOT IMPORTANT */}
          <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-4 flex flex-col">
            <h2 className="font-bold text-gray-700 mb-4">
              Not Urgent & Not Important
            </h2>
            <div className="flex-1 overflow-y-auto space-y-3">
              {tasks
                .filter((t) => t.quadrant === "NOT_URGENT_NOT_IMPORTANT")
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-3 rounded shadow-sm border-l-4 border-l-gray-600"
                  >
                    <h3 className="font-bold text-sm">{task.title}</h3>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
