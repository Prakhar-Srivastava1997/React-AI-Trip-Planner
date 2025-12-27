import './App.css'
import Fallback from './components/fallbackUI/fallback';
import HomePage from './components/home/home';
import { useAuth0 } from '@auth0/auth0-react';
import { lazy, Suspense } from 'react';
const UserProfile = lazy(() => import('./components/userProfile/userProfile'));


function App() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div className='app-container'>
      {isAuthenticated && user ? (
        <Suspense fallback={
          <Fallback
            fallbackText="Loading User Profile..."
            svgConfig={{ width: '48', height: '48' }}
          />}>
          <UserProfile />
        </Suspense>
      ) : (
        <HomePage />
      )}
    </div>
  )
}

export default App
