import { useEffect, useRef } from 'react'
import { renderPattern } from '../utils/patternUtils'
import './PatternCard.css'

function PatternCard({ pattern, isSelected, onSelect }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas && pattern) {
      const ctx = canvas.getContext('2d')
      renderPattern(ctx, pattern, canvas.width, canvas.height)
    }
  }, [pattern])

  return (
    <div 
      className={`pattern-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(pattern)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(pattern)
        }
      }}
    >
      <canvas 
        ref={canvasRef}
        width={80}
        height={80}
        className="pattern-card-canvas"
      />
      <div className="pattern-card-info">
        <h4 className="pattern-card-name">{pattern.name}</h4>
        <p className="pattern-card-type">{pattern.type}</p>
      </div>
    </div>
  )
}

export default PatternCard
