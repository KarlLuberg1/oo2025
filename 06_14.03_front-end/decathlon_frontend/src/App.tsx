import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import AthletesPage from './Pages/AthletesPage';
import ResultsPage from './Pages/ResultsPage';

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<AthletesPage />} />
        <Route path="/athletes" element={<AthletesPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </>
  );
}

export default App;
