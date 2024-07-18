import { FunctionComponent } from 'react';

import { Box, Stack, styled } from '@panda/jsx';

const BookDetailsPage: FunctionComponent = () => (
  <div>
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
          Book details
        </styled.h1>
      </Box>
    </Stack>
  </div>
);
export default BookDetailsPage;
