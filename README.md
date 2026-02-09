# Drawing & Animation Tool

A simple and intuitive drawing application built with React and Vite. Draw freehand on an HTML canvas with mouse drag and clear your creations with a single click.

## 🎨 Features

- **Freehand Drawing**: Draw smooth lines by clicking and dragging on the canvas
- **Clear Canvas**: One-click button to clear all drawings
- **Cross-Platform**: Works on macOS and Windows
- **Responsive UI**: Clean and modern interface
- **Fast Development**: Built with Vite for instant hot module replacement

## 📁 Project Structure

```
drawing-animation-tool/
├── frontend/                 # React + Vite frontend application
│   ├── src/
│   │   ├── App.jsx          # Main application component
│   │   ├── App.css          # Application styles
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Global styles
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Vite configuration
│   ├── package.json         # Dependencies and scripts
│   └── README.md            # Frontend documentation
│
└── docs/                     # Documentation
    ├── SETUP.md             # Setup and installation guide
    ├── VALIDATION.md        # Testing and validation guide
    └── TROUBLESHOOTING.md   # Common issues and solutions
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm (comes with Node.js)

### Installation

1. **Clone or navigate to the project directory**

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   
   Navigate to `http://localhost:3000`

## 📚 Documentation

- **[SETUP.md](docs/SETUP.md)** - Detailed setup instructions for macOS and Windows
- **[VALIDATION.md](docs/VALIDATION.md)** - How to validate the application works correctly
- **[TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)** - Solutions to common issues

## 🎯 Hello World Requirements (Completed)

✅ UI shows title "Drawing Tool" and "Hello World"  
✅ Provides an HTML canvas  
✅ Allows drawing with mouse drag (freehand line)  
✅ Provides a "Clear" button  
✅ Works on Mac + Windows  
✅ No Docker required  

## 🛠️ Technology Stack

### Frontend
- **React 18.2** - UI library
- **Vite 5.0** - Build tool and dev server
- **HTML5 Canvas API** - Drawing functionality
- **CSS3** - Styling

### Backend
- None (frontend-only application)

## 📝 Usage

1. **Drawing**: Click and drag your mouse on the white canvas to draw freehand lines
2. **Clear**: Click the red "Clear" button to erase all drawings and start fresh
3. **Multiple Strokes**: Release the mouse and click again to start a new line

## 🧪 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This is a demonstration project. Feel free to use and modify as needed.

## 🤝 Contributing

This is a "Hello World" scaffold. To extend functionality:
1. Add color picker for different drawing colors
2. Implement brush size control
3. Add undo/redo functionality
4. Save/export drawings as images
5. Add animation capabilities

## 🔧 Troubleshooting

If you encounter any issues, please refer to [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) for detailed solutions.

Common quick fixes:
- **Port in use**: Change port in `frontend/vite.config.js`
- **Can't draw**: Check browser console for errors and refresh page
- **Install fails**: Delete `node_modules` and `package-lock.json`, then `npm install` again

---

**Note**: This is a frontend-only application with no backend or database. All drawings are temporary and lost on page refresh.
