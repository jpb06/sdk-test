'use client';

import { FunctionComponent, use, useEffect, useState } from 'react';

import { useFramebusContext } from '@components/providers';
import { Box, Stack, styled } from '@panda/jsx';
import { getTheme, ThemeName } from '@panda/themes';

type UserWidgetPageProps = {
  searchParams: {
    theme?: ThemeName;
  };
};

const UserWidgetPage: FunctionComponent<UserWidgetPageProps> = ({
  searchParams,
}) => {
  const framebus = useFramebusContext();

  const [userId, setUserId] = useState('');

  const themeName = searchParams.theme;
  const theme = themeName && use(getTheme(themeName));

  const handleClick = () => {
    console.info('emitting user.actions.doStuff event ...');
    framebus.emit('user.actions.doStuff', {
      bro: 'cool',
      struff: 25,
    });
  };

  useEffect(() => {
    framebus.on('user.get', ({ id }) => {
      console.info(`user.get event fired with id ${id}`);
      setUserId(id);
    });
  }, [framebus]);

  return (
    <div data-panda-theme={searchParams.theme ?? undefined}>
      {theme && (
        <style
          dangerouslySetInnerHTML={{ __html: theme.css }}
          id={theme.id}
          type="text/css"
        />
      )}
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
            backgroundColor: 'background.primary',
            color: 'content.primary',
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
              backgroundColor: 'background.quaternary',
              color: 'content.black',
              borderRadius: 'md',
            }}
          >
            Action
          </styled.button>
          <Box>UserId - {userId}</Box>
        </Box>
      </Stack>
    </div>
  );
};

export default UserWidgetPage;
