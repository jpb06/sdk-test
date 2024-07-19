import { z } from 'zod';

import type { FramebusEventMap } from './types';

export const events = {
  'user.get': z.object({
    id: z.string(),
  }),
  'user.actions.doStuff': z.any(),
  ready: z.object({
    bro: z.string(),
    struff: z.number(),
  }),
} satisfies FramebusEventMap;
