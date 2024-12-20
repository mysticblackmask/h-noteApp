import { Route, Routes } from 'react-router-dom';
import Login from '../Screens/Auth/Login';
import NoteApp from '../Screens/Note-taking/NoteTaking';
import Register from '../Screens/Auth/Register/Register';
import PrivateRoute from './PrivateRoutes';

function WebRoutes() {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute Component={NoteApp} />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default WebRoutes;
