import { defineSemanticTokens } from '@pandacss/dev';

export const semanticTokens = defineSemanticTokens({
  colors: {
    background: {
      primary: { value: '#0c4a6e' },
      secondary: { value: '#0284c7' },
      tertiary: { value: '#38bdf8' },
      quaternary: { value: '#bae6fd' },
      neutral: { value: '#0891b2' },
      dark: { value: '#082f49' },
      extradark: { value: '#042f2e' },
      inverse: { value: '{colors.white}' },
    },
    content: {
      primary: { value: '#99f6e4' },
      secondary: { value: '#34d399' },
      lowlight: { value: '#10b981' },
      inverse: { value: '{colors.white}' },
      black: { value: '{colors.black}' },
    },
  },
});
