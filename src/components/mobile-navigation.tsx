"use client";

import { I18nElement } from "@/i18n/elements";
import { LocaleLink as Link } from "@/i18n/elements";
import { useEffect, useRef } from "react";
import { AppIcon, type IconName } from "@/components/ui/icon";

export type MobileNavigationItem = {
  href: string;
  label: string;
  icon: IconName;
};

const closeDuration = 250;

export function MobileNavigation({ items }: { items: MobileNavigationItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const openFrameRef = useRef<number | null>(null);
  const previousOverflowRef = useRef<string | null>(null);

  function clearCloseTimer() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function unlockPageScroll() {
    if (previousOverflowRef.current === null) return;
    document.body.style.overflow = previousOverflowRef.current;
    previousOverflowRef.current = null;
  }

  function clearOpenFrame() {
    if (openFrameRef.current === null) return;
    window.cancelAnimationFrame(openFrameRef.current);
    openFrameRef.current = null;
  }

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    clearCloseTimer();
    clearOpenFrame();
    dialog.classList.remove("is-open");
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    triggerRef.current?.setAttribute("aria-expanded", "true");

    // Commit the dialog itself at translateX(100%), fully outside the viewport,
    // before moving it left into its right-aligned resting position.
    void dialog.offsetWidth;
    openFrameRef.current = window.requestAnimationFrame(() => {
      dialog.classList.add("is-open");
      openFrameRef.current = null;
    });
  }

  function closeMenu(immediate = false) {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    clearCloseTimer();
    clearOpenFrame();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (immediate || reduceMotion) {
      dialog.close();
      return;
    }

    dialog.classList.remove("is-open");
    closeTimerRef.current = window.setTimeout(() => dialog.close(), closeDuration);
  }

  useEffect(() => () => {
    clearCloseTimer();
    clearOpenFrame();
    if (dialogRef.current?.open) dialogRef.current.close();
    unlockPageScroll();
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 981px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches && dialogRef.current?.open) dialogRef.current.close();
    };
    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, []);

  return (
    <>
      <I18nElement as="button"
        ref={triggerRef}
        className="mobile-nav-toggle"
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={false}
        aria-controls="mobile-navigation"
        onClick={openMenu}
      >
        <AppIcon name="menu" size={25} />
      </I18nElement>

      <I18nElement as="dialog"
        ref={dialogRef}
        id="mobile-navigation"
        className="mobile-nav-drawer"
        aria-label="Mobile navigation"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => {
          clearCloseTimer();
          clearOpenFrame();
          dialogRef.current?.classList.remove("is-open");
          triggerRef.current?.setAttribute("aria-expanded", "false");
          unlockPageScroll();
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
        onTransitionEnd={(event) => {
          if (
            event.target === event.currentTarget &&
            event.propertyName === "transform" &&
            dialogRef.current?.open &&
            !dialogRef.current.classList.contains("is-open")
          ) {
            clearCloseTimer();
            dialogRef.current.close();
          }
        }}
      >
        <I18nElement as="div" className="mobile-nav-drawer__panel">
          <I18nElement as="div" className="mobile-nav-drawer__head">
            <I18nElement as="div">
              <I18nElement as="span">Explore</I18nElement>
              <I18nElement as="strong">Crumble Guide</I18nElement>
            </I18nElement>
            <I18nElement as="button" type="button" aria-label="Close navigation menu" autoFocus onClick={() => closeMenu()}>
              <AppIcon name="x" size={23} />
            </I18nElement>
          </I18nElement>
          <I18nElement as="nav" aria-label="Mobile primary navigation">
            {items.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => closeMenu(true)}>
                <I18nElement as="span"><AppIcon name={item.icon} size={20} /></I18nElement>
                <I18nElement as="strong">{item.label}</I18nElement>
                <AppIcon name="chevron" size={17} />
              </Link>
            ))}
          </I18nElement>
        </I18nElement>
      </I18nElement>
    </>
  );
}
