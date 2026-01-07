import { useEffect } from 'react';

export function useDynamicStylesheet(href, { id } = {}) {
  useEffect(() => {
    if (!href) return;

    const linkId = id || `dynamic-css-${btoa(href).replace(/=+$/g, '')}`;

    let link = document.getElementById(linkId);
    if (!link) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.id = linkId;
      document.head.appendChild(link);
    } else {
      link.href = href;
    }

    return () => {
      const existing = document.getElementById(linkId);
      if (existing) existing.remove();
    };
  }, [href, id]);
}
