'use client';

import { useFramebusContext } from '@/components/providers';
import { styled } from '@panda/jsx';

export const ActionFromReact = () => {
  const framebus = useFramebusContext();

  const handleClick = () => {
    console.info('emitting user.actions.doStuff event ...');
    framebus.emit('user.actions.doStuff', {
      bro: 'cool',
      struff: 25,
    });
  };

  return (
    <styled.button
      onClick={handleClick}
      css={{
        padding: 2,
        backgroundColor: 'background.quaternary',
        color: 'content.black',
        borderRadius: 'md',
      }}
    >
      Action
    </styled.button>
  );
};
