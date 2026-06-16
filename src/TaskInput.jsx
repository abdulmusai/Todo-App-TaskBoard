import React, { useState } from 'react';

export default function TaskInput({ onAddTask }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddTask(text.trim(), priority);
    setText('');
  };

  return (
    <div className="input-wrap">
      <input
        className="task-input"
        type="text"
        placeholder="What needs to be done?..."
        maxLength={200}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <select
        className="priority-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">🔵 Low</option>
        <option value="medium">🟡 Med</option>
        <option value="high">🔴 High</option>
      </select>
      <button className="add-btn" onClick={handleSubmit}>+ Add</button>
    </div>
  );
}