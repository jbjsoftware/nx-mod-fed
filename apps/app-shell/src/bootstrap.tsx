import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import MainRoutes from './routes/MainRoutes';
import './services/plugin-registry-init.service';
import { RootProviders } from './providers/root-providers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RootProviders>
      <MainRoutes />
    </RootProviders>
  </StrictMode>
);
