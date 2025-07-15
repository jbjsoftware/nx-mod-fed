import './app.css';
import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router';

// Individual route components for the app-shell to use
export function ConnectionsHome() {
  return (
    <div>
      <NxWelcome title="connections" />
      <div>
        This is the connections home page.{' '}
        <Link to="/connections/page-2">Click here for page 2.</Link>
      </div>
    </div>
  );
}

export function ConnectionsPage2() {
  return (
    <div>
      <NxWelcome title="connections" />
      <div>
        <Link to="/connections">
          Click here to go back to connections home.
        </Link>
      </div>
    </div>
  );
}

// Main connections component that handles routing when loaded as a remote
export function ConnectionsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ConnectionsHome />} />
      <Route path="/page-2" element={<ConnectionsPage2 />} />
    </Routes>
  );
}

// App component for standalone mode
export function App() {
  return (
    <div>
      <NxWelcome title="connections" />

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
