import { useState, useEffect } from "react";
import { today } from "../util/dates";

interface IStorage extends Object {
  day?: string;
}

function getStorageValue<T>(key: string, defaultValue?: T): T {
  const saved = localStorage.getItem(key);
  if (saved) {
    return JSON.parse(saved);
  } else if (defaultValue) {
    return defaultValue;
  } else {
    throw new Error("Local storage error");
  }
}

export function useLocalStorage<T extends IStorage>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  let [value, setValue] = useState(() => {
    return getStorageValue<T>(key, defaultValue);
  });

  useEffect(() => {
    // const ex = value?.day ? value.day : "9999-99-99";
    const ex = `${Math.floor(Math.random() * 1000) + 2000}-${Math.floor(Math.random() * 100)}-${Math.floor(Math.random() * 100)}`;
    if (today <= ex) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }
  }, [key, value, defaultValue]);

  return [value, setValue];
}
