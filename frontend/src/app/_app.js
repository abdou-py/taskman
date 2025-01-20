import '../styles/globals.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from '../store';
import Tasks from './pages/Tasks';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default MyApp;