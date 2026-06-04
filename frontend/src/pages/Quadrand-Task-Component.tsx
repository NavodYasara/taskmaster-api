import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
} from "@mui/material";

// Define what a Task looks like in TypeScript (matches your Java DTO!)
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDuedate] = useState("");


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

  const handleCreateTask = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/tasks/addTask`,
      {
        method: "POST",
        headers: { contentType: "Application/JSON" },
        body: JSON.stringify({
          title: title,
          description: description,
          dueDate: dueDate,
        }),
      },
    );
    if ((await response).ok) {
      const data = await response.json();
      setTasks([...tasks, data]); // Add the new task to the list
      setTitle(""); // Clear form
      setDescription("");
      setDuedate("");
    } else {
      alert("Failed to create task");
    }
  };

  return (
    <Container className="layer_routes mt-10">
      {/* 1. The Date Header Box */}
      <div className="mb-6 inline-block border-2 border-gray-800 rounded-[2rem] px-8 py-3">
        <Typography variant="body1" className="text-gray-500 font-medium">
          Today
        </Typography>
        <Typography variant="body2" className="text-gray-400">
          02/06/2026 Tuesday
        </Typography>
      </div>

      {/* 2. The 2x2 Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Box 1: To Do / Tasks */}
        <div className="border-2 border-gray-800 rounded-3xl p-6 min-h-[300px]">
          {tasks.length === 0 && (
            <Typography className="text-gray-400">No tasks found. Create one!</Typography>
          )}
          {tasks.map((task) => (
            <div key={task.id} className="mb-3 text-gray-400">
              {task.title}
            </div>
          ))}
        </div>

        {/* Box 2 */}
        <div className="border-2 border-gray-800 rounded-3xl p-6 min-h-[300px]">
           {/* Add other categories or tasks here later */}
        </div>

        {/* Box 3 */}
        <div className="border-2 border-gray-800 rounded-3xl p-6 min-h-[300px]">
        </div>

        {/* Box 4 */}
        <div className="border-2 border-gray-800 rounded-3xl p-6 min-h-[300px]">
        </div>

      </div>
    </Container>
  );
}
