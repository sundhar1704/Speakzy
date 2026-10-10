import { createContext, useContext, useMemo, useState } from 'react';

const NavCtx = createContext(null);

export function NavProvider({ initial, children }) {
  const [stack, setStack] = useState([initial]);
  const api = useMemo(
    () => ({
      route: stack[stack.length - 1],
      canGoBack: stack.length > 1,
      push: (name, params = {}) => setStack((s) => [...s, { name, params }]),
      replace: (name, params = {}) => setStack((s) => [...s.slice(0, -1), { name, params }]),
      reset: (name, params = {}) => setStack([{ name, params }]),
      back: () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)),
    }),
    [stack],
  );
  return <NavCtx.Provider value={api}>{children}</NavCtx.Provider>;
}

export const useNav = () => {
  const v = useContext(NavCtx);
  if (!v) throw new Error('useNav must be used inside <NavProvider>');
  return v;
};
