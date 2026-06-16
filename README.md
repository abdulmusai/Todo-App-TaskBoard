# TASK//BOARD ⚛️ React To-Do List App

> A sleek, fully-featured task management app built with **React (hooks only)** — no external UI libraries, no CSS frameworks, just clean React fundamentals.

---

## 🔗 GitHub Description (Short)

> A production-grade To-Do List app built with React. Features drag & drop, dark mode, priority levels, localStorage persistence, live search, and smooth animations — all in a single self-contained JSX file.

---

## ✨ Features

| Feature | Details |
|---|---|
| ➕ **Add Tasks** | Type + Enter or click the Add button |
| ✅ **Complete Tasks** | Click the checkbox to mark done with strikethrough |
| ✏️ **Edit Tasks** | Modal editor for any task (Ctrl+Enter to save) |
| 🗑️ **Delete Tasks** | Smooth slide-out animation on removal |
| 🌙 **Dark Mode** | Toggle light/dark theme, persists across sessions |
| 💾 **Local Storage** | Tasks auto-saved — survives page refresh |
| 🖱️ **Drag & Drop** | Reorder tasks using the native HTML5 DnD API |
| 🔴 **Priority Levels** | High / Medium / Low with color-coded left borders |
| 🔍 **Live Search** | Filter tasks as you type |
| 🗂️ **Filter Tabs** | View All / Active / Done / High Priority |
| 📊 **Stats Bar** | Live count of Total, Active, and Completed tasks |
| 📈 **Progress Bar** | Visual completion percentage |
| 🧹 **Clear Completed** | Wipe all done tasks in one click |

---

## 🚀 Getting Started

### With Vite (recommended)
```bash
npm create vite@latest taskboard -- --template react
cd taskboard
# Replace src/App.jsx with TaskBoard.jsx
npm install
npm run dev
```

### With Create React App
```bash
npx create-react-app taskboard
cd taskboard
# Replace src/App.js with TaskBoard.jsx content
npm start
```

No additional dependencies needed — just React.

---

## 📁 Project Structure

```
taskboard/
├── src/
│   └── App.jsx         # Full app: components + logic + styles
├── index.html
└── package.json
```

Everything lives in one JSX file — intentionally, for learning clarity.

---

## ⚛️ React Concepts Covered

This project is a hands-on exercise covering core React patterns:

| Concept | Where it's used |
|---|---|
| `useState` | Tasks list, dark mode, filter, search, input, toast, edit modal |
| `useEffect` | localStorage sync, Google Fonts injection |
| `useCallback` | Memoized toast function |
| `useRef` | Drag source tracking, toast timer |
| Conditional rendering | Empty state, modal, toast visibility |
| List rendering | `filtered.map()` → `<TaskItem>` |
| Lifting state up | Task CRUD lives in `App`, passed down as props |
| Component composition | `App` → `TaskItem`, `EditModal`, `Toast`, `FontLink` |
| Controlled inputs | `value` + `onChange` on all inputs |

---

## 🧠 How It Works

### Data Model
Each task is a plain object stored as JSON in `localStorage`:

```js
{
  id: "a3f9b2c1",         // uid() → Math.random().toString(36)
  text: "Review PR",      // Task content
  completed: false,       // Completion state
  priority: "high",       // "high" | "medium" | "low"
  created: 1716900000000  // Unix timestamp
}
```

### State Flow
```
User Action → setState() → React re-render → useEffect syncs localStorage
```

### Component Tree
```
<App>
  ├── <FontLink />        — injects Google Fonts via useEffect
  ├── <TaskItem />        — renders each task with drag/check/edit/delete
  ├── <EditModal />       — controlled modal with textarea
  └── <Toast />           — fixed position notification
```

### Drag & Drop
Uses the native HTML5 Drag and Drop API. `dragSrc` ref tracks the dragged task ID. On `drop`, the tasks array is spliced and state is updated, triggering a re-render.

```js
const handleDragStart = id => { dragSrc.current = id; };
const handleDrop = id => {
  setTasks(ts => {
    const arr = [...ts];
    const [moved] = arr.splice(arr.findIndex(t => t.id === dragSrc.current), 1);
    arr.splice(arr.findIndex(t => t.id === id), 0, moved);
    return arr;
  });
};
```

### Theming
CSS custom properties are set via inline `style` on the root div. Switching themes is instant — no CSS file swaps, no class toggling.

```jsx
const theme = dark ? {
  "--tb-bg": "#141210", "--tb-card": "#262420", ...
} : {
  "--tb-bg": "#f0ece4", "--tb-card": "#faf8f4", ...
};

<div style={{ ...theme, background: "var(--tb-bg)" }}>
```

---

## 🎨 Design Decisions

- **Font pairing**: [Syne](https://fonts.google.com/specimen/Syne) (headings) + [DM Mono](https://fonts.google.com/specimen/DM+Mono) (body)
- **Aesthetic**: Raw editorial — strong typographic hierarchy, color-coded priorities, warm neutrals
- **Styling**: Inline styles + injected global CSS keyframes — zero external CSS dependencies
- **Animations**: CSS `@keyframes` for slide-in, pop-out, and modal entrance

---

## 📚 Key Code Patterns

```jsx
// Controlled input
<input value={input} onChange={e => setInput(e.target.value)} />

// Immutable state update
setTasks(ts => ts.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

// localStorage sync
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}, [tasks]);

// Lazy initial state from localStorage
const [tasks, setTasks] = useState(() => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || SEED; }
  catch { return SEED; }
});
```

---

## 🤝 Contributing

Pull requests welcome! Ideas to extend:

- [ ] Due dates with overdue highlighting
- [ ] Task categories / tags
- [ ] Drag with `@dnd-kit` for better mobile support
- [ ] Export to JSON / CSV
- [ ] Subtasks / nested checklists
- [ ] Confetti on 100% completion 🎉
- [ ] Global state with `useReducer` + `useContext`

---

## 📄 License

MIT — free to use, fork, and modify.

---

<div align="center">
  Built with ⚛️ React · Hooks · localStorage · CSS Custom Properties
</div>
# Todo-App-TaskBoard
