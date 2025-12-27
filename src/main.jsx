import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/header/header';
import { Auth0Provider } from '@auth0/auth0-react';
import Footer from './components/footer/footer';
import { lazy, Suspense } from 'react';
const UserProfile = lazy(() => import('./components/userProfile/userProfile.jsx'));
const ViewTrip = lazy(() => import('./components/viewTrip/[tripId]/index.jsx'));
const MyTrips = lazy(() => import('./components/myTrips/myTrips.jsx'));
//import ViewTrip from './components/viewTrip/[tripId]/index.jsx';
//import MyTrips from './components/myTrips/myTrips.jsx';
import Fallback from './components/fallbackUI/fallback.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/user-profile",
    element: (
      <Suspense fallback={
        <Fallback
          fallbackText="Loading User Profile..."
          svgConfig={{ width: '48', height: '48' }}
        />}>
        <UserProfile />
      </Suspense>
    )
  },
  {
    path: "/view-trip/:tripId",
    element: (
      <Suspense fallback={
        <Fallback
          fallbackText="Loading Trip Details..."
          svgConfig={{ width: '48', height: '48' }}
        />
      }>
        <ViewTrip />
      </Suspense>
    )
  },
  {
    path: "/my-trips",
    element: (
      <Suspense fallback={
        <Fallback
          fallbackText="Loading Your Trips..."
          svgConfig={{ width: '48', height: '48' }}
        />
      }>
        <MyTrips />
      </Suspense>
    )
  }
])

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <div className='header'>
      <Header />
    </div>
    <RouterProvider router={router} />
    <Footer />
  </Auth0Provider>
)
