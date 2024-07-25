import { ReactNode, createContext, useContext, useState } from "react";
import LoadingBase from "../Loading";

interface LangueContextType {
  langue: boolean;
  setLangue: (lang: boolean) => void;
  loading: boolean;
}

const LangueContext = createContext<LangueContextType | undefined>(undefined);

export const LangueProvider = ({ children }: { children: ReactNode }) => {
  const [langue, setLangue] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleLangue = (newLangue: boolean) => {
    if (langue !== newLangue) {
      setLoading(true);
      setTimeout(() => {
        setLangue(newLangue);
        setLoading(false);
      }, 800);
    }
  };

  return (
    <LangueContext.Provider
      value={{ langue, setLangue: toggleLangue, loading }}
    >
      {children}
      {loading && <LoadingBase />}
    </LangueContext.Provider>
  );
};

export const useLangue = () => {
  const context = useContext(LangueContext);
  if (!context) {
    throw new Error("error conteeeeext");
  }
  return context;
};
