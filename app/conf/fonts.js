import { Platform } from 'react-native';

export const fonts = {
    fontFamily: Platform.select({
        ios: 'Helvetica-light',
        android: 'sans-serif-light'
    }),
    bold: Platform.select({
        ios: 'Helvetica-bold',
        android: 'sans-serif-bold'
    }),
    fontSize: {
        primary: 14,
        small: 11,
        big: 16,
        giant: 20,
    }
};