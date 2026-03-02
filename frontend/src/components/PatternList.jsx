import PatternCard from './PatternCard'
import './PatternList.css'

function PatternList({ patterns, selectedPattern, onSelectPattern }) {
  if (!patterns || patterns.length === 0) {
    return (
      <div className="pattern-list-empty">
        <p>No patterns available. Create a new pattern to get started!</p>
      </div>
    )
  }

  return (
    <div className="pattern-list">
      {patterns.map((pattern) => (
        <PatternCard
          key={pattern.id}
          pattern={pattern}
          isSelected={selectedPattern?.id === pattern.id}
          onSelect={onSelectPattern}
        />
      ))}
    </div>
  )
}

export default PatternList
