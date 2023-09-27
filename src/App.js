import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';


import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CalendarPage from "./pages/CalendarPage.jsx";
import TablePage from "./pages/TablePage.jsx";
import NotFoundPage from "./pages/NotFoundPage";
import Barra from "./components/Navbar.jsx";
import EditClientPage from './pages/EditClientPage.jsx';
import AddClientPage from './pages/AddClientPage.jsx';




function App() {
  return (
    <BrowserRouter>
      <Barra />
      
      <Routes>
     
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cliente" element={<AddClientPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/edit-client/:id" element={<EditClientPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

