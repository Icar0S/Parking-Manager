//import { Button } from '@mui/material';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Dash,
  ListagemParking,
  ListagemCities,
  ListagemHistory,
  ListagemPayments,
  ListagemClients,
  DetailClients,
  DetailCities,
  DetailHistory,
  DetailPayments,
  DetailParking
} from '../pages';
import { useAppThemeContext, useAppDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  //const { toggleTheme } = useAppThemeContext();
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
      {
        label: 'Clients',
        path: '/clients',
        icon: 'people',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dash />} />

      <Route path="/parking" element={<ListagemParking />} />
      <Route path="/parking/detail/:id" element={<DetailParking />} />

      <Route path="/clients" element={<ListagemClients />} />
      <Route path="/clients/detail/:id" element={<DetailClients />} />

      <Route path="/cities" element={<ListagemCities />} />
      <Route path="/cities/detail/:id" element={<DetailCities />} />

      <Route path="/history" element={<ListagemHistory />} />
      <Route path="/history/detail/:id" element={<DetailHistory />} />

      <Route path="/payments" element={<ListagemPayments />} />
      <Route path="/payments/detail/:id" element={<DetailPayments />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};