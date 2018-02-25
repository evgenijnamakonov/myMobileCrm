import { StyleSheet } from 'react-native';
import { theme as colors } from "./conf/colors";
import { fonts } from "./conf/fonts";

export const styles = StyleSheet.create( {
    mainContainer: {
        width: '100%',
        height: '100%',
    },
    cardListContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    cardListWrapper: {
        width: '100%',
        alignItems: 'center'
    },
    loginContainer: {
        flex: 1,
        paddingTop: 64,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    loginTextInput: {
        width: 280,
        textAlign: 'center',
        marginBottom: 16,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        borderWidth: 0.6,
        borderRadius: 3,
        borderColor: '#eee',
        fontSize: fonts.fontSize.primary,
        fontFamily: fonts.fontFamily
    },
    loginButtonLabel: {
        fontFamily: fonts.fontFamily,
        color: colors.primary,
        fontSize: fonts.fontSize.big,
    },
    loginButton: {
        paddingHorizontal: 32,
        minWidth: 160,
        height: 50,
        borderRadius: 3,
        backgroundColor: colors.accent,
        justifyContent: 'center',
        alignItems: 'center'
    },
    singUpRefLabel: {
        fontFamily: fonts.fontFamily,
        color: colors.accent,
        fontSize: fonts.fontSize.primary,
    },
    singUpRef: {
        paddingHorizontal: 8,
        paddingTop: 18,
    },
    loginBtnWrapper: {
        paddingBottom: 18,
        backgroundColor: colors.primary,
        alignItems: 'center'
    },
    accountIcon: {
        fontSize: 28,
        color: colors.primary
    },
    settingsIcon: {
        fontSize: 24,
        color: colors.primary
    },
    accountBtn: {
        marginTop: 4,
        padding: 8,
        paddingHorizontal: 12,
    }
} );