import type { MDXComponents } from "mdx/types";
import { LocaleLink } from "@/i18n/elements";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", children, ...props }) => {
      if (href.startsWith("/")) {
        return <LocaleLink href={href} {...props}>{children}</LocaleLink>;
      }
      return <a href={href} rel="noreferrer" {...props}>{children}</a>;
    },
    ...components,
  };
}
