import { useEffect, useState } from 'react';

interface WindowSize {
  windowWidth: number
  windowHeight: number
}

export default function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    windowWidth: window.outerWidth,
    windowHeight: window.innerHeight,
  })

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth !== windowSize.windowWidth) {
        setWindowSize(() => ({
          windowWidth: window.outerWidth,
          windowHeight: window.innerHeight,
        }));
      }
    }
    
    // Set size at the first client-side load
    handler();

    window.addEventListener('resize', handler);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handler);
    }
  }, [window.innerWidth]);

  return windowSize;
}
