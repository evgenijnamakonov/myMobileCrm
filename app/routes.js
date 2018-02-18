import React from 'react';
import {StackNavigator} from 'react-navigation';

import Registration from './screen/Registration';
import Login from './screen/Login';
import Splash from './screen/Splash';

export const Root = StackNavigator({
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
    }
}, {
    navigationOptions: {
        headerStyle: {backgroundColor: 'rgb(80, 157, 63)', height: 64,},
        headerTitleStyle: {color: '#fff', fontWeight: '200'},
        headerTintColor: '#fff'
    }
} );
