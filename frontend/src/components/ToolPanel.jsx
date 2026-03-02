import { useState } from 'react'
import './ToolPanel.css'

function ToolPanel({ brushSize, onBrushSizeChange, activePattern, onClearPattern }) {
  return (
    <div className="tool-panel">
      <h3 className="tool-panel-title">Tools</h3>
      
      <div className="tool-section">
        <label className="tool-label">
          Brush Size
          <span className="tool-value">{brushSize}px</span>
        </label>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => onBrushSizeChange(Number(e.target.value))}
          className="slider"
        />
        <div className="brush-preview">
          <div 
            className="brush-preview-dot"
            style={{ 
              width: `${brushSize}px`, 
              height: `${brushSize}px` 
            }}
          />
        </div>
      </div>

      {activePattern && (
        <div className="tool-section active-pattern-section">
          <label className="tool-label">Active Pattern</label>
          <div className="active-pattern-info">
            <p className="active-pattern-name">{activePattern.name}</p>
            <p className="active-pattern-type">{activePattern.type}</p>
            <button 
              onClick={onClearPattern}
              className="clear-pattern-btn"
            >
              Clear Pattern
            </button>
          </div>
        </div>
      )}
      
      <div className="tool-section-info">
        <p className="info-text">
          {activePattern 
            ? 'Drawing with pattern mode' 
            : 'Click and drag on the canvas to draw'}
        </p>
      </div>
    </div>
  )
}

export default ToolPanel
