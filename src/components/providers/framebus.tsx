'use client';

import type { FunctionComponent, PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { Framebus } from '@sdk/framebus/framebus';
import { createContext } from '@utils/react';

const framebus = new Framebus();

const [FramebusContextProvider, useFramebusContext] = createContext<
  typeof framebus
>({
  name: 'FramebusContext',
  strict: true,
});

export const FramebusProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  useEffect(() => {
    framebus.connect();
    framebus.emit('ready');

    () => {
      framebus.destroy();
    };
  }, []);

  return (
    <FramebusContextProvider value={framebus}>
      {children}
    </FramebusContextProvider>
  );
};

export { useFramebusContext };
