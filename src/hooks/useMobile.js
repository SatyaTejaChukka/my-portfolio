import { useEffect, useState } from 'react';
import { isTouchDevice } from '../utils/mobile';

export const useIsTouchDevice = () => {
  const [touch, setTouch] = useState(isTouchDevice);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const update = () => setTouch(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return touch;
};

export const useIsMobileNav = () => {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 900
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return mobile;
};
