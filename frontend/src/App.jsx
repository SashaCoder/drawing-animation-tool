import { useState, useRef, useEffect } from 'react'
import './App.css'
import ToolPanel from './components/ToolPanel'
import PatternManager from './components/PatternManager'
import { defaultPatterns } from './data/defaultPatterns'
import { generatePatternId, renderPattern } from './utils/patternUtils'

function App() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [context, setContext] = useState(null)
  const [brushSize, setBrushSize] = useState(3)
  
  // Pattern state management
  const [maxPatterns, setMaxPatterns] = useState(16)
  const [patterns, setPatterns] = useState([])
  const [selectedPattern, setSelectedPattern] = useState(null)
  const [activePattern, setActivePattern] = useState(null)

  // Initialize patterns and parse query parameters
  useEffect(() => {
    // Parse URL query parameters
    const params = new URLSearchParams(window.location.search)
    const maxParam = parseInt(params.get('maxPatterns'))
    
    // Set max patterns (clamp between 1 and 50, default to 16)
    const max = isNaN(maxParam) ? 16 : Math.min(Math.max(maxParam, 1), 50)
    setMaxPatterns(max)
    
    // Initialize with default patterns (limit to max)
    setPatterns(defaultPatterns.slice(0, max))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = brushSize
      ctx.strokeStyle = '#000000'
      setContext(ctx)
    }
  }, [])

  useEffect(() => {
    if (context) {
      context.lineWidth = brushSize
    }
  }, [brushSize, context])

  const startDrawing = (e) => {
    if (!context) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    if (activePattern) {
      // For pattern mode, we'll stamp patterns as we draw
      drawPatternStamp(x, y)
    } else {
      // Regular drawing mode
      context.beginPath()
      context.moveTo(x, y)
    }
    
    setIsDrawing(true)
  }

  const draw = (e) => {
    if (!isDrawing || !context) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    if (activePattern) {
      // Draw pattern stamps along the path
      drawPatternStamp(x, y)
    } else {
      // Regular line drawing
      context.lineTo(x, y)
      context.stroke()
    }
  }

  // Draw a pattern stamp at the given position
  const drawPatternStamp = (x, y) => {
    if (!activePattern || !context) return
    
    const stampSize = brushSize * 10 // Scale pattern with brush size
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = stampSize
    tempCanvas.height = stampSize
    const tempCtx = tempCanvas.getContext('2d')
    
    // Render pattern to temporary canvas
    renderPattern(tempCtx, activePattern, stampSize, stampSize)
    
    // Draw the pattern stamp centered at cursor position
    context.drawImage(tempCanvas, x - stampSize / 2, y - stampSize / 2)
  }

  const stopDrawing = () => {
    if (!context) return
    context.closePath()
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    if (!context || !canvasRef.current) return
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }

  // CRUD Operations for Patterns
  
  // CREATE: Add a new pattern
  const handleCreatePattern = (formData) => {
    if (patterns.length >= maxPatterns) {
      alert('Maximum pattern limit reached!')
      return
    }
    
    const newPattern = {
      ...formData,
      id: generatePatternId(),
      createdAt: Date.now()
    }
    
    setPatterns(prev => [...prev, newPattern])
  }
  
  // READ: Select a pattern for preview
  const handleSelectPattern = (pattern) => {
    setSelectedPattern(pattern)
  }
  
  // UPDATE: Modify an existing pattern
  const handleUpdatePattern = (patternId, formData) => {
    setPatterns(prev => prev.map(pattern => 
      pattern.id === patternId 
        ? { ...pattern, ...formData }
        : pattern
    ))
    
    // Update selected pattern if it's the one being edited
    if (selectedPattern?.id === patternId) {
      setSelectedPattern(prev => ({ ...prev, ...formData }))
    }
    
    // Update active pattern if it's the one being edited
    if (activePattern?.id === patternId) {
      setActivePattern(prev => ({ ...prev, ...formData }))
    }
  }
  
  // DELETE: Remove a pattern
  const handleDeletePattern = (patternId) => {
    setPatterns(prev => prev.filter(pattern => pattern.id !== patternId))
    
    // Clear selection if the deleted pattern was selected
    if (selectedPattern?.id === patternId) {
      setSelectedPattern(null)
    }
    
    // Clear active pattern if the deleted pattern was active
    if (activePattern?.id === patternId) {
      setActivePattern(null)
    }
  }
  
  // Apply a pattern to the drawing brush
  const handleApplyPattern = (pattern) => {
    setActivePattern(pattern)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Drawing Tool</h1>
        <p className="hello-world">Pattern-Based Drawing</p>
      </header>
      
      <main className="app-main">
        <ToolPanel 
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
          activePattern={activePattern}
          onClearPattern={() => setActivePattern(null)}
        />
        
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="drawing-canvas"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          
          <div className="controls">
            <button onClick={clearCanvas} className="clear-button">
              Clear Canvas
            </button>
          </div>
        </div>
        
        <PatternManager 
          patterns={patterns}
          selectedPattern={selectedPattern}
          maxPatterns={maxPatterns}
          onSelectPattern={handleSelectPattern}
          onCreatePattern={handleCreatePattern}
          onUpdatePattern={handleUpdatePattern}
          onDeletePattern={handleDeletePattern}
          onApplyPattern={handleApplyPattern}
        />
      </main>
    </div>
  )
}

export default App
