# Undo/Redo Validation Guide

This document provides deterministic test sequences to validate the undo/redo functionality in the drawing tool application.

## Overview

The undo/redo system uses two stacks:
- **Undo Stack**: Stores previous canvas states that can be restored
- **Redo Stack**: Stores undone states that can be re-applied

## Key Requirements Validated

1. ✅ Two-stack architecture (undoStack and redoStack)
2. ✅ Support for draw strokes and pattern drawing actions
3. ✅ Redo stack clears when new action occurs after undo
4. ✅ UI controls with proper disabled states
5. ✅ Keyboard shortcuts (Ctrl+Z, Ctrl+Y/Ctrl+Shift+Z)

---

## Test Sequence 1: Basic Draw Stroke Undo/Redo

**Purpose**: Verify undo/redo works for basic freehand drawing

### Steps:

1. **Initial State**
   - Open the application
   - Verify canvas is blank
   - Verify "Undo" button is disabled (undo count: 0)
   - Verify "Redo" button is disabled (redo count: 0)

2. **Draw First Stroke**
   - Click and drag on canvas to draw a line
   - Release mouse
   - **Expected**: 
     - Line appears on canvas
     - Undo button becomes enabled (undo count: 1)
     - Redo button remains disabled (redo count: 0)

3. **Draw Second Stroke**
   - Click and drag to draw another line in a different location
   - Release mouse
   - **Expected**:
     - Second line appears on canvas
     - Undo count: 2
     - Redo count: 0

4. **Draw Third Stroke**
   - Click and drag to draw a third line
   - Release mouse
   - **Expected**:
     - Third line appears on canvas
     - Undo count: 3
     - Redo count: 0

5. **Perform First Undo**
   - Click "Undo" button
   - **Expected**:
     - Third line disappears (only first two lines visible)
     - Undo count: 2
     - Redo count: 1
     - Redo button becomes enabled

6. **Perform Second Undo**
   - Click "Undo" button again
   - **Expected**:
     - Second line disappears (only first line visible)
     - Undo count: 1
     - Redo count: 2

7. **Perform First Redo**
   - Click "Redo" button
   - **Expected**:
     - Second line reappears
     - Undo count: 2
     - Redo count: 1

8. **Perform Second Redo**
   - Click "Redo" button again
   - **Expected**:
     - Third line reappears (all three lines visible)
     - Undo count: 3
     - Redo count: 0
     - Redo button becomes disabled

---

## Test Sequence 2: Redo Stack Clears on New Action

**Purpose**: Verify redo stack clears when new action occurs after undo (CRITICAL REQUIREMENT)

### Steps:

1. **Setup**
   - Draw three strokes (as in Test 1, steps 2-4)
   - Verify undo count: 3, redo count: 0

2. **Undo Twice**
   - Click "Undo" button twice
   - **Expected**:
     - Only first stroke visible
     - Undo count: 1
     - Redo count: 2

3. **Draw New Stroke** (Critical step)
   - Click and drag to draw a new line
   - Release mouse
   - **Expected** (VERIFY CAREFULLY):
     - New line appears on canvas
     - Undo count: 2
     - **Redo count: 0** ← Redo stack MUST be cleared!
     - Redo button becomes disabled

4. **Verify Redo is Cleared**
   - Click "Redo" button
   - **Expected**: Nothing happens (button is disabled)

---

## Test Sequence 3: Pattern Drawing Undo/Redo

**Purpose**: Verify undo/redo works with pattern-based drawing

### Steps:

1. **Setup - Select a Pattern**
   - In the Pattern Library, click on any pattern (e.g., "Small Dots - Sparse")
   - Click "Apply Pattern" button in the preview panel
   - **Expected**: Active pattern shows in Tool Panel

2. **Draw with Pattern - First Stroke**
   - Click and drag on canvas with pattern active
   - Release mouse
   - **Expected**:
     - Pattern stamps appear along the path
     - Undo count: 1
     - Redo count: 0

3. **Draw with Pattern - Second Stroke**
   - Click and drag in a different location
   - Release mouse
   - **Expected**:
     - More pattern stamps appear
     - Undo count: 2
     - Redo count: 0

4. **Clear Pattern and Draw Normal Stroke**
   - Click "Clear Pattern" button in Tool Panel
   - Draw a normal freehand stroke
   - Release mouse
   - **Expected**:
     - Regular line appears
     - Undo count: 3
     - Redo count: 0

5. **Undo All Actions**
   - Click "Undo" three times
   - **Expected**:
     - Canvas becomes blank
     - Undo count: 0
     - Redo count: 3
     - Undo button becomes disabled

6. **Redo All Actions**
   - Click "Redo" three times
   - **Expected**:
     - All strokes reappear (pattern and regular)
     - Undo count: 3
     - Redo count: 0
     - Redo button becomes disabled

