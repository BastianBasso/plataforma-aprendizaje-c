import { useEffect, useState } from 'react';
import { fetchUserProgress } from '../services/progressApi.js';

export function useUserProgress() {
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      const result = await fetchUserProgress();
      if (!cancelled) {
        setPercent(result.percent);
        setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return { percent, loading };
}
