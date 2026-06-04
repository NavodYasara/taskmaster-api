import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, Stack } from "@mui/material";

// Define what a Task looks like in TypeScript (matches your Java DTO!)
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
    <div className=" layer_routes max-w-4xl mx-auto bg-amber-200">
      <Typography variant="h4" className="mb-6 font-bold text-gray-800">
        My Tasks
      </Typography>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> */}

      <Stack spacing={2} className="space-y-4">
        {/* Loop through the tasks array and render a card for each one */}
        {tasks.map((task) => (
          <Card
            key={task.id}
            className="shadow-md border-t-4 border-t-purple-400"
          >
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography className="text-gray-600 mb-2">
                {task.description}
              </Typography>
              <Typography
                variant="caption"
                className="bg-gray-200 px-2 py-1 rounded"
              >
                Status: {task.status}
              </Typography>
            </CardContent>
          </Card>
        ))}

        {tasks.length === 0 && (
          <Typography>No tasks found. Create one!</Typography>
        )}
      </Stack>
    </div>
  );
}
