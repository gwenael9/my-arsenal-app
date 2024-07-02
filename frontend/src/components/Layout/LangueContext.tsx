import { ReactNode, createContext, useContext, useState } from "react";
import LoadingLangue from "../LoadingLangue";

interface LangueContextType {
    langue: boolean;
    toggleLangue: () => void;
    loading: boolean;
}

const LangueContext = createContext<LangueContextType | undefined>(undefined);

export const LangueProvider = ({ children }: { children: ReactNode}) => {
    const [langue, setLangue] = useState(true);
    const [loading, setLoading] = useState(false);

    const toggleLangue = () => {
        setLoading(true);
        setTimeout(() => {
            setLangue((prevLangue) => !prevLangue);
            setLoading(false);
        }, 800);
    }

    return (
        <LangueContext.Provider value={{ langue, toggleLangue, loading }}>
            {children}
            {loading && <LoadingLangue />}
        </LangueContext.Provider>
    );
};

export const useLangue = () => {
    const context = useContext(LangueContext);
    if (!context) {
        throw new Error("error conteeeeext");
    }
    return context;
}