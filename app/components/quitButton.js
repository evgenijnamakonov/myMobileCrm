import React, { Component } from 'react';
import { Alert, AsyncStorage, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from "react-navigation";
import { styles } from "../styles";

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Login' })
    ]
});

export default class QuitButton extends Component {

    constructor(props) {
        super(props)
    }

    quit() {
        Alert.alert('Выход',
            'Вы уверены, что хотите выйти из аккаунта?',
            [
                {
                    text: 'Отменить',
                    style: 'cancel'
                },
                {
                    text: 'Выйти',
                    onPress: () => {
                        AsyncStorage.clear();
                        this.props.navigation.dispatch(resetAction)
                    }
                },
            ],
            { cancelable: false });
    }

    render() {
        return (
            <TouchableOpacity onPress = {() => this.quit()} style = {[styles.accountBtn, {paddingHorizontal: 16,}]}>
                <Ionicons name = 'md-exit' style = {[styles.settingsIcon, {fontSize: 26,}]} />
            </TouchableOpacity>
        )
    }
}