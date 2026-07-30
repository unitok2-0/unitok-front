module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components-new/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.6875rem',
        'base': '0.9375rem',
        '2xlMax': '1.7rem',
        '3xl': '2rem',
        '4xl': '2.125rem',
        '5xl': '2.5rem',
        '5xlMax': '3rem',
        '6xlMin': '3.5rem',
        '6xl': '4rem',
      },
      dropShadow: {
        '3xl': [
            '0 0px 4px rgb(0 0 0 / 0.2)',
            '0 8px 5px rgb(0 0 0 / 0.2)'
        ]
      },
      screens: {
        'tb': '940px',
        'mb': '992px',
        '1xl': '1360px',
      }
    },
    colors: {
      'orange': '#FF4C1C',
      'green-dark': '#01302F',
      'green-mid': '#0B6442',
      'green-light': '#D4FEB2',
      'green-black': '#002625',
      'gray-dark': '#646B67',
      'gray-mid': '#EFF2F2',
      'gray-light': '#FAFAFA',
      'gray-box': '#D0D4D1',
      'white': '#fff',
      'btn-hover': '#D14018',
    },
    fontWeight: {
      'light': 300,
      'normal': 400,
      'bold': 500,
    }
  },
  plugins: [],
}
