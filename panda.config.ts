import { defineConfig } from '@pandacss/dev';

import { semanticTokens } from '@/panda-config/semantic-tokens';
import { blueTheme } from '@/panda-config/themes/blue';
import { violetTheme } from '@/panda-config/themes/violet';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // patterns
  jsxFramework: 'react',

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    semanticTokens,
  },

  // The output directory for your css system
  outdir: 'styled-system',

  /**
   * The theme variants configuration for your project.
   * See https://panda-css.com/docs/references/config#themes
   */
  themes: {
    blue: blueTheme,
    violet: violetTheme,
  },
});
