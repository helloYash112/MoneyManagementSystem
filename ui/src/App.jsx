
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { routers } from './routes/router.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './features/auth/userSlice.js';
import StatusAnimation from './components/StatusAnimation.jsx';

import authentication from "./assets/loading.json";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <StatusAnimation></StatusAnimation>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;

