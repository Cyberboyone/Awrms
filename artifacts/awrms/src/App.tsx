import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
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
import About from './pages/About';
import Services from './pages/Services';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import Users from './pages/Users';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

const queryClient = new QueryClient();

// A simple PrivateRoute component
function PrivateRoute({ component: Component, allowedRoles }: { component: React.ComponentType, allowedRoles?: string[] }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  
  if (!user) {
    return <Redirect to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Redirect to="/home" />;
  }

  return <Component />;
}

function Redirect({ to }: { to: string }) {
  const [, setLocation] = useLocation();
  React.useEffect(() => { setLocation(to); }, [setLocation, to]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Welcome} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/contact" component={Contact} />
      <Route path="/forgot-password" component={ForgotPassword} />

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
      <Route path="/requests">
        {() => <PrivateRoute component={WasteManagement} allowedRoles={['admin', 'personnel']} />}
      </Route>
      <Route path="/recycling">
        {() => <PrivateRoute component={WasteManagement} allowedRoles={['admin', 'personnel']} />}
      </Route>
      <Route path="/reports">
        {() => <PrivateRoute component={Reports} allowedRoles={['admin']} />}
      </Route>
      <Route path="/users">
        {() => <PrivateRoute component={Users} allowedRoles={['admin']} />}
      </Route>
      <Route path="/notifications">
        {() => <PrivateRoute component={Notifications} />}
      </Route>
      <Route path="/settings">
        {() => <PrivateRoute component={Settings} />}
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
