import React from 'react';
import { StackNavigator } from 'react-navigation';
import { theme } from "./conf/colors";
import { fonts } from "./conf/fonts";

import Registration from './screen/Registration';
import Login from './screen/Login';
import Settings from './screen/Settings';
import MainScreen from './screen/MainScreen';
import Splash from './screen/Splash';

export const Root = StackNavigator( {
    Splash: {
        screen: Splash,
        navigationOptions: {
            header: null,
        },
    },
    Registration: {
        screen: Registration,
        navigationOptions: {
            title: 'Регистрация',
        },
    },
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Авторизация',
        },
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            title: 'Аккаунт',
        },
    },
    MainScreen: {
        screen: MainScreen,
        navigationOptions: {
            title: 'Главный экран',
        },
    }
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: theme.accent,
            height: 64,
            elevation: 0,
        },
        headerTitleStyle: {
            color: theme.fontPrimary,
            fontFamily: fonts.fontFamily,
            fontWeight: '200',
        },
        headerTintColor: theme.primary
    }
} );
