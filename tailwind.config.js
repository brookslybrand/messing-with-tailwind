module.exports = {
  theme: {
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont'],
      serif: ['Georgia', 'Cambria'],
      mono: ['SFMono-Regular', 'Menlo'],
      display: ['Oswald'],
      body: ['Poppins', '-apple-system', 'BlinkMacSystemFont']
    },
    extend: {
      colors: {
        // taken from https://tailwindcss.com/docs/customizing-colors/#overriding-a-default-color
        gray: {
          '100': '#f5f5f5',
          '200': '#eeeeee',
          '300': '#e0e0e0',
          '400': '#bdbdbd',
          '500': '#9e9e9e',
          '600': '#757575',
          '700': '#616161',
          '800': '#424242',
          '900': '#212121'
        }
      },
      transitionProperty: {
        height: 'height'
      }
    }
  },
  variants: {},
  plugins: []
}
