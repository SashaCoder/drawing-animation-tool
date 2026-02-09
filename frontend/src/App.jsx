import { useState, useRef, useEffect } from 'react'
import './App.css'
import ToolPanel from './components/ToolPanel'

function App() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [context, setContext] = useState(null)
  const [brushSize, setBrushSize] = useState(3)

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
    
    context.beginPath()
    context.moveTo(x, y)
    setIsDrawing(true)
  }

  const draw = (e) => {
    if (!isDrawing || !context) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    context.lineTo(x, y)
    context.stroke()
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

  return (
    <div className="app">
      <header className="app-header">
        <h1>Drawing Tool</h1>
        <p className="hello-world">Hello World</p>
      </header>
      
      <main className="app-main">
        <ToolPanel 
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
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
              Clear
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
