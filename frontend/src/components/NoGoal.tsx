import { useLangue } from "./Layout/LangueContext";

export function NoGoal() {
  const { langue } = useLangue();

  return (
    <div className="text-center mt-4">
      {langue ? "Aucun but pour le moment..." : "No goal yet..."}
    </div>
  );
}
