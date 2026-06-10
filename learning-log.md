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

_(Whenever we finish a new feature or learn something tricky, we will add a new date section here!
Whenever we finish fixing a hard bug, learning a new concept, or building a cool feature, you can just tell me: "Hey, add what we just did to my learning log!" and I will automatically write down the new things you learned and the challenges you faced in simple terms.
)_
