"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  function clearCloseTimer() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function clearOpenFrame() {
    if (openFrameRef.current !== null) {
      window.cancelAnimationFrame(openFrameRef.current);
      openFrameRef.current = null;
    }
  }

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    clearCloseTimer();
    clearOpenFrame();
    setIsVisible(false);
    dialog.showModal();
    setIsOpen(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    openFrameRef.current = window.requestAnimationFrame(() => {
      openFrameRef.current = window.requestAnimationFrame(() => {
        setIsVisible(true);
        openFrameRef.current = null;
      });
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

    setIsVisible(false);
    closeTimerRef.current = window.setTimeout(() => dialog.close(), closeDuration);
  }

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => () => {
    clearCloseTimer();
    clearOpenFrame();
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
      <button
        ref={triggerRef}
        className="mobile-nav-toggle"
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={isOpen && isVisible}
        aria-controls="mobile-navigation"
        onClick={openMenu}
      >
        <AppIcon name="menu" size={25} />
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className={`mobile-nav-drawer${isVisible ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => {
          clearCloseTimer();
          clearOpenFrame();
          setIsOpen(false);
          setIsVisible(false);
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="mobile-nav-drawer__panel">
          <div className="mobile-nav-drawer__head">
            <div>
              <span>Explore</span>
              <strong>Crumble Guide</strong>
            </div>
            <button type="button" aria-label="Close navigation menu" autoFocus onClick={() => closeMenu()}>
              <AppIcon name="x" size={23} />
            </button>
          </div>
          <nav aria-label="Mobile primary navigation">
            {items.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => closeMenu(true)}>
                <span><AppIcon name={item.icon} size={20} /></span>
                <strong>{item.label}</strong>
                <AppIcon name="chevron" size={17} />
              </Link>
            ))}
          </nav>
        </div>
      </dialog>
    </>
  );
}
