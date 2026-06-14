# Taskmaster API & Frontend: Learning Journey

This document is to track my progress, challenges, and new things I learn while building this project. It will help me write a great portfolio description later!

## General Project Info

- **Project Name:** Taskmaster
- **Tech Stack:** Spring Boot (Backend) / React & TypeScript (Frontend)

---

## 📅 June 7, 2026

### What I worked on:

- **Initializing the Project:** Set up a Spring Boot application for the backend.
- **Reusable Forms in React:** Learned how to make a single form component handle both "Create Task" and "Edit Task" actions instead of writing two separate forms. This is a good industry practice called DRY (Don't Repeat Yourself).

### What I struggled with:

_(We can add challenges here as they come up)_

### New things I learned:

- How to use React components to reduce code duplication.

---

## 📅 June 7, 2026 (Part 2)

### What I worked on:

- **Eisenhower Matrix Planning:** Designed an implementation plan for a new "Quadrant" page. This will allow dragging and dropping tasks into four categories (Urgent & Important, etc.). We identified that this requires full-stack changes: adding a `quadrant` column to the MySQL database via Spring Boot, and using `@dnd-kit/core` on the React frontend.
- **Advanced React Hooks:** Extracted authentication logic into a reusable `useAuth()` custom hook to keep components clean.

### What I struggled with:

- **React Race Conditions:** Encountered a bug where the app would instantly log out upon a successful login. 

### New things I learned:

- **Diagnosing Race Conditions:** I learned that because React state initializes before `useEffect` runs, setting a token state to `null` initially causes the app to think the user is logged out for a split second, triggering a redirect. 
- **Synchronous State Initialization:** I learned how to fix race conditions by reading from `localStorage` directly inside the `useState()` initialization so React has the correct data on the very first render millisecond.

---

## 📅 June 13, 2026

### What I worked on:

- **Reusable `TaskCard` Component:** Refactored the task card UI from `MyTasks.tsx` into a single shared component in `Matrix-Components.tsx`. This component now works in both `MyTasks.tsx` (as a normal card) and `Matrix.tsx` (as a draggable card), controlled by a `draggable` prop.
- **Single Source of Truth:** Moved the `Task` interface to `Matrix-Components.tsx` and imported it in both pages using `import type { Task }`. This means there is only ONE place to update if the Task structure ever changes.
- **Diagnosing Port Conflicts:** When two `npm run dev` instances were running, Vite automatically moved to port 5174. Learned to always check the terminal output for the actual URL instead of assuming it's always 5173.

### What I struggled with:

- **Multiple TypeScript Errors in a Chain:** Fixing one error revealed another. Each error was teaching a concept about TypeScript's strict type system.

### New things I learned:

- **TypeScript Union Types:** `status: "TODO" | "DONE"` means only those exact strings are accepted. A generic `string` is NOT allowed because it could be anything.
- **`Task["status"]` shortcut:** Instead of repeating `"TODO" | "DONE"` in multiple places, you can write `Task["status"]` to automatically read the type from the interface. This keeps the code in sync automatically.
- **`import type`:** Using `import type { Task }` instead of `import { Task }` tells TypeScript that you are only importing a type, not actual runtime code. This is a best practice and slightly more efficient.
- **Type vs. Runtime Errors:** TypeScript errors are caught *before* the code runs. Runtime errors only appear in the browser. If TypeScript shows no errors but the page still breaks, the bug is in the runtime logic, not the types.

---

## 📅 June 14, 2026

### What I worked on:

- **Eisenhower Matrix Task Interactivity:** Configured the drag-and-drop system on the Eisenhower Matrix page to support clicking the status button to toggle task completion status (between `TODO` and `DONE`) without interfering with dragging.

### What I struggled with:

- **Click vs. Drag Conflict:** When a whole card is draggable, `@dnd-kit`'s drag sensors intercept the mouse clicks (pointer events), preventing buttons on the card from being clicked.

### New things I learned:

- **Activation Constraints in `@dnd-kit`:** I learned that by default, `@dnd-kit` starts dragging instantly on pointer down. To allow child buttons to be clicked, we can define a `PointerSensor` with an `activationConstraint` like `{ distance: 8 }`. This tells the browser: "Only start dragging if the user moves their cursor by 8 pixels. Otherwise, let it be a normal click."
- **Sensors Configuration:** I learned how to create and pass custom `sensors` using `useSensors` and `useSensor` to `<DndContext>`.

---

_(Whenever we finish a new feature or learn something tricky, we will add a new date section here!
Whenever we finish fixing a hard bug, learning a new concept, or building a cool feature, you can just tell me: "Hey, add what we just did to my learning log!" and I will automatically write down the new things you learned and the challenges you faced in simple terms.
)_