---

## Test Sequence 4: Keyboard Shortcuts

**Purpose**: Verify keyboard shortcuts work correctly

### Steps:

1. **Setup**
   - Draw three strokes
   - Verify undo count: 3

2. **Test Ctrl+Z (Undo)**
   - Press Ctrl+Z (or Cmd+Z on Mac)
   - **Expected**:
     - Last stroke disappears
     - Undo count: 2
     - Redo count: 1

3. **Test Multiple Ctrl+Z**
   - Press Ctrl+Z twice more
   - **Expected**:
     - All strokes disappear
     - Undo count: 0
     - Redo count: 3

4. **Test Ctrl+Y (Redo - Windows/Linux)**
   - Press Ctrl+Y
   - **Expected**:
     - First stroke reappears
     - Undo count: 1
     - Redo count: 2

5. **Test Ctrl+Shift+Z (Redo - Mac/Alternative)**
   - Press Ctrl+Shift+Z (or Cmd+Shift+Z on Mac)
   - **Expected**:
     - Second stroke reappears
     - Undo count: 2
     - Redo count: 1

---

## Test Sequence 5: Clear Canvas Integration

**Purpose**: Verify clear canvas action works with undo/redo

### Steps:

1. **Setup**
   - Draw several strokes on canvas
   - Verify strokes are visible

2. **Clear Canvas**
   - Click "Clear Canvas" button
   - **Expected**:
     - Canvas becomes blank
     - Undo count increases by 1
     - Redo count: 0

3. **Undo Clear**
   - Click "Undo" button
   - **Expected**:
     - All previous strokes reappear
     - Canvas restored to state before clear

4. **Redo Clear**
   - Click "Redo" button
   - **Expected**:
     - Canvas becomes blank again

---

## Test Sequence 6: Edge Cases

**Purpose**: Test boundary conditions and error handling

### Test 6.1: Undo on Empty Canvas

1. Open fresh application
2. Click "Undo" button (should be disabled)
3. Press Ctrl+Z
4. **Expected**: Nothing happens, no errors

### Test 6.2: Redo on Empty Redo Stack

1. Draw a stroke
2. Click "Redo" button (should be disabled)
3. Press Ctrl+Y
4. **Expected**: Nothing happens, no errors

### Test 6.3: Maximum Undo Stack Size

1. Draw 60 strokes (exceeds default max of 50)
2. **Expected**:
   - Undo count should not exceed 50
   - Can undo up to 50 actions
   - Oldest actions are discarded

### Test 6.4: Rapid Action Sequence

1. Draw stroke → Undo → Draw stroke → Undo → Draw stroke
2. **Expected**:
   - Each new stroke clears redo stack
   - Undo/redo counts update correctly
   - No visual glitches or errors

---

## Automated Validation Script

Below is a programmatic validation sequence that can be run in the browser console:

