import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const SessionContext = createContext(null);

async function fetchJson(url, options) {
  const res = await fetch(url, {
    credentials: 'include',
    headers: { Accept: 'application/json', ...(options?.headers || {}) },
    ...options,
  });
  let json = null;
  try {
    json = await res.json();
  } catch {
    // ignore
  }
  return { res, json };
}

export function SessionProvider({ children }) {
  const [status, setStatus] = useState('loading'); // loading | authenticated | guest
  const [user, setUser] = useState(null);

  const refresh = useCallback(async () => {
    setStatus(prev => (prev === 'authenticated' ? prev : 'loading'));
    const { res, json } = await fetchJson('/search-user');

    if (res.ok && json?.success) {
      setUser(json.user);
      setStatus('authenticated');
      return { ok: true, user: json.user };
    }

    setUser(null);
    setStatus('guest');
    return { ok: false };
  }, []);

  const logout = useCallback(async () => {
    await fetchJson('/logout', { method: 'POST' });
    await refresh();
  }, [refresh]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(() => ({ status, user, refresh, logout }), [status, user, refresh, logout]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within <SessionProvider>');
  return ctx;
}
