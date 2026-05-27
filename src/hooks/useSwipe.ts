import { useState, useCallback } from 'react';

interface SwipeOptions {
  threshold?: number; // Minimalna odległość do uznania za swipe (px)
  rotationFactor?: number; // Współczynnik obrotu karty
}

type SwipeDirection = 'left' | 'right' | 'up' | 'down' | 'none';

export const useSwipe = (
  onSwipe: (direction: SwipeDirection) => void,
  options: SwipeOptions = {}
) => {
  const { threshold = 50, rotationFactor = 0.5 } = options;

  const [position, setPosition] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touchDelta = e.touches[0].clientX - touchStart;

    setPosition(touchDelta);
    setRotate(touchDelta * rotationFactor);
  }, [touchStart, rotationFactor]);

  const handleTouchEnd = useCallback(() => {
    const absPosition = Math.abs(position);

    if (absPosition > threshold) {
      const direction: SwipeDirection = position > 0 ? 'right' : 'left';
      onSwipe(direction);

      // Animuj kartę wylatując z ekranu
      setPosition(position > 0 ? 500 : -500);
      setTimeout(() => {
        setPosition(0);
        setRotate(0);
      }, 300);
    } else {
      // Reset do pozycji wyjściowej jeśli nie osiągnięty próg
      setPosition(0);
      setRotate(0);
    }
  }, [position, threshold, onSwipe]);

  return {
    position,
    rotate,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useSwipe;
