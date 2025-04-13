import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import AthletesPage from './Pages/AthletesPage';
import ResultsPage from './Pages/ResultsPage';
import ManageAthletes from './Pages/ManageAthletes';
import ManageResults from './Pages/ManageResults';


function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<AthletesPage />} />
        <Route path="/athletes" element={<AthletesPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/admin/manage-athlete" element={<ManageAthletes />} />
        <Route path="/admin/manage-result" element={<ManageResults />} />
      </Routes>
    </>
  );
}

export default App;
