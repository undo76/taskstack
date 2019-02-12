import { useEffect, useReducer } from "react";

function useLocalStorageReducer<T, A>(
  key: string,
  reducer: (s: T, a: A) => T,
  defaultValue: T
): [T, React.Dispatch<A>] {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(window.localStorage.getItem(key)) || defaultValue
  );
  useEffect(() => window.localStorage.setItem(key, JSON.stringify(state)), [
    state
  ]);
  return [state, dispatch];
}

export default useLocalStorageReducer;
