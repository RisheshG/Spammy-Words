import React from 'react';
import SpamChecker from './components/SpamChecker';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spam Checker</h1>
      </header>
      <main>
        <SpamChecker />
      </main>
    </div>
  );
}

export default App;
