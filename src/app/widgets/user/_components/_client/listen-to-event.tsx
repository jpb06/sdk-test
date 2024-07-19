'use client';

import { useEffect, useState } from 'react';

import { useFramebusContext } from '@/components/providers';
import { Box } from '@panda/jsx';

export const ListenToEvent = () => {
  const framebus = useFramebusContext();

  const [userId, setUserId] = useState('');

  useEffect(() => {
    framebus.on('user.get', ({ id }) => {
      console.info(`user.get event fired with id ${id}`);
      setUserId(id);
    });
  }, [framebus]);

  return <Box>UserId - {userId}</Box>;
};
