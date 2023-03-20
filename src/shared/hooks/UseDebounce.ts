import { useCallback, useRef } from 'react';


//ajustando para espera de consulta 
export const useDebounce = (delay = 1000, notDelayInFirstTime = true) => {
  const debouncing = useRef<NodeJS.Timeout>();
  const isFirstTime = useRef(notDelayInFirstTime);

  const debounce = useCallback((func: () => void) => {
    if (isFirstTime.current) {
      isFirstTime.current = false;
      func();
    } else {
      if (debouncing.current) {
        clearTimeout(debouncing.current);
      }
      debouncing.current = setTimeout(() => func(), delay);
    }

  }, [delay]);

  return { debounce };
};