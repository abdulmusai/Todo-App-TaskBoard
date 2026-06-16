import React, { useState, useEffect, useMemo } from 'react';
import Header from './Header';
import StatsBar from './StatsBar';
import TaskInput from './TaskInput';
import FilterBar from './FilterBar';
import TaskList from './TaskList';
import EditModal from './EditModal';
import './App.css';

const seedData = [
  { id: 't1', text: 'Review project requirements', completed: false, priority: 'high', created: Date.now() - 300000 },
  { id: 't2', text: 'Set up development environment', completed: true, priority: 'medium', created: Date.now() - 200000 },
  { id: 't3', text: 'Write unit tests for core modules', completed: false, priority: 'medium', created: Date.now() - 100000 },
  { id: 't4', text: 'Update README documentation', completed: false, priority: 'low', created: Date.now() },
];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskboard_tasks');
    return saved ? JSON.parse(saved) : seedData;
  });

  const [theme, setTheme] = useState(() => localStorage.getItem('taskboard_theme') || 'light');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState({ message: '', visible: false });

  useEffect(() => {
    localStorage.setItem('taskboard_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('taskboard_theme', theme);
  }, [theme]);

  const showToast = (message) => {
    setToast({ message, visible: true });
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => setToast({ message: '', visible: false }), 2200);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.completed).length;
    return {
      total,
      done,
      active: total - done,
      percent: total ? Math.round((done / total) * 100) : 0,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (currentFilter === 'active' && t.completed) return false;
      if (currentFilter === 'completed' && !t.completed) return false;
      if (currentFilter === 'high' && t.priority !== 'high') return false;
      if (searchQuery && !t.text.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [tasks, currentFilter, searchQuery]);

  // Handlers
  const handleAddTask = (text, priority) => {
    const newTask = { id: Math.random().toString(36).slice(2, 10), text, completed: false, priority, created: Date.now() };
    setTasks((prev) => [newTask, ...prev]);
    showToast('Task added ✓');
  };

  const handleToggleStatus = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('Task removed');
  };

  const handleClearCompleted = () => {
    const count = tasks.filter((t) => t.completed).length;
    if (!count) return showToast('No completed tasks');
    setTasks((prev) => prev.filter((t) => !t.completed));
    showToast(`Cleared ${count} completed task${count > 1 ? 's' : ''}`);
  };

  const handleSaveEdit = (id, newText) => {
    if (!newText.trim()) return;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text: newText.trim() } : t)));
    setEditingTask(null);
    showToast('Task updated ✓');
  };

  const handleReorderTasks = (draggedId, targetId) => {
    const fromIdx = tasks.findIndex((t) => t.id === draggedId);
    const toIdx = tasks.findIndex((t) => t.id === targetId);
    if (fromIdx < 0 || toIdx < 0) return;

    const updated = [...tasks];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    setTasks(updated);
    showToast('Task reordered');
  };

  return (
    <>
      <Header 
        theme={theme} 
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} 
        onClearCompleted={handleClearCompleted} 
      />
      
      <StatsBar stats={stats} />
      
      <TaskInput onAddTask={handleAddTask} />
      
      <FilterBar 
        currentFilter={currentFilter} 
        onFilterChange={setCurrentFilter} 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      
      <TaskList 
        tasks={filteredTasks} 
        onToggleStatus={handleToggleStatus} 
        onDelete={handleDeleteTask} 
        onOpenEdit={setEditingTask} 
        onReorder={handleReorderTasks} 
      />
      
      <EditModal 
        task={editingTask} 
        onClose={() => setEditingTask(null)} 
        onSave={handleSaveEdit} 
      />

      <div id="toast" className={toast.visible ? 'show' : ''}>{toast.message}</div>
      <footer>Tasks auto-saved · Drag to reorder</footer>
    </>
  );
}