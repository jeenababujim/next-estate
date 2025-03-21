import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
 
  theme: {
    extend: {
      backgroundImage: ({ theme }) => ({
        'gradient-blue-20': `linear-gradient(162.43deg, ${theme('colors.blue_fill.5')} 38.79%, ${theme('colors.blue.20')} 61.89%, #CDEAFA 75.95%)`,
        'gradient-green-10': `linear-gradient(162.43deg, ${theme('colors.green_fill.10')} 54.88%, #C8E6D5 70.16%)`,
        'gradient-green-20': `linear-gradient(331.08deg, ${theme('colors.success')} 10.38%, ${theme('colors.green.40')} 68.08%)`,
        'banner-image': "url('/blueskybg.png')",
        'branch-image': "url('/branch.png')"
      }),
      screens: {
        xxs: '340px',
        s: '450px',
        xs: '600px',
        sm: '768px',
        md: '1100px',
        tablet: '1200px',
        l: '1280px',
        desktop: '1440px',
        xxl: '1760px'
      },
      maxWidth: {
        container: '1440px',
        'inner-container': '1200px',
        'container-xxl': '1760px'
      },
      gridTemplateColumns: {
        'xs-trio': 'repeat(3, 288px)',
        'md-trio': 'repeat(3, 392px)'
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        reckless: ['var(--font-reckless)']
      },
      fontSize: {
        '13': '13px',
        '18': '18px',
        '20': '20px',
        '28': '28px',
        '32': '32px',
        '42': '42px',
        '50': '50px',
        '64': '64px',
        '100': '100px'
      },
      borderRadius: {
        '10': '10px',
        xs: '2.5px',
        xxl: '56px'
      },
      padding: {
        '16': '16px',
        '18': '18px',
        '23': '23px',
        '32': '32px',
        '50': '50px',
        '56': '56px'
      },
      letterSpacing: {
        xs: '0.25px'
      },
      lineHeight: {
        '16': '16px',
        '18': '18px',
        '22': '22px',
        '25': '25px',
        '28': '28px',
        '30': '30px',
        '32': '32px',
        '37': '37px',
        '49': '49px',
        '56': '56px',
        '58': '58px',
        '74': '74px',
        '110': '110px'
      }
    },
    colors: {
      blue: {
        DEFAULT: '#22394E',
        hover: '#35A7E5',
        20: '#E2F5FF',
        40: '#3DCBFF',
        50: '#0291DF',
        60: '#003D76'
      },
      green: {
        DEFAULT: '#0A9466',
        overlay: '#0A9466',
        10: '#E7F5ED',
        20: '#D9FFEB',
        30: '#BBFCD7',
        40: '#88FFC0',
        50: '#3FD686'
      },
      purple: {
        DEFAULT: '#7664F6'
      },
      black: {
        DEFAULT: '#171B1F',
        weekday: '#2C323A',
        border: '#B1B1B1',
        label: '#646A70',
        5: '#F8F8F8',
        10: '#F9F9F9',
        20: '#EFEFEF',
        40: '#D4D4D4',
        60: '#777777',
        64: '#A3A3A3',
        79: '#454D54',
        80: '#333333',
        100: '#101011',
        0: '#000'
      },
      red: {
        10: '#FFE6E5',
        border: '#3039411a'
      },
      white: '#FFFFFF',
      warm: '#F2F1ED',
      blue_fill: {
        DEFAULT: '#1173C3',
        5: '#E7F0F5',
        20: '#E2F5FF'
      },
      green_fill: {
        DEFAULT: '#BBFCD7',
        5: '#EFF4F1',
        10: '#E7F5ED'
      },
      warm_fill: {
        DEFAULT: '#F2F1ED'
      },
      cloud_reversed: '#1173C3',
      foliage_reversed: '#0A9466',
      foliage_positive: '#0A9466',
      error: '#F93C3A',
      success: '#0AC380',
      video_card_placeholder: '#C0C0C0'
    },
    keyframes: {
      slideDown: {
        from: {
          height: '0'
        },
        to: {
          height: 'var(--radix-accordion-content-height)'
        }
      },
      slideUp: {
        from: {
          height: 'var(--radix-accordion-content-height)'
        },
        to: {
          height: '0'
        }
      }
    },
    animation: {
      slideDown: 'slideDown 200ms ease-out',
      slideUp: 'slideUp 200ms ease-out'
    },
    boxShadow: {
      custom: '0px 6px 30px 8px rgba(0, 0, 0, 0.2)',
      arrow:
        '0px 2.73px 5.25px 0px #15151512, 0px 9.16px 17.65px 0px #1515150B, 0px 41px 79px 0px #15151507'
    }
  },
  plugins: []
};
export default config;
