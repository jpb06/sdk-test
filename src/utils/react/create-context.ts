import type { Context, Provider } from 'react';
import {
  createContext as createReactContext,
  useContext as useReactContext,
} from 'react';

export interface CreateContextOptions {
  name?: string;
  errorMessage?: string;
  strict?: boolean;
}

export type CreateContextReturn<T> = [Provider<T>, () => T, Context<T>];

export const createContext = <ContextType>(
  options: CreateContextOptions = {},
) => {
  const {
    errorMessage = 'useContext: `context` is undefined. Seems you forgot to wrap component within the Provider',
    name,
    strict = true,
  } = options;

  const Context = createReactContext<ContextType | undefined>(undefined);

  Context.displayName = name;

  function useContext() {
    const context = useReactContext(Context);

    if (!context && strict) {
      const error = new Error(errorMessage);
      error.name = 'ContextError';
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context;
  }

  return [
    Context.Provider,
    useContext,
    Context,
  ] as CreateContextReturn<ContextType>;
};
