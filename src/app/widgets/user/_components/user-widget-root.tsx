import { Stack, Box, styled } from '@panda/jsx';

import { ActionFromReact, ListenToEvent } from './_client';

export const UserWidgetRoot = () => (
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
      <ActionFromReact />
      <ListenToEvent />
    </Box>
  </Stack>
);
