/** Shared mobile / touch helpers */

export const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hapticLight = () => {
  try {
    navigator.vibrate?.(8);
  } catch {
    /* unsupported */
  }
};

export const hapticMedium = () => {
  try {
    navigator.vibrate?.(12);
  } catch {
    /* unsupported */
  }
};

const SKIP_RIPPLE =
  'input, textarea, select, [contenteditable="true"]';

export const shouldSkipTouchEffect = (target) => {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest(SKIP_RIPPLE));
};

export const requestDeviceOrientation = async () => {
  if (typeof window === 'undefined') return false;

  const EventCtor = window.DeviceOrientationEvent;
  if (!EventCtor) return false;

  if (typeof EventCtor.requestPermission === 'function') {
    try {
      const result = await EventCtor.requestPermission();
      return result === 'granted';
    } catch {
      return false;
    }
  }

  return true;
};
