import React, {useState, useEffect, useCallback} from "react";

export const useOutsideAlerter = (ref) => {
    
    const [clicked, setClicked] = useState(false);

    const handleClickOutside = useCallback((event) => {    
        if (ref.current && !ref.current.contains(event.target)) {
            setClicked(true);
        }else{
            setClicked(false);
        }
    });

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {            
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return {clicked}
};