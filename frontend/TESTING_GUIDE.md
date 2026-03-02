# Pattern Toolbar Testing Guide

This guide provides step-by-step instructions to test all CRUD operations for the pattern toolbar feature.

## Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to the local development URL (typically `http://localhost:3001`)

## Testing Checklist

### 1. Initial Load Tests ✓

**Test: Default Patterns Load**
- [ ] Verify 16 patterns appear in the Pattern Library panel on the right
- [ ] Verify patterns show preview images in the grid
- [ ] Verify pattern count shows "16 / 16 patterns"

**Test: No Pattern Selected Initially**
- [ ] Verify "Select a pattern to preview" message appears in the preview area
- [ ] Verify no pattern is highlighted in the grid

### 2. READ Operations ✓

**Test: View All Patterns**
- [ ] Scroll through the pattern grid
- [ ] Verify all 16 default patterns are visible:
  - Small Dots (Sparse, Medium, Dense)
  - Large Dots (Sparse, Medium, Dense)
  - Crosshatch (Fine, Medium, Coarse)
  - Side Hatch Left (Fine, Medium, Coarse)
  - Side Hatch Right (Fine, Medium, Coarse)
  - Stipple (Light)

**Test: Select a Pattern**
- [ ] Click on any pattern card
- [ ] Verify the pattern card gets a blue border (selected state)
- [ ] Verify the Pattern Preview section shows:
  - Larger preview canvas with the pattern rendered
  - Pattern name
  - Pattern details (Type, Size, Density, Color)
  - Pattern description
  - Action buttons (Apply to Brush, Edit, Delete)

### 3. CREATE Operations ✓

