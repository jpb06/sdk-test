'use client';

import { FunctionComponent, useEffect } from 'react';

import { useFramebusContext } from '@components/providers';
import { Box, Stack, styled } from '@panda/jsx';

const UserWidgetPage: FunctionComponent = () => {
  const framebus = useFramebusContext();

  const handleClick = () => {
    console.info('emitting user.action event ...');
    framebus.emit('user.action', {
      type: 'yolo',
      payload: {
        bro: 'cool',
        struff: 25,
      },
    });
  };

  useEffect(() => {
    framebus.on('user.get', ({ id }) => {
      console.info('user.get event fired with id', id);
    });
  }, [framebus]);

  return (
    <Stack
      css={{
        gap: 8,
        textAlign: 'center',
        my: 8,
      }}
    >
      <Box
        css={{
          width: 500,
          height: 400,
          backgroundColor: 'sky.700',
          color: 'white',
          alignSelf: 'center',
          borderRadius: 34,
          p: 4,
        }}
      >
        <styled.h1
          css={{
            fontSize: '2rem',
            fontWeight: 'medium',
            lineHeight: '3xl',
          }}
        >
          User widget
        </styled.h1>
        <styled.button
          onClick={handleClick}
          css={{
            padding: 2,
            backgroundColor: 'red.300',
          }}
        >
          Action
        </styled.button>
      </Box>
    </Stack>
  );
};

export default UserWidgetPage;
