import React from 'react';

export default function StatsBar({ stats }) {
  return (
    <>
      <div className="stats-bar">
        <div className="stat">
          <div className="stat-num">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat">
          <div className="stat-num accent">{stats.active}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat">
          <div className="stat-num done-color">{stats.done}</div>
          <div className="stat-label">Done</div>
        </div>
      </div>

      <div className="progress-wrap">
        <div className="progress-label">
          <span>Progress</span>
          <span>{stats.percent}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${stats.percent}%` }}></div>
        </div>
      </div>
    </>
  );
}