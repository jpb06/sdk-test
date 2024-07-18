import { z } from 'zod';

import type { FramebusEventMap } from './types';

export const events = {
  'user.get': z.object({
    id: z.string(),
  }),
  'user.action': z.object({
    type: z.string(),
    payload: z.any(),
  }),
  ready: z.undefined(),
} satisfies FramebusEventMap;
