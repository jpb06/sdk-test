import { defineSemanticTokens } from '@pandacss/dev';

export const semanticTokens = defineSemanticTokens({
  colors: {
    background: {
      primary: { value: '#F4F8FC' },
      secondary: { value: '#DCE0E8' },
      tertiary: { value: '#AAB1C2' },
      quaternary: { value: '#6F7588' },
      neutral: { value: '#F5F7FA' },
      dark: { value: '#073298' },
      extradark: { value: '#041F5E' },
      inverse: { value: '{colors.white}' },
      info: {
        light: { value: '#E7EEFF' },
        primary: { value: '#1157FB' },
        dark: { value: '#073298' },
        extradark: { value: '#041F5E' },
      },
      feedback: {
        light: { value: '#EAFCFD' },
        primary: { value: '#2EE2ED' },
        dark: { value: '#009CA6' },
        extradark: { value: '#057880' },
      },
      error: {
        light: { value: '#FEEAF1' },
        medium: { value: '#F23176' },
        hover: { value: '#B70054' },
        pressed: { value: '#9B0037' },
      },
      warning: {
        light: { value: '#FCF7EE' },
        medium: { value: '#FFAB00' },
        hover: { value: '#8F6716' },
      },
      lowwarning: {
        light: { value: '#FDFCEF' },
        medium: { value: '#FFE692' },
        hover: { value: '#FFCD33' },
      },
      success: {
        light: { value: '#E9F8F2' },
        medium: { value: '#24B47E' },
        hover: { value: '#0A7A50' },
      },
    },
    content: {
      primary: { value: '#1F3356' },
      secondary: { value: '#6F7588' },
      lowlight: { value: '#AAB1C2' },
      inverse: { value: '{colors.white}' },
      black: { value: '{colors.black}' },
      brand: {
        primary: { value: '#1157FB' },
        hover: { value: '#073298' },
      },
      error: {
        primary: { value: '#F23176' },
        hover: { value: '#9B0037' },
      },
      lowwarning: {
        primary: { value: '#FFE692' },
        hover: { value: '#FFCD33' },
      },
      warning: {
        primary: { value: '#FFAB00' },
        hover: { value: '#8F6716' },
      },
      success: {
        primary: { value: '#24B47E' },
        hover: { value: '#0A7A50' },
      },
    },
    state: {
      neutral: {
        DEFAULT: { value: '#69768E' },
        light: { value: '#F6F7F8' },
      },
      success: {
        DEFAULT: { value: '#24B47E' },
        light: { value: '#E9F8F2' },
      },
      info: {
        DEFAULT: { value: '#1157FB' },
        light: { value: '#E7EEFF' },
      },
      lowwarning: {
        DEFAULT: { value: '#FFC807' },
        light: { value: '#FFF8E1' },
      },
      warning: {
        DEFAULT: { value: '#F76310' },
        light: { value: '#FEECE2' },
      },
      danger: {
        DEFAULT: { value: '#F23176' },
        light: { value: '#FEEAF1' },
      },
    },
    stroke: {
      hover: { value: '#1157FB' },
      outline: { value: '#E7EEFF' },
      default: { value: '#DCE0E8' },
      disabled: { value: '#AAB1C2' },
      success: { value: '#24B47E' },
      warning: { value: '#FFAB00' },
      lowwarning: { value: '#FFCD33' },
      error: { value: '#F23176' },
    },
  },
});
