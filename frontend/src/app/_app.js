import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store';
import Tasks from './pages/Tasks';
import AddTask from './pages/AddTask';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/add-task" element={<AddTask />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;