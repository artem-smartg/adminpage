import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import AppRouter from './components/AppRouter';
import Form from './pages/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <AppRouter/>
      </div>
    </BrowserRouter>

  );
}

export default App;
