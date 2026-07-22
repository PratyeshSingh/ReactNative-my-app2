
import { createContext, ReactNode, useContext } from 'react';
import { container } from './container';

type DIProviderProps = {
  children: ReactNode;
};

const DIContext = createContext(container);

export function DIProvider({ children }: DIProviderProps) {
  return <DIContext.Provider value={container}>{children}</DIContext.Provider>;
}

export function useDI() {
  return useContext(DIContext);
}