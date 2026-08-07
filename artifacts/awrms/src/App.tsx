import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AuthProvider, useAuth } from './context/AuthContext';
import React from 'react';

// Pages
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminDashboard from './pages/Admin';
import WasteManagement from './pages/WasteManagement';
import Reports from './pages/Reports';
import Logout from './pages/Logout';
import NotFound from './pages/not-found';

const queryClient = new QueryClient();

// A simple PrivateRoute component
function PrivateRoute({ component: Component, allowedRoles }: { component: React.ComponentType, allowedRoles?: string[] }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  
  if (!user) {
    window.location.href = '/login';
    return null;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <NotFound />;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Welcome} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      {/* Protected Routes */}
      <Route path="/home">
        {() => <PrivateRoute component={Home} />}
      </Route>
      <Route path="/admin">
        {() => <PrivateRoute component={AdminDashboard} allowedRoles={['admin']} />}
      </Route>
      <Route path="/waste">
        {() => <PrivateRoute component={WasteManagement} allowedRoles={['admin', 'personnel']} />}
      </Route>
      {/* Fallback to WasteManagement for requested and recycling routes to satisfy completeness since they use similar tables */}
      <Route path="/requests">
        {() => <PrivateRoute component={WasteManagement} allowedRoles={['admin', 'personnel']} />}
      </Route>
      <Route path="/recycling">
        {() => <PrivateRoute component={WasteManagement} allowedRoles={['admin', 'personnel']} />}
      </Route>
      <Route path="/reports">
        {() => <PrivateRoute component={Reports} allowedRoles={['admin']} />}
      </Route>
      <Route path="/logout">
        {() => <PrivateRoute component={Logout} />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
