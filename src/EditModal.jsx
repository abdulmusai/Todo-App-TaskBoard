import React, { useState, useEffect } from 'react';

export default function EditModal({ task, onClose, onSave }) {
  const [text, setText] = useState('');

  // Update inner state when active task shifts
  useEffect(() => {
    if (task) setText(task.text);
  }, [task]);

  if (!task) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      onSave(task.id, text);
    }
  };

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">Edit Task</div>
        <textarea
          className="modal-input"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-save" onClick={() => onSave(task.id, text)}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}