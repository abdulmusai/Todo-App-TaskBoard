import React from 'react';

export default function Header({ theme, onToggleTheme, onClearCompleted }) {
  return (
    <header>
      <div className="logo-group">
        <div className="logo">TASK<span>//</span>BOARD</div>
        <div className="tagline">Drag · Check · Done</div>
      </div>
      <div className="header-controls">
        <button className="icon-btn" onClick={onClearCompleted} title="Clear completed">🧹</button>
        <button className="icon-btn" onClick={onToggleTheme} title="Toggle dark mode">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}