import type { z } from 'zod';

import type { events } from './events';

export type FramebusEvents = typeof events;

export type FramebusEventMap = Record<string, z.ZodTypeAny>;

export type FramebusEventName = keyof FramebusEvents;

export type FramebusEventListener<
  TEventName extends FramebusEventName = FramebusEventName,
> = (payload: FramebusEventPayload<TEventName>) => void;

export type FramebusEventPayload<
  TEventName extends FramebusEventName = FramebusEventName,
> = z.infer<FramebusEvents[TEventName]>;