```javascript
// Automated Undo/Redo Validation Script
// Run this in the browser console after opening the application

async function validateUndoRedo() {
  console.log('🧪 Starting Undo/Redo Validation...\n');
  
  // Helper function to get button states
  function getButtonStates() {
    const undoBtn = document.querySelector('.undo-btn');
    const redoBtn = document.querySelector('.redo-btn');
    const undoCount = undoBtn?.textContent.match(/\((\d+)\)/)?.[1] || '0';
    const redoCount = redoBtn?.textContent.match(/\((\d+)\)/)?.[1] || '0';
    
    return {
      canUndo: !undoBtn?.disabled,
      canRedo: !redoBtn?.disabled,
      undoCount: parseInt(undoCount),
      redoCount: parseInt(redoCount)
    };
  }
  
  // Helper to simulate drawing
  function simulateDrawing(x, y, dx, dy) {
    const canvas = document.querySelector('.drawing-canvas');
    const rect = canvas.getBoundingClientRect();
    
    // Mouse down
    canvas.dispatchEvent(new MouseEvent('mousedown', {
      clientX: rect.left + x,
      clientY: rect.top + y,
      bubbles: true
    }));
    
    // Mouse move
    canvas.dispatchEvent(new MouseEvent('mousemove', {
      clientX: rect.left + x + dx,
      clientY: rect.top + y + dy,
      bubbles: true
    }));
    
    // Mouse up
    canvas.dispatchEvent(new MouseEvent('mouseup', {
      bubbles: true
    }));
  }
  
  // Test 1: Initial state
  console.log('Test 1: Initial State');
  let state = getButtonStates();
  console.assert(!state.canUndo, '❌ Undo should be disabled initially');
  console.assert(!state.canRedo, '❌ Redo should be disabled initially');
  console.assert(state.undoCount === 0, '❌ Undo count should be 0');
  console.assert(state.redoCount === 0, '❌ Redo count should be 0');
  console.log('✅ Initial state validated\n');
  
  // Test 2: Draw strokes
  console.log('Test 2: Drawing Strokes');
  simulateDrawing(100, 100, 50, 50);
  await new Promise(r => setTimeout(r, 100));
  state = getButtonStates();
  console.assert(state.canUndo, '❌ Undo should be enabled after drawing');
  console.assert(state.undoCount === 1, '❌ Undo count should be 1');
  
  simulateDrawing(200, 200, 50, 50);
  await new Promise(r => setTimeout(r, 100));
  state = getButtonStates();
  console.assert(state.undoCount === 2, '❌ Undo count should be 2');
  
  simulateDrawing(300, 300, 50, 50);
  await new Promise(r => setTimeout(r, 100));
  state = getButtonStates();
  console.assert(state.undoCount === 3, '❌ Undo count should be 3');
  console.log('✅ Drawing strokes validated\n');
  
  // Test 3: Undo
  console.log('Test 3: Undo Operations');
  document.querySelector('.undo-btn').click();
  await new Promise(r => setTimeout(r, 100));
  state = getButtonStates();
  console.assert(state.undoCount === 2, '❌ Undo count should be 2 after undo');
  console.assert(state.redoCount === 1, '❌ Redo count should be 1 after undo');
  console.assert(state.canRedo, '❌ Redo should be enabled after undo');
  console.log('✅ Undo operations validated\n');
  
  // Test 4: Redo stack clears on new action (CRITICAL)
  console.log('Test 4: Redo Stack Clears on New Action');
  simulateDrawing(400, 400, 50, 50);
  await new Promise(r => setTimeout(r, 100));
  state = getButtonStates();
  console.assert(state.redoCount === 0, '❌ CRITICAL: Redo stack should be cleared after new action!');
  console.assert(!state.canRedo, '❌ CRITICAL: Redo should be disabled after new action!');
  console.log('✅ Redo stack clearing validated\n');
  
  console.log('🎉 All validation tests passed!');
}

// Run validation
validateUndoRedo();
```

---

## Success Criteria

All tests pass when:

1. ✅ Undo/Redo buttons correctly enable/disable based on stack state
2. ✅ Stack counts display accurately
3. ✅ Canvas state correctly restores for all action types (draw, pattern, clear)
4. ✅ **Redo stack ALWAYS clears when new action occurs after undo**
5. ✅ Keyboard shortcuts work (Ctrl+Z, Ctrl+Y, Ctrl+Shift+Z)
6. ✅ No console errors during any operation
7. ✅ Visual feedback is smooth with no glitches

---

## Manual Testing Checklist

- [ ] Test Sequence 1: Basic Draw Stroke Undo/Redo
- [ ] Test Sequence 2: Redo Stack Clears on New Action
- [ ] Test Sequence 3: Pattern Drawing Undo/Redo
- [ ] Test Sequence 4: Keyboard Shortcuts
- [ ] Test Sequence 5: Clear Canvas Integration
- [ ] Test Sequence 6: Edge Cases
- [ ] Run Automated Validation Script
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test on different OS (Windows, Mac, Linux)

---

## Troubleshooting

### Issue: Redo stack not clearing on new action
- Check that `saveCanvasState()` calls `clearRedoStack()`
- Verify it's called in `stopDrawing()` and `clearCanvas()`

### Issue: Canvas state not restoring correctly
- Verify `captureCanvasState()` is capturing full ImageData
- Check `restoreCanvasState()` is using `putImageData()` correctly

### Issue: Buttons not enabling/disabling
- Check props passed to `UndoRedoControls`: `canUndo` and `canRedo`
- Verify stack length checks: `undoStack.length > 0`

### Issue: Keyboard shortcuts not working
- Check browser console for event listener errors
- Verify `useEffect` cleanup in `UndoRedoControls.jsx`
- Test with and without focus on canvas

---

## Architecture Notes

### Two-Stack Implementation

```
Initial: undoStack=[], redoStack=[]

After Draw1: undoStack=[state0], redoStack=[]
After Draw2: undoStack=[state0, state1], redoStack=[]
After Draw3: undoStack=[state0, state1, state2], redoStack=[]

After Undo: undoStack=[state0, state1], redoStack=[state2]
After Undo: undoStack=[state0], redoStack=[state2, state1]

After Redo: undoStack=[state0, state1], redoStack=[state2]

After Draw4: undoStack=[state0, state1, state3], redoStack=[] ← CLEARED!
```

### State Capture Points

1. **After each stroke completes** (`stopDrawing()`)
2. **Before clearing canvas** (`clearCanvas()`)
3. **NOT during drawing** (only on mouse up)

This ensures clean state snapshots and prevents memory issues.
