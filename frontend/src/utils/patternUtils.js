/**
 * Utility functions for pattern management and rendering
 */

/**
 * Generate a unique ID for a new pattern
 */
export function generatePatternId() {
  return `pattern-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Validate pattern object has required fields
 */
export function validatePattern(pattern) {
  const errors = []
  
  if (!pattern.name || pattern.name.trim() === '') {
    errors.push('Pattern name is required')
  }
  
  if (!pattern.type || pattern.type.trim() === '') {
    errors.push('Pattern type is required')
  }
  
  if (pattern.size === undefined || pattern.size < 1 || pattern.size > 50) {
    errors.push('Pattern size must be between 1 and 50')
  }
  
  if (pattern.density === undefined || pattern.density < 1 || pattern.density > 10) {
    errors.push('Pattern density must be between 1 and 10')
  }
  
  if (!pattern.color || !isValidColor(pattern.color)) {
    errors.push('Valid color is required')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate hex color format
 */
function isValidColor(color) {
  return /^#[0-9A-F]{6}$/i.test(color)
}

/**
 * Render a pattern to a canvas context
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} pattern - Pattern object
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 */
export function renderPattern(ctx, pattern, width, height) {
  if (!ctx || !pattern) return
  
  ctx.clearRect(0, 0, width, height)
  ctx.strokeStyle = pattern.color
  ctx.fillStyle = pattern.color
  
  const spacing = 50 / pattern.density // Convert density to spacing
  
  switch (pattern.type) {
    case 'dots-small':
    case 'dots-large':
      renderDotsPattern(ctx, pattern, width, height, spacing)
      break
    case 'crosshatch':
      renderCrosshatchPattern(ctx, pattern, width, height, spacing)
      break
    case 'hatch-left':
      renderHatchPattern(ctx, pattern, width, height, spacing, -45)
      break
    case 'hatch-right':
      renderHatchPattern(ctx, pattern, width, height, spacing, 45)
      break
    case 'stipple':
      renderStipplePattern(ctx, pattern, width, height, spacing)
      break
    default:
      // Fallback: render dots
      renderDotsPattern(ctx, pattern, width, height, spacing)
  }
}

/**
 * Render dots pattern
 */
function renderDotsPattern(ctx, pattern, width, height, spacing) {
  const radius = pattern.size / 2
  
  for (let x = spacing; x < width; x += spacing) {
    for (let y = spacing; y < height; y += spacing) {
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

/**
 * Render crosshatch pattern
 */
function renderCrosshatchPattern(ctx, pattern, width, height, spacing) {
  ctx.lineWidth = 1
  
  // Draw diagonal lines from top-left to bottom-right
  for (let i = -height; i < width; i += spacing) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i + height, height)
    ctx.stroke()
  }
  
  // Draw diagonal lines from top-right to bottom-left
  for (let i = 0; i < width + height; i += spacing) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i - height, height)
    ctx.stroke()
  }
}

/**
 * Render single-direction hatch pattern
 */
function renderHatchPattern(ctx, pattern, width, height, spacing, angle) {
  ctx.lineWidth = 1
  
  const angleRad = (angle * Math.PI) / 180
  const distance = width + height
  
  for (let i = -distance; i < distance; i += spacing) {
    ctx.beginPath()
    
    if (angle === -45) {
      // Left-leaning lines
      ctx.moveTo(i, 0)
      ctx.lineTo(i + distance, distance)
    } else {
      // Right-leaning lines
      ctx.moveTo(i, 0)
      ctx.lineTo(i - distance, distance)
    }
    
    ctx.stroke()
  }
}

/**
 * Render random stipple pattern
 */
function renderStipplePattern(ctx, pattern, width, height, spacing) {
  const radius = pattern.size / 2
  const pointsCount = Math.floor((width * height) / (spacing * spacing))
  
  // Use pattern ID as seed for consistent randomness
  let seed = pattern.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  
  function seededRandom() {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  
  for (let i = 0; i < pointsCount; i++) {
    const x = seededRandom() * width
    const y = seededRandom() * height
    
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

/**
 * Create a canvas pattern for use in drawing
 * @param {Object} pattern - Pattern object
 * @param {number} tileSize - Size of the pattern tile
 * @returns {CanvasPattern} Canvas pattern object
 */
export function createCanvasPattern(pattern, tileSize = 100) {
  const canvas = document.createElement('canvas')
  canvas.width = tileSize
  canvas.height = tileSize
  const ctx = canvas.getContext('2d')
  
  renderPattern(ctx, pattern, tileSize, tileSize)
  
  return canvas
}
