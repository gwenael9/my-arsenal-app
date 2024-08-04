import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

interface ButtonScrollProps {
    isVisible: boolean;
    onClick: () => void;
}

export default function ButtonScroll({ isVisible, onClick }: ButtonScrollProps) {
    if (!isVisible) return null;

    return (
        <Button onClick={onClick}>
            <ArrowUp size={24} />
        </Button>
    )
}