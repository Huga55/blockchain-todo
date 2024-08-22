import { Dispatch, SetStateAction, useState } from "react";

type ReturnType<T> = [T, Dispatch<SetStateAction<T>>];

export const useStoredState = <T>(
  key: string,
  initialValue: T
): ReturnType<T> => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return initialValue;
    // try {
    //   // const item = window.localStorage.getItem(key);
    //   if (!item) {
    //     // window.localStorage.setItem(key, JSON.stringify(initialValue));
    //     return initialValue;
    //   }
    //   return JSON.parse(item) as T;
    // } catch (error) {
    //   console.error(error);

    //   return initialValue;
    // }
  });

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      // window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
