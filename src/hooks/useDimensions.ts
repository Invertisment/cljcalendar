// Source: https://stackoverflow.com/a/36862446
import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export function useGrid() {
  const dimensions = useWindowDimensions()
  const vmin = Math.min(dimensions.width, dimensions.height)
  return {
    atLeastVerySmall: dimensions.width > 400,
    atLeastSmall: dimensions.width > 600,
    atLeastMedium: dimensions.width > 900,
    atLeastLarge: dimensions.width > 1200,
    vminAtLeastVerySmall: vmin > 400,
    vminAtLeastSmall: vmin > 600,
    vminAtLeastMedium: vmin > 900,
    vminAtLeastLarge: vmin > 1200,
  }
}
