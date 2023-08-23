import { createStitches, globalCss } from '@stitches/react';

export const { styled, getCssText, keyframes } = createStitches({
  theme: {
    colors: {
      primary: '#059EAF',
      subPrimary: '#BC2FFF',
      warning: '#EE2323',
      white: '#FFFFFF',
      black: '#000000',
      gray: '#3E3E3E',
    },

    fontSizes: {
      f16: '16px',
      f32: '32px',
      f36: '36px',
    },

    fonts: {
      MontserratR:
        'Montserrat, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif',
    },
  },

  media: {
    mobile: `(max-width: 767px)`,
    pc: `(min-width: 768px)`,
  },
});

export const globalStyle = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  //   '@font-face': {
  //     fontFamily: 'Montserrat-Regular',
  //     fontWeight: '400',
  //     src: 'url(`/public/font/Montserrat-Regular.ttf`)',
  //   },

  //   body: {
  //     fontFamily: '$MontserratR',
  //   },
});