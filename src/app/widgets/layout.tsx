import type { FunctionComponent, PropsWithChildren } from 'react';

import { FramebusProvider } from '@components/providers/framebus';

const WidgetLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <FramebusProvider>{children}</FramebusProvider>
);

export default WidgetLayout;
