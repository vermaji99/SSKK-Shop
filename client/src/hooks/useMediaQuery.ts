import * as React from 'react';

export function useMediaQuery(query: string): boolean {
  const getMatches = (q: string) =>
    typeof window !== 'undefined' && window.matchMedia(q).matches;

  const [matches, setMatches] = React.useState<boolean>(() => getMatches(query));

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    const update = () => setMatches(mediaQuery.matches);
    update();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update);
      return () => mediaQuery.removeEventListener('change', update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, [query]);

  return matches;
}

export default useMediaQuery;
