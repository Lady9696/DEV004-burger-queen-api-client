import DataProvider from './components/contex/dataContex.jsx';
import ReactDOM from 'react-dom/client';

import { Router } from './router.jsx';
import { BrowserRouter } from 'react-router-dom';




ReactDOM.createRoot(document.getElementById('root')).render(
 <DataProvider>
    <BrowserRouter>
      
      <Router/>
      
    </BrowserRouter>
    </DataProvider> 
  
);
