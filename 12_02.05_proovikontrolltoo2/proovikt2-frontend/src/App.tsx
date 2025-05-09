import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import WordsPage from "./pages/WordsPage";
import AddWordPage from "./pages/AddWordPage";
import SingleWordPage from "./pages/SingleWordPage";
import EditWordPage from "./pages/EditWordPage";
import AdminsPage from "./pages/AdminsPage";
import AddAdminPage from "./pages/AddAdminPage";



function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<WordsPage />} />
        <Route path="/add-word" element={<AddWordPage />} />
        <Route path="/words/:wordId" element={<SingleWordPage />} />
        <Route path="/edit-word/:wordId" element={<EditWordPage />} />
        <Route path="/admins" element={<AdminsPage />} />
        <Route path="/add-admin" element={<AddAdminPage />} />
      </Routes>
    </>
  );
}


export default App;
