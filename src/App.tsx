import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import IncidentReport from './pages/IncidentReport';
import Emergency from './pages/Emergency';
import DigitalSeva from './pages/DigitalSeva';
import Chat from './pages/Chat';
import Admin from './pages/Admin';

// Initialize Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

function App() {
  // Load Google Maps API
  React.useEffect(() => {
    // Check if Google Maps is already loaded to prevent multiple loads
    if (window.google?.maps || document.querySelector('script[src*="maps.googleapis.com"]')) {
      return;
    }

    const script = document.createElement('script');
    // Use mock implementation instead of real API to avoid key errors
    script.src = `data:text/javascript,`;
    script.async = true;
    script.defer = true;
    
    // Initialize mock Google Maps object immediately
    script.onload = () => {
      initializeMockGoogleMaps();
    };
    
    // Initialize mock Google Maps API for demo
    const initializeMockGoogleMaps = () => {
      window.google = {
        maps: {
          Map: class {
            constructor(element: HTMLElement, options: any) {
              element.innerHTML = `
                <div style="width: 100%; height: 100%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; border-radius: 0.5rem;">
                  <div style="text-align: center; color: #6b7280;">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">🗺️</div>
                    <div style="font-size: 0.875rem;">Interactive Map</div>
                    <div style="font-size: 0.75rem; margin-top: 0.25rem;">Google Maps integration would appear here</div>
                  </div>
                </div>
              `;
            }
            addListener(event: string, callback: Function) {}
          } as any,
          Polygon: class {
            constructor(options: any) {}
            addListener(event: string, callback: Function) {}
          } as any,
          Marker: class {
            constructor(options: any) {}
          } as any,
          InfoWindow: class {
            constructor(options: any) {}
            setPosition(position: any) {}
            open(map: any) {}
          } as any,
          SymbolPath: {
            CIRCLE: 0
          }
        }
      } as any;
    };
    
    // Initialize immediately for demo
    initializeMockGoogleMaps();
    
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="report" element={<IncidentReport />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="seva" element={<DigitalSeva />} />
          <Route path="chat" element={<Chat />} />
        </Route>
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;