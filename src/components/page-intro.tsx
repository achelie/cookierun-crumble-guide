import { AppIcon, type IconName } from "@/components/ui/icon";

export function PageIntro({ eyebrow, title, description, icon }: { eyebrow: string; title: string; description: string; icon: IconName }) {
  return (
    <header className="page-intro">
      <div className="page-intro__icon"><AppIcon name={icon} size={30} /></div>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  );
}
