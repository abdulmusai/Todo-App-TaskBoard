import React from 'react';

export default function TaskItem({
  task,
  isDragging,
  isDragOver,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onToggleStatus,
  onDelete,
  onOpenEdit,
}) {
  const dateStr = new Date(task.created).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const getPriorityColor = (p) => {
    return p === 'high' ? '#e85d2f' : p === 'medium' ? '#e8b82f' : '#2f7ee8';
  };

  return (
    <li
      className={`task-item ${task.completed ? 'completed' : ''} ${isDragging ? 'dragging' : ''} ${isDragOver ? 'drag-over' : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{ '--priority-color': getPriorityColor(task.priority) }}
    >
      <div className="drag-handle">⠿</div>
      <div
        className="task-check"
        role="checkbox"
        aria-checked={task.completed}
        tabIndex={0}
        onClick={() => onToggleStatus(task.id)}
        onKeyDown={(e) => e.key === 'Enter' && onToggleStatus(task.id)}
      >
        {task.completed ? '✓' : ''}
      </div>
      <div className="task-content">
        <span className="task-text">{task.text}</span>
        <div className="task-meta">
          <span className="task-date">{dateStr}</span>
          <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
        </div>
      </div>
      <div className="task-actions">
        <button className="task-btn edit-btn" onClick={() => onOpenEdit(task)} title="Edit">✏️</button>
        <button className="task-btn delete-btn" onClick={() => onDelete(task.id)} title="Delete">✕</button>
      </div>
    </li>
  );
}