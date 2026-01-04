import React, { createContext, useContext, ReactNode } from 'react';

interface NavigationContextType {
  navigateTo: (view: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
  navigateTo: (view: string) => void;
}

export const NavigationProvider = ({ children, navigateTo }: NavigationProviderProps) => {
  return (
    <NavigationContext.Provider value={{ navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

