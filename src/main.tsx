import { createRoot } from 'react-dom/client';
import App from './App';
import { TripsProvider } from './providers/TripsProvider';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <TripsProvider>
    <App />
  </TripsProvider>
);