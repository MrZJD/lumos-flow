import React from 'react';
import './App.css';
import Badge from 'lib-components/Badge';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Badge/>
        <p>
          Edit <code>src/App.js</code> and save to reload.21
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
