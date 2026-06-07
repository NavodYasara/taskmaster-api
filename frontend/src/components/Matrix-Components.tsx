import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  dueDate: String;
  quadrant: String;
}

// 1. The Sticky Note (Draggable)
export const DraggableTask = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(), // The ID must be a string so the room knows WHICH sticky note you picked up
  });

  // This math just tells the sticky note to visually follow your mouse cursor
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef} // Tells Dnd-Kit "This is the physical HTML element"
      style={style} // Applies the mouse-following math
      {...listeners} // Listens for your mouse clicks
      {...attributes} // Accessibility attributes
      className="bg-gray-300 p-4 mb-3 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-gray-400 cursor-grab active:cursor-grabbing hover:shadow-md relative z-50"
    >
      <h3 className="font-bold text-sm text-gray-800 line-clamp-1">
        {task.title}
      </h3>
      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
        {task.description}
      </p>
    </div>
  );
};

// 2. The Whiteboard Square (Droppable)
export const DroppableQuadrant = ({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className: string;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id }); // 'id' tells the room WHICH square this is

  return (
    <div
      ref={setNodeRef}
      className={`${className} transition-colors ${isOver ? "ring-4 ring-indigo-300 bg-indigo-50/50" : ""}`}
    >
      {children}
    </div>
  );
};
