import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import Shell from './components/Shell.jsx';
import Login from './pages/Login.jsx';
import Patio from './pages/Patio.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Chamados from './pages/Chamados.jsx';
import Diretoria from './pages/Diretoria.jsx';
import CMS from './pages/CMS.jsx';
import Settings from './pages/Settings.jsx';
import TerminalSala from './pages/TerminalSala.jsx';
import MapaSala from './pages/MapaSala.jsx';
import CampainhaProfessor from './pages/CampainhaProfessor.jsx';

// Route guard: redirects to /login if not authenticated
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

// Helper: rota padrão inicial por papel de usuário (evita loops de redirecionamento 403)
function getHomeRouteByRole(role) {
  switch (role) {
    case 'terminal':
      return '/mapa-sala';
    case 'monitor':
      return '/patio';
    case 'secretaria':
      return '/chamados';
    case 'diretor':
    case 'vice_diretor':
    case 'admin':
    default:
      return '/dashboard';
  }
}

// Route guard: redirects if user does not have required role
function RoleProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, currentUser } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (currentUser && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to={getHomeRouteByRole(currentUser.role)} replace />;
  }
  return children;
}

// Route guard: redirects away from login if already authenticated
function PublicRoute({ children }) {
  const { isAuthenticated, currentUser } = useAuth();
  if (isAuthenticated) {
    if (currentUser?.role === 'terminal') return <Navigate to="/mapa-sala" replace />;
    return <Navigate to="/patio" replace />;
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
            <Route path="/dashboard" element={<RoleProtectedRoute allowedRoles={['diretor', 'vice_diretor', 'admin']}><Dashboard /></RoleProtectedRoute>} />
            <Route path="/patio" element={<RoleProtectedRoute allowedRoles={['monitor', 'diretor', 'vice_diretor', 'admin']}><Patio /></RoleProtectedRoute>} />
            <Route path="/monitor" element={<Navigate to="/patio" replace />} />
            <Route path="/chamados" element={<RoleProtectedRoute allowedRoles={['monitor', 'secretaria', 'diretor', 'vice_diretor', 'admin']}><Chamados /></RoleProtectedRoute>} />
            <Route path="/diretoria" element={<RoleProtectedRoute allowedRoles={['diretor', 'vice_diretor', 'admin']}><Diretoria /></RoleProtectedRoute>} />
            <Route path="/cms" element={<RoleProtectedRoute allowedRoles={['secretaria', 'diretor', 'vice_diretor', 'admin']}><CMS /></RoleProtectedRoute>} />
            <Route 
              path="/mapa-sala" 
              element={
                <RoleProtectedRoute allowedRoles={['terminal', 'diretor', 'vice_diretor', 'admin']}>
                  <MapaSala />
                </RoleProtectedRoute>
              } 
            />
            <Route path="/settings" element={<RoleProtectedRoute allowedRoles={['diretor', 'vice_diretor', 'admin']}><Settings /></RoleProtectedRoute>} />
            <Route path="/campainha" element={<RoleProtectedRoute allowedRoles={['secretaria', 'diretor', 'vice_diretor', 'admin']}><CampainhaProfessor /></RoleProtectedRoute>} />
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
