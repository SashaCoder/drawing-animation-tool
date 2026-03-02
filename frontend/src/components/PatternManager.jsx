import { useState } from 'react'
import PatternList from './PatternList'
import PatternPreview from './PatternPreview'
import PatternForm from './PatternForm'
import './PatternManager.css'

function PatternManager({ 
  patterns, 
  selectedPattern, 
  maxPatterns,
  onSelectPattern,
  onCreatePattern,
  onUpdatePattern,
  onDeletePattern,
  onApplyPattern
}) {
  const [showForm, setShowForm] = useState(false)
  const [editingPattern, setEditingPattern] = useState(null)

  const handleAddNew = () => {
    setEditingPattern(null)
    setShowForm(true)
  }

  const handleEdit = (pattern) => {
    setEditingPattern(pattern)
    setShowForm(true)
  }

  const handleSave = (formData) => {
    if (editingPattern) {
      // Update existing pattern
      onUpdatePattern(editingPattern.id, formData)
    } else {
      // Create new pattern
      onCreatePattern(formData)
    }
    setShowForm(false)
    setEditingPattern(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingPattern(null)
  }

  const handleDelete = (patternId) => {
    if (window.confirm('Are you sure you want to delete this pattern?')) {
      onDeletePattern(patternId)
      setShowForm(false)
      setEditingPattern(null)
    }
  }

  const isAtMaxCapacity = patterns.length >= maxPatterns

  return (
    <div className="pattern-manager">
      <div className="pattern-manager-header">
        <h2 className="pattern-manager-title">Pattern Library</h2>
        <p className="pattern-count">
          {patterns.length} / {maxPatterns} patterns
        </p>
      </div>

      {!showForm && (
        <>
          <div className="pattern-manager-actions">
            <button 
              onClick={handleAddNew}
              className="btn btn-primary btn-add"
              disabled={isAtMaxCapacity}
              title={isAtMaxCapacity ? 'Maximum pattern limit reached' : 'Add a new pattern'}
            >
              + Add Pattern
            </button>
            {isAtMaxCapacity && (
              <p className="warning-message">
                Maximum pattern limit reached. Delete a pattern to add new ones.
              </p>
            )}
          </div>

          <PatternList 
            patterns={patterns}
            selectedPattern={selectedPattern}
            onSelectPattern={onSelectPattern}
          />

          <div className="pattern-manager-preview">
            <PatternPreview 
              pattern={selectedPattern}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onApply={onApplyPattern}
            />
          </div>
        </>
      )}

      {showForm && (
        <PatternForm 
          pattern={editingPattern}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}

export default PatternManager
