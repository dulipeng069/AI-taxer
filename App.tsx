import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import PolicyInterpretation from './components/PolicyInterpretation';
import LoginModal from './components/LoginModal';
import SuperAdminDashboard from './components/SuperAdmin/SuperAdminDashboard';
import { authService } from './services/authService';
import { UserSession, RawInput } from './types';

type ViewState = 'landing' | 'dashboard' | 'policy';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  
  // Global Data State
  const [allInputs, setAllInputs] = useState<RawInput[]>([]);

  // Load User Session
  useEffect(() => {
    const session = authService.getCurrentUser();
    if (session) {
      setUserSession(session);
      setView('dashboard');
    }
  }, []);

  // Load Data when Session Exists (or just always load? Better to load on session to ensure freshness)
  useEffect(() => {
    // We load all inputs regardless of role for simplicity in this client-side app
    // In a real app, we would only load what's needed.
    // For Super Admin: Needs all.
    // For Enterprise: Needs theirs (but we can filter from all).
    setAllInputs(authService.getAllInputs());
  }, [userSession]);

  // Handle Login Click
  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };
  
  // Handle Login Success
  const handleLoginSuccess = (session: UserSession) => {
    setUserSession(session);
    setView('dashboard');
    setIsLoginOpen(false);
  };

  // Handle Logout
  const handleLogout = () => {
    authService.logout();
    setUserSession(null);
    setView('landing');
  };

  // Update Inputs for a specific company
  const handleUpdateCompanyInputs = (companyId: string, newCompanyInputs: RawInput[]) => {
    // 1. Filter out old inputs for this company
    const otherInputs = allInputs.filter(i => i.companyId !== companyId);
    
    // 2. Ensure new inputs have correct companyId (and enterpriseId alias)
    const processedInputs = newCompanyInputs.map(i => ({
      ...i,
      companyId: companyId,
      enterpriseId: companyId // Add alias
    }));

    // 3. Combine
    const updatedAll = [...otherInputs, ...processedInputs];

    // 4. Update State and Storage
    setAllInputs(updatedAll);
    authService.saveAllInputs(updatedAll);
  };

  // Render Content Based on Session Role
  const renderContent = () => {
    // 1. Policy Page (Independent of login)
    if (view === 'policy') {
      return <PolicyInterpretation onBack={() => setView('landing')} />;
    }

    // 2. Logged In View
    if (userSession) {
      if (userSession.role === 'super_admin') {
        return (
          <SuperAdminDashboard 
            onLogout={handleLogout} 
            allInputs={allInputs}
          />
        );
      } else {
        // Filter inputs for this enterprise
        const myInputs = allInputs.filter(i => i.companyId === userSession.companyId);
        
        // Get permissions (optional, if stored in session or we fetch enterprise)
        // For now, we assume full permissions or load from somewhere.
        // The session might not have permissions. We can fetch enterprise details.
        const ent = authService.getEnterprises().find(e => e.id === userSession.companyId);
        
        return (
          <Dashboard 
            onLogout={handleLogout} 
            companyId={userSession.companyId}
            userRole={userSession.role}
            inputs={myInputs}
            onUpdateInputs={(inputs) => handleUpdateCompanyInputs(userSession.companyId!, inputs)}
            permissions={ent?.permissions}
          />
        );
      }
    }

    // 3. Default Landing Page
    return (
      <LandingPage 
        onLogin={handleLoginClick} 
        onNavigateToPolicy={() => setView('policy')} 
      />
    );
  };

  return (
    <>
      {renderContent()}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default App;
