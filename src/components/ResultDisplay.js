import React, { useRef } from 'react';

function ResultDisplay({ result }) {
  const hasLogged = useRef(false);

  if (!hasLogged.current) {
    console.log('Result data:', result);
    hasLogged.current = true;
  }

  return (
    <div className="result-display" style={{ whiteSpace: 'pre-wrap', fontSize: '1.1em' }}>
      {/* Highlighted spammy text */}
      <div dangerouslySetInnerHTML={{ __html: result.highlightedText }} />
      
      {/* Overall Spam Score */}
      <div className="score" style={{ marginTop: '20px' }}>
        <strong>Overall Score:</strong> {result.scoreDescription} ({result.overallScore})
      </div>
      
      {/* Category Counts */}
      <ul className="category-counts" style={{ marginTop: '10px' }}>
        {Object.entries(result.categoryCounts).map(([category, count]) => (
          <li key={category}>
            <strong>{category}:</strong> {count}
          </li>
        ))}
      </ul>
      
      {/* Word Count */}
      <div className="word-count" style={{ marginTop: '20px' }}>
        <strong>Word Count:</strong> {result.wordCount}
      </div>
      
      {/* Reading Time */}
      <div className="reading-time" style={{ marginTop: '10px' }}>
        <strong>Estimated Reading Time:</strong> {result.readingTime} {result.readingTime === 1 ? 'minute' : 'minutes'}
      </div>
    </div>
  );
}

export default ResultDisplay;
