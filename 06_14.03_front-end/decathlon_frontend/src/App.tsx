import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import AthletesPage from './Pages/AthletesPage';
import ResultsPage from './Pages/ResultsPage';
import ManageAthletes from './Pages/ManageAthletes';
import ManageResults from './Pages/ManageResults';
import SingleAthlete from './Pages/SingleAthlete';
import EditAthlete from './Pages/EditAthlete';
import EditResult from './Pages/EditResult';
import SingleResult from './Pages/SingleResult';


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

        <Route path="/admin/edit-athlete/:athleteId" element={<EditAthlete />} />
        <Route path="/admin/edit-result/:resultId" element={<EditResult />} />

        <Route path="/athletes/:athleteId" element={<SingleAthlete />} />
        <Route path="/results/:resultId" element={<SingleResult />} />

      </Routes>
    </>
  );
}

export default App;
