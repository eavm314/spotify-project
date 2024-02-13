"use client";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

// Definiendo al contexto y sus valores

interface LockArrayContextType {
  lockArray: boolean[];
  setLockArray: Dispatch<SetStateAction<boolean[]>>;
}

export const LockArrayContext = createContext<LockArrayContextType>({
  lockArray: [],
  setLockArray: () => {},
});

// Definir el componente "Provider" del context

interface LockArrayContextProviderProps {
  children: ReactNode;
  initial?: boolean[];
}

// Al iniciar la página todos los candados están desbloqueados
const initialLockArray = [false, false, false, false, false];

export const LockArrayContextProvider: FC<LockArrayContextProviderProps> = ({
  children,
  initial = initialLockArray,
}) => {
  const [lockArray, setLockArray] = useState<boolean[]>(initial);
  return (
    <LockArrayContext.Provider value={{ lockArray, setLockArray }}>
      {children}
    </LockArrayContext.Provider>
  );
};

export default LockArrayContext;
