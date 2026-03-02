/**
 * Default pattern definitions for the drawing tool
 * Each pattern represents a different drawing style/texture
 */

export const defaultPatterns = [
  {
    id: 'pattern-1',
    name: 'Small Dots - Sparse',
    type: 'dots-small',
    size: 3,
    density: 3,
    color: '#000000',
    description: 'Small dots with sparse spacing',
    createdAt: Date.now() - 15000
  },
  {
    id: 'pattern-2',
    name: 'Small Dots - Medium',
    type: 'dots-small',
    size: 3,
    density: 6,
    color: '#000000',
    description: 'Small dots with medium spacing',
    createdAt: Date.now() - 14000
  },
  {
    id: 'pattern-3',
    name: 'Small Dots - Dense',
    type: 'dots-small',
    size: 3,
    density: 9,
    color: '#000000',
    description: 'Small dots with dense spacing',
    createdAt: Date.now() - 13000
  },
  {
    id: 'pattern-4',
    name: 'Large Dots - Sparse',
    type: 'dots-large',
    size: 8,
    density: 3,
    color: '#000000',
    description: 'Large dots with sparse spacing',
    createdAt: Date.now() - 12000
  },
  {
    id: 'pattern-5',
    name: 'Large Dots - Medium',
    type: 'dots-large',
    size: 8,
    density: 6,
    color: '#000000',
    description: 'Large dots with medium spacing',
    createdAt: Date.now() - 11000
  },
  {
    id: 'pattern-6',
    name: 'Large Dots - Dense',
    type: 'dots-large',
    size: 8,
    density: 9,
    color: '#000000',
    description: 'Large dots with dense spacing',
    createdAt: Date.now() - 10000
  },
  {
    id: 'pattern-7',
    name: 'Crosshatch - Fine',
    type: 'crosshatch',
    size: 5,
    density: 8,
    color: '#000000',
    description: 'Fine crosshatch pattern',
    createdAt: Date.now() - 9000
  },
  {
    id: 'pattern-8',
    name: 'Crosshatch - Medium',
    type: 'crosshatch',
    size: 10,
    density: 5,
    color: '#000000',
    description: 'Medium crosshatch pattern',
    createdAt: Date.now() - 8000
  },
  {
    id: 'pattern-9',
    name: 'Crosshatch - Coarse',
    type: 'crosshatch',
    size: 20,
    density: 3,
    color: '#000000',
    description: 'Coarse crosshatch pattern',
    createdAt: Date.now() - 7000
  },
  {
    id: 'pattern-10',
    name: 'Side Hatch Left - Fine',
    type: 'hatch-left',
    size: 5,
    density: 8,
    color: '#000000',
    description: 'Fine left-leaning hatch lines',
    createdAt: Date.now() - 6000
  },
  {
    id: 'pattern-11',
    name: 'Side Hatch Left - Medium',
    type: 'hatch-left',
    size: 10,
    density: 5,
    color: '#000000',
    description: 'Medium left-leaning hatch lines',
    createdAt: Date.now() - 5000
  },
  {
    id: 'pattern-12',
    name: 'Side Hatch Left - Coarse',
    type: 'hatch-left',
    size: 20,
    density: 3,
    color: '#000000',
    description: 'Coarse left-leaning hatch lines',
    createdAt: Date.now() - 4000
  },
  {
    id: 'pattern-13',
    name: 'Side Hatch Right - Fine',
    type: 'hatch-right',
    size: 5,
    density: 8,
    color: '#000000',
    description: 'Fine right-leaning hatch lines',
    createdAt: Date.now() - 3000
  },
  {
    id: 'pattern-14',
    name: 'Side Hatch Right - Medium',
    type: 'hatch-right',
    size: 10,
    density: 5,
    color: '#000000',
    description: 'Medium right-leaning hatch lines',
    createdAt: Date.now() - 2000
  },
  {
    id: 'pattern-15',
    name: 'Side Hatch Right - Coarse',
    type: 'hatch-right',
    size: 20,
    density: 3,
    color: '#000000',
    description: 'Coarse right-leaning hatch lines',
    createdAt: Date.now() - 1000
  },
  {
    id: 'pattern-16',
    name: 'Stipple - Light',
    type: 'stipple',
    size: 2,
    density: 4,
    color: '#000000',
    description: 'Light stipple effect with random dots',
    createdAt: Date.now()
  }
]
