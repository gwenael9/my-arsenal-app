import { LayoutProps } from "./Layout";

export default function LayoutRankStat({ children, title }: LayoutProps) {
  return (
    <div className="bg-quadrille flex flex-col md:flex-row md:justify-between md:items-center px-6 sm:px-8 py-8 sm:py-12 gap-4">
      <div className="font-bold text-2xl sm:text-4xl uppercase italic">
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
