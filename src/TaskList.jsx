import React, { useState } from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggleStatus, onDelete, onOpenEdit, onReorder }) {
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    if (draggedId !== id) setDragOverId(id);
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (draggedId && draggedId !== targetId) {
      onReorder(draggedId, targetId);
    }
    setDraggedId(null);
    setDragOverId(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state visible">
        <div className="empty-icon">📋</div>
        <div className="empty-title">Board is clear</div>
        <div className="empty-sub">Add a task above to get started</div>
      </div>
    );
  }

  return (
    <ul id="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isDragging={draggedId === task.id}
          isDragOver={dragOverId === task.id}
          onDragStart={(e) => handleDragStart(e, task.id)}
          onDragEnd={() => { setDraggedId(null); setDragOverId(null); }}
          onDragOver={(e) => handleDragOver(e, task.id)}
          onDrop={(e) => handleDrop(e, task.id)}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onOpenEdit={onOpenEdit}
        />
      ))}
    </ul>
  );
}