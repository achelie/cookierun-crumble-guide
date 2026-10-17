import { I18nElement } from "@/i18n/elements";
import { AppIcon, type IconName } from "@/components/ui/icon";

export function PageIntro({ eyebrow, title, description, icon }: { eyebrow: string; title: string; description: string; icon: IconName }) {
  return (
    <I18nElement as="header" className="page-intro">
      <I18nElement as="div" className="page-intro__icon"><AppIcon name={icon} size={30} /></I18nElement>
      <I18nElement as="div">
        <I18nElement as="span" className="eyebrow">{eyebrow}</I18nElement>
        <I18nElement as="h1">{title}</I18nElement>
        <I18nElement as="p">{description}</I18nElement>
      </I18nElement>
    </I18nElement>
  );
}
