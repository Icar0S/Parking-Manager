import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Dash,
  ListagemParking,
  ListagemCities,
  ListagemHistory,
  ListagePayments
} from '../pages';
import { useAppThemeContext, useAppDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  const { toggleDrawerOpen, setDrawerOptions } = useAppDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Home page',
        path: '/home',
        icon: 'home',
      },
      {
        label: 'Parking',
        path: '/parking',
        icon: 'local_parking',
      },
      {
        label: 'Cities',
        path: '/cities',
        icon: 'location_city',
      },
      {
        label: 'History',
        path: '/history',
        icon: 'history',
      },
      {
        label: 'Payments',
        path: '/payments',
        icon: 'payments',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dash />} />

      <Route path="/parking" element={<ListagemParking />} />
      {/* <Route path="/parking/detalhes/:id" element={<Dash />} /> */}
      <Route path="/cities" element={<ListagemCities />} />
      <Route path="/history" element={<ListagemHistory />} />
      <Route path="/payments" element={<ListagePayments />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
};