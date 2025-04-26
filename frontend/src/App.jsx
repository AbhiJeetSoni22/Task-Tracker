import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Projects from './pages/Projects';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p className="text-center mt-20">Loading...</p>;
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
   
      <AuthProvider>
        
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100  text-gray-800  transition-colors">
            <Navbar />
            
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/projects" element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        
      </AuthProvider>
   
  );
}

export default App;