import { FunctionComponent } from 'react';

import { WithTheme } from '@/components/with-theme';
import { ThemeName } from '@panda/themes';

import { UserWidgetRoot } from './_components/user-widget-root';

type UserWidgetPageProps = {
  searchParams: {
    theme?: ThemeName;
  };
};

const UserWidgetPage: FunctionComponent<UserWidgetPageProps> = ({
  searchParams,
}) => (
  <WithTheme themeName={searchParams.theme}>
    <UserWidgetRoot />
  </WithTheme>
);

export default UserWidgetPage;
