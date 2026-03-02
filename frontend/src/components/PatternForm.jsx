import { useState, useEffect } from 'react'
import { validatePattern } from '../utils/patternUtils'
import './PatternForm.css'

const PATTERN_TYPES = [
  { value: 'dots-small', label: 'Small Dots' },
  { value: 'dots-large', label: 'Large Dots' },
  { value: 'crosshatch', label: 'Crosshatch' },
  { value: 'hatch-left', label: 'Hatch Left' },
  { value: 'hatch-right', label: 'Hatch Right' },
  { value: 'stipple', label: 'Stipple' }
]

function PatternForm({ pattern, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'dots-small',
    size: 5,
    density: 5,
    color: '#000000',
    description: ''
  })
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (pattern) {
      setFormData({
        name: pattern.name,
        type: pattern.type,
        size: pattern.size,
        density: pattern.density,
        color: pattern.color,
        description: pattern.description
      })
    }
  }, [pattern])

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setErrors([]) // Clear errors on change
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const validation = validatePattern(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    onSave(formData)
  }

  return (
    <div className="pattern-form">
      <h3 className="pattern-form-title">
        {pattern ? 'Edit Pattern' : 'Create New Pattern'}
      </h3>

      <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="form-errors">
            {errors.map((error, index) => (
              <p key={index} className="error-message">{error}</p>
            ))}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="pattern-name" className="form-label">
            Pattern Name *
          </label>
          <input
            id="pattern-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="form-input"
            placeholder="e.g., My Custom Pattern"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="pattern-type" className="form-label">
            Pattern Type *
          </label>
          <select
            id="pattern-type"
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="form-select"
            required
          >
            {PATTERN_TYPES.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="pattern-size" className="form-label">
            Size: {formData.size}
          </label>
          <input
            id="pattern-size"
            type="range"
            min="1"
            max="50"
            value={formData.size}
            onChange={(e) => handleChange('size', Number(e.target.value))}
            className="form-range"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pattern-density" className="form-label">
            Density: {formData.density}
          </label>
          <input
            id="pattern-density"
            type="range"
            min="1"
            max="10"
            value={formData.density}
            onChange={(e) => handleChange('density', Number(e.target.value))}
            className="form-range"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pattern-color" className="form-label">
            Color
          </label>
          <div className="color-input-group">
            <input
              id="pattern-color"
              type="color"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
              className="form-color"
            />
            <input
              type="text"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
              className="form-input"
              placeholder="#000000"
              pattern="^#[0-9A-Fa-f]{6}$"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="pattern-description" className="form-label">
            Description
          </label>
          <textarea
            id="pattern-description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="form-textarea"
            placeholder="Describe your pattern..."
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {pattern ? 'Update Pattern' : 'Create Pattern'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default PatternForm
