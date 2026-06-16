import React from 'react';

export default function FilterBar({ currentFilter, onFilterChange, searchQuery, onSearchChange }) {
  const filters = ['all', 'active', 'completed', 'high'];

  return (
    <div className="filter-bar">
      <input
        className="search-input"
        type="text"
        placeholder="🔍 Search tasks..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {filters.map((type) => (
        <button
          key={type}
          className={`filter-btn ${currentFilter === type ? 'active' : ''}`}
          onClick={() => onFilterChange(type)}
        >
          {type === 'high' ? '🔴 High' : type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
}