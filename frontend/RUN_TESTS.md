# 🧪 Running Automated Tests

## Quick Test Instructions

### Step 1: Open the Application
The dev server is running at: **http://localhost:3000**

Open this URL in your browser.

### Step 2: Open Browser DevTools
Press **F12** (or right-click → Inspect) to open Developer Tools.
Click on the **Console** tab.

### Step 3: Copy and Run the Test Script

Copy the entire script below and paste it into the browser console, then press Enter:

```javascript
// ======================================
// UNDO/REDO VALIDATION TEST SCRIPT
// ======================================

(async function validateUndoRedo() {
    console.log('%c🧪 Starting Undo/Redo Validation...', 'font-size: 20px; font-weight: bold; color: #00ff00');
    console.log('');
    
    let testsPassed = 0;
    let testsFailed = 0;
    
    function getButtonStates() {
        const undoBtn = document.querySelector('.undo-btn');
        const redoBtn = document.querySelector('.redo-btn');
        const undoCount = undoBtn?.textContent.match(/\((\d+)\)/)?.[1] || '0';
        const redoCount = redoBtn?.textContent.match(/\((\d+)\)/)?.[1] || '0';
        
        return {
            canUndo: !undoBtn?.disabled,
            canRedo: !redoBtn?.disabled,
            undoCount: parseInt(undoCount),
            redoCount: parseInt(redoCount),
            undoBtn,
            redoBtn
        };
    }
    
    function simulateDrawing(x, y, dx, dy) {
        const canvas = document.querySelector('.drawing-canvas');
        if (!canvas) {
            console.error('Canvas not found!');
            return false;
        }
        const rect = canvas.getBoundingClientRect();
        
        canvas.dispatchEvent(new MouseEvent('mousedown', {
            clientX: rect.left + x,
            clientY: rect.top + y,
            bubbles: true
        }));
        
        canvas.dispatchEvent(new MouseEvent('mousemove', {
            clientX: rect.left + x + dx,
            clientY: rect.top + y + dy,
            bubbles: true
        }));
        
        canvas.dispatchEvent(new MouseEvent('mouseup', {
            bubbles: true
        }));
        
        return true;
    }
    
    function assert(condition, message) {
        if (condition) {
            console.log('%c✅ PASS: ' + message, 'color: #00ff00');
            testsPassed++;
        } else {
            console.log('%c❌ FAIL: ' + message, 'color: #ff0000');
            testsFailed++;
        }
    }
    
    function logSection(title) {
        console.log('');
        console.log('%c' + '='.repeat(60), 'color: #ffaa00');
        console.log('%c' + title, 'font-size: 16px; font-weight: bold; color: #ffaa00');
        console.log('%c' + '='.repeat(60), 'color: #ffaa00');
    }
    
    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    
    // TEST 1: Initial State
    logSection('TEST 1: Initial State');
    let state = getButtonStates();
    assert(!state.canUndo, 'Undo button should be disabled initially');
    assert(!state.canRedo, 'Redo button should be disabled initially');
    assert(state.undoCount === 0, 'Undo count should be 0 initially');
    assert(state.redoCount === 0, 'Redo count should be 0 initially');
    
    // TEST 2: Drawing Strokes
    logSection('TEST 2: Drawing Strokes');
    console.log('Drawing stroke 1...');
    simulateDrawing(100, 100, 50, 50);
    await wait(150);
    state = getButtonStates();
    assert(state.canUndo, 'Undo button should be enabled after first stroke');
    assert(state.undoCount === 1, 'Undo count should be 1 after first stroke');
    assert(state.redoCount === 0, 'Redo count should be 0 after first stroke');
    
    console.log('Drawing stroke 2...');
    simulateDrawing(200, 200, 50, 50);
    await wait(150);
    state = getButtonStates();
    assert(state.undoCount === 2, 'Undo count should be 2 after second stroke');
    
    console.log('Drawing stroke 3...');
    simulateDrawing(300, 300, 50, 50);
    await wait(150);
    state = getButtonStates();
    assert(state.undoCount === 3, 'Undo count should be 3 after third stroke');
    assert(!state.canRedo, 'Redo should still be disabled');
    
    // TEST 3: Undo Operations
    logSection('TEST 3: Undo Operations');
    console.log('Performing undo 1...');
    state.undoBtn.click();
    await wait(150);
    state = getButtonStates();
    assert(state.undoCount === 2, 'Undo count should be 2 after first undo');
    assert(state.redoCount === 1, 'Redo count should be 1 after first undo');
    assert(state.canRedo, 'Redo button should be enabled after undo');
    
    console.log('Performing undo 2...');
    state.undoBtn.click();
    await wait(150);
    state = getButtonStates();
    assert(state.undoCount === 1, 'Undo count should be 1 after second undo');
    assert(state.redoCount === 2, 'Redo count should be 2 after second undo');
    
    // TEST 4: Redo Operations
    logSection('TEST 4: Redo Operations');
    console.log('Performing redo 1...');
    state.redoBtn.click();
    await wait(150);
    state = getButtonStates();
    assert(state.undoCount === 2, 'Undo count should be 2 after first redo');
    assert(state.redoCount === 1, 'Redo count should be 1 after first redo');
    
    // TEST 5: CRITICAL - Redo Stack Clears on New Action
    logSection('TEST 5: ⚠️ CRITICAL - Redo Stack Clears on New Action');
    console.log('%cThis is the most important test!', 'color: yellow; font-weight: bold');
    
    console.log('Current state: undo=' + state.undoCount + ', redo=' + state.redoCount);
    console.log('Drawing new stroke after undo...');
    simulateDrawing(400, 400, 50, 50);
    await wait(150);
    state = getButtonStates();
    
    assert(state.redoCount === 0, '🔥 CRITICAL: Redo stack MUST be cleared after new action!');
    assert(!state.canRedo, '🔥 CRITICAL: Redo button MUST be disabled after new action!');
    assert(state.undoCount === 3, 'Undo count should increase after new stroke');
    
    // TEST 6: Keyboard Shortcuts
    logSection('TEST 6: Keyboard Shortcuts');
    console.log('Testing Ctrl+Z (Undo)...');
    document.dispatchEvent(new KeyboardEvent('keydown', { 
        key: 'z', 
        ctrlKey: true, 
        bubbles: true 
    }));
    await wait(150);
    state = getButtonStates();
    assert(state.undoCount === 2, 'Ctrl+Z should trigger undo');
    assert(state.redoCount === 1, 'Redo count should increase after Ctrl+Z');
    
    console.log('Testing Ctrl+Y (Redo)...');
    document.dispatchEvent(new KeyboardEvent('keydown', { 
        key: 'y', 
        ctrlKey: true, 
        bubbles: true 
    }));
    await wait(150);
    state = getButtonStates();
    assert(state.undoCount === 3, 'Ctrl+Y should trigger redo');
    assert(state.redoCount === 0, 'Redo count should decrease after Ctrl+Y');
    
    // TEST 7: Clear Canvas Integration
    logSection('TEST 7: Clear Canvas Integration');
    const clearBtn = document.querySelector('.clear-button');
    if (clearBtn) {
        const beforeClearUndo = state.undoCount;
        console.log('Clicking Clear Canvas button...');
        clearBtn.click();
        await wait(150);
        state = getButtonStates();
        assert(state.undoCount === beforeClearUndo + 1, 'Undo count should increase after clear');
        assert(state.redoCount === 0, 'Redo stack should be cleared after clear');
        
        console.log('Testing undo after clear...');
        state.undoBtn.click();
        await wait(150);
        state = getButtonStates();
        assert(state.redoCount === 1, 'Should be able to undo clear canvas');
    }
    
    // TEST 8: Edge Cases
    logSection('TEST 8: Edge Cases');
    
    console.log('Testing undo until stack is empty...');
    while (state.canUndo) {
        state.undoBtn.click();
        await wait(100);
        state = getButtonStates();
    }
    assert(state.undoCount === 0, 'Should be able to undo all actions');
    assert(!state.canUndo, 'Undo button should be disabled when stack is empty');
    
    console.log('Attempting undo on empty stack...');
    state.undoBtn.click();
    await wait(100);
    state = getButtonStates();
    assert(state.undoCount === 0, 'Undo on empty stack should not cause errors');
    
    console.log('Testing redo until stack is empty...');
    while (state.canRedo) {
        state.redoBtn.click();
        await wait(100);
        state = getButtonStates();
    }
    assert(!state.canRedo, 'Redo button should be disabled when stack is empty');
    
    console.log('Attempting redo on empty stack...');
    state.redoBtn.click();
    await wait(100);
    state = getButtonStates();
    assert(state.redoCount === 0, 'Redo on empty stack should not cause errors');
    
    // FINAL RESULTS
    console.log('');
    console.log('%c' + '='.repeat(60), 'color: #00ffff');
    console.log('%c📊 FINAL RESULTS', 'font-size: 20px; font-weight: bold; color: #00ffff');
    console.log('%c' + '='.repeat(60), 'color: #00ffff');
    console.log('');
    console.log('%c✅ Tests Passed: ' + testsPassed, 'color: #00ff00; font-size: 16px; font-weight: bold');
    console.log('%c❌ Tests Failed: ' + testsFailed, 'color: #ff0000; font-size: 16px; font-weight: bold');
    console.log('');
    
    if (testsFailed === 0) {
        console.log('%c🎉 ALL TESTS PASSED! 🎉', 'font-size: 24px; font-weight: bold; color: #00ff00; background: #000; padding: 10px');
        console.log('%cUndo/Redo implementation is CORRECT! ✓', 'font-size: 16px; color: #00ff00');
    } else {
        console.log('%c⚠️  SOME TESTS FAILED', 'font-size: 20px; font-weight: bold; color: #ff0000; background: #000; padding: 10px');
        console.log('%cPlease review the failed tests above.', 'font-size: 14px; color: #ff0000');
    }
    
})();
```

## Expected Output

If all tests pass, you should see:

```
🎉 ALL TESTS PASSED! 🎉
Undo/Redo implementation is CORRECT! ✓

✅ Tests Passed: 27+
❌ Tests Failed: 0
```

## What the Tests Validate

1. ✅ Initial state (buttons disabled, counts at 0)
2. ✅ Drawing strokes increases undo count
3. ✅ Undo operations work correctly
4. ✅ Redo operations work correctly
5. ✅ **CRITICAL**: Redo stack clears on new action after undo
6. ✅ Keyboard shortcuts (Ctrl+Z, Ctrl+Y)
7. ✅ Clear canvas integration
8. ✅ Edge cases (empty stacks, multiple operations)

## Manual Quick Test

If you prefer to test manually:

1. Draw 3 lines → Undo count: (3)
2. Click Undo 2 times → Undo: (1), Redo: (2)
3. Draw new line → **Redo: (0)** ✓ (proves redo clears!)
4. Test Ctrl+Z and Ctrl+Y

---

**Ready to test!** 🚀
