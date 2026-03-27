import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Scroll from './components/Scroll';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Scroll />
  </StrictMode>
);
