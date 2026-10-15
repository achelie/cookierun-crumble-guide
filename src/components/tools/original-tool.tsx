'use client';

import { useEffect, useRef } from 'react';

type OriginalModule = { mount: (root: HTMLElement) => () => void };

// The imported DOM owns its controls. React only owns this mount boundary.
export function OriginalTool({ tool, html }: { tool: string; html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const url = `/tools/replica/${tool}.mjs`;
    void (import(/* webpackIgnore: true */ url) as Promise<OriginalModule>).then(module => {
      if (!disposed) cleanup = module.mount(root);
    }).catch(() => {
      if (disposed) return;
      const loading = root.querySelector('[role="status"]');
      if (loading) loading.textContent = 'Could not load the tool. Please reload the page.';
    });
    return () => { disposed = true; cleanup?.(); };
  }, [tool]);
  return <div ref={ref} className="tool-replica" dangerouslySetInnerHTML={{ __html: html }} />;
}
