import { useEffect } from 'react'
import './UndoRedoControls.css'

function UndoRedoControls({ 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo,
  undoCount = 0,
  redoCount = 0,
  showCounts = false 
}) {
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Z or Cmd+Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        if (canUndo) {
          onUndo()
        }
      }
      
      // Ctrl+Y or Cmd+Y for redo (Windows/Linux)
      // Ctrl+Shift+Z or Cmd+Shift+Z for redo (Mac)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        if (canRedo) {
          onRedo()
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onUndo, onRedo, canUndo, canRedo])
  
  return (
    <div className="undo-redo-controls">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className="undo-redo-btn undo-btn"
        title="Undo (Ctrl+Z)"
      >
        ↶ Undo
        {showCounts && <span className="stack-count">({undoCount})</span>}
      </button>
      
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className="undo-redo-btn redo-btn"
        title="Redo (Ctrl+Y or Ctrl+Shift+Z)"
      >
        ↷ Redo
        {showCounts && <span className="stack-count">({redoCount})</span>}
      </button>
    </div>
  )
}

export default UndoRedoControls
