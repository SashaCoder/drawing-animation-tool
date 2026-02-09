# Troubleshooting Guide - Drawing & Animation Tool

This guide helps you resolve common issues when setting up or running the Drawing & Animation Tool.

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [Runtime Issues](#runtime-issues)
3. [Drawing Issues](#drawing-issues)
4. [Platform-Specific Issues](#platform-specific-issues)
5. [Browser Issues](#browser-issues)

---

## Installation Issues

### ❌ "node: command not found" or "npm: command not found"

**Problem:** Node.js or npm is not installed or not in PATH.

**Solution:**

**macOS:**
```bash
# Install using Homebrew
brew install node

# Or download from https://nodejs.org/
```

**Windows:**
1. Download installer from https://nodejs.org/
2. Run installer with administrator privileges
3. Restart your terminal/PowerShell
4. Verify: `node --version`

---

### ❌ "npm install" fails with permission errors

**Problem:** Insufficient permissions to install packages.

**Solution:**

**macOS/Linux:**
```bash
# Don't use sudo! Instead, fix npm permissions:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Add to ~/.bash_profile or ~/.zshrc to make permanent
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bash_profile
```

**Windows:**
- Run PowerShell or Command Prompt as Administrator
- Navigate to the frontend directory
- Run `npm install` again

---

### ❌ "npm install" is very slow or hangs

**Problem:** Network issues or npm registry problems.

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try installing again
npm install

# If still slow, try a different registry mirror
npm config set registry https://registry.npmjs.org/
npm install
```

---

## Runtime Issues

### ❌ "npm run dev" fails immediately

**Problem:** Dependencies not installed or corrupted.

**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json  # macOS/Linux
# or
Remove-Item -Recurse -Force node_modules, package-lock.json  # Windows PowerShell

# Reinstall dependencies
npm install

# Try running again
npm run dev
```

---

### ❌ Port 3000 already in use

**Problem:** Another application is using port 3000.

**Solution:**

**Option 1: Stop the other application**
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

**Option 2: Use a different port**

Edit `frontend/vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,  // Change to any available port
    host: true
  }
})
```

---

### ❌ Browser shows "Cannot GET /"

**Problem:** Development server not running or wrong URL.

**Solution:**
1. Verify dev server is running: look for "Local: http://localhost:3000/" in terminal
2. Check the URL in browser matches the terminal output
3. Try restarting the dev server:
   ```bash
   # Press Ctrl+C to stop
   # Then restart:
   npm run dev
   ```

---

## Drawing Issues

### ❌ Can't draw on canvas (no lines appear)

**Problem:** Canvas context not initialized or JavaScript error.

**Solution:**
1. Open browser console (F12)
2. Look for error messages (red text)
3. Refresh the page (Ctrl+R or Cmd+R)
4. If errors persist, clear browser cache:
   - Chrome: Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
   - Select "Cached images and files"
   - Click "Clear data"

---

### ❌ Drawing is offset from cursor

**Problem:** Canvas positioning or scaling issue.

**Solution:**
1. Refresh the page
2. Ensure browser zoom is at 100% (Ctrl+0 or Cmd+0)
3. Try a different browser
4. Check browser console for errors

---

### ❌ Clear button doesn't work

**Problem:** Event handler not attached or context issue.

**Solution:**
1. Check browser console for errors
2. Refresh the page
3. Verify you can draw before clearing
4. If issue persists, restart the dev server

---

## Platform-Specific Issues

### macOS Issues

#### ❌ "xcrun: error: invalid active developer path"

**Problem:** Missing Xcode Command Line Tools (sometimes needed for npm packages).

**Solution:**
```bash
xcode-select --install
```

---

#### ❌ "gyp: No Xcode or CLT version detected"

**Problem:** Xcode tools not properly configured.

**Solution:**
```bash
sudo xcode-select --reset
xcode-select --install
```

---

### Windows Issues

#### ❌ "Scripts are disabled on this system"

**Problem:** PowerShell execution policy prevents running npm scripts.

**Solution:**
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then try again
npm run dev
```

---

#### ❌ Path too long errors

**Problem:** Windows path length limitation.

**Solution:**
1. Move project closer to root (e.g., `C:\projects\drawing-tool`)
2. Or enable long paths in Windows:
   ```powershell
   # Run as Administrator
   New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
   ```

---

## Browser Issues

### ❌ Blank page with no errors

**Problem:** Browser compatibility or caching issue.

**Solution:**
1. Try a different browser (Chrome, Firefox, Edge, Safari)
2. Clear browser cache and hard reload:
   - Chrome/Edge: Ctrl+Shift+R (Cmd+Shift+R on Mac)
   - Firefox: Ctrl+F5 (Cmd+Shift+R on Mac)
3. Disable browser extensions temporarily
4. Try incognito/private mode

---

### ❌ Console shows "Uncaught SyntaxError"

**Problem:** Browser doesn't support modern JavaScript.

**Solution:**
- Update your browser to the latest version
- Recommended browsers:
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+

---

## Still Having Issues?

If none of the above solutions work:

### 1. Check System Requirements
- Node.js 16.x or higher
- Modern browser (see above)
- At least 500MB free disk space

### 2. Verify Installation
```bash
node --version    # Should be 16.x or higher
npm --version     # Should be 7.x or higher
```

### 3. Clean Reinstall
```bash
# Navigate to frontend directory
cd frontend

# Remove everything
rm -rf node_modules package-lock.json dist

# Fresh install
npm install

# Run
npm run dev
```

### 4. Collect Diagnostic Information
- Operating System and version
- Node.js version (`node --version`)
- npm version (`npm --version`)
- Browser and version
- Complete error message from console
- Steps to reproduce the issue

---

## Common Error Messages Reference

| Error Message | Likely Cause | Solution Section |
|---------------|--------------|------------------|
| `EACCES: permission denied` | Permission issue | Installation Issues |
| `EADDRINUSE` | Port already in use | Runtime Issues |
| `MODULE_NOT_FOUND` | Missing dependencies | Installation Issues |
| `Cannot find module` | Dependencies not installed | Runtime Issues |
| `Uncaught ReferenceError` | JavaScript error | Browser Issues |
| `Failed to fetch` | Network/CORS issue | Runtime Issues |

---

## Prevention Tips

✅ **Keep dependencies updated:**
```bash
npm outdated      # Check for updates
npm update        # Update packages
```

✅ **Use LTS version of Node.js** (Long Term Support)

✅ **Clear cache periodically:**
```bash
npm cache clean --force
```

✅ **Keep browser updated** to latest stable version
