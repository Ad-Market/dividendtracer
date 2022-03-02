import { UAParser } from 'ua-parser-js'
import { useMediaQuery } from 'react-responsive';

export const useIsMobile = () => {
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    
    return isMobile;
}

export const useIsSmall = () => {
    const isSmall = useMediaQuery({ query: `(max-width: 330px)` });
    return isSmall;
}

export const useIsTablet = () => {
    const isTablet = useMediaQuery({ query: `(max-width: 1200px)` });
    
    return isTablet;
}

export const useIsMobileDevice = () => {
    const parser = new UAParser(window.navigator.userAgent)
    const { type } = parser.getDevice()
    const isMobileDevice = type === 'mobile'

    return isMobileDevice;
}
