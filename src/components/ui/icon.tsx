"use client";

import { Icon as IconifyIcon, type IconifyIcon as IconData } from "@iconify/react";
import searchIcon from "@iconify-icons/lucide/search";
import cookieIcon from "@iconify-icons/lucide/cookie";
import pawPrintIcon from "@iconify-icons/lucide/paw-print";
import trophyIcon from "@iconify-icons/lucide/trophy";
import usersIcon from "@iconify-icons/lucide/users";
import ticketIcon from "@iconify-icons/lucide/ticket";
import copyIcon from "@iconify-icons/lucide/copy";
import checkIcon from "@iconify-icons/lucide/check";
import externalLinkIcon from "@iconify-icons/lucide/external-link";
import xIcon from "@iconify-icons/lucide/x";
import plusIcon from "@iconify-icons/lucide/plus";
import linkIcon from "@iconify-icons/lucide/link";
import chevronRightIcon from "@iconify-icons/lucide/chevron-right";
import sparklesIcon from "@iconify-icons/lucide/sparkles";
import menuIcon from "@iconify-icons/lucide/menu";
import wrenchIcon from "@iconify-icons/lucide/wrench";
import imageIcon from "@iconify-icons/lucide/image";
import gripVerticalIcon from "@iconify-icons/lucide/grip-vertical";
import downloadIcon from "@iconify-icons/lucide/download";
import bookOpenIcon from "@iconify-icons/lucide/book-open";
import clockIcon from "@iconify-icons/lucide/clock";
import calendarDaysIcon from "@iconify-icons/lucide/calendar-days";
import chevronLeftIcon from "@iconify-icons/lucide/chevron-left";

const icons = {
  search: searchIcon,
  cookie: cookieIcon,
  paw: pawPrintIcon,
  trophy: trophyIcon,
  users: usersIcon,
  ticket: ticketIcon,
  copy: copyIcon,
  check: checkIcon,
  external: externalLinkIcon,
  x: xIcon,
  plus: plusIcon,
  link: linkIcon,
  chevron: chevronRightIcon,
  sparkles: sparklesIcon,
  menu: menuIcon,
  tools: wrenchIcon,
  image: imageIcon,
  grip: gripVerticalIcon,
  download: downloadIcon,
  book: bookOpenIcon,
  clock: clockIcon,
  calendar: calendarDaysIcon,
  "chevron-left": chevronLeftIcon,
} satisfies Record<string, IconData>;

export type IconName = keyof typeof icons;

export function AppIcon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return <IconifyIcon icon={icons[name]} width={size} height={size} className={className} aria-hidden="true" />;
}
