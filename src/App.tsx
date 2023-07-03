import { BrowserRouter } from 'react-router-dom';
import AppWithRouting from './Routes';

import { useEffect } from "react";
function App() {
  return (
    <BrowserRouter>
      <AppWithRouting />
    </BrowserRouter>
  );
}

export default App;
