import { defineSemanticTokens } from '@pandacss/dev';

export const semanticTokens = defineSemanticTokens({
  colors: {
    background: {
      primary: { value: '#4c1d95' },
      secondary: { value: '#4f46e5' },
      tertiary: { value: '#6366f1' },
      quaternary: { value: '#c4b5fd' },
      neutral: { value: '#2e1065' },
      dark: { value: '#172554' },
      extradark: { value: '#082f49' },
      inverse: { value: '{colors.white}' },
    },
    content: {
      primary: { value: '#e0e7ff' },
      secondary: { value: '#93c5fd' },
      lowlight: { value: '#c4b5fd' },
      inverse: { value: '{colors.white}' },
      black: { value: '{colors.black}' },
    },
  },
});
