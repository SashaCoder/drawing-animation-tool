# Setup Guide - Drawing & Animation Tool

This guide will help you set up and run the Drawing & Animation Tool on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16.x or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

## Platform-Specific Instructions

### macOS

1. **Install Node.js**
   ```bash
   # Using Homebrew (recommended)
   brew install node
   
   # Or download from nodejs.org
   ```

2. **Verify installation**
   ```bash
   node --version
   npm --version
   ```

### Windows

1. **Install Node.js**
   - Download the Windows installer from https://nodejs.org/
   - Run the installer and follow the setup wizard
   - Restart your terminal/PowerShell after installation

2. **Verify installation**
   ```powershell
   node --version
   npm --version
   ```

## Installation Steps

### 1. Navigate to the frontend directory

**macOS/Linux:**
```bash
cd frontend
```

**Windows (PowerShell):**
```powershell
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

This will install all required packages including:
- React
- React DOM
- Vite
- Vite React plugin

**Expected output:** You should see a progress bar and a list of installed packages. This may take 1-2 minutes.

### 3. Start the development server

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 4. Open in browser

Open your web browser and navigate to:
```
http://localhost:3000
```

You should see the Drawing Tool interface with:
- Title: "Drawing Tool"
- Subtitle: "Hello World"
- A white canvas area
- A red "Clear" button

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (hot reload enabled) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## Next Steps

Once the application is running, proceed to [VALIDATION.md](./VALIDATION.md) to test the functionality.

## Troubleshooting

If you encounter any issues during setup, refer to [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
