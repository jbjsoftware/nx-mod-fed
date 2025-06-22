import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import MainRoutes from './routes/MainRoutes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <MainRoutes />
  </StrictMode>
);
