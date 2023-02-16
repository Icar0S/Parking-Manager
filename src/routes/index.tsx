import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppThemeContext, useAppDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  const { toggleDrawerOpen } = useAppDrawerContext();

  return (
    <Routes>
      <Route path="/home" element={
        <>
          <Button variant='contained' color='primary' onClick={toggleTheme}>Change Theme</Button>
          <Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Sidebar</Button>
        </>

      } />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
};