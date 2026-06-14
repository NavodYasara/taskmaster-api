import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  TaskCard,
  DroppableQuadrant,
  type Task,
} from "../components/Matrix-Components";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";

export default function Matrix() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null); // to remember WHICH task is the Ghost (put this under tasks state):

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

  // This function tells the UI "When you start dragging, show the Ghost."
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return; // Dropped on the floor

    const taskId = active.id.toString();
    const newQuadrant = over.id.toString();

    // Find the task we are dragging
    const draggedTask = tasks.find((t) => t.id.toString() === taskId);

    // Only update the database if we ACTUALLY moved it to a new quadrant
    if (draggedTask && draggedTask.quadrant !== newQuadrant) {
      updateTask(taskId, { ...draggedTask, quadrant: newQuadrant });
    }
    setActiveId(null); // Hide the ghost when the drop ends
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    if (!token) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/updateTasks/${id}`,
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

  // Add this function inside Matrix()
  const handleStatusChange = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const newStatus = task.status === "TODO" ? "DONE" : "TODO";

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/tasks/updateTasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({ ...task, status: newStatus }),
        body: JSON.stringify({
          ...tasks.filter((task) => task.id === id)[0],
          status: newStatus,
        }),
      },
    );

    if (!res.ok) return alert("Failed to update task");
    const data = await res.json();
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, status: data.status } : t)),
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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
              <DroppableQuadrant
                id="TODO_POOL"
                className="flex-1 overflow-y-auto space-y-3"
              >
                {tasks
                  .filter((t) => !t.quadrant || t.quadrant === "TODO_POOL")
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      draggable={true}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
              </DroppableQuadrant>
            )}
          </div>

          {/* RIGHT COLUMN: The 2x2 Matrix Grid */}
          <div className="w-full lg:w-4/5 grid grid-cols-2 gap-4 h-full">
            {/* URGENT & IMPORTANT */}
            <DroppableQuadrant
              id="URGENT_IMPORTANT"
              className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex flex-col"
            >
              <h2 className="font-bold text-red-700 mb-4">
                Urgent & Important
              </h2>
              <div className="flex-1 overflow-y-auto space-y-3">
                {tasks
                  .filter((t) => t.quadrant === "URGENT_IMPORTANT")
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      draggable={true}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
              </div>
            </DroppableQuadrant>

            {/* NOT URGENT & IMPORTANT */}
            <DroppableQuadrant
              id="NOT_URGENT_IMPORTANT"
              className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex flex-col"
            >
              <h2 className="font-bold text-blue-700 mb-4">
                Not Urgent & Important
              </h2>
              <div className="flex-1 overflow-y-auto space-y-3">
                {tasks
                  .filter((t) => t.quadrant === "NOT_URGENT_IMPORTANT")
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      draggable={true}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
              </div>
            </DroppableQuadrant>

            {/* URGENT & NOT IMPORTANT */}
            <DroppableQuadrant
              id="URGENT_NOT_IMPORTANT"
              className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 flex flex-col"
            >
              <h2 className="font-bold text-yellow-700 mb-4">
                Urgent & Not Important
              </h2>
              <div className="flex-1 overflow-y-auto space-y-3">
                {tasks
                  .filter((t) => t.quadrant === "URGENT_NOT_IMPORTANT")
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      draggable={true}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
              </div>
            </DroppableQuadrant>

            {/* NOT URGENT & NOT IMPORTANT */}
            <DroppableQuadrant
              id="NOT_URGENT_NOT_IMPORTANT"
              className="bg-gray-100 border-2 border-gray-300 rounded-xl p-4 flex flex-col"
            >
              <h2 className="font-bold text-gray-700 mb-4">
                Not Urgent & Not Important
              </h2>
              <div className="flex-1 overflow-y-auto space-y-3">
                {tasks
                  .filter((t) => t.quadrant === "NOT_URGENT_NOT_IMPORTANT")
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      draggable={true}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
              </div>
            </DroppableQuadrant>
          </div>
        </div>
      </div>

      {/* The Ghost that floats above everything */}
      <DragOverlay>
        {activeId ? (
          <TaskCard
            task={tasks.find((t) => t.id.toString() === activeId)!}
            draggable={true}
            onStatusChange={handleStatusChange}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
