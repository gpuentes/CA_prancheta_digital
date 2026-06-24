import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import Shell from './components/Shell.jsx';
import Login from './pages/Login.jsx';
import Monitor from './pages/Monitor.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Chamados from './pages/Chamados.jsx';
import Diretoria from './pages/Diretoria.jsx';
import CMS from './pages/CMS.jsx';
import Settings from './pages/Settings.jsx';
import TerminalSala from './pages/TerminalSala.jsx';

// Route guard: redirects to /login if not authenticated
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

// Route guard: redirects away from login if already authenticated
function PublicRoute({ children }) {
  const { isAuthenticated, currentUser } = useAuth();
  if (isAuthenticated) {
    if (currentUser?.role === 'sala') return <Navigate to="/terminal" replace />;
    return <Navigate to="/monitor" replace />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

          {/* Protected: wrapped in Shell layout */}
          <Route
            element={
              <ProtectedRoute>
                <Shell />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/monitor" element={<Monitor />} />
            <Route path="/chamados" element={<Chamados />} />
            <Route path="/diretoria" element={<Diretoria />} />
            <Route path="/cms" element={<CMS />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Protected: Kiosk Terminal (No Shell) */}
          <Route path="/terminal" element={<ProtectedRoute><TerminalSala /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
