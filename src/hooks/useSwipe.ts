import { useCallback, useState, type PointerEvent, type TouchEvent } from 'react';

interface SwipeOptions {
  threshold?: number;
  rotationFactor?: number;
}

type SwipeDirection = 'left' | 'right' | 'up' | 'down' | 'none';

export const useSwipe = (
  onSwipe: (direction: SwipeDirection) => void,
  options: SwipeOptions = {}
) => {
  const { threshold = 50, rotationFactor = 0.5 } = options;

  const [position, setPosition] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const resetPosition = useCallback(() => {
    setPosition(0);
    setRotate(0);
    setDragStart(null);
    setIsDragging(false);
  }, []);

  const moveTo = useCallback((clientX: number) => {
    if (dragStart === null) {
      return;
    }

    const delta = clientX - dragStart;
    setPosition(delta);
    setRotate(delta * rotationFactor);
  }, [dragStart, rotationFactor]);

  const finishSwipe = useCallback(() => {
    const absPosition = Math.abs(position);

    if (absPosition > threshold) {
      const direction: SwipeDirection = position > 0 ? 'right' : 'left';
      onSwipe(direction);
      setPosition(position > 0 ? 520 : -520);
      setRotate(position > 0 ? 18 : -18);
      window.setTimeout(resetPosition, 240);
      return;
    }

    resetPosition();
  }, [onSwipe, position, resetPosition, threshold]);

  const handlePointerDown = useCallback((e: PointerEvent) => {
    setDragStart(e.clientX);
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging) {
      return;
    }

    moveTo(e.clientX);
  }, [isDragging, moveTo]);

  const handlePointerUp = useCallback(() => {
    finishSwipe();
  }, [finishSwipe]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    setDragStart(e.touches[0].clientX);
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) {
      return;
    }

    moveTo(e.touches[0].clientX);
  }, [isDragging, moveTo]);

  const handleTouchEnd = useCallback(() => {
    finishSwipe();
  }, [finishSwipe]);

  return {
    position,
    rotate,
    isDragging,
    directionHint: position > 18 ? 'right' : position < -18 ? 'left' : 'none',
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useSwipe;
