import { useEffect, useState } from "react";

export function useLocalStorageState(initialState: boolean, key: string) {
  const [value, setValue] = useState(() => {
    const storageValue = window.localStorage.getItem(key);
    return storageValue ? JSON.parse(storageValue) : initialState;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
