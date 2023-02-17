import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dash } from '../pages';
import { useAppThemeContext, useAppDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  const { toggleDrawerOpen, setDrawerOptions } = useAppDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página inicial',
        path: '/home',
        icon: 'home',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={
        <Dash />
        //<><Button variant='contained' color='primary' onClick={toggleTheme}>Change Theme</Button> <Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Sidebar</Button>  </>
      } />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
};