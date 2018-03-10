import React from 'react';
import { StackNavigator } from 'react-navigation';
import { theme } from "./conf/colors";
import { fonts } from "./conf/fonts";

import Registration from './screen/Registration';
import Login from './screen/Login';
import Settings from './screen/Settings';
import MainScreen from './screen/MainScreen';
import CreateApp from './screen/CreateApp';
import AppSettings from './screen/AppSettings';
import Application from './screen/Application';
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
            title: 'Профиль',
        },
    },
    MainScreen: {
        screen: MainScreen,
        navigationOptions: {
            title: 'My Mobile CRM',
        },
    },
    CreateApp: {
        screen: CreateApp,
        navigationOptions: {
            title: 'Создание приложения',
        },
    },
    AppSettings: {
        screen: AppSettings,
        navigationOptions: {
            title: 'Настройки',
        },
    },
    Application: {
        screen: Application,
    }
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: theme.accent,
            height: 64,
            elevation: 3,
        },
        headerTitleStyle: {
            color: theme.fontPrimary,
            fontFamily: fonts.fontFamily,
            fontWeight: '500',
        },
        headerTintColor: theme.primary
    }
} );
