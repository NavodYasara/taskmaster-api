import React from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";

// Shared Task interface
export interface Task {
  id: number;
  title: string;
  description: string;
  status: "TODO" | "DONE";
  dueDate: string;
  quadrant: string;
}

// Props for the TaskCard
interface TaskCardProps {
  task: Task;
  draggable?: boolean; // Default: false
  onStatusChange?: (id: number) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: number) => void;
}

// The inner visual card — the actual HTML/JSX
function TaskCardInner({
  task,
  onStatusChange,
  onEdit,
  onDelete,
}: Omit<TaskCardProps, "draggable">) {
  return (
    <div className="group bg-white p-4 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 border-t-4 border-t-indigo-500 transition-all duration-200 flex flex-col gap-2">
      {/* Title Row */}
      <div className="flex justify-between items-start">
        <h3
          className="text-sm font-bold text-gray-800 line-clamp-1 pr-2"
          title={task.title}
        >
          {task.title}
        </h3>
        {/* Action icons — only show on hover */}
        {(onEdit || onDelete) && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity -mt-1 -mr-1 shrink-0">
            {onEdit && (
              <button
                aria-label="Edit task"
                className="p-1.5 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
              >
                <img
                  src={editIcon}
                  alt="edit"
                  className="w-3.5 h-3.5 opacity-70"
                />
              </button>
            )}
            {onDelete && (
              <button
                aria-label="Delete task"
                className="p-1.5 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id);
                }}
              >
                <img
                  src={deleteIcon}
                  alt="delete"
                  className="w-3.5 h-3.5 opacity-70"
                />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      <p
        className="text-xs text-gray-500 line-clamp-2 leading-relaxed flex-grow"
        title={task.description}
      >
        {task.description}
      </p>

      {/* Footer: Status Badge + Due Date */}
      <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-gray-100">
        <button
          className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full border border-indigo-100 uppercase cursor-pointer hover:bg-indigo-100 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onStatusChange?.(task.id);
          }}
        >
          {task.status}
        </button>
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <svg
            className="w-3 h-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {task.dueDate}
        </span>
      </div>
    </div>
  );
}

// The exported TaskCard — wraps with draggable if needed
export function TaskCard({
  task,
  draggable = false,
  onStatusChange,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(),
    disabled: !draggable, // Disable dnd-kit if draggable is false
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(draggable ? listeners : {})}
      {...(draggable ? attributes : {})}
      className={
        draggable ? "cursor-grab active:cursor-grabbing relative z-50" : ""
      }
    >
      <TaskCardInner
        task={task}
        onStatusChange={onStatusChange}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

// The Droppable Quadrant box (unchanged)
export const DroppableQuadrant = ({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className: string;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`${className} transition-colors ${isOver ? "ring-2 ring-indigo-300 bg-indigo-50/20" : ""}`}
    >
      {children}
    </div>
  );
};
