/**
 * Utility functions for undo/redo stack management
 * Implements a two-stack approach for undo/redo functionality
 */

/**
 * Capture the current canvas state as ImageData
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @returns {ImageData|null} The captured image data
 */
export function captureCanvasState(canvas) {
  if (!canvas) return null
  
  const ctx = canvas.getContext('2d')
  return ctx.getImageData(0, 0, canvas.width, canvas.height)
}

/**
 * Restore canvas state from ImageData
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {ImageData} imageData - The image data to restore
 */
export function restoreCanvasState(canvas, imageData) {
  if (!canvas || !imageData) return
  
  const ctx = canvas.getContext('2d')
  ctx.putImageData(imageData, 0, 0)
}

/**
 * Push a new state onto the undo stack
 * @param {Array} undoStack - The undo stack
 * @param {ImageData} state - The state to push
 * @param {number} maxStackSize - Maximum stack size (default 50)
 * @returns {Array} New undo stack
 */
export function pushToUndoStack(undoStack, state, maxStackSize = 50) {
  const newStack = [...undoStack, state]
  
  // Limit stack size to prevent memory issues
  if (newStack.length > maxStackSize) {
    return newStack.slice(1)
  }
  
  return newStack
}

/**
 * Perform undo operation
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {Array} undoStack - The undo stack
 * @param {Array} redoStack - The redo stack
 * @returns {Object} New stack states { undoStack, redoStack }
 */
export function performUndo(canvas, undoStack, redoStack) {
  if (undoStack.length === 0) {
    return { undoStack, redoStack }
  }
  
  // Capture current state for redo
  const currentState = captureCanvasState(canvas)
  
  // Pop the last state from undo stack
  const newUndoStack = [...undoStack]
  const stateToRestore = newUndoStack.pop()
  
  // Restore the state
  restoreCanvasState(canvas, stateToRestore)
  
  // Push current state to redo stack
  const newRedoStack = [...redoStack, currentState]
  
  return {
    undoStack: newUndoStack,
    redoStack: newRedoStack
  }
}

/**
 * Perform redo operation
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {Array} undoStack - The undo stack
 * @param {Array} redoStack - The redo stack
 * @returns {Object} New stack states { undoStack, redoStack }
 */
export function performRedo(canvas, undoStack, redoStack) {
  if (redoStack.length === 0) {
    return { undoStack, redoStack }
  }
  
  // Capture current state for undo
  const currentState = captureCanvasState(canvas)
  
  // Pop the last state from redo stack
  const newRedoStack = [...redoStack]
  const stateToRestore = newRedoStack.pop()
  
  // Restore the state
  restoreCanvasState(canvas, stateToRestore)
  
  // Push current state to undo stack
  const newUndoStack = pushToUndoStack(undoStack, currentState)
  
  return {
    undoStack: newUndoStack,
    redoStack: newRedoStack
  }
}

/**
 * Clear the redo stack (called when a new action occurs after undo)
 * @returns {Array} Empty array
 */
export function clearRedoStack() {
  return []
}
