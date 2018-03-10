import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import QuitButton from "../components/quitButton";

export default class Settings extends Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = ({ navigation }) => ({
        headerRight: <QuitButton navigation = {navigation} />
    });

    render() {
        return(
            <View style = {local.container}>
            </View>
        )
    }
}

const local = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    }
});