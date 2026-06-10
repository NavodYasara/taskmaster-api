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

## 📅 June 10, 2026

### What I worked on:

- **Status Toggle Feature:** Implemented a feature that lets users click on a task's status badge to toggle it between `TODO` and `DONE`. This calls the backend API and updates the UI in real time.

### What I struggled with:

- **Git Merge Conflict — Lost Code:** When I merged the `f/dragNdrop` branch into `dev`, the drag-and-drop branch had an **older version** of `MyTasks.tsx`. During the merge, Git kept the older version and **overwrote my status update code**. The feature disappeared from all branches.
- **Button with no action:** I changed a `<span>` to a `<button>` in JSX but forgot to connect the `onClick` handler. The button looked correct but did nothing when clicked.

### New things I learned:

- **Git Merge Conflicts — What they are:** When two branches both change the **same file**, Git gets confused about which version to keep. This is called a **merge conflict**. If you're not careful, one side's work gets overwritten.
- **Git History is a Safety Net:** Even when code seems "lost", it's still saved in the git history (in old commits). You can always find it using `git log` and `git show <commit-id>`.
- **`onClick` is the Wire:** A `<button>` in React is like a doorbell — it looks like a button, but without an `onClick` handler, it does nothing. The `onClick` is the wire that connects the button to the action.
- **After a merge, always test!** A merge can silently break features even without showing conflicts. Always run and test the app after any merge.
- **Git Commit Discipline:** Commit messages like `.`, `ffix:`, and `bug::` are hard to read later. Use clear messages like `fix: wire onClick handler to status toggle button` so you understand what changed months later.

---

_(Whenever we finish a new feature or learn something tricky, we will add a new date section here!
Whenever we finish fixing a hard bug, learning a new concept, or building a cool feature, you can just tell me: "Hey, add what we just did to my learning log!" and I will automatically write down the new things you learned and the challenges you faced in simple terms.
)_
