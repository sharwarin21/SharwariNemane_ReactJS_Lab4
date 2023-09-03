import React from 'react';
import { ExpenseTrackerApp } from './components/ExpenseTrackerApp';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      {
        <ExpenseTrackerApp></ExpenseTrackerApp>
      }
    </div>
  );
}
export default App;
