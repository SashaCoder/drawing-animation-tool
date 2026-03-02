import { useEffect, useRef } from 'react'
import { renderPattern } from '../utils/patternUtils'
import './PatternPreview.css'

function PatternPreview({ pattern, onEdit, onDelete, onApply }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas && pattern) {
      const ctx = canvas.getContext('2d')
      renderPattern(ctx, pattern, canvas.width, canvas.height)
    }
  }, [pattern])

  if (!pattern) {
    return (
      <div className="pattern-preview-empty">
        <p>Select a pattern to preview</p>
      </div>
    )
  }

  return (
    <div className="pattern-preview">
      <h3 className="pattern-preview-title">Pattern Preview</h3>
      
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="pattern-preview-canvas"
      />

      <div className="pattern-preview-details">
        <h4 className="pattern-preview-name">{pattern.name}</h4>
        <div className="pattern-preview-info">
          <div className="info-row">
            <span className="info-label">Type:</span>
            <span className="info-value">{pattern.type}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Size:</span>
            <span className="info-value">{pattern.size}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Density:</span>
            <span className="info-value">{pattern.density}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Color:</span>
            <span className="info-value">
              <div className="color-swatch" style={{ backgroundColor: pattern.color }}></div>
              {pattern.color}
            </span>
          </div>
        </div>
        <p className="pattern-preview-description">{pattern.description}</p>
      </div>

      <div className="pattern-preview-actions">
        <button 
          onClick={() => onApply(pattern)}
          className="btn btn-primary"
        >
          Apply to Brush
        </button>
        <button 
          onClick={() => onEdit(pattern)}
          className="btn btn-secondary"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(pattern.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default PatternPreview
