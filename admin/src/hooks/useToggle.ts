import { useState, useCallback } from 'react';

export function useToggle(initial = false) : [boolean, () => void] {
    
   const [toggle, setToggle] = useState(initial);

   const handleToggle = useCallback(() => setToggle(prev => !prev), []);

   return [toggle, handleToggle];

}