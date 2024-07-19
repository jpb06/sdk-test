import { FunctionComponent, PropsWithChildren, use } from 'react';

import { getTheme, ThemeName } from '@panda/themes';

type WithThemeProps = {
  themeName?: ThemeName;
};

export const WithTheme: FunctionComponent<
  PropsWithChildren<WithThemeProps>
> = ({ themeName, children }) => {
  const theme = themeName && use(getTheme(themeName));

  return (
    <div data-panda-theme={themeName}>
      {theme && (
        <style
          dangerouslySetInnerHTML={{ __html: theme.css }}
          id={theme.id}
          type="text/css"
        />
      )}
      {children}
    </div>
  );
};
