import { BrowserRouter } from 'react-router-dom';
import WebRoutes from './WebRoutes/webRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <WebRoutes />
      </BrowserRouter>
    </>
  );
}
export default App;