**Test: Add a New Pattern (Within Limit)**
- [ ] Click the "+ Add Pattern" button
- [ ] Verify the pattern form appears
- [ ] Fill in the form:
  - Name: "My Test Pattern"
  - Type: Select "Crosshatch"
  - Size: Adjust slider to 15
  - Density: Adjust slider to 7
  - Color: Choose a color (e.g., #FF0000)
  - Description: "This is a test pattern"
- [ ] Click "Create Pattern"
- [ ] Verify the form closes
- [ ] Verify the new pattern appears in the pattern grid
- [ ] Verify pattern count increases to 17 / 16 patterns

**Test: Maximum Pattern Limit**
- [ ] Delete patterns until at exactly the max limit
- [ ] Verify the "+ Add Pattern" button is disabled
- [ ] Verify a warning message appears: "Maximum pattern limit reached..."
- [ ] Try clicking the disabled button - nothing should happen

**Test: Form Validation**
- [ ] Delete a pattern to make room (if at max)
- [ ] Click "+ Add Pattern"
- [ ] Try to submit the form with an empty name
- [ ] Verify validation errors appear in red
- [ ] Fill in the name field with valid data
- [ ] Submit the form
- [ ] Verify the pattern is created successfully

**Test: Cancel Pattern Creation**
- [ ] Click "+ Add Pattern"
- [ ] Fill in some fields
- [ ] Click "Cancel"
- [ ] Verify the form closes
- [ ] Verify no new pattern was added

### 4. UPDATE Operations ✓

**Test: Edit an Existing Pattern**
- [ ] Select any pattern from the grid
- [ ] Click the "Edit" button in the preview area
- [ ] Verify the form appears with pre-filled values
- [ ] Change the name to "Updated Pattern Name"
- [ ] Change the size to a different value
- [ ] Click "Update Pattern"
- [ ] Verify the form closes
- [ ] Verify the pattern card shows the updated name
- [ ] Click the pattern again to see updated details in preview

**Test: Edit Updates Preview**
- [ ] Select and edit a pattern
- [ ] Change the pattern type (e.g., from "dots-small" to "hatch-left")
- [ ] Update the pattern
- [ ] Verify the preview canvas shows the new pattern type rendered

**Test: Cancel Pattern Edit**
- [ ] Select a pattern and click "Edit"
- [ ] Change several fields
- [ ] Click "Cancel"
- [ ] Verify the pattern retains its original values
- [ ] Verify the form closes

### 5. DELETE Operations ✓

**Test: Delete a Pattern**
- [ ] Select any pattern
- [ ] Click the "Delete" button
- [ ] Verify a confirmation dialog appears: "Are you sure you want to delete this pattern?"
- [ ] Click "OK" to confirm
- [ ] Verify the pattern is removed from the grid
- [ ] Verify the pattern count decreases
- [ ] Verify the preview area shows "Select a pattern to preview" (selection cleared)

**Test: Cancel Pattern Deletion**
- [ ] Select a pattern
- [ ] Click "Delete"
- [ ] Click "Cancel" in the confirmation dialog
- [ ] Verify the pattern is NOT deleted
- [ ] Verify the pattern remains in the grid

**Test: Delete While at Max Capacity**
- [ ] Ensure you're at max pattern capacity
- [ ] Delete one pattern
- [ ] Verify "+ Add Pattern" button becomes enabled
- [ ] Verify warning message disappears

### 6. URL Query Parameter Tests ✓

**Test: Default Max Patterns**
- [ ] Open the app without query parameters: `http://localhost:3001/`
- [ ] Verify "16 / 16 patterns" is shown
- [ ] Verify you can have up to 16 patterns

**Test: Custom Max Patterns (Lower)**
- [ ] Open: `http://localhost:3001/?maxPatterns=5`
- [ ] Verify only 5 patterns load initially
- [ ] Verify pattern count shows "5 / 5 patterns"
- [ ] Delete a pattern
- [ ] Verify you can add up to 5 patterns total

**Test: Custom Max Patterns (Higher)**
- [ ] Open: `http://localhost:3001/?maxPatterns=25`
- [ ] Verify "16 / 25 patterns" is shown (16 defaults loaded)
- [ ] Add new patterns
- [ ] Verify you can add up to 25 patterns total

**Test: Custom Max Patterns (Edge Cases)**
- [ ] Test `?maxPatterns=50` - should work (max limit)
- [ ] Test `?maxPatterns=1` - should show 1 pattern max
- [ ] Test `?maxPatterns=0` - should default to 16
- [ ] Test `?maxPatterns=-5` - should clamp to 1 (minimum)
- [ ] Test `?maxPatterns=100` - should clamp to 50 (maximum)
- [ ] Test `?maxPatterns=abc` - should default to 16 (invalid)

### 7. Pattern Application to Drawing ✓

**Test: Apply Pattern to Brush**
- [ ] Select any pattern
- [ ] Click "Apply to Brush" button
- [ ] Verify the left ToolPanel shows:
  - "Active Pattern" section with blue background
  - Pattern name and type displayed
  - "Clear Pattern" button visible
  - Info text changes to "Drawing with pattern mode"

**Test: Draw with Pattern**
- [ ] With a pattern applied, click and drag on the canvas
- [ ] Verify the pattern is stamped/drawn instead of solid lines
- [ ] Try different brush sizes using the slider
- [ ] Verify pattern stamp size scales with brush size

**Test: Clear Pattern**
- [ ] With a pattern active, click "Clear Pattern" in the ToolPanel
- [ ] Verify the active pattern section disappears
- [ ] Draw on the canvas
- [ ] Verify normal line drawing is restored

**Test: Switch Between Patterns**
- [ ] Apply pattern A (e.g., "Small Dots - Sparse")
- [ ] Draw on canvas - verify dots appear
- [ ] Apply pattern B (e.g., "Crosshatch - Fine")
- [ ] Draw on canvas - verify crosshatch appears
- [ ] Verify different patterns are used correctly

**Test: Delete Active Pattern**
- [ ] Apply a pattern to the brush
- [ ] Go back to the pattern library
- [ ] Delete that same pattern
- [ ] Verify the active pattern is cleared from the ToolPanel
- [ ] Verify drawing returns to normal mode

### 8. Edge Cases & Error Handling ✓

**Test: Empty Pattern Name**
- [ ] Click "+ Add Pattern"
- [ ] Leave the name field empty
- [ ] Try to submit
- [ ] Verify error message: "Pattern name is required"

**Test: Invalid Color**
- [ ] Create/edit a pattern
- [ ] Manually type an invalid color in the hex field (e.g., "red")
- [ ] Try to submit
- [ ] Verify validation catches invalid format

**Test: Rapid Clicking**
- [ ] Rapidly click different pattern cards
- [ ] Verify selection updates correctly each time
- [ ] Verify no errors occur in the console

**Test: Delete All Patterns**
- [ ] Delete patterns one by one until none remain
- [ ] Verify "No patterns available. Create a new pattern to get started!" message appears
- [ ] Verify "+ Add Pattern" button is still enabled
- [ ] Create a new pattern
- [ ] Verify it appears correctly in the grid

**Test: Canvas Clear While Pattern Active**
- [ ] Apply a pattern
- [ ] Draw on canvas with the pattern
- [ ] Click "Clear Canvas"
- [ ] Verify canvas clears but pattern remains active in ToolPanel
- [ ] Draw again to verify pattern still works

**Test: Edit Active Pattern**
- [ ] Apply a pattern to the brush
- [ ] Edit that same pattern (change name/type/size)
- [ ] Update the pattern
- [ ] Verify the active pattern in ToolPanel reflects the changes
- [ ] Draw to verify the updated pattern is used

### 9. UI/UX Tests ✓

**Test: Responsive Behavior**
- [ ] Resize browser window to narrow width
- [ ] Verify layout adjusts appropriately
- [ ] Verify all panels remain accessible
- [ ] Verify pattern grid adjusts columns

**Test: Keyboard Navigation**
- [ ] Click on the pattern grid area
- [ ] Press Tab to navigate through pattern cards
- [ ] Press Enter on a focused card to select it
- [ ] Verify keyboard accessibility works correctly

**Test: Visual Feedback**
- [ ] Hover over pattern cards - verify hover effect (shadow, border color change)
- [ ] Hover over buttons - verify hover states
- [ ] Verify selected pattern has blue border
- [ ] Verify active pattern section has blue background

**Test: Scrolling**
- [ ] Add enough patterns to make the list scrollable
- [ ] Scroll through the pattern list
- [ ] Verify scrollbar appears and works correctly
- [ ] Verify scrollbar is styled (not default ugly scrollbar)

## Success Criteria

All tests should pass with:
- ✅ No console errors
- ✅ Smooth interactions with no lag
- ✅ Correct data persistence during session
- ✅ Proper validation and error handling
- ✅ All CRUD operations working as expected
- ✅ URL query parameters working correctly
- ✅ Pattern rendering working on canvas
- ✅ Clean UI with proper feedback

## Known Behaviors

**Expected Behaviors:**
- Data resets on page refresh (in-memory only)
- Patterns are limited by the `maxPatterns` query parameter (default: 16, max: 50)
- Only the first `maxPatterns` default patterns load on initial page load
- Pattern IDs are unique and generated with timestamp + random string

**Not Bugs:**
- Pattern count can temporarily exceed limit if default patterns + new patterns go over (by design for flexibility)
- Page refresh loses all created/edited patterns (no persistence layer)

## Automated Testing Commands

While this is a manual testing guide, you can verify the app starts correctly:

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production (verify no build errors)
npm run build

# Preview production build
npm run preview
```

## Reporting Issues

If you find issues during testing:
1. Note the exact steps to reproduce
2. Check browser console for errors
3. Note browser and version
4. Note query parameters used (if any)
5. Take screenshots if applicable

## Notes

- Use Chrome/Edge for best compatibility
- Test in Firefox and Safari as well if possible
- Clear browser cache if seeing stale data
- Check console for any warnings or errors
- Test with browser DevTools open to monitor network/console
