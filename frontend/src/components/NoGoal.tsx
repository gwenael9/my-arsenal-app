import { useLangue } from "./Layout/LangueContext";

export function NoGoal() {
  const { langue } = useLangue();

  const title = langue ? "Aucun but pour le moment..." : "No goal yet...";
  const info = langue
    ? "Veuillez modifier les filtres"
    : "Please modify filters";

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p>{info}.</p>
      </div>
    </div>
  );
}
