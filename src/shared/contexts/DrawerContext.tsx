import { createContext, useCallback, useContext, useState } from 'react';


interface IDrawerContextData {
  isDrowerOpen: boolean;
  toggleDrawerOpen: () => void;
}
interface AppDrawerProviderProps {
  children: React.ReactNode;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {
  return useContext(DrawerContext);
}


export const DrawerProvider: React.FC<AppDrawerProviderProps> = ({ children }) => {
  const [isDrowerOpen, setisDrowerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setisDrowerOpen(oldisDrowerOpen => !oldisDrowerOpen)
  }, []);



  return (
    <DrawerContext.Provider value={{ isDrowerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>

  );
};