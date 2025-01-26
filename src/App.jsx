import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'; 
import Dashboard from './components/Dashboard'; 
import './App.css';
import Cruises from './Pages/Cruises'; 
import CruisesDash from './Pages/CruisesDash'; 


const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null; 
};


const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />; 
};

function App() {
  return (
    <BrowserRouter basename="/dashboard1/">  
      <Routes>
        {/* Login route */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="Cruises" element={<PrivateRoute><Cruises /></PrivateRoute>} />
          <Route path="CruisesDash" element={<PrivateRoute><CruisesDash /></PrivateRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
